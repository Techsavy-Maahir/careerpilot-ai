<div align="center">

# 🤖 Interview AI

### AI-powered interview preparation, coaching, and resume generation

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
</p>

<p>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/SCSS-Styling-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Puppeteer-PDF-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white" alt="Puppeteer" />
</p>

<p>
  <a href="https://github.com/Techsavy-Maahir/careerpilot-ai">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github" alt="GitHub Repository" />
  </a>
</p>

</div>

---

## 🎯 Overview

**Interview AI** is a full-stack web application designed to help candidates prepare for technical, behavioral, and HR interviews.

Users can provide a **job description** along with a **resume PDF or self-description**. The application uses Google Gemini to generate personalized interview preparation content, including interview questions, skill-gap analysis, preparation roadmaps, and model answers.

The application also includes an **interactive AI interview assistant** for follow-up questions and a **resume generation workflow** that produces a downloadable PDF tailored to the interview context.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Password hashing with `bcryptjs`
* JWT-based authentication
* HTTP-only cookie-based token storage
* Protected frontend routes
* Protected backend API routes
* JWT token blacklisting during logout

### 🧠 AI Interview Preparation

* Job description analysis
* Candidate profile analysis
* Technical interview questions
* Behavioral interview questions
* HR interview questions
* Interviewer intentions for generated questions
* Model answers
* Profile-to-job match score
* Skill-gap identification
* Skill-gap severity categorization
* Day-wise preparation roadmap

### 💬 AI Interview Assistant

* Interactive chat drawer
* Interview-context-aware questions
* Follow-up questions about generated interview questions
* Conversation history within the chat session
* Markdown-based AI response rendering
* Support for:

  * Headings
  * Lists
  * Tables
  * Blockquotes
  * Inline formatting
  * Code blocks

### 📄 Resume Generation

* PDF resume upload
* Resume text extraction
* Job-specific resume generation
* HTML resume generation
* PDF generation using Puppeteer
* Downloadable generated resumes

### 📊 Interview Dashboard

* View previous interview reports
* Match score summaries
* Report timestamps
* Individual interview report pages

---

## 🛠️ Tech Stack

| Category           | Technologies                           |
| ------------------ | -------------------------------------- |
| **Frontend**       | React, React Router, Vite, SCSS, Axios |
| **Backend**        | Node.js, Express                       |
| **Database**       | MongoDB, Mongoose                      |
| **Authentication** | JWT, bcryptjs                          |
| **File Uploads**   | Multer                                 |
| **PDF Processing** | pdf-parse                              |
| **PDF Generation** | Puppeteer                              |
| **AI**             | Google GenAI SDK                       |
| **Validation**     | Zod, zod-to-json-schema                |
| **Development**    | Git, GitHub, Postman                   |

---

## 🏗️ Architecture

Interview AI follows a **decoupled frontend-backend architecture**.

```text
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │                      │
                         │  Auth │ Interview    │
                         │       │ Chat         │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │                      │
                         │      Routes          │
                         │        ↓             │
                         │    Controllers       │
                         │        ↓             │
                         │     Services         │
                         │        ↓             │
                         │     Models           │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └────────────┐
                    ▼                                 ▼
             ┌──────────────┐                 ┌──────────────┐
             │   MongoDB    │                 │ Google Gemini│
             │              │                 │              │
             │ Users        │                 │ AI Reports   │
             │ Reports      │                 │ Chat         │
             │ Blacklist    │                 └──────────────┘
             └──────────────┘

                         Backend
                            │
                            ▼
                     ┌─────────────┐
                     │  Puppeteer  │
                     │             │
                     │ HTML → PDF  │
                     └─────────────┘
```

### Backend Structure

The backend follows a layered structure:

* **Routes** — Define API endpoints.
* **Controllers** — Handle incoming HTTP requests and responses.
* **Middleware** — Handle authentication and file uploads.
* **Models** — Define MongoDB schemas using Mongoose.
* **Services** — Contain application logic for AI interaction, chat processing, and resume generation.

### Frontend Structure

The frontend is organized around application features:

```text
features/
├── auth/
├── interview/
└── chat/
```

React Context and custom hooks are used for state and feature-specific logic, while dedicated API service files handle communication with the backend.

---

## 📁 Project Structure

```text
careerpilot-ai/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── blacklist.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   └── interview.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── ai.service.js
│   │   │   └── chat.service.js
│   │   │
│   │   ├── templates/
│   │   │   └── resume.template.js
│   │   │
│   │   └── app.js
│   │
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── interview/
│   │   │
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── main.jsx
│   │   └── style.scss
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* **Node.js**
* **npm**
* **MongoDB** or MongoDB Atlas
* **Google Gemini API access**

### 1. Clone the Repository

```bash
git clone https://github.com/Techsavy-Maahir/careerpilot-ai.git
cd careerpilot-ai
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

> [!IMPORTANT]
> Never commit your `.env` file or expose API keys, database credentials, or JWT secrets.

