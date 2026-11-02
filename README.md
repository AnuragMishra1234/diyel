# DEEP LEARNING LAB

A modern, lightweight, responsive web application for computer science and engineering students to quickly access, read, understand, and copy 8 essential Python Deep Learning lab programs.

---

## 🎯 Purpose

During deep learning laboratory sessions, practical exams, and assignments, students often waste time navigating fragmented repositories, broken text files, or inconsistent code snippets. 

**DEEP LEARNING LAB** solves this by providing a unified, clean, syntax-highlighted code catalog containing all 8 foundational Python deep learning programs with 1-click clipboard copying and mobile responsiveness.

---

## 📚 Included Lab Programs

1. **PROGRAM 01** — Word Embeddings Using Word2Vec
2. **PROGRAM 02** — Deep Neural Network Classification (Iris Dataset)
3. **PROGRAM 03** — Convolutional Neural Network (MNIST CNN)
4. **PROGRAM 04** — Image Compression Using Autoencoder
5. **PROGRAM 05** — Text Document Classification (IMDB Sentiment)
6. **PROGRAM 06** — Time Series Forecasting Using LSTM
7. **PROGRAM 07** — Image Classification Using MobileNetV2 (Transfer Learning)
8. **PROGRAM 08** — Sentiment Analysis Using TF-IDF & Logistic Regression

---

## ✨ Features

- **8 Complete Python Programs**: 100% complete source codes with exact Python indentation and syntax preserved.
- **Developer-Oriented Code Viewer**:
  - Python syntax highlighting via Prism.js.
  - Non-selectable line numbers (safe cursor text selection).
  - Horizontal scrolling for long code lines without page overflow.
- **1-Click Full Code Copy**:
  - Prominent "COPY FULL CODE" button copying raw Python code.
  - Visual feedback ("COPIED!") with automatic reset.
  - Safe fallback for all browser contexts.
- **Search & Filtering**: Instant search across program numbers, titles, and concept tags with an empty search fallback.
- **Seamless Navigation**:
  - Next / Previous buttons bounded between 01 and 08.
  - Keyboard shortcuts (`←`, `→` to navigate, `Esc` to return home).
  - Direct URL hash linking (`#01`, `#02`, etc.) with browser history support.
- **Dark Theme Default**: Minimalist charcoal aesthetic with subtle violet/blue accents and light/dark theme toggle.
- **Zero Backend**: 100% static frontend — no database, no authentication, no external API dependencies.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Prism.js** (Python syntax highlighting)
- **Lucide React** (icons)

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# 1. Clone repository or navigate to project directory
cd deep-learning-lab

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The production output will be generated in the `dist/` directory.

---

## 🌐 Deployment

For step-by-step instructions on deploying directly to Vercel for free, please refer to [deployment.md](deployment.md).

---

## 📄 License

MIT License — Feel free to use and adapt for academic and personal projects.
