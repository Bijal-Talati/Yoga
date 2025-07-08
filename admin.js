const form = document.getElementById("asanaForm");
const preview = document.getElementById("svgPreview");
const select = document.getElementById("existingSelect");

function getAsanas() {
  return JSON.parse(localStorage.getItem("asanasData") || "{}");
}

function saveAsanas(data) {
  localStorage.setItem("asanasData", JSON.stringify(data));
}

// Populate dropdown
function populateDropdown() {
  const data = getAsanas();
  select.innerHTML = `<option value="">-- Select Asana --</option>`;
  for (let cat in data) {
    data[cat].forEach(asana => {
      const opt = document.createElement("option");
      opt.value = `${cat}||${asana.id}`;
      opt.textContent = `${asana.name} (${cat})`;
      select.appendChild(opt);
    });
  }
}

// Load asana to form
select.addEventListener("change", function () {
  const [cat, id] = this.value.split("||");
  const data = getAsanas();
  const found = data[cat]?.find(a => a.id === id);
  if (found) {
    document.getElementById("category").value = cat;
    document.getElementById("id").value = found.id;
    document.getElementById("name").value = found.name;
    document.getElementById("svg").value = found.svg;
    document.getElementById("procedure").value = found.procedure;
    document.getElementById("benefits").value = found.benefits;
    document.getElementById("caution").value = found.caution;
    document.getElementById("ayurveda").value = found.ayurveda;
    document.getElementById("therapy").value = found.therapy;
    preview.innerHTML = found.svg;
  }
});

// Live preview for SVG
document.getElementById("svg").addEventListener("input", function () {
  preview.innerHTML = this.value;
});

// Save or update asana
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = getAsanas();
  const category = document.getElementById("category").value.trim();
  const newAsana = {
    id: document.getElementById("id").value.trim(),
    name: document.getElementById("name").value.trim(),
    svg: document.getElementById("svg").value.trim(),
    procedure: document.getElementById("procedure").value.trim(),
    benefits: document.getElementById("benefits").value.trim(),
    caution: document.getElementById("caution").value.trim(),
    ayurveda: document.getElementById("ayurveda").value.trim(),
    therapy: document.getElementById("therapy").value.trim()
  };

  if (!data[category]) data[category] = [];

  const idx = data[category].findIndex(a => a.id === newAsana.id);
  if (idx >= 0) {
    data[category][idx] = newAsana;
  } else {
    data[category].push(newAsana);
  }

  saveAsanas(data);
  populateDropdown();
  alert("Asana saved!");
  form.reset();
  preview.innerHTML = "";
});

// Delete asana
document.getElementById("deleteBtn").addEventListener("click", function () {
  const id = document.getElementById("id").value.trim();
  const category = document.getElementById("category").value.trim();
  if (!id || !category) return alert("Provide ID and Category to delete.");

  const data = getAsanas();
  if (data[category]) {
    data[category] = data[category].filter(a => a.id !== id);
    if (data[category].length === 0) delete data[category];
    saveAsanas(data);
    populateDropdown();
    alert("Deleted.");
    form.reset();
    preview.innerHTML = "";
  }
});

// Export JSON
function exportData() {
  const blob = new Blob([JSON.stringify(getAsanas(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "asanas-data.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import JSON
document.getElementById("importFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      saveAsanas(imported);
      alert("Data imported!");
      populateDropdown();
    } catch (err) {
      alert("Invalid JSON.");
    }
  };
  reader.readAsText(file);
});

// Init
populateDropdown();