---

## ▶️ Running the Application

The backend and frontend run separately during development.

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

Open another terminal:

```bash
cd Frontend
npm run dev
```

The exact development ports are determined by the current project configuration.

---

## 🔌 API Overview

### 🔐 Authentication

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| `POST` | `/api/auth/register` | Register a new user                     |
| `POST` | `/api/auth/login`    | Authenticate a user                     |
| `GET`  | `/api/auth/logout`   | Log out the current user                |
| `GET`  | `/api/auth/get-me`   | Retrieve authenticated user information |

### 🧠 Interview

| Method | Endpoint                                       | Description                              |
| ------ | ---------------------------------------------- | ---------------------------------------- |
| `POST` | `/api/interview/`                              | Generate an interview preparation report |
| `GET`  | `/api/interview/`                              | Retrieve the user's interview reports    |
| `GET`  | `/api/interview/report/:interviewId`           | Retrieve an individual report            |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate a PDF resume                    |

### 💬 Chat

| Method | Endpoint     | Description                                  |
| ------ | ------------ | -------------------------------------------- |
| `POST` | `/api/chat/` | Send a message to the AI interview assistant |

---

## 🔐 Authentication Flow

```text
                 User
                  │
                  ▼
          Register / Login
                  │
                  ▼
          Backend Controller
                  │
          ┌───────┴────────┐
          ▼                ▼
   bcryptjs hashing      JWT creation
                            │
                            ▼
                    HTTP-only Cookie
                            │
                            ▼
                  Protected API Request
                            │
                            ▼
                  Authentication Middleware
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
              JWT Verify       Blacklist Check
                   │                 │
                   └────────┬────────┘
                            ▼
                    Protected Resource
```

Passwords are **hashed** using `bcryptjs` before being stored. JWTs are used for authentication, while the blacklist model is used during logout to invalidate active tokens.

---

## 🤖 AI Interview Report Flow

```text
Job Description
      +
Resume PDF / Self Description
             │
             ▼
      React Frontend
             │
             ▼
      Interview API
             │
             ▼
      PDF Text Extraction
       (if applicable)
             │
             ▼
        AI Service
             │
             ▼
       Google Gemini
             │
             ▼
   Interview Preparation Report
             │
      ┌──────┼────────┐
      ▼      ▼        ▼
   Match   Skill     Study
   Score   Gaps      Roadmap
      │      │        │
      └──────┴────────┘
             │
             ▼
          MongoDB
             │
             ▼
       React Dashboard
```

---

## 💬 AI Assistant Flow

The AI assistant provides contextual follow-up support during interview preparation.

```text
User Question
      │
      ▼
Chat Drawer
      │
      ▼
Chat API
      │
      ▼
Chat Service
      │
      ├── Conversation History
      │
      └── Interview Context
              │
              ▼
         Google Gemini
              │
              ▼
          AI Response
              │
              ▼
       Markdown Renderer
```

---

## 📄 Resume Generation Flow

```text
Interview Report
      │
      ▼
Resume Generation Request
      │
      ▼
Backend
      │
      ▼
AI Service
      │
      ▼
Generated HTML Resume
      │
      ▼
Puppeteer
      │
      ▼
PDF Document
      │
      ▼
User Download
```

---

## 🧩 Key Implementation Areas

### Authentication

* JWT-based authentication
* HTTP-only cookies
* Password hashing with `bcryptjs`
* Authentication middleware
* Protected routes
* Token blacklisting

### AI Integration

* Google GenAI SDK
* Structured application-level data handling
* Zod-based validation where implemented
* Context-aware interview assistance

### PDF Processing

* `Multer` for uploaded files
* `pdf-parse` for PDF text extraction
* Puppeteer for HTML-to-PDF generation

### Frontend

* React feature-based organization
* React Context
* Custom hooks
* Dedicated API service modules
* Markdown response rendering

---

## ⚠️ Current Limitations

* Resume input currently focuses on PDF files.
* AI features require access to the configured Google Gemini API.
* PDF generation depends on Puppeteer's browser environment.
* Development configuration currently uses separate frontend and backend servers.
* The project does not currently include a dedicated automated test suite.

---

## 🔮 Possible Future Improvements

Potential areas for future development include:

* Automated testing
* Production deployment configuration
* More resume input formats
* Improved interview analytics
* Additional AI coaching workflows
* More advanced interview session tracking

---

## 📌 Project Status

> 🚧 **Active development / portfolio project**

The application is currently being developed and refined as a full-stack AI-assisted interview preparation platform.

---

## 📜 Disclaimer

AI-generated interview questions, answers, skill assessments, preparation plans, and resume content are intended to support interview preparation.

Users should review and adapt generated content before using it in an actual interview or professional application.

---

<div align="center">

### 💡 Built to make interview preparation more structured, personalized, and interactive.

**[⭐ View the Repository](https://github.com/Techsavy-Maahir/careerpilot-ai)**

</div>
