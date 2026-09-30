# SkillPulse 🚀

## AI-Powered Career Readiness & Employability Platform

SkillPulse is an AI-powered career readiness platform designed to help students and graduates identify skill gaps, build projects, discover internships, improve resumes, and prepare for employment opportunities.

## 🌟 Features

- 👤 Student profile and career preferences
- 🤖 AI-powered career readiness
- 📄 AI resume improvement
- 📊 ATS score prediction
- 🧠 Skill-gap analysis
- 📚 Learning recommendations
- 💼 Internship discovery
- 🗺️ Career roadmap
- 🚀 Project collaboration
- 👥 Student community
- 🔐 User registration and login

## 🏗️ Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Engine

- Python
- FastAPI
- Pydantic
- Gemini API
- BeautifulSoup
- Requests
- REST API
- CORS
- JSON
- Regular Expressions (Regex)
- Web Scraping
- AI Resume Analysis
- ATS Score Prediction
- Skill Gap Analysis
- AI Learning Recommendations


### Tools
- Git
- GitHub
- VS Code

## 📁 Project Structure

```text
MP HACKATHON/
├── README.md
├── .gitignore
├── index.html
├── about.html
├── dashboard.html
├── profile.html
├── internships.html
├── projects.html
├── resume.html
├── roadmap.html
├── community.html
├── CSS/
├── js/
├── img/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── data/
│   └── package.json
└── internship-engine/
    ├── AI_Portion.py
    ├── web_scraping.py
    ├── requirements.txt
    └── extracted_jobs.json
```

## 🤖 AI Features

### Resume Improvement
Improves resume bullet points into stronger professional STAR-format statements.

### ATS Score Prediction
Analyzes resume bullet points and provides a predicted ATS score.

### Skill Gap Analysis
Compares a student's existing skills with skills required for relevant job roles.

### Learning Recommendations
Provides learning resources for missing skills using Gemini when configured, with a safe offline fallback.

### Professional Summary
Generates an ATS-friendly professional summary based on the user's target role, education, and skills.

## 🔄 System Architecture

```text
                    SkillPulse
                        │
                        ▼
                 Frontend Website
                HTML / CSS / JS
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
       Node.js Backend        FastAPI AI Engine
          Express.js              Python
             │                     │
             ▼                     ▼
          MongoDB               Gemini API
```

## ⚙️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/skillpulse.git
cd skillpulse
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the Node.js backend

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

### 5. Start the AI engine

Open another terminal:

```bash
cd internship-engine
python -m pip install -r requirements.txt
```

Create `internship-engine/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the AI engine:

```bash
python AI_Portion.py
```

AI API:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

## 🔐 Security

Real `.env` files containing MongoDB credentials or Gemini API keys must never be committed to GitHub.

The project uses `.gitignore` to keep these files private.

Use placeholder `.env.example` files when documenting required environment variables.

## 🚀 Future Improvements

- Personalized AI career roadmaps
- More internship and job sources
- Real-time job recommendations
- Advanced resume analysis
- AI interview preparation
- Skill assessment tests
- Personalized learning paths
- Production deployment
- Secure authentication and authorization

## 👨‍💻 Project

**SkillPulse**  
AI-Powered Career Readiness & Employability Platform

Built for hackathon and educational purposes.

## 📄 License

This project is currently intended for educational and hackathon purposes.
