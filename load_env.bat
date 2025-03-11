@echo off
echo Loading environment variables from .env file...

if not exist .env (
    echo ERROR: .env file not found
    echo Please copy .env.template to .env and fill in your values
    exit /b 1
)

for /f "tokens=*" %%a in (.env) do (
    set line=%%a
    if not "!line:~0,1!"=="#" if not "!line!"=="" (
        set %%a
    )
)

echo Environment variables loaded successfully!
echo Current values:
echo - OCI_REGISTRY_URL: %OCI_REGISTRY_URL%
echo - OCI_USERNAME: %OCI_USERNAME%
echo - VM_IP: %VM_IP%
echo - VM_USER: %VM_USER%
echo - SSH_KEY_PATH: %SSH_KEY_PATH%