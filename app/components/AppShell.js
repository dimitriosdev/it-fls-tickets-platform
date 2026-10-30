"use client";

import UserMenu from "./UserMenu";

function Brand({ className, logoSrc, onClick }) {
  const content = (
    <>
      <img className="logo" src={logoSrc} alt="" />
      <span>IT FLS</span>
    </>
  );

  if (onClick) {
    return (
      <button className={className} onClick={onClick} type="button">
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

function Sidebar({ logoSrc }) {
  return (
    <aside>
      <Brand className="brand" logoSrc={logoSrc} />
      <div className="nav-section-label">Arbeitsbereich</div>
      <nav className="nav" id="nav" aria-label="Workspace navigation" />
      <div className="aside-foot">
        Incident Demo · v1.0
        <br />
        Sample data only
      </div>
    </aside>
  );
}

function SearchBar() {
  return (
    <div className="search">
      <input
        id="globalSearch"
        placeholder="Suche nach Ereignissen, Arbeitsplatz, Kategorie …"
      />
    </div>
  );
}

function NotificationButton({ onClick }) {
  return (
    <button
      className="bell"
      id="notificationBell"
      onClick={onClick}
      aria-label="Notifications"
      type="button"
    >
      🔔
      <span id="notificationCount" className="notification-count" />
    </button>
  );
}

function Topbar({ logoSrc, onHomeClick, onNotifications }) {
  return (
    <header className="topbar">
      <Brand className="topbrand" logoSrc={logoSrc} onClick={onHomeClick} />
      <SearchBar />
      <div className="topright">
        <NotificationButton onClick={onNotifications} />
        <UserMenu />
      </div>
    </header>
  );
}

export default function AppShell({ children, logoSrc, onHomeClick, onNotifications }) {
  return (
    <>
      <div className="topline" />
      <div className="app">
        <Sidebar logoSrc={logoSrc} />
        <div className="main">
          <Topbar
            logoSrc={logoSrc}
            onHomeClick={onHomeClick}
            onNotifications={onNotifications}
          />
          {children}
        </div>
      </div>
      <div id="toastroot" />
    </>
  );
}
