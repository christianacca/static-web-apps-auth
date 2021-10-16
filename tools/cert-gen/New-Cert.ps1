function New-Cert {
    [CmdletBinding()]
    param(
        [string] $Path = "$PSScriptRoot/out",
        [string] $Name = 'localhost',
        [string] $FriendlyName = "Self-signed $Name",
        [string] $ClearTextPassword = 'password1234',
        [ValidateSet('CurrentUser', 'LocalMachine')]
        [string] $Store = 'CurrentUser',
        [switch] $Trust,
        [switch] $Force
    )
    begin {
        $callerEA = $ErrorActionPreference
        $ErrorActionPreference = 'Stop'
        if (-not(Test-Path Env:/TEMP)) {
            $env:TEMP = "/tmp"
        }
        $tmpPath = "$env:TEMP/cert-gen"
    }
    process {
        try {
            # Generate ssl cert
            # For more information on how all this works see:
            # * https://medium.com/the-new-control-plane/generating-self-signed-certificates-on-windows-7812a600c2d8
            # * https://www.digicert.com/kb/ssl-support/openssl-quick-reference-guide.htm

            # prepare temporary directory
            Remove-Item $tmpPath -Force -Confirm:$false -Recurse -EA SilentlyContinue
            New-Item $tmpPath -ItemType Directory -Force

            Copy-Item $PSScriptRoot/$Name.config $tmpPath

            try {
                Push-Location $tmpPath
                if (Get-Command openssl -EA SilentlyContinue) {
                  openssl req -config "$Name.config" -new -x509 -sha256 -newkey rsa:2048 -nodes `
                      -keyout "$Name.key" -days 3650 -out "$Name.crt" `
                      -passin "pass:$ClearTextPassword"
                  openssl pkcs12 -export -out "$Name.pfx" -inkey "$Name.key" -in "$Name.crt" `
                      -password "pass:$ClearTextPassword" -name "$FriendlyName"
                } else {
                  wsl openssl req -config "$Name.config" -new -x509 -sha256 -newkey rsa:2048 -nodes `
                      -keyout "$Name.key" -days 3650 -out "$Name.crt" `
                      -passin "pass:$ClearTextPassword"
                  wsl openssl pkcs12 -export -out "$Name.pfx" -inkey "$Name.key" -in "$Name.crt" `
                      -password "pass:$ClearTextPassword" -name "$FriendlyName"
                }
            }
            finally {
                Pop-Location
            }

            # prepare output directory
            if ((Test-Path (Join-Path $Path '/*')) -and -not($Force)) {
                throw "$Path is not empty; to overwrite please supply -Force switch"
            }
            Remove-Item $Path -Force -Confirm:$false -Recurse -EA SilentlyContinue
            New-Item $Path -ItemType Directory -Force

            # Move certificate files into output folder
            Move-Item $tmpPath/$Name.key $Path
            Move-Item $tmpPath/$Name.crt $Path
            Move-Item $tmpPath/$Name.pfx $Path

            Remove-Item $tmpPath -Force -Confirm:$false -Recurse -EA SilentlyContinue

            # install as a trusted root cert (so browser doesn't issue security warnings)
            if ($Trust) {
                $certPwd = ConvertTo-SecureString -String $ClearTextPassword -Force -AsPlainText
                Get-ChildItem Cert:/$Store/Root/ | Where-Object  FriendlyName -eq $FriendlyName | Remove-Item
                Get-ChildItem $Path/$Name.pfx |
                    Import-PfxCertificate -CertStoreLocation Cert:/$Store/Root -Password $certPwd -Confirm:$false
            }
        }
        catch {
            Write-Error -ErrorRecord $_ -EA $callerEA
        }
    }
}
