let data = [];

fetch("data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    populateFilters();
    renderTable(data);
  });

function populateFilters() {
  const regionSet = new Set();
  const universitySet = new Set();
  const categorySet = new Set();

  data.forEach(item => {
    regionSet.add(item.region);
    universitySet.add(item.university);
    categorySet.add(item.category);
  });

  fillSelect("regionSelect", regionSet);
  fillSelect("universitySelect", universitySet);
  fillSelect("categorySelect", categorySet);

  document.getElementById("regionSelect").addEventListener("change", filterData);
  document.getElementById("universitySelect").addEventListener("change", filterData);
  document.getElementById("categorySelect").addEventListener("change", filterData);
}

function fillSelect(id, dataSet) {
  const select = document.getElementById(id);
  [...dataSet].sort().forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

function filterData() {
  const region = document.getElementById("regionSelect").value;
  const university = document.getElementById("universitySelect").value;
  const category = document.getElementById("categorySelect").value;

  const filtered = data.filter(item => {
    return (!region || item.region === region) &&
           (!university || item.university === university) &&
           (!category || item.category === category);
  });

  renderTable(filtered);
}

function renderTable(items) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";
  items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.region}</td>
      <td>${item.university}</td>
      <td>${item.category}</td>
      <td>${item.type}</td>
      <td>${item.year_2027}</td>
      <td>${item.year_2026}</td>
    `;
    tbody.appendChild(tr);
  });
}