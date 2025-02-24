# Home Sensor Project

This repository contains the code for the Home Sensor project. Follow the instructions below to set up and run the project.

## Prerequisites

- Git
- Docker and Docker Compose

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/marshallcase/home-sensor.git
cd home-sensor
```

### 2. Set Up Docker

#### On macOS:

1. Install Docker Desktop for Mac from the [official website](https://www.docker.com/products/docker-desktop).
2. Launch Docker Desktop and wait for it to fully start (you'll see the Docker icon in the menu bar).
3. Alternatively, install Docker Compose separately using Homebrew:
   ```bash
   brew install docker-compose
   ```

#### On Windows with WSL:

1. Install Docker Desktop for Windows with WSL 2 backend from the [official website](https://www.docker.com/products/docker-desktop).
2. Enable integration with your WSL distro:
   - Open Docker Desktop → Settings → Resources → WSL Integration
   - Enable integration for your Linux distribution
3. Start Docker in WSL if needed:
   ```bash
   sudo service docker start
   ```

#### On Linux:

1. Install Docker Engine:
   ```bash
   sudo apt-get update
   sudo apt-get install docker.io
   ```
2. Install Docker Compose:
   ```bash
   sudo apt-get install docker-compose
   ```
3. Start Docker service:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

## Running the Project

Build and start the containers:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

To run in detached mode (background):

```bash
docker-compose -f docker/docker-compose.yml up --build -d
```

## Stopping the Project

To stop the containers:

```bash
docker-compose -f docker/docker-compose.yml down
```

## Troubleshooting

### "Cannot connect to the Docker daemon"

This error means Docker is not running:
- On macOS: Launch Docker Desktop
- On Windows with WSL: Ensure Docker Desktop is running and WSL integration is enabled
- On Linux: Start the Docker service with `sudo systemctl start docker`

### Permission Issues

If you encounter permission issues:
```bash
sudo chmod 666 /var/run/docker.sock
```

## Additional Information

[Add any project-specific information here]