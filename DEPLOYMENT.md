# Secure Deployment Guide for Music Analytics Platform

## Prerequisites
- Oracle Cloud Infrastructure account
- Oracle Linux VM instance
- SSH key for VM access
- Docker and Docker Compose installed locally (for building)
- Java 17 (for building JAR files)

## Secure Configuration

### 1. Create your environment file
Copy the `.env.template` file to create a `.env` file:

```bash
cp .env.template .env
```

Edit the `.env` file with your personal credentials:
```properties
# Oracle Cloud Registry Configuration
OCI_REGISTRY_URL=your-registry-url
OCI_USERNAME=your-username-with-tenancy

# VM Configuration
VM_IP=your-vm-ip
VM_USER=your-vm-username
SSH_KEY_PATH=path-to-your-ssh-key
```

Note: The `.env` file is excluded from git via `.gitignore` to prevent committing sensitive information.

### 2. Load the environment variables
```bash
# On Windows
load_env.bat

# On Linux/Mac
source load_env.sh
```

## Deployment Options

### Option 1: Direct VM Deployment (Recommended)
This approach builds the Docker images directly on the Oracle VM, bypassing the Oracle Container Registry:

```bash
# 1. Build the application with Maven
mvn clean package -DskipTests

# 2. Prepare the deployment package
prepare_vm_package.bat    # Windows
./prepare_vm_package.sh   # Linux/Mac

# 3. Transfer files to your VM (automatically uses your .env variables)
scp -i %SSH_KEY_PATH% -r vm-deploy %VM_USER%@%VM_IP%:~/music-analytics

# 4. SSH into your VM and run the deploy script
ssh -i %SSH_KEY_PATH% %VM_USER%@%VM_IP%
cd ~/music-analytics
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Oracle Container Registry Deployment
If you prefer to use Oracle Container Registry:

```bash
# Windows
deploy_oracle_cloud.bat

# Linux/Mac
./deploy_oracle_cloud.sh
```

Follow the instructions on-screen to complete the deployment.

## Security Considerations

1. **Auth Tokens**: When prompted for password during Docker login, use the Auth Token from Oracle Cloud, not your regular password.

2. **VM Firewall**: Ensure your Oracle VM has the necessary ports open (8080, 8762, etc.).

3. **Sensitive Data**: Never commit `.env` files or SSH keys to your repository.

4. **Regular Updates**: Update your Auth Tokens periodically for better security.

## Accessing the Services

After successful deployment, your services will be available at:

- API Gateway: http://[YOUR_VM_IP]:8080
- Eureka Server: http://[YOUR_VM_IP]:8762
- Service Endpoints through the API Gateway: http://[YOUR_VM_IP]:8080/api/*