function Restart-InWindowsPowershell {
  [CmdletBinding()]
  param (
    [Parameter(Mandatory)]
    [string] $Command,
    [hashtable] $CommandParams,
    [string] $PathToImportCommand
  )

  process {
    $commandToRun = "";
    if ($PathToImportCommand) {
      $commandToRun += ". $PathToImportCommand;`n"
    }
    if ($CommandParams) {
      $commandToRun += $CommandParams.Keys | ForEach-Object {
        "  $_ = $($CommandParams[$_])"
      } | Join-String -OutputPrefix "`$importParams = @{`n" -OutputSuffix "`n};`n$Command @importParams;" -Separator "`n"
    } else {
      $commandToRun += "$Command"
    }
    write-host "Script that will be run in Windows Powershell:`n$commandToRun"
    powershell -command $commandToRun
  }
}

function Import-Cert {
  [CmdletBinding()]
  param(
  [string] $Path = "$PSScriptRoot/out",
  [string] $Name = 'localhost',
  [string] $FriendlyName = "Self-signed $Name",
  [string] $ClearTextPassword = 'password1234',
  [ValidateSet('CurrentUser', 'LocalMachine')]
  [string] $Store = 'CurrentUser',
  [switch] $Force
  )
  begin {
    write-host $PSBoundParameters
  $callerEA = $ErrorActionPreference
  $ErrorActionPreference = 'Stop'
  }
  process {
    try {
    if (-not $IsCoreCLR) {
        Write-Host 'Detected Windows Powershell (not Core)'
        $cert = Get-ChildItem Cert:/$Store/Root/ | Where-Object  FriendlyName -eq $FriendlyName;
        if ($cert -and -not($Force)) {
          throw "Certificate exists; to overwrite please supply -Force switch"
        }

        $certPwd = ConvertTo-SecureString -String $ClearTextPassword -Force -AsPlainText
        $cert | Remove-Item
        Write-Host "Using Import-PfxCertificate to install the cert into Cert:/$Store/Root."
        Get-ChildItem $Path/$Name.pfx |
        Import-PfxCertificate -CertStoreLocation Cert:/$Store/Root -Password $certPwd -Confirm:$false
      } elseif ($IsLinux) {
        Write-Host 'Detected Linux as OS'
        Write-Host "Copying $Name.crt to the ca-cerificates directory, then will refresh the certificates from there."
        Copy-Item -Path "$Path/$Name.crt" -Destination "/usr/local/share/ca-certificates/$Name";
        if ($?) {
          sudo update-ca-certificates --fresh;
        }
      } elseif ($IsMacOS) {
        Write-Host 'Detected macOS as OS'
        $userKeychain = "$HOME/Library/Keychains/login.keychain"
        $systemKeychain = "/Library/Keychains/System.keychain"
        $keychain = if ($Store -eq 'CurrentUser') { $userKeychain } else { $systemKeychain }
        Write-Host "Adding $Name.crt to the $Store keychain ($keychain)"
        $command = "sudo security add-trusted-cert -d -r trustRoot -k $keychain $Path/$Name.crt"
        Write-Host $command
        Invoke-Expression $command
      } elseif ($IsWindows) {
        Write-Host 'Detected Windows as OS'
        Restart-InWindowsPowershell -Command "Import-Cert" -PathToImportCommand "$PSScriptRoot/Import-Cert.ps1" -CommandParams $PSBoundParameters
      }
    }
    catch {
      Write-Error -ErrorRecord $_ -EA $callerEA
    }
  }
}
