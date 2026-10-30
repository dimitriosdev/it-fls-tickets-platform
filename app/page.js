"use client";

import { useEffect, useState } from "react";
import logoMark from "../assets/images/logo-dg-erp-mark-only.0e1f217bc91f66520a3db5a640b33c5c.svg";

const appScripts = [
  "/assets/js/data/reference-data.js",
  "/assets/js/data/seed-data.js",
  "/assets/js/leader.js",
  "/assets/js/usermenu.js",
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
      <div className="topline" />
      <div className="app">
        <aside>
          <div className="brand">
            <img className="logo" src={logoMark.src || logoMark} alt="" />
            <span>IT FLS</span>
          </div>
          <div className="nav-section-label">Arbeitsbereich</div>
          <nav className="nav" id="nav" aria-label="Workspace navigation" />
          {/* <section className="aside-favorites" aria-label="Favoriten">
            <h2>Favoriten</h2>
            <button type="button" onClick={() => window.setPage("dashboard")}>
              Übersicht
            </button>
            <button
              id="favoriteIncidents"
              type="button"
              onClick={() => window.setPage("incidents")}
            >
              Alle Ereignisse
            </button>
            <button
              id="favoriteNew"
              type="button"
              onClick={() => window.setPage("new")}
            >
              Neues Ereignis
            </button>
          </section> */}
          <div className="aside-foot">
            Incident Demo · v1.0
            <br />
            Sample data only
          </div>
        </aside>
        <div className="main">
          <header className="topbar">
            <div className="topbrand" onClick={() => window.setPage("dashboard")}>
              <img className="logo" src={logoMark.src || logoMark} alt="" />
              <span>IT FLS</span>
            </div>
            <div className="search">
              <input
                id="globalSearch"
                placeholder="Suche nach Ereignissen, Arbeitsplatz, Kategorie …"
              />
            </div>
            <div className="topright">
              <button
                className="bell"
                id="notificationBell"
                onClick={() => window.showNotifications()}
                aria-label="Notifications"
                type="button"
              >
                🔔<span id="notificationCount" className="notification-count" />
              </button>
            
              <button
                className="avatar"
                id="currentAvatar"
                type="button"
                aria-haspopup="true"
                aria-label="User menu"
                onClick={() => window.userToggleMenu()}
              >
                D
              </button>
              <div className="usermenu" id="userMenu" hidden />
            </div>
          </header>
          <main className="content" id="view" />
        </div>
      </div>
      <div id="toastroot" />
      {loadError && <p className="notice">{loadError}</p>}
    </>
  );
}
