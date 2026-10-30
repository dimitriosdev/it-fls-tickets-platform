"use client";

import { useEffect, useRef, useState } from "react";

const defaultPreferences = {
  notifications: true,
  compact: false,
  hint: true,
  theme: "light",
};

function translate(context, de, en) {
  return context.lang === "en" ? en : de;
}

function applyPreferences(preferences) {
  const dark =
    preferences.theme === "dark" ||
    (preferences.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("theme-dark", dark);
  document.body.classList.toggle("compact", preferences.compact);
  document.body.classList.toggle("hide-hint", !preferences.hint);
  document.body.classList.toggle("hide-bell", !preferences.notifications);
}

export default function UserMenu() {
  const [context, setContext] = useState({
    lang: "de",
    currentRole: "supporter",
    currentUser: "",
    teamLeader: "",
  });
  const [preferences, setPreferences] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const updateContext = () => {
      if (typeof window.getItSupportDemoContext === "function") {
        setContext(window.getItSupportDemoContext());
      }
    };

    updateContext();
    window.addEventListener("it-support-demo:context-change", updateContext);
    return () =>
      window.removeEventListener("it-support-demo:context-change", updateContext);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("it-demo-prefs") || "{}");
    setPreferences({ ...defaultPreferences, ...saved });
  }, []);

  useEffect(() => {
    if (preferences) applyPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    if (!isOpen) return;

    function handleDocumentClick(event) {
      if (
        !buttonRef.current?.contains(event.target) &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const name =
    context.currentRole === "leader" ? context.teamLeader : context.currentUser;

  function setPreference(key, value) {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    localStorage.setItem("it-demo-prefs", JSON.stringify(next));
    setIsOpen(false);
  }

  function toggleLanguage(language) {
    setIsOpen(false);
    if (context.lang !== language) window.toggleLanguage();
  }

  function toggle(label, key) {
    return (
      <label className="um-row um-toggle" key={key}>
        <span>{label}</span>
        <input
          type="checkbox"
          role="switch"
          checked={preferences[key]}
          onChange={(event) => setPreference(key, event.target.checked)}
        />
        <i className="switch" />
      </label>
    );
  }

  function info(label, value) {
    return (
      <div className="um-row" key={label}>
        <span>{label}</span>
        <span className="um-value">{value}</span>
      </div>
    );
  }

  function mode(key, icon, label) {
    return (
      <button
        className={`um-row um-mode ${preferences.theme === key ? "on" : ""}`}
        key={key}
        onClick={() => setPreference("theme", key)}
        type="button"
      >
        <span>
          <i>{icon}</i>
          {label}
        </span>
        {preferences.theme === key && <b>✓</b>}
      </button>
    );
  }

  return (
    <>
      <button
        className="avatar"
        id="currentAvatar"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="userMenu"
        aria-label={translate(context, "Benutzermenü", "User menu")}
        onClick={() => setIsOpen((open) => !open)}
        ref={buttonRef}
      >
        {name.charAt(0).toUpperCase() || "D"}
      </button>
      <div className="usermenu" id="userMenu" hidden={!isOpen} ref={menuRef}>
        {preferences && (
          <>
            <div className="um-group">
              {info(translate(context, "Mein Konto", "My account"), name)}
              <label className="um-row">
                <span>{translate(context, "Rolle", "Role")}</span>
                <select
                  id="rolePicker"
                  className="um-select"
                  value={context.currentRole}
                  onChange={(event) => {
                    setIsOpen(false);
                    window.changeRole(event.target.value);
                  }}
                >
                  <option value="supporter">Supporter</option>
                  <option value="reporter">Reporter</option>
                  <option value="leader">Team leader</option>
                </select>
              </label>
              {info(translate(context, "Mandant", "Client"), "Migros Demo AG")}
              {info(translate(context, "Standort", "Location"), "Hauptlager Wohlen")}
            </div>
            <div className="um-group">
              {toggle(
                translate(context, "Benachrichtigungen anzeigen", "Show notifications"),
                "notifications",
              )}
              {toggle(translate(context, "Kompakte Ansicht", "Compact view"), "compact")}
              {toggle(
                translate(context, "Demo-Hinweis anzeigen", "Show demo notice"),
                "hint",
              )}
            </div>
            <div className="um-group">
              <div className="um-label">{translate(context, "Sprache", "Language")}</div>
              <button
                className={`um-row um-mode ${context.lang === "de" ? "on" : ""}`}
                onClick={() => toggleLanguage("de")}
                type="button"
              >
                <span>
                  <i>DE</i>Deutsch
                </span>
                {context.lang === "de" && <b>✓</b>}
              </button>
              <button
                className={`um-row um-mode ${context.lang === "en" ? "on" : ""}`}
                onClick={() => toggleLanguage("en")}
                type="button"
              >
                <span>
                  <i>EN</i>English
                </span>
                {context.lang === "en" && <b>✓</b>}
              </button>
            </div>
            <div className="um-group">
              <div className="um-label">
                {translate(context, "Anzeigemodus", "Display mode")}
              </div>
              {mode("light", "☀", translate(context, "Hell", "Light"))}
              {mode("dark", "☾", translate(context, "Dunkel", "Dark"))}
              {mode("system", "◐", "System")}
            </div>
            <div className="um-group">
              <button
                className="um-row um-mode"
                onClick={() => {
                  setIsOpen(false);
                  window.resetDemo();
                }}
                type="button"
              >
                <span>
                  {translate(context, "Demo-Daten zurücksetzen", "Reset demo data")}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
