"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StreamPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    const eventSource = new EventSource("/api/event-stream");

    eventSource.onmessage = (event) => {
      if (event.data.trim() === "") return; // skip empty lines
      setContent((prev) => prev + event.data + "\n");
    };

    eventSource.onerror = (err) => {
      console.warn("SSE Error (attempting reconnect):", err);
      setLoading(false);
      eventSource.close();
    };

    eventSource.onopen = () => {
      console.log("Connected to SSE");
    };

    // Assume stream is done after a certain time (or set signal from backend)
    // const timer = setTimeout(() => setLoading(false), 5000);

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const el = document.getElementById("scroll-container");
    if (!el) return;
    console.log(el, "element");

    const handleScroll = () => {
      const isAtBottom =
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 10;
      console.log(isAtBottom, "isAtBottom");
      setIsAutoScroll(isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("scroll-container");
    if (!el || !isAutoScroll) return;

    el.scrollTop = el.scrollHeight;
  }, [content, isAutoScroll]);

  return (
    <div
      className="max-w-3xl mx-auto p-4 overflow-y-auto"
      id="scroll-container"
    >
      <h1 className="text-center font-bold">Markdown Streaming Viewer</h1>
      {loading && (
        <p className="text-2xl text-green-600 mb-4">Streaming markdown...</p>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 border border-zinc-200 dark:border-zinc-800 text-white">
        <div className="mt-5">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
      {!loading && <p className="mt-4 text-green-600">✅ Stream complete.</p>}
    </div>
  );
}
