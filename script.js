/* =========================================================================
   Cindy Wang — portfolio behaviour
   15-113 Project 1

   AI USAGE NOTE: drafted with Claude and then trimmed. Three small features,
   each self-contained so I can explain them one at a time:

     1. invert (theme) toggle
     2. navigation that highlights the section you are looking at
     3. project filter

   No libraries. Everything runs after the HTML has parsed, because the
   <script> tag sits at the end of <body>.
   ========================================================================= */

/* ---------- 1. Invert toggle -------------------------------------------
   The page reads its colors from two CSS variables. Those variables have one
   set of values under :root and another under [data-theme="dark"], so
   switching themes is just changing one attribute on <html>. The choice is
   saved in localStorage; that call is wrapped in try/catch because some
   browsers block storage and a blocked write should not break the page. */

const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function readSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;                       // storage unavailable: fall back below
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.querySelector(".sr-only").textContent =
    isDark ? "Switch to light theme" : "Switch to dark theme";
}

// Start from a saved choice; otherwise follow the operating system setting.
const savedTheme = readSavedTheme();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    /* nothing to do: the theme still applies for this visit */
  }
});

/* ---------- 2. Highlight the current section ----------------------------
   An IntersectionObserver reports when a section enters or leaves a band of
   the viewport. The rootMargin here shrinks that band to roughly the middle
   of the screen, so a section counts as "current" once it reaches the middle
   rather than the moment its first pixel appears. Doing it this way costs far
   less than recalculating positions on every scroll event. */

const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setCurrent(id) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === "#" + id) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrent(entry.target.id);
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => spy.observe(section));

/* ---------- 3. Project filter -------------------------------------------
   Every <article class="project"> carries data-tags, a space-separated list
   such as "analog embedded". Clicking a filter button hides the articles
   whose list does not contain the chosen tag. The count is written into a
   region marked role="status" so screen readers hear what changed. */

const filterButtons = Array.from(document.querySelectorAll(".filter"));
const projects = Array.from(document.querySelectorAll(".project"));
const status = document.getElementById("filter-status");

function applyFilter(tag) {
  let shown = 0;

  projects.forEach((project) => {
    const tags = project.dataset.tags.split(" ");
    const matches = tag === "all" || tags.includes(tag);
    project.classList.toggle("is-hidden", !matches);
    if (matches) shown += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === tag;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  status.textContent =
    tag === "all"
      ? ""
      : shown + (shown === 1 ? " project" : " projects") + " shown";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});
