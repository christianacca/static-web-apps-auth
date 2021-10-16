$ErrorActionPreference = 'Stop'

$ProjectRoot = Resolve-Path $PSScriptRoot/../..

. "$ProjectRoot/tools/cert-gen/New-Cert.ps1"
$ProjectName = (Get-Content $ProjectRoot/package.json | ConvertFrom-Json).name
New-Cert -Path $ProjectRoot/tools/certs -Force -FriendlyName $ProjectName
