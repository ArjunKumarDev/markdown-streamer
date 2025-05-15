# 📘 Markdown Streaming Viewer

This is a **Next.js 15 App Router** project that streams a Markdown file line-by-line from the server to the client using **Server-Sent Events (SSE)**.

## 🚀 Features

- ✅ **Live Markdown Streaming** via SSE
- ✅ **React Markdown Rendering** with tables and GitHub-flavored Markdown support
- ✅ **Tailwind CSS Styling**
- ✅ **Empty Line Skipping**

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

git clone https://github.com/ArjunKumarDev/markdown-streamer
cd markdown-streamer

### 2. Install dependencies

npm install

# or

yarn install

### 3. Run the development server

npm run dev

# or

yarn dev

### 4. Navigate to the stream page

Open http://localhost:3000/stream in your browser.

### FIle Structure

/app
├── /api/event-stream/route.ts # SSE API route
├── /stream/page.tsx # Main streaming UI
├── layout.tsx # Root layout
└── globals.css # Tailwind and global styles

/public
└── sample.md # Sample Markdown file to stream

/tailwind.config.ts
/postcss.config.js
/README.md

### 📄 Notes

If you want to update the streamed content, replace the file at /public/sample.md.

The stream simulates real-time delivery using setTimeout (100ms per line).

You can style markdown content using prose classes from Tailwind Typography.
