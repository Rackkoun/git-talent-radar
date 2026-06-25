# 🎯 GitTalentRadar

An end-to-end, asynchronous, AI-powered developer analytics and MLOps platform. `GitTalentRadar` ingests GitHub public profiles, runs localized feature engineering on tech stacks using repository metrics, predicts an "influence tier" via machine learning pipelines, and exposes insights through a secure API and an intelligent LangChain Agent.

---

## 🏗️ System Architecture


## 🛠️ Tech Stack

*   **Frontend:** React, Vite, TailwindCSS, Shadcn/ui.
*   **API Gateway & Security:** Nginx (Reverse Proxy), FastAPI, OAuth2, JWT Tokens.
*   **Data & Streaming:** PostgreSQL, Apache Kafka, DVC (Data Version Control) via DagsHub.
*   **MLOps & Pipelines:** ZenML, MLflow, Apache Airflow / Prefect.
*   **Inference & AI Agents:** BentoML, LangChain, Ollama (Local LLM execution).
*   **Infrastructure & CI/CD:** Docker, Kubernetes (Minikube), Pytest, GitHub Actions.

---

## 🚀 Roadmap & Implementation Phases

### 🔹 Phase 1: The Core Web & Security (Dev)
*   Build the React dashboard utilizing the floating search components and developer profile cards.
*   Deploy FastAPI backend secured with **OAuth2/JWT** access-token strategies.
*   Configure Nginx as a reverse proxy to manage secure local routing.

### 🔹 Phase 2: Asynchronous Data Ingestion (Data)
*   Implement event-driven ingestion using **Apache Kafka** to safely buffer incoming GitHub API profile payloads.
*   Query `GET /repos/{owner}/{repo}/languages` to aggregate language byte counts and extract specialized developer tech stacks.
*   Store cleaned structured data in PostgreSQL and version-control immutable dataset updates using **DVC**.

### 🔹 Phase 3: The Reproducible ML Pipeline (ML)
*   Engineer a composite target variable evaluating a developer's total ecosystem impact.
*   Wrap training modules inside robust **ZenML** steps (`load`, `preprocess`, `train`).
*   Incorporate **MLflow** for active experiment tracking, hyperparameter logging, and model artifact registration.

### 🔹 Phase 4: Enterprise Deployment & Agentic AI (Ops)
*   Ship the optimal model as a microservice using **BentoML**.
*   Incorporate a **LangChain** Agent backed by **Ollama** allowing natural language queries regarding the ingested developer community.
*   Orchestrate all application layers within a local **Kubernetes (Minikube)** cluster, complete with continuous monitoring dashboards via **Prometheus and Grafana**.

---

## 📂 Repository Structure

```text
├── .github/workflows     # CI/CD workflows (GitHub Actions)
├── backend/              # FastAPI Application & ML Pipelines
│   ├── app/              # Core API logic, DB schemas, and ML Services
│   └── tests/            # Automated test coverage (Pytest)
├── docs/                 # System architecture diagrams and documentations
├── frontend/             # React / Vite Client Application
├── infra/                # Dockerfiles, Kubernetes manifests, and Nginx configurations
└── LICENSE               # Project License
```
---

## 🚦 Getting Started

```Bash
# Clone the repository
git clone https://github.com/Rackkoun/git-talent-radar.git

cd git-talent-radar
```