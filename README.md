

# 🛒 E-Commerce Microservices Application
## Linux → Docker → Docker Compose (Production & Interview Ready)

---

## 📌 Project Objective

This project is built to **learn and demonstrate real DevOps practices** starting from:
- Linux basics
- Docker fundamentals
- Docker multi-stage builds
- Docker Compose orchestration
- Persistent volumes
- Environment variables
- Microservices architecture
- API Gateway pattern

This is **not a toy project**, this is how a **3–5 year DevOps engineer** structures and explains a project.

---

## 🧠 Architecture Overview (3-Tier)

User Browser
↓
Frontend (React served by Nginx)
↓
API Gateway (Nginx)
↓
Backend Microservices
(Auth - Node.js | Product - Python | Order - Node.js)
↓
PostgreSQL Database (Persistent Volume)

### Why 3-Tier?
- Separation of concerns
- Independent scaling
- Security & maintainability
- Industry standard architecture

---

## 📁 Project Directory Structure

ecommerce-devops-project/
│
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/App.js
│
├── gateway/
│   ├── Dockerfile
│   └── nginx.conf
│
├── services/
│   ├── auth-service/
│   │   ├── Dockerfile
│   │   └── index.js
│   │
│   ├── product-service/
│   │   ├── Dockerfile
│   │   └── app.py
│   │
│   └── order-service/
│       ├── Dockerfile
│       └── index.js
│
└── database/
└── init.sql

---

# 🐧 PART 1 — LINUX BASICS (FOUNDATION)

## Essential Linux Commands (Interview Must)

| Command | Purpose |
|------|------|
| `ls` | List files |
| `pwd` | Current directory |
| `cd` | Change directory |
| `mkdir` | Create directory |
| `touch` | Create file |
| `rm -rf` | Delete file/folder |
| `cat` | View file |
| `nano / vim` | Edit file |
| `chmod` | Change permissions |
| `chown` | Change ownership |
| `ps -ef` | Running processes |
| `top / htop` | Resource usage |
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOA| `df -h` | Disk usage |
OAOAOAOAOA| `free -m` | Memory usage |
OAOAOAOAOA
OAOAOAOAOAOA---

OAOAOAOAOAOA# 🐳 PART 2 — DOCKER INSTALLATION (LINUX)
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOBOBOBOBOB
```bash
sudo apt update && sudo apt upgrade -y
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAsudo apt install docker.io -y
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAsudo systemctl start docker
sudo systemctl enable docker
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAdocker --version

OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOARun Docker without sudo

sudo usermod -aG docker $USER
newgrp docker

OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOA
OAOAOAOAOA⸻

OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOA🐳 PART 3 — DOCKER CORE COMMANDS (INTERVIEW GOLD)
OAOAOAOAOAOAOAOAOAOA
Images
OAOAOAOAOA
docker images
docker build -t image-name .
docker rmi image-id
OAOAOAOAOAOA
Containers
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOA
docker ps
OAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAOAdocker ps -a
OAdocker run -d -p 8080:80 image
docker stop container
OAOAOAOAOAOAOAdocker rm container

OADebugging

OAdocker logs container
OAdocker exec -it container sh


⸻

🐳 PART 4 — DOCKERFILE (MULTI-STAGE BUILD)

Why Multi-Stage Build?
	•	Smaller image size
	•	Faster deployment
	•	No dev dependencies in production
	•	Best practice in real projects

Example (Frontend)

FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

Explanation

Line	Meaning
FROM	Base image
AS build	Build stage
WORKDIR	Container directory
COPY	Copy files
RUN	Execute commands
--from=build	Copy from build stage


⸻

🐳 PART 5 — DOCKER COMPOSE (ORCHESTRATION)

Why Docker Compose?
	•	Run multiple containers together
	•	Single command startup
	•	Automatic networking
	•	Service-name based communication

⸻

docker-compose.yml (Core Concepts)

version: "3.9"

services:

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - gateway

Explanation
	•	services → All containers
	•	build → Dockerfile location
	•	ports → Host:Container mapping
	•	depends_on → Startup order

⸻


  product-service:
    build: ./services/product-service
    depends_on:
      - db

👉 Product service waits for database.

⸻


  db:
    image: postgres:15
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

Why Volumes?
	•	Data persistence
	•	Containers can be deleted safely
	•	Mandatory in production

⸻


volumes:
  postgres_data:


⸻

Docker Compose Commands

docker-compose up
docker-compose up --build
docker-compose down
docker-compose down -v
docker-compose ps
docker-compose logs


⸻

🔐 PART 6 — ENVIRONMENT VARIABLES

.env file

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=ecommerce

Why .env?
	•	No secrets in code
	•	Easy configuration
	•	Industry best practice

⸻

🗃️ PART 7 — DATABASE INITIALIZATION

init.sql

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO products (name)
VALUES ('Laptop'), ('Mobile'), ('Headphones');


⸻

🧪 PART 8 — TESTING

Check	URL
Frontend	http://localhost:3000
Products API	http://localhost/products
Docker Volume	docker volume ls


⸻

🧠 HOW TO EXPLAIN IN INTERVIEW

“I built a 3-tier microservices e-commerce application using Docker and Docker Compose.
I used multi-stage Dockerfiles for optimization, Docker Compose for orchestration, persistent volumes for database data, environment variables for secrets, and an API Gateway for routing.”


