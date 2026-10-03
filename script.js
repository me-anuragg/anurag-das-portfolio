const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
window.addEventListener("load", () =>
  setTimeout(() => $("#loader")?.classList.add("hide"), 650),
);
$("#year").textContent = new Date().getFullYear();
const nav = $("#nav");
window.addEventListener(
  "scroll",
  () => {
    const h = document.documentElement;
    $("#scrollProgress").style.width =
      (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
    nav.classList.toggle("scrolled", scrollY > 25);
    $$("section[id]").forEach((sec) => {
      const link = $(`.nav nav a[href="#${sec.id}"]`);
      if (link) {
        const r = sec.getBoundingClientRect();
        link.classList.toggle("active", r.top < 180 && r.bottom > 180);
      }
    });
  },
  { passive: true },
);
const observer = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.08 },
);
$$(".reveal").forEach((x) => observer.observe(x));
$("#menu").onclick = () => {
  nav.classList.toggle("open");
  const n = $(".nav nav");
  n.style.display = nav.classList.contains("open") ? "flex" : "";
  if (nav.classList.contains("open")) {
    n.style.position = "absolute";
    n.style.top = "70px";
    n.style.left = "18px";
    n.style.right = "18px";
    n.style.flexDirection = "column";
    n.style.padding = "18px";
    n.style.background = "rgba(10,10,16,.96)";
    n.style.border = "1px solid var(--line)";
    n.style.borderRadius = "15px";
  }
};
$("#theme").onclick = () => {
  document.body.classList.toggle("light");
  $("#theme").textContent = document.body.classList.contains("light")
    ? "☀"
    : "◐";
};
// spotlight + cursor
window.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mx", e.clientX + "px");
  document.documentElement.style.setProperty("--my", e.clientY + "px");
  const c = $("#cursor");
  c.style.left = e.clientX + "px";
  c.style.top = e.clientY + "px";
});
$$("a,button,.project-card,.cert-card,.skill-chip").forEach((el) => {
  el.addEventListener("mouseenter", () => $("#cursor")?.classList.add("hot"));
  el.addEventListener("mouseleave", () =>
    $("#cursor")?.classList.remove("hot"),
  );
});
// tilt
$$("[data-tilt]").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / 22,
      y = (e.clientY - r.top - r.height / 2) / 22;
    el.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) rotateZ(1deg) scale(1.01)`;
  });
  el.addEventListener(
    "mouseleave",
    () => (el.style.transform = "rotate(2deg)"),
  );
});
// magnetic
$$(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.1}px,${(e.clientY - r.top - r.height / 2) * 0.1}px)`;
  });
  el.addEventListener("mouseleave", () => (el.style.transform = ""));
});
// project filtering + modal
const projects = [
  [
    "SIH Legal Metrology Compliance System",
    "2026 · AI + OCR",
    "Smart India Hackathon solution for packaged-commodity compliance. It scans product images and labels, extracts structured data using OCR and validates the information against Legal Metrology rules.",
    "Node.js · Express.js · PostgreSQL · Prisma · Tesseract.js/OCR",
  ],
  [
    "FileGuard — ML Based Malware Detection & File Analysis",
    "2026 · Cyber AI",
    "A machine-learning system that extracts static PE features and EMBER features to classify files as benign or malicious, with an interactive Streamlit analysis flow for real-time use.",
    "Python · LightGBM · Scikit-learn · FastAPI · Streamlit · LIEF · pefile · EMBER",
  ],
  [
    "FitGuard — Fitness & Calorie Tracker System",
    "2026 · Health AI",
    "A fitness and health tracking platform that calculates calories burned, tracks workouts, monitors activity and provides insights on health metrics, diet, body stats and progress.",
    "Python · NumPy · Pandas · Scikit-learn · XGBoost · FastAPI · React · TypeScript · PostgreSQL",
  ],
  [
    "Resume Checker — AI Powered Resume Screening",
    "2026 · NLP",
    "Analyzes resumes, extracts text from PDF/DOCX, evaluates skills, experience and education using NLP and ML techniques and returns an ATS score with improvement suggestions.",
    "Python · spaCy · NLTK · Scikit-learn · Flask · PyMuPDF · PyPDF2",
  ],
  [
    "Recipe Remixer — AI Recipe Generator",
    "2025 · GenAI",
    "Creates personalized recipes based on ingredients and preferences, with recipe history, substitutions, portion scaling and multilingual support.",
    "React · TypeScript · Vite · Claude API",
  ],
  [
    "ABC General Store — E-Commerce Web App",
    "2025 · Web",
    "A general-store e-commerce application with product browsing, cart, search, order management and a responsive user experience.",
    "React · TypeScript · Vite",
  ],
  [
    "ERP Software System — Academic Project",
    "2025 · Enterprise Web",
    "An ERP system for managing inventory, sales, purchase and employees with role-based authentication, dashboards, reporting and responsive UI.",
    "React.js · JavaScript · MySQL",
  ],
  [
    "RoadGuard — Automated Road Damage Detection & Assessment",
    "2025 · Computer Vision",
    "Computer vision system for detecting potholes, cracks and manholes using YOLOv8 on a custom dataset, with a Flask web interface for detection and visualization.",
    "Python · YOLOv8 · PyTorch · Ultralytics · Flask · HTML/CSS",
  ],
];
function openProject(i) {
  const [title, kicker, desc, stack] = projects[i];
  $("#projectModalContent").innerHTML =
    `<div class="modal-kicker">${kicker}</div><h2>${title}</h2><div class="modal-columns"><div><p>${desc}</p><p><b>Build focus:</b> practical system design, implementation and iteration. This case-study panel uses the project information supplied for the portfolio and does not invent demo/repository links.</p><div class="tags">${stack
      .split(" · ")
      .map((x) => `<i>${x}</i>`)
      .join(
        "",
      )}</div></div><aside class="modal-side"><div><small>PROJECT</small><b>${String(i + 1).padStart(2, "0")} / 08</b></div><div><small>YEAR</small><b>${kicker.slice(0, 4)}</b></div><div><small>ROLE</small><b>BUILDER</b></div><div><small>TYPE</small><b>${kicker.split(" · ")[1] || "PROJECT"}</b></div></aside></div>`;
  $("#projectModal").classList.add("open");
  $("#projectModal").setAttribute("aria-hidden", "false");
}
$$(".project-card").forEach((card) =>
  card.addEventListener("click", (e) => {
    if (e.target.closest(".open-case") || e.currentTarget === card)
      openProject(+card.dataset.id);
  }),
);
$$(".filter").forEach(
  (btn) =>
    (btn.onclick = () => {
      $$(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      $$(".project-card").forEach((c) => {
        const ok = f === "all" || c.dataset.tags.split(" ").includes(f);
        c.style.display = ok ? "" : "none";
      });
    }),
);
// skills
const skills = {
  LANGUAGES: ["C", "JavaScript", "TypeScript", "Python", "SQL"],
  WEB: ["HTML", "CSS", "React.js", "Flask", "Vite"],
  AI: [
    "Claude API",
    "YOLOv8",
    "Computer Vision",
    "Scikit-learn",
    "XGBoost",
    "LightGBM",
    "spaCy",
    "NLTK",
  ],
  BACKEND: ["Node.js", "Express.js", "FastAPI", "Flask"],
  DATABASE: ["MySQL", "PostgreSQL"],
  CORE: [
    "Object-Oriented Programming",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
  ],
  TOOLS: ["Git", "GitHub", "VS Code", "Postman"],
  OTHER: [
    "Prisma",
    "Tesseract.js (OCR)",
    "PyMuPDF",
    "PyPDF2",
    "pefile",
    "LIEF",
  ],
};
const cloud = $("#skillCloud");
Object.entries(skills).forEach(([cat, items], idx) => {
  const b = document.createElement("button");
  b.className = "skill-chip" + (idx === 0 ? " active" : "");
  b.innerHTML = `<span>${String(idx + 1).padStart(2, "0")}</span>${cat}`;
  b.onclick = () => showSkills(cat, b);
  cloud.appendChild(b);
});
function showSkills(cat, b) {
  $$(".skill-chip").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
  const items = skills[cat];
  $("#skillCategory").textContent = cat;
  $("#skillCount").textContent = String(items.length).padStart(2, "0");
  $("#skillMeter").style.width = Math.min(95, 35 + items.length * 8) + "%";
  $("#skillList").innerHTML = items.map((x) => `<span>${x}</span>`).join("");
}
showSkills("LANGUAGES", $(".skill-chip"));
// cert modal
$$(".cert-card").forEach(
  (c) =>
    (c.onclick = () => {
      $("#certModalContent").innerHTML =
        `<div class="cert-preview"><span class="big-mark">${c.querySelector(".cert-logo").textContent}</span><small>${c.dataset.source}</small><h2>${c.dataset.cert}</h2><p>Credential recorded in Anurag Das's portfolio.</p></div>`;
      $("#certModal").classList.add("open");
    }),
);
function closeModals() {
  $$(".modal").forEach((m) => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  });
  $("#command").classList.remove("open");
}
$$("[data-close],.modal-backdrop").forEach((x) => (x.onclick = closeModals));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});
// command palette
function toggleCommand() {
  $("#command").classList.toggle("open");
  if ($("#command").classList.contains("open")) $("#commandInput").focus();
}
$("#cmdBtn").onclick = toggleCommand;
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    toggleCommand();
  }
});
$("#commandInput").oninput = (e) => {
  const q = e.target.value.toLowerCase();
  $$(".command-list button").forEach(
    (b) =>
      (b.style.display = b.textContent.toLowerCase().includes(q)
        ? "flex"
        : "none"),
  );
};
$$("[data-go]").forEach(
  (b) =>
    (b.onclick = () => {
      $("#command").classList.remove("open");
      $(b.dataset.go).scrollIntoView({ behavior: "smooth" });
    }),
);
$$("[data-cv]").forEach(
  (b) => (b.onclick = () => (location.href = "Anurag_Das_CV.pdf")),
);
// contact form + copy
$("#message").oninput = (e) =>
  ($("#counter").textContent = `${e.target.value.length} / 500`);
