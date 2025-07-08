const defaultAsanas = {
  "Standing": [
    {
      id: "tadasana",
      name: "Tadasana (Mountain Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400">
        <!-- simple figure standing -->
        <circle cx="100" cy="40" r="20" fill="#f2c9a0"/>
        <rect x="95" y="60" width="10" height="200" fill="#88c0d0"/>
      </svg>`,
      procedure: "Stand tall with feet together, arms at side, weight evenly distributed, breathe smoothly.",
      benefits: "Improves posture, strengthens thighs and calves, increases awareness.",
      caution: "Avoid if you have low blood pressure or dizziness.",
      ayurveda: "Balances Vata and Kapha doshas, grounding for air-types.",
      therapy: "Helps relieve sciatica and mild back pain."
    }
],
  "Seated": [   
    {
      id: "dandasana",
      name: "Dandasana (Staff Pose)",
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400">
        <circle cx="100" cy="40" r="20" fill="#f2c9a0"/>
        <rect x="95" y="60" width="10" height="200" fill="#c0d088"/>
      </svg>`,
      procedure: "Sit with legs straight, spine erect, arms beside hips, engage core.",
      benefits: "Strengthens back muscles, improves posture and digestion.",
      caution: "Avoid if you have hamstring injuries.",
      ayurveda: "Enhances Pitta balance, promotes heat regulation.",
      therapy: "Reduces abdominal fat, relieves backache."
    }]
};

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
    document.title = found.name;
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
