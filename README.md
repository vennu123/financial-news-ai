# Financial News AI Agent

An AI-powered financial intelligence platform that analyzes company news, stock sentiment, and generates investment insights using Agentic AI workflows.

## Features

* AI-powered financial news analysis
* Company sentiment detection
* Confidence scoring
* Stock trend visualization
* Company comparison engine
* Historical report tracking
* Real-time API integration
* Cloud-native deployment

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Recharts

### Backend

* FastAPI
* Python
* Google Gemini
* Firebase Firestore
* Google Cloud Run

### AI Architecture

* Agentic Workflow (ADK)
* News Analyzer Agent
* Summarizer Agent
* Insight Generation Agent
* Comparison Agent

## Architecture

![Architecture](docs/architecture.png)

## Local Setup

### Clone repository

```bash
git clone https://github.com/your-username/financial-news-agent.git
cd financial-news-agent
```

### Backend setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create `.env`

```env
GEMINI_API_KEY=your_key
GCP_PROJECT_ID=your_project_id
```

Run backend

```bash
uvicorn app:app --reload
```

### Frontend setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run frontend

```bash
npm run dev
```

## API Endpoints

### Run Analysis

```http
GET /run/{company}
```

### Compare Companies

```http
GET /compare/{company1}/{company2}
```

### History

```http
GET /history
```

## Deployment

Frontend:

* Vercel

Backend:

* Google Cloud Run

Database:

* Firebase Firestore

## Author

Built by Vennu Kshithija