$("#contactForm").onsubmit = (e) => {
  e.preventDefault();
  const n = encodeURIComponent($("#name").value),
    em = encodeURIComponent($("#email").value),
    s = encodeURIComponent($("#subject").value || "Portfolio contact"),
    i = encodeURIComponent($("#interest").value),
    m = encodeURIComponent($("#message").value);
  location.href = `mailto:tecb.cse27.anurag@gmail.com?subject=${s}&body=Name:%20${n}%0AEmail:%20${em}%0AInterest:%20${i}%0A%0A${m}`;
};
$$("[data-copy]").forEach(
  (b) =>
    (b.onclick = async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        showToast("Copied to clipboard.");
      } catch {
        showToast(b.dataset.copy);
      }
    }),
);
function showToast(t) {
  const x = $("#toast");
  x.textContent = t;
  x.classList.add("show");
  setTimeout(() => x.classList.remove("show"), 1800);
}
// animated matrix background
const canvas = $("#matrix"),
  ctx = canvas.getContext("2d");
let W, H, cols, drops;
function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  cols = Math.floor(W / 24);
  drops = Array(cols)
    .fill(0)
    .map(() => Math.random() * -20);
}
resize();
addEventListener("resize", resize);
function draw() {
  ctx.fillStyle = "rgba(7,7,12,.09)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#8b5cf6";
  ctx.font = "10px DM Mono";
  for (let i = 0; i < cols; i++) {
    ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 24, drops[i] * 20);
    if (drops[i] * 20 > H && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.45;
  }
  requestAnimationFrame(draw);
}
draw();
