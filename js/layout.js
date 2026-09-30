

const NAV_ITEMS = [
  { key: "dashboard",  label: "Dashboard",           href: "dashboard.html",   icon: "🏠" },
  { key: "profile",    label: "My Profile",          href: "profile.html",    icon: "👤" },
  { key: "skills",     label: "Skills & Assessment", href: "#",               icon: "📊" },
  { key: "roadmap",    label: "Career Roadmap",      href: "roadmap.html",    icon: "🧭" },
  { key: "internships",label: "Internships",         href: "internships.html",icon: "💼" },
  { key: "applications",label:"Applications",        href: "#",               icon: "📝" },
  { key: "projects",   label: "Projects",            href: "projects.html",   icon: "📁" },
  { key: "resume",     label: "Resume Builder",      href: "resume.html",     icon: "📄" },
  { key: "interview",  label: "Interview Prep",      href: "interview.html",  icon: "🎤" },
  { key: "community",  label: "Community",           href: "community.html",  icon: "👥" },
  { key: "achievements",label:"Achievements",        href: "profile.html",    icon: "🏆" },
];

const savedUser = localStorage.getItem("skillpulseUser");

const CURRENT_USER = savedUser
  ? JSON.parse(savedUser)
  : {
      username: "Guest",
      email: "",
      avatar: "https://i.pravatar.cc/72?img=47"
    };

function renderSidebar(activeKey) {
  const root = document.getElementById("sidebar-root");
  if (!root) return;

  const links = NAV_ITEMS.map((item) => `
    <a href="${item.href}" class="sidebar__link ${item.key === activeKey ? "is-active" : ""}">
      <span class="ico">${item.icon}</span> ${item.label}
    </a>
  `).join("");

  root.innerHTML = `
    <aside class="sidebar">
      <a href="index.html" class="sidebar__brand"><span class="logo-mark">S</span> SkillPulse</a>
      <nav class="sidebar__nav">
        ${links}
        <div class="sidebar__section-label">System</div>
        <a href="#" class="sidebar__link"><span class="ico">⚙️</span> Settings</a>
      </nav>
    </aside>
  `;
}

function renderTopbar(pageTitle) {
  const root = document.getElementById("topbar-root");
  if (!root) return;

  root.innerHTML = `
    <header class="topbar">
      <button class="topbar__menu-btn" aria-label="Toggle menu">☰</button>
      <div class="topbar__search">
        🔍 <input type="text" placeholder="Search skills, internships, projects…" data-search-input>
      </div>
      <div class="topbar__actions">
        <button class="icon-btn" data-bell>🔔<span class="badge-dot"></span></button>
        <button class="icon-btn">✉️</button>
        <div class="topbar__profile">
          <img 
            class="topbar__avatar" 
            src="${CURRENT_USER.avatar || "https://i.pravatar.cc/72?img=47"}" 
            alt="${CURRENT_USER.username}"
          >

          <div class="topbar__profile-meta">
            <div class="topbar__profile-name">
              ${CURRENT_USER.username}
            </div>

            <div class="topbar__profile-role">
              ${CURRENT_USER.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

function initLayout(activeKey) {
  renderSidebar(activeKey);
  renderTopbar();
  // Re-run interactions that depend on freshly-injected sidebar/topbar markup
  initMobileSidebar();
  initTopbarSearch();
  initNotificationBell();
}

document.addEventListener("DOMContentLoaded", () => {
  const activeKey = document.body.dataset.page;
  if (activeKey) initLayout(activeKey);
});
