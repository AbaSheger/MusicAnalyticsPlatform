@echo off
echo Cleaning up ports used by Music Analytics Platform...

REM Kill processes using our ports
for %%p in (8080 8082 8083 8084 8761 8762) do (
    echo Checking port %%p...
    for /f "tokens=5" %%a in ('netstat -aon ^| find "%%p" ^| find "LISTENING"') do (
        echo Killing process with PID: %%a using port %%p
        taskkill /F /PID %%a 2>nul
    )
)

REM Stop and remove Docker containers
echo Stopping Docker containers...
docker-compose down 2>nul

echo Cleanup complete. You can now restart the application.