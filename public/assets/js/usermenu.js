let userMenuOpen = false;
let userPrefs = Object.assign({ notifications: true, compact: false, hint: true, theme: "light" }, JSON.parse(localStorage.getItem("it-demo-prefs") || "{}"));

function userT(de, en) { return lang === "en" ? en : de; }
function userSavePrefs() { localStorage.setItem("it-demo-prefs", JSON.stringify(userPrefs)); }

function userApplyPrefs() {
    const dark = userPrefs.theme === "dark" || (userPrefs.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("theme-dark", dark);
    document.body.classList.toggle("compact", userPrefs.compact);
    document.body.classList.toggle("hide-hint", !userPrefs.hint);
    document.body.classList.toggle("hide-bell", !userPrefs.notifications);
}

function userSetPref(key, value) { userPrefs[key] = value; userSavePrefs(); userApplyPrefs(); userToggleMenu(false); }
function userToggleMenu(force) { userMenuOpen = force === undefined ? !userMenuOpen : force; renderUserMenu(); }

function renderUserMenu() {
    const el = document.getElementById("userMenu");
    if (!el) return;
    userApplyPrefs();
    const btn = document.getElementById("currentAvatar");
    const name = currentRole === "leader" ? teamLeader : currentUser;
    if (btn) btn.textContent = name.charAt(0).toUpperCase();
    const flag = document.getElementById("langFlag");
    if (flag) flag.textContent = lang.toUpperCase();
    el.hidden = !userMenuOpen;
    if (!userMenuOpen) return;
    const toggle = (label, key) => `<label class="um-row um-toggle"><span>${label}</span><input type="checkbox" role="switch" ${userPrefs[key] ? "checked" : ""} onchange="userSetPref('${key}', this.checked)"><i class="switch"></i></label>`;
    const info = (label, value) => `<div class="um-row"><span>${label}</span><span class="um-value">${value}</span></div>`;
    const mode = (key, icon, label) => `<button type="button" class="um-row um-mode ${userPrefs.theme === key ? "on" : ""}" onclick="userSetPref('theme','${key}')"><span><i>${icon}</i>${label}</span>${userPrefs.theme === key ? "<b>✓</b>" : ""}</button>`;
    const roles = [["supporter", "Supporter"], ["reporter", "Reporter"], ["leader", "Team leader"]];
    el.innerHTML = `
        <div class="um-group">
            ${info(userT("Mein Konto", "My account"), escapeHtml(name))}
            <label class="um-row"><span>${userT("Rolle", "Role")}</span><select id="rolePicker" class="um-select" onchange="userToggleMenu(false);changeRole(this.value)">${roles.map(([v, l]) => `<option value="${v}" ${v === currentRole ? "selected" : ""}>${l}</option>`).join("")}</select></label>
            ${info(userT("Mandant", "Client"), "Migros Demo AG")}
            ${info(userT("Standort", "Location"), "Hauptlager Wohlen")}
        </div>
        <div class="um-group">
            ${toggle(userT("Benachrichtigungen anzeigen", "Show notifications"), "notifications")}
            ${toggle(userT("Kompakte Ansicht", "Compact view"), "compact")}
            ${toggle(userT("Demo-Hinweis anzeigen", "Show demo notice"), "hint")}
        </div>
        <div class="um-group">
            <div class="um-label">${userT("Sprache", "Language")}</div>
            <button type="button" class="um-row um-mode ${lang === "de" ? "on" : ""}" onclick="userToggleMenu(false);if(lang!=='de')toggleLanguage()"><span><i>DE</i>Deutsch</span>${lang === "de" ? "<b>✓</b>" : ""}</button>
            <button type="button" class="um-row um-mode ${lang === "en" ? "on" : ""}" onclick="userToggleMenu(false);if(lang!=='en')toggleLanguage()"><span><i>EN</i>English</span>${lang === "en" ? "<b>✓</b>" : ""}</button>
        </div>
        <div class="um-group">
            <div class="um-label">${userT("Anzeigemodus", "Display mode")}</div>
            ${mode("light", "☀", userT("Hell", "Light"))}${mode("dark", "☾", userT("Dunkel", "Dark"))}${mode("system", "◐", "System")}
        </div>
        <div class="um-group"><button type="button" class="um-row um-mode" onclick="userToggleMenu(false);resetDemo()"><span>${userT("Demo-Daten zurücksetzen", "Reset demo data")}</span></button></div>`;
}

document.addEventListener("click", (e) => {
    if (userMenuOpen && e.target.isConnected && !e.target.closest("#userMenu") && !e.target.closest("#currentAvatar")) userToggleMenu(false);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && userMenuOpen) userToggleMenu(false); });
