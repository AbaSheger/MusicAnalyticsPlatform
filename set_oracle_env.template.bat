@echo off
echo Setting Oracle Cloud environment variables...

REM Oracle Container Registry URL
set OCI_REGISTRY_URL=your-registry-url

REM Oracle Cloud username
set OCI_USERNAME=your-username

REM Public hostname or IP where services will be accessible
set ORACLE_EXTERNAL_HOSTNAME=your-vm-ip

REM Path to SSH private key file
set SSH_KEY_PATH=path-to-your-ssh-key

REM Username for the VM
set VM_USER=your-vm-username

REM Public IP address of Oracle Cloud VM instance
set VM_IP=your-vm-ip

echo Environment variables set:
echo OCI_REGISTRY_URL = %OCI_REGISTRY_URL%
echo OCI_USERNAME = %OCI_USERNAME%
echo ORACLE_EXTERNAL_HOSTNAME = %ORACLE_EXTERNAL_HOSTNAME%
echo SSH_KEY_PATH = %SSH_KEY_PATH%
echo VM_USER = %VM_USER%
echo VM_IP = %VM_IP%

echo.
echo You can now run: deploy_oracle_cloud.bat