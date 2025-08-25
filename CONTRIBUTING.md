# Contributing to Resume Flow

Thank you for considering contributing to **Resume Flow**! We welcome contributions that improve the project, fix bugs, or add new features.

---

## 🚀 How to Contribute

### 1) Fork the repository
Use the **Fork** button on GitHub to create your copy of the repo.

### 2) Clone your fork
```bash
git clone https://github.com/<your-username>/Resume-Flow-AI-Resume-Generator.git
cd resume-flow
```

### 3) Create a new branch
Use a descriptive branch name:
```bash
git checkout -b feature/my-feature
```
Examples: `fix/cors-issue`, `feature/add-pdf-export`

### 4) (Optional) Create and activate a virtual environment
```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 5) Install dependencies
```bash
pip install -r requirements.txt
```

### 6) Configure environment variables (if applicable)
Create a `.env` file based on `.env.example` (if present) and set required keys.

### 7) Run the project locally
```bash
uvicorn app.main:app --reload
```
> Adjust the module path if your entrypoint differs (e.g., `backend.app:app`).


### 8) Commit and push
```bash
git add .
git commit -m "feat: add <short description>"
git push origin feature/my-feature
```

### 9) Open a Pull Request (PR)
- Open a PR from your branch to `main` on the upstream repository.
- Clearly describe your changes and any related issue numbers.
- Ensure your PR is focused on a single topic.

---

## 📋 Guidelines
- Follow Python style conventions (PEP 8).
- Write clear commit messages using conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, etc.).
- Be respectful and collaborative (see our [Code of Conduct](./CODE_OF_CONDUCT.md)).

---

## 🙌 Support
If you have questions, open an [issue](../../issues) or contact: **mail@vxrachit.is-a.dev**

Thank you for contributing! 💙
