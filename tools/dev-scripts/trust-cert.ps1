$ErrorActionPreference = 'Stop'

$ProjectRoot = Resolve-Path $PSScriptRoot/../..

. "$ProjectRoot/tools/cert-gen/Import-Cert.ps1"
$ProjectName = (Get-Content $ProjectRoot/package.json | ConvertFrom-Json).name
Import-Cert -Path $ProjectRoot/tools/certs -Force -FriendlyName $ProjectName
