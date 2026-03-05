# NeuroCommerce | AI-Driven E-Commerce & Analytics Platform

A sophisticated full-stack demonstration of **Agentic AI** orchestration, featuring a **LangChain** Text-to-SQL engine and a modern **React** frontend. Built to showcase enterprise-grade integration between Generative AI and relational data systems.

## 🚀 Key Features
* **AI Copilot Agent:** A conversational RAG-based assistant that processes natural language to assist in product discovery.
* **Text-to-SQL Terminal:** A developer-centric CLI that translates plain English queries into optimized **PostgreSQL** statements in real-time.
* **Explainable AI (XAI) Overlay:** Visualizes AI recommendation confidence using SHAP-inspired weight analysis for transparency.
* **System Telemetry:** Simulated dashboard tracking **Redis** cache hits and **Elasticsearch** latency to demonstrate a performance-first mindset.
* **Secure Pipelines:** Designed for **JWT-based** authentication, following industry-standard security protocols for .NET/Python microservices.

## 🛠️ Tech Stack
* **Frontend:** React 18 (Vite), Tailwind CSS, Lucide Icons, Framer Motion.
* **Backend:** FastAPI (Python), LangChain (SQL Agent), SQLAlchemy.
* **Database:** PostgreSQL (Relation Storage) + Vector-based Semantic Search.
* **Environment:** Docker (Postgres containerization), Git Version Control.

## 📂 Project Structure
```text
├── src/                # React Frontend (UI & XAI Logic)
├── backend/            # FastAPI Server & LangChain Orchestration
├── docker-compose.yml  # Containerized Database Configuration
└── README.md           # Project Documentation


🏗️ System Architecture
The platform utilizes a Microservices-style architecture. The React frontend communicates with a Python-based AI service. The AI service performs Intent Parsing on user queries, checks the PostgreSQL schema via LangChain, and executes dynamically generated SQL queries while maintaining a secure execution boundary.

📈 Future Roadmap
[ ] Integration with a live .NET 8 Authentication Microservice.

[ ] Real-time price tracking using WebSockets.

[ ] Deployment of Vector Database (Pinecone) for advanced semantic search.
