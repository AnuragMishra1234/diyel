# Deploying Deep Learning Lab to Vercel

Follow these simple steps to deploy this application to Vercel for free.

## 1. Test Locally

First, make sure the project runs smoothly on your computer:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser to verify the app.

---

## 2. Push to GitHub

1. Initialize git and commit your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Deep Learning Lab"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Deploy on Vercel

1. Open [https://vercel.com/](https://vercel.com/).
2. Sign in using your **GitHub** account.
3. On the Vercel Dashboard, click **Add New...** → **Project**.
4. Find and **Import** your `deep-learning-lab` GitHub repository.
5. In the project configuration screen, verify the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**.

---

## 4. Successful Deployment

- Vercel will build and deploy your application in under a minute.
- Once finished, Vercel provides a live public URL (e.g., `https://deep-learning-lab-xyz.vercel.app`).
- Every subsequent push to your `main` branch will automatically trigger a new deployment.

> **Note**:
> - No backend deployment is required.
> - No environment variables are required.
> - No database setup is needed.
