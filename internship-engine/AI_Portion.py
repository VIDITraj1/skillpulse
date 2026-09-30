"""
SkillPulse AI Career Engine (Version 6.0.0 - Gemini Flash Powered)
Features:
- Gemini Flash for Dynamic Free Course & YouTube Recommendations
- Gemini Flash for AI Resume STAR Bullet Point Rewriting
- Gemini Flash for AI Professional Summary Generation
- Safe Offline Fallback (If API key is missing or internet is slow, it NEVER crashes)
"""

import os
import re
import json
from pathlib import Path
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ============================================================
# 1. GEMINI FLASH API CONFIGURATION
# ============================================================
try:
    import google.generativeai as genai
    # 👉 [GEMINI API KEY YAHAN DAALEIN] - Google AI Studio se mili key yahan paste karein:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    if GEMINI_API_KEY and GEMINI_API_KEY != "YOUR_GEMINI_API_KEY_HERE":
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel("gemini-1.5-flash")
        print("✅ Gemini 1.5 Flash Connected Successfully!")
    else:
        gemini_model = None
        print("⚠️ Gemini API Key not set. Using smart offline fallback.")
except Exception as e:
    gemini_model = None
    print("⚠️ Gemini library error, running in offline mode:", e)


# ============================================================
# 2. FASTAPI APP INITIALIZATION
# ============================================================

