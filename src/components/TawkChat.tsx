"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────
// Tawk.to live chat — FREE at https://tawk.to
//
// Steps to activate:
//  1. Sign up free at https://tawk.to
//  2. Create a Property → copy the embed snippet
//  3. Replace TAWK_PROPERTY_ID and TAWK_WIDGET_ID below
//     with your actual values from the snippet URL:
//     https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}
// ─────────────────────────────────────────────
const TAWK_PROPERTY_ID = "69de40ac5b7c241c31f4a987";
const TAWK_WIDGET_ID   = "1jm62p97j";

export default function TawkChat() {
  useEffect(() => {
    if (TAWK_PROPERTY_ID === "YOUR_PROPERTY_ID") return; // not configured yet

    // Avoid duplicate load on hot-reload
    if (document.getElementById("tawk-script")) return;

    (window as Window & { Tawk_API?: object; Tawk_LoadStart?: Date }).Tawk_API = {};
    (window as Window & { Tawk_API?: object; Tawk_LoadStart?: Date }).Tawk_LoadStart = new Date();

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);

    return () => {
      // Don't remove on unmount — keep chat alive across navigations
    };
  }, []);

  return null;
}
