const defaultAsanas = {
  "Standing": [
    {
      id: "tadasana",
      name: "Tadasana (Mountain Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="100%" height="200">
        <circle cx="100" cy="40" r="20" fill="#f2c9a0"/>
        <rect x="95" y="60" width="10" height="200" fill="#61afef"/>
        <line x1="95" y1="140" x2="70" y2="200" stroke="#d19a66" stroke-width="5"/>
        <line x1="105" y1="140" x2="130" y2="200" stroke="#d19a66" stroke-width="5"/>
      </svg>`,
      procedure: "Stand tall, feet together, arms relaxed. Inhale and stretch upward.",
      benefits: "Improves posture, increases focus, strengthens legs.",
      caution: "Avoid if dizzy or low BP.",
      ayurveda: "Grounding for Vata, stabilizing.",
      therapy: "Aids sciatica, posture correction."
    }
],
  "Seated": [   
    {
      id: "dandasana",
      name: "Dandasana (Staff Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="200">
        <rect x="80" y="50" width="40" height="100" fill="#98c379"/>
        <line x1="80" y1="100" x2="30" y2="150" stroke="#e06c75" stroke-width="5"/>
        <line x1="120" y1="100" x2="170" y2="150" stroke="#e06c75" stroke-width="5"/>
        <circle cx="100" cy="30" r="20" fill="#e5c07b"/>
      </svg>`,
      procedure: "Sit with legs straight, spine tall, arms beside hips.",
      benefits: "Tones abdomen, strengthens back.",
      caution: "Avoid with back pain or herniated discs.",
      ayurveda: "Pacifies Kapha, stimulates digestion.",
      therapy: "Improves digestion, tones spine."
    }]
};


let currentLang = localStorage.getItem("lang") || "en";
let translations = {};

async function loadTranslations(lang) {
  const res = await fetch(`lang/${lang}.json`);
  translations = await res.json();
  localStorage.setItem("lang", lang);
  currentLang = lang;
  updateTranslations();
}

function updateTranslations() {
  if (document.title === "Asana Details") {
    document.getElementById("procedure").previousElementSibling.textContent = translations.procedure;
    document.getElementById("benefits").previousElementSibling.textContent = translations.benefits;
    document.getElementById("caution").previousElementSibling.textContent = translations.caution;
    document.getElementById("ayurveda").previousElementSibling.textContent = translations.ayurveda;
    document.getElementById("therapy").previousElementSibling.textContent = translations.therapy;
    document.querySelector("a[href='index.html']").textContent = translations.back_to_list;
  }

  if (document.getElementById("menu")) {
    document.querySelector("h1").textContent = translations.title;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
    document.getElementById("searchBar").placeholder = translations.search_placeholder;
    document.getElementById("benefitFilter").options[0].text = translations.filter_benefit;
    document.getElementById("cautionFilter").options[0].text = translations.filter_caution;
  }
}

document.getElementById("languageSwitcher")?.addEventListener("change", e => {
  loadTranslations(e.target.value);
});

// On load
loadTranslations(currentLang);

let asanas = JSON.parse(localStorage.getItem("asanasData")) || defaultAsanas;

// Populate filters
const benefitSet = new Set();
const cautionSet = new Set();
Object.values(asanas).flat().forEach(a => {
  benefitSet.add(a.benefits);
  cautionSet.add(a.caution);
});

function populateFilters() {
  const benefitSelect = document.getElementById("benefitFilter");
  const cautionSelect = document.getElementById("cautionFilter");
  for (let b of benefitSet) {
    let opt = document.createElement("option");
    opt.value = b; opt.textContent = b;
    benefitSelect.appendChild(opt);
  }
  for (let c of cautionSet) {
    let opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    cautionSelect.appendChild(opt);
  }
}

// Build menu with filters and search
function buildMenu() {
  const menu = document.getElementById("menu");
  const searchText = document.getElementById("searchBar")?.value.toLowerCase() || "";
  const benefitFilter = document.getElementById("benefitFilter")?.value || "";
  const cautionFilter = document.getElementById("cautionFilter")?.value || "";

  menu.innerHTML = "";
  for (const [cat, list] of Object.entries(asanas)) {
    list.forEach(asana => {
      const matchSearch = asana.name.toLowerCase().includes(searchText);
      const matchBenefit = !benefitFilter || asana.benefits === benefitFilter;
      const matchCaution = !cautionFilter || asana.caution === cautionFilter;
      if (matchSearch && matchBenefit && matchCaution) {
        const link = document.createElement("a");
        link.href = `asana.html?asana=${asana.id}`;
        link.textContent = `${asana.name}`;
        menu.appendChild(link);
      }
    });
  }
}

// Populate Asana Detail Page
function loadAsanaDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("asana");
  let found = null;
  for (const list of Object.values(asanas)) {
    for (const a of list) {
      if (a.id === id) { found = a; break; }
    }
  }
  if (found) {
    if (translations.title) document.title = translations.title;
    document.getElementById("title").textContent = found.name;
    document.getElementById("svg-diagram").innerHTML = found.svg;
    document.getElementById("procedure").textContent = found.procedure;
    document.getElementById("benefits").textContent = found.benefits;
    document.getElementById("caution").textContent = found.caution;
    document.getElementById("ayurveda").textContent = found.ayurveda;
    document.getElementById("therapy").textContent = found.therapy;
  }
}

// Event listeners
if (document.getElementById("menu")) {
  populateFilters();
  buildMenu();
  document.getElementById("searchBar").addEventListener("input", buildMenu);
  document.getElementById("benefitFilter").addEventListener("change", buildMenu);
  document.getElementById("cautionFilter").addEventListener("change", buildMenu);
}

if (document.getElementById("content")) {
  loadAsanaDetail();
}
