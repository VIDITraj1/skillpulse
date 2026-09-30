document.addEventListener("DOMContentLoaded", () => {
  initReadinessRing();
  initApplyButtons();
  initTabs();
  initChatInput();

  if (!document.getElementById("sidebar-root")) {
    initMobileSidebar();
    initTopbarSearch();
    initNotificationBell();
  }
});


function initMobileSidebar() {
  const menuBtn = document.querySelector(".topbar__menu-btn");
  const sidebar = document.querySelector(".sidebar");
  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("is-open");
  });

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("is-open") &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      sidebar.classList.remove("is-open");
    }
  });
}


function initReadinessRing() {
  const ring = document.querySelector(".readiness-ring__value");
  const numEl = document.querySelector(".readiness-ring__num");
  if (!ring || !numEl) return;

  const target = parseInt(ring.dataset.value, 10) || 0;
  const radius = ring.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;

  let current = 0;
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.round(target * progress);
    const offset = circumference - (progress * target / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    numEl.textContent = `${current}%`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}


function initApplyButtons() {
  document.querySelectorAll("[data-apply-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.applied === "true") return;
      btn.dataset.applied = "true";
      btn.textContent = "Applied ✓";
      btn.classList.add("btn--outline");
      btn.classList.remove("btn--primary");
    });
  });
}


function initTopbarSearch() {
  const input = document.querySelector("[data-search-input]");
  const rows = document.querySelectorAll("[data-searchable]");
  if (!input || rows.length === 0) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
}


function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const buttons = group.querySelectorAll("[data-tab-btn]");
    const panelWrap = document.querySelector(group.dataset.tabs);
    if (!panelWrap) return;
    const panels = panelWrap.querySelectorAll("[data-tab-panel]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        panels.forEach((p) => p.classList.remove("is-active"));
        btn.classList.add("is-active");
        const target = panelWrap.querySelector(`[data-tab-panel="${btn.dataset.tabBtn}"]`);
        target?.classList.add("is-active");
      });
    });
  });
}


function initChatInput() {
  const input = document.querySelector("[data-chat-input]");
  const log = document.querySelector("[data-chat-log]");
  if (!input || !log) return;

  const send = () => {
    const text = input.value.trim();
    if (!text) return;
    const bubble = document.createElement("div");
    bubble.className = "chat-msg chat-msg--me";
    bubble.innerHTML = `<img class="chat-msg__avatar" src="https://i.pravatar.cc/64?img=47" alt=""><div><div class="chat-msg__name">You</div><p>${text}</p></div>`;
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
    input.value = "";
  };

  input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
  document.querySelector("[data-chat-send]")?.addEventListener("click", send);
}


function initNotificationBell() {
  const bell = document.querySelector("[data-bell]");
  if (!bell) return;
  bell.addEventListener("click", () => {
    bell.querySelector(".badge-dot")?.remove();
  });
}
