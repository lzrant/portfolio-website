const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");

document.documentElement.classList.add("js");

const getStoredTheme = () => {
  try {
    return localStorage.getItem("antonio-theme");
  } catch {
    return null;
  }
};

const storeTheme = (theme) => {
  try {
    localStorage.setItem("antonio-theme", theme);
  } catch {
    // File previews can disable storage; the button still works for the current page.
  }
};

const setTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  if (themeLabel) themeLabel.textContent = isDark ? "Light" : "Dark";
};

const preferredTheme = getStoredTheme() || "light";
setTheme(preferredTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  storeTheme(nextTheme);
});

const currentPage = document.documentElement.dataset.page;

if (currentPage && nav) {
  nav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isActive =
      (currentPage === "home" && href === "index.html") || href === `${currentPage}.html`;

    if (isActive) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const interests = {
  programming: {
    heading: "Programming",
    description:
      "I like building practical tools, learning how systems fit together, and turning rough ideas into software that feels smooth in someone else's hands.",
  },
  chess: {
    heading: "Chess",
    description:
      "Chess scratches the same itch as debugging: slow down, read the position, choose a plan, and stay honest about tradeoffs.",
  },
  pickleball: {
    heading: "Pickleball",
    description:
      "Pickleball keeps me competitive and social away from the desk. It is also part of why PaddleIQ was fun to build.",
  },
  games: {
    heading: "Video games",
    description:
      "Games are where systems design becomes instantly felt: feedback loops, progression, constraints, and small interactions that make an experience click.",
  },
};

const interestHeading = document.querySelector("[data-interest-heading]");
const interestDescription = document.querySelector("[data-interest-description]");
const interestButtons = document.querySelectorAll("[data-interest]");

interestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.interest;
    const interest = interests[key];

    if (!interest || !interestHeading || !interestDescription) return;

    interestHeading.textContent = interest.heading;
    interestDescription.textContent = interest.description;

    interestButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.projectCategory === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.04 }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}
