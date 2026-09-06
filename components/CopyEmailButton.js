"use client";

import { useState } from "react";

export function CopyEmailButton({ email }) {
  const [status, setStatus] = useState("Copy email");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Email copied");
      window.setTimeout(() => setStatus("Copy email"), 2400);
    } catch {
      setStatus(email);
    }
  }

  return (
    <button
      className="contact-copy-button"
      type="button"
      onClick={copyEmail}
      aria-live="polite"
    >
      {status}
    </button>
  );
}
