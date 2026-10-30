"use client";

import { useEffect, useState } from "react";
import logoMark from "../assets/images/logo-dg-erp-mark-only.0e1f217bc91f66520a3db5a640b33c5c.svg";
import AppShell from "./components/AppShell";

const appScripts = [
  "/assets/js/data/reference-data.js",
  "/assets/js/data/seed-data.js",
  "/assets/js/leader.js",
  "/assets/js/app.js",
];

function loadAppScripts() {
  if (!window.itSupportDemoScriptsPromise) {
    window.itSupportDemoScriptsPromise = appScripts.reduce(
      (promise, src) =>
        promise.then(
          () =>
            new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.src = src;
              script.onload = resolve;
              script.onerror = () =>
                reject(new Error(`Failed to load application script: ${src}`));
              document.body.appendChild(script);
            }),
        ),
      Promise.resolve(),
    );
  }

  return window.itSupportDemoScriptsPromise;
}

export default function HomePage() {
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    loadAppScripts().catch((error) => {
      console.error(error);
      if (active) {
        setLoadError(
          "The demo could not start. Check that the JavaScript assets are available and reload.",
        );
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <AppShell
        logoSrc={logoMark.src || logoMark}
        onHomeClick={() => window.setPage("dashboard")}
        onNotifications={() => window.showNotifications()}
      >
        <main className="content" id="view" />
      </AppShell>
      {loadError && <p className="notice">{loadError}</p>}
    </>
  );
}
