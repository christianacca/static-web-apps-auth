# Generating a new dev HTTPS certificate

If you ever need to re-generate the certificate in tools/certs follow the instructions below.

1. Run: `./tools/dev-scripts/create-cert.ps1`
   - note: if you are on windows this will require that you have WSL installed
2. Commit: the changes in the directory tools/certs to source control

You will also need to ensure this new certificate is trusted on all dev machines where the new
certificate is going to be used (see [README.md](/README.md#run-demo-app-locally).