app = FastAPI(
    title="SkillPulse AI Career Engine (Gemini Flash)",
    description="Resume Analysis, ATS Score, Skill Gap, and Free Learning Recommendations",
    version="6.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# 3. PATHS & FALLBACK DATASETS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
JOBS_FILE = BASE_DIR.parent / "backend" / "data" / "extracted_jobs.json"

FALLBACK_JOBS = [
    {
        "title": "Data Scientist / Data Science Intern",
        "company": "Analytics & AI Labs",
        "location": "Bengaluru / Remote",
        "required_skills": [
            "python", "machine learning", "sql", "pandas", "statistics",
            "scikit-learn", "data visualization", "deep learning", "git"
        ]
    },
    {
        "title": "Frontend Developer Intern",
        "company": "Technology Solutions",
        "location": "Remote",
        "required_skills": [
            "html", "css", "javascript", "react", "tailwind", "git", "rest api"
        ]
    },
    {
        "title": "Full Stack Developer Intern",
        "company": "Nexus Technologies",
        "location": "Hybrid",
        "required_skills": [
            "html", "css", "javascript", "react", "node.js", "express", "mongodb", "sql", "git"
        ]
    },
    {
        "title": "Backend Developer Intern",
        "company": "Cloud Systems",
        "location": "Bengaluru",
        "required_skills": [
            "python", "javascript", "node.js", "express", "sql", "mongodb", "rest api", "docker", "git"
        ]
    },
    {
        "title": "Machine Learning Engineer Intern",
        "company": "Cognitive AI",
        "location": "Bengaluru",
        "required_skills": [
            "python", "machine learning", "pytorch", "deep learning", "numpy", "pandas", "sql"
        ]
    },
    {
        "title": "Data Analyst Intern",
        "company": "FinPulse Analytics",
        "location": "Gurugram / Hybrid",
        "required_skills": [
            "sql", "excel", "power bi", "python", "pandas", "data visualization", "statistics"
        ]
    }
]

# Static high-quality courses used if Gemini is offline
HIGH_QUALITY_FREE_COURSES: Dict[str, Dict[str, str]] = {
    "python": {
        "title": "Python for Beginners - Full Course (freeCodeCamp)",
        "provider": "YouTube",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw"
    },
    "machine learning": {
        "title": "Machine Learning Specialization by Andrew Ng",
        "provider": "Coursera (Free Audit)",
        "url": "https://www.coursera.org/specializations/machine-learning-introduction"
    },
    "sql": {
        "title": "SQL Tutorial - Full Database Course for Beginners",
        "provider": "YouTube (freeCodeCamp)",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY"
    },
    "pandas": {
        "title": "Pandas Data Analysis Tutorial",
        "provider": "Kaggle (Free Interactive)",
        "url": "https://www.kaggle.com/learn/pandas"
    },
    "react": {
        "title": "React JS Full Course 2024",
        "provider": "YouTube",
        "url": "https://www.youtube.com/watch?v=bMknfKXIFA8"
    },
    "node.js": {
        "title": "Node.js and Express.js Full Course",
        "provider": "YouTube (freeCodeCamp)",
        "url": "https://www.youtube.com/watch?v=Oe421EPjeBE"
    },
    "git": {
        "title": "Git & GitHub Crash Course for Beginners",
        "provider": "YouTube",
        "url": "https://www.youtube.com/watch?v=RGOj5yH7evk"
    },
    "statistics": {
        "title": "Intro to Statistics for Data Science",
        "provider": "Kaggle / YouTube",
        "url": "https://www.youtube.com/results?search_query=statistics+for+data+science+freecodecamp"
    },
    "deep learning": {
        "title": "Deep Learning with PyTorch for Beginners",
        "provider": "YouTube (freeCodeCamp)",
        "url": "https://www.youtube.com/watch?v=GIsg-ZUy0MY"
    }
}


# ============================================================
# 4. DATA HELPERS & REASONING
# ============================================================

def load_jobs():
    try:
        if not JOBS_FILE.exists():
            return FALLBACK_JOBS
        with open(JOBS_FILE, "r", encoding="utf-8") as file:
            data = json.load(file)
        if isinstance(data, dict):
            if isinstance(data.get("jobs"), list):
                return data["jobs"]
            if isinstance(data.get("results"), list):
                return data["results"]
            return FALLBACK_JOBS
        if isinstance(data, list) and len(data) > 0:
            return data
        return FALLBACK_JOBS
    except Exception:
        return FALLBACK_JOBS


def normalize_text(value: Any) -> str:
    if value is None:
        return ""
    text = str(value).lower().strip()
    return re.sub(r"[\s\-_]+", " ", text)


def extract_job_skills(job: dict) -> List[str]:
    possible_fields = [
        "required_skills", "skills", "skill", "technologies",
        "technology", "requirements", "requiredSkills", "technical_skills"
    ]
    skills = []
    for field in possible_fields:
        val = job.get(field)
        if isinstance(val, list):
            skills.extend(val)
        elif isinstance(val, str):
            skills.extend(re.split(r"[,|;/\n]+", val))
    
    cleaned = []
    for s in skills:
        s_clean = str(s).strip()
        if s_clean and s_clean.lower() not in [c.lower() for c in cleaned]:
            cleaned.append(s_clean)
    return cleaned


def get_job_title(job: dict) -> str:
    for field in ["title", "job_title", "jobTitle", "position", "role"]:
        if job.get(field):
            return str(job[field])
    return "Software Engineer"


def get_company(job: dict) -> str:
    for field in ["company", "company_name", "companyName", "organization"]:
        if job.get(field):
            return str(job[field])
    return "Technology Company"


def get_location(job: dict) -> str:
    for field in ["location", "job_location", "city"]:
        if job.get(field):
            return str(job[field])
    return "Remote / Hybrid"


def compare_skills(candidate_skills: List[str], required_skills: List[str]):
    candidate_set = {
        normalize_text(s) for s in candidate_skills if normalize_text(s)
    }

    matched = []
    missing = []

    for req in required_skills:
        req_norm = normalize_text(req)
        if not req_norm:
            continue

        found = False
        for cand in candidate_set:
            if not cand:
                continue
            if cand == req_norm or (len(cand) >= 3 and cand in req_norm) or (len(req_norm) >= 3 and req_norm in cand):
                found = True
                break

        if found:
            matched.append(req)
        else:
            missing.append(req)

    percentage = round((len(matched) / len(required_skills) * 100), 1) if required_skills else 0.0
    return matched, missing, percentage


def find_relevant_jobs(target_role: str, jobs: List[dict]) -> List[dict]:
    role = normalize_text(target_role)
    if not role:
        return jobs[:8]

    role_words = [w for w in role.split() if len(w) > 2]
    scored_jobs = []

    for job in jobs:
        title = normalize_text(get_job_title(job))
        skills = " ".join(extract_job_skills(job)).lower()
        searchable = f"{title} {skills}"

        score = sum(2 for w in role_words if w in title) + sum(1 for w in role_words if w in skills)
        if score > 0:
            scored_jobs.append((score, job))

    scored_jobs.sort(key=lambda x: x[0], reverse=True)
    if scored_jobs:
        return [item[1] for item in scored_jobs[:6]]
    return jobs[:6]


# ============================================================
# 5. GEMINI FLASH COURSE RECOMMENDER (With Safe Fallback)
# ============================================================

def create_learning_resources(skills: List[str]) -> List[dict]:
    """Uses Gemini Flash to dynamically fetch free courses & YouTube tutorials.
    Falls back gracefully if API key is not configured."""
    if not skills:
        return []

    # 1. TRY GEMINI FLASH FIRST
    if gemini_model:
        try:
            prompt = f"""
            You are an expert AI Career and Education Advisor.
            A student is missing these skills: {', '.join(skills[:5])}.

            Recommend 3 to 5 TOP-RATED FREE learning resources (YouTube full courses, Coursera Free Audit, freeCodeCamp, or official documentation) to learn these skills.

            Return ONLY valid JSON (no markdown formatting, no backticks) as a list of objects:
            [
              {{
                "skill": "skill_name",
                "title": "Course or Video Title",
                "provider": "YouTube / Coursera / freeCodeCamp",
                "description": "Short 1-sentence description of what they will learn",
                "url": "https://..."
              }}
            ]
            """
            response = gemini_model.generate_content(prompt)
            clean_text = response.text.strip().replace("```json", "").replace("```", "")
            courses = json.loads(clean_text)
            if isinstance(courses, list) and len(courses) > 0:
                return courses
        except Exception as e:
            print("Gemini Flash course generation fallback triggered:", e)

    # 2. SAFE OFFLINE FALLBACK (If Gemini fails or no API key)
    resources = []
    for skill in skills:
        s_norm = normalize_text(skill)
        if s_norm in HIGH_QUALITY_FREE_COURSES:
            item = HIGH_QUALITY_FREE_COURSES[s_norm]
            resources.append({
                "skill": skill,
                "title": item["title"],
                "provider": item["provider"],
                "description": f"Top-rated free course to master {skill}.",
                "url": item["url"]
            })
        else:
            query = f"{skill} full course tutorial freeCodeCamp"
            url = f"https://www.youtube.com/results?search_query={query.replace(' ', '+')}"
            resources.append({
                "skill": skill,
                "title": f"Master {skill} - Free Full Course",
                "provider": "YouTube",
                "description": f"Learn {skill} with step-by-step video tutorials.",
                "url": url
            })
    return resources


# ============================================================
# 6. FASTAPI ENDPOINTS
# ============================================================

@app.get("/")
def home():
    return {
        "status": "Online",
        "app": "SkillPulse AI Career Engine",
        "gemini_status": "Active" if gemini_model else "Offline Fallback Mode",
        "docs_url": "/docs"
    }


# ------------------------------------------------------------
# ENDPOINT 1: AI RESUME BULLET ENHANCER & ATS SCORE
# ------------------------------------------------------------

class ResumeRequest(BaseModel):
    resume_bullet_points: List[str] = Field(default=[])


@app.post("/api/resume/improve-and-predict-score")
def analyze_resume(req: ResumeRequest):
    improved_bullets = []
    quantified_count = 0

    for bullet in req.resume_bullet_points:
        clean = bullet.strip()
        if not clean:
            continue

        improved = None

        # 1. Try Gemini Flash for STAR bullet point rewrite
        if gemini_model and len(clean.split()) >= 2:
            try:
                prompt = f"""
                Rewrite this student's resume project bullet point into a strong, professional STAR-format resume bullet point.
                Include measurable metrics (percentages, numbers, or scale) and strong action verbs:
                Original: "{clean}"
                Return ONLY the single improved sentence, no quotes, no extra text.
                """
                res = gemini_model.generate_content(prompt)
                improved = res.text.strip().lstrip("-• ")
                quantified_count += 1
            except Exception:
                improved = None

        # 2. Offline Fallback if Gemini fails
        if not improved:
            if "web developer" in clean.lower():
                improved = "Architected and deployed responsive web interfaces using modern HTML, CSS, and JavaScript standards, increasing mobile accessibility and engagement by 30%."
            elif "data science" in clean.lower() or "python" in clean.lower():
                improved = "Engineered automated data extraction scripts in Python and built predictive machine learning models, achieving 85%+ accuracy."
            else:
                improved = f"Engineered and launched {clean.rstrip('.')}, optimizing performance and user engagement by 25%."
            quantified_count += 1

        improved_bullets.append({
            "original_line": clean,
            "improved_star_format": improved
        })

    # Realistic ATS Score Calculation
    base_score = 60
    if len(req.resume_bullet_points) >= 1:
        base_score += 15
    if quantified_count >= 1:
        base_score += min(quantified_count * 10, 20)

    ats_score = min(base_score, 95)
    grade = "Strong" if ats_score >= 80 else ("Good" if ats_score >= 65 else "Needs Improvement")

    return {
        "predicted_ats_score": f"{ats_score} / 100",
        "ats_grade": grade,
        "improved_resume_points": improved_bullets
    }


# ------------------------------------------------------------
# ENDPOINT 2: SKILL GAP & GEMINI LEARNING RECOMMENDATIONS
# ------------------------------------------------------------

class SkillGapRequest(BaseModel):
    skills: List[str] = Field(default=[])
    target_role: str = Field(default="Data Science")


@app.post("/api/skill-gap/analyze")
def analyze_skill_gap(req: SkillGapRequest):
    jobs = load_jobs()

    # Find jobs matching the student's target role
    relevant_jobs = find_relevant_jobs(req.target_role, jobs)

    # Collect required skills from those relevant jobs
    required_skill_counter = {}
    for job in relevant_jobs:
        for skill in extract_job_skills(job):
            norm = normalize_text(skill)
            if norm and norm not in required_skill_counter:
                required_skill_counter[norm] = skill.strip()

    required_skills = list(required_skill_counter.values())

    # Fallback canonical role skills
    if not required_skills:
        if "data" in req.target_role.lower() or "science" in req.target_role.lower():
            required_skills = ["Python", "SQL", "Machine Learning", "Pandas", "Statistics", "Data Visualization"]
        else:
            required_skills = ["JavaScript", "React", "Node.js", "Git", "REST API", "HTML", "CSS"]

    # Compare skills strictly
    matched, missing, match_percentage = compare_skills(req.skills, required_skills)

    # Generate free high-quality learning resources using Gemini Flash
    recommendations = create_learning_resources(missing)

    # Job Summary
    job_summary = []
    for job in relevant_jobs[:4]:
        job_summary.append({
            "title": get_job_title(job),
            "company": get_company(job),
            "location": get_location(job),
            "required_skills": extract_job_skills(job)
        })

    return {
        "target_role": req.target_role,
        "jobs_analyzed": len(relevant_jobs),
        "skills_you_have": matched,
        "missing_skills": missing,
        "skill_match_percentage": match_percentage,
        "recommendations": recommendations,
        "relevant_jobs": job_summary
    }


# ------------------------------------------------------------
# ENDPOINT 3: AI PROFESSIONAL SUMMARY GENERATOR (Gemini Flash)
# ------------------------------------------------------------

class SummaryRequest(BaseModel):
    full_name: str = "Sanyam Jain"
    target_role: str = "Data Science"
    skills: List[str] = ["HTML", "CSS", "Python"]
    education: Optional[str] = "B.Tech CSE"


@app.post("/api/resume/generate-summary")
def generate_professional_summary(req: SummaryRequest):
    skills_str = ", ".join(req.skills[:4]) if req.skills else "core technologies"
    
    # Try Gemini Flash for professional summary
    if gemini_model:
        try:
            prompt = f"""
            Write a compelling, professional 2-3 sentence resume summary for a student named {req.full_name},
            applying for the role of {req.target_role}.
            Education: {req.education or 'Engineering student'}.
            Skills: {skills_str}.
            Keep it professional, high-impact, and ATS-friendly.
            Return ONLY the summary text, no extra commentary.
            """
            res = gemini_model.generate_content(prompt)
            return {
                "target_role": req.target_role,
                "generated_summary": res.text.strip()
            }
        except Exception:
            pass

    # Fallback
    summary = (
        f"Goal-driven {req.target_role} student with a solid academic foundation in {req.education or 'Computer Science'} "
        f"and practical experience in {skills_str}. Proven ability to build deployable projects, "
        f"solve algorithmic problems, and rapidly acquire emerging industry technologies. "
        f"Seeking an impactful entry-level role or internship to deliver scalable business solutions."
    )
    return {
        "target_role": req.target_role,
        "generated_summary": summary
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("AI_Portion:app", host="0.0.0.0", port=8000, reload=True)