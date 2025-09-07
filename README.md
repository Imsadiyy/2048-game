
# 1024 Game (Flask + Docker)

A fully playable **1024 game** built with **Flask** and **JavaScript**, containerized with **Docker**.  
This project demonstrates building a web app, containerizing it, and optionally deploying on Kubernetes or Docker Hub.

---

## 🎮 Features

- Fully playable 1024 game with arrow-key controls  
- "New Game" button to restart  
- Built with **Flask** (Python) backend  
- Frontend: HTML + CSS + JavaScript  
- Dockerized for easy deployment  
- Can run locally, on VM, or in a container

---

## 🗂 Project Structure

1024-game/
├── app.py # Flask backend
├── requirements.txt # Python dependencies
├── Dockerfile # Docker image instructions
├── templates/
│ └── index.html # HTML frontend
├── static/
│ ├── style.css # CSS styling
│ └── game.js # 1024 game logic
├── venv/ # Python virtual environment (ignored via .gitignore)
└── .gitignore

yaml
Copy code

---

## ⚡ Quick Start

### 1. Clone the repo
```bash
git clone git@github.com:Imsadiyy/2048-game.git
cd 2048-game
2. Run locally with Python
bash
Copy code
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python app.py
Open in browser:

arduino
Copy code
http://localhost:5000
or if running on a VM:

cpp
Copy code
http://<VM_IP>:5000
3. Dockerize the app
Build Docker image
bash
Copy code
docker build -t 1024-game:1.0 .
Run container
bash
Copy code
docker run -d -p 5000:5000 --name 1024-game 1024-game:1.0
Stop / Remove container
bash
Copy code
docker stop 1024-game
docker rm 1024-game
4. Optional: Push to Docker Hub
bash
Copy code
docker tag 1024-game:1.0 yourdockerhubusername/1024-game:1.0
docker push yourdockerhubusername/1024-game:1.0
5. Optional: Kubernetes (Minikube)
bash
Copy code
eval $(minikube docker-env)
docker build -t 1024-game:1.0 .
# Use image in your K8s manifests
🎯 How to Play
Use arrow keys to move tiles

Combine tiles with the same number to reach 1024

Click New Game to restart

Game ends when no moves are possible

📦 Tech Stack
Python 3.9 + Flask

HTML / CSS / JavaScript

Docker for containerization
