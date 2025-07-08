document.getElementById("asanaForm").addEventListener("submit", function (e) {
  e.preventDefault();

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

  const category = document.getElementById("category").value.trim();
  const allData = JSON.parse(localStorage.getItem("asanasData") || "{}");

  if (!allData[category]) allData[category] = [];

  // Check if asana already exists to update it
  const index = allData[category].findIndex(a => a.id === newAsana.id);
  if (index >= 0) {
    allData[category][index] = newAsana;
  } else {
    allData[category].push(newAsana);
  }

  localStorage.setItem("asanasData", JSON.stringify(allData));
  alert("Asana saved!");
  this.reset();
});
