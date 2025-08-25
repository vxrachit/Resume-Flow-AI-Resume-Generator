# 📄 ResumeFlow  
**AI-Powered Resume & Cover Letter Generator**  

ResumeFlow helps job seekers generate **tailored resumes and cover letters instantly** with the power of AI.  
Simply upload your resume, paste the job description, and download a **professionally formatted PDF**—ready to send.  

---

## ✨ Features
- 🎯 **AI-Powered Resume Tailoring** – Match your resume to job descriptions.  
- 📝 **Cover Letter Generation** – Personalized, ATS-friendly cover letters.  
- 📑 **Professional PDF Export** – Clean, modern layouts using `reportlab`.  
- ☁️ **Supabase Integration** – Store generated documents securely in Supabase.  
- 🎨 **Modern Frontend** – React + Tailwind + Framer Motion for a sleek UI.  
- 📱 **Responsive Design** – Works seamlessly across devices.  
- 🚀 **Free Deployment Ready** – Host easily on Render, Fly.io, Cloudflare or Vercel.  

---

## 📂 Project Structure
```
Resume-Flow-AI-Resume-Generator-main/
│
├── CODE_OF_CONDUCT.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── NOTICE.md
├── SECURITY.md
├── backend
│   ├── .gitignore
│   ├── app
│   │   ├── config.py
│   │   ├── exporters
│   │   │   └── pdf_exporter.py
│   │   ├── llm.py
│   │   ├── main.py
│   │   ├── schemas.py
│   │   ├── services
│   │   │   └── generator.py
│   │   └── utils.py
│   ├── .env
│   ├── requirements.txt
│   └── run.sh
└── frontend
    ├── .gitignore
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── .env
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   ├── placeholder.svg
    │   └── robots.txt
    ├── src
    │   ├── App.tsx
    │   ├── assets
    │   │   └── hero-image.jpg
    │   ├── components
    │   │   ├── GenerateButton.tsx
    │   │   ├── JobDescriptionInput.tsx
    │   │   ├── PdfUpload.tsx
    │   │   ├── ResultsPreview.tsx
    │   │   ├── ResumeGenerator.tsx
    │   │   ├── UserInfoInput.tsx
    │   │   └── ui
    │   │               
    │   ├── hooks
    │   │   ├── use-mobile.tsx
    │   │   └── use-toast.ts
    │   ├── index.css
    │   ├── lib
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── Index.tsx
    │   │   └── NotFound.tsx
    │   ├── pdfjs-worker.d.ts
    │   ├── useWarmupBackend.ts
    │   └── vite-env.d.ts
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

```

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Create & activate virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

### 2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Configure environment variables (`.env`)
Before running, you must:  
- Create a **Supabase project**.  
- Inside Supabase Storage, create a **bucket named `resumes`**.  

Then configure your `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
MODEL_NAME=gemini-2.0-flash
DEBUG=false

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key
SUPABASE_BUCKET=resumes
```

### 4️⃣ Start backend
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🎨 Frontend Setup (React + Vite)

### 1️⃣ Install dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Configure environment variables (`.env`)
```
VITE_BACKEND_URL=http://localhost:8000
```

### 3️⃣ Start frontend
```bash
npm run dev
```

📍 App available at: `http://localhost:5173`  

---

## ☁️ Deployment Options
Recommended free hosting platforms:
- **Render** – backend hosting  
- **Cloudfalre / Vercel / Netlify** – Frontend hosting  
- **Supabase** – File storage (make sure the `resumes` bucket exists)  

---

## 📧 Contact
Built with ❤️ by **vxRachit**  

- 📩 Email: `mail@vxrachit.is-a.dev`  
- 💻 GitHub: [vxrachit](https://github.com/vxrachit)  
- 🔗 LinkedIn: [vxrachit](https://linkedin.com/in/vxrachit)  

---

## ⭐ Contributing
Contributions, issues, and feature requests are welcome!  

If you like this project:  
- ⭐ **Star the repo** to support it.  
- 🍴 **Fork it** to build your own version.  
- 🛠️ **Contribute** by submitting PRs.  

📄 Please read the [Contributing Guidelines](./CONTRIBUTING.md) before making a contribution.
  

---

### 📌 License
This project is licensed under the [Resume Flow Custom License](./LICENSE).
 
