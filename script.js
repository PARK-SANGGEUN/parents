
document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      populateDropdowns(data);
      displayData(data);

      const searchInput = document.getElementById("searchInput");
      const regionFilter = document.getElementById("regionFilter");
      const universityFilter = document.getElementById("universityFilter");
      const itemFilter = document.getElementById("itemFilter");

      function filterAndDisplay() {
        const search = searchInput.value.toLowerCase();
        const region = regionFilter.value;
        const university = universityFilter.value;
        const item = itemFilter.value;

        const filtered = data.filter(row => {
          const matchesSearch = Object.values(row).some(val => val.toLowerCase().includes(search));
          const matchesRegion = region === "전체" || row.지역 === region;
          const matchesUniversity = university === "전체" || row.대학 === university;
          const matchesItem = item === "전체" || row.항목 === item;
          return matchesSearch && matchesRegion && matchesUniversity && matchesItem;
        });

        displayData(filtered);
      }

      searchInput.addEventListener("input", filterAndDisplay);
      regionFilter.addEventListener("change", filterAndDisplay);
      universityFilter.addEventListener("change", filterAndDisplay);
      itemFilter.addEventListener("change", filterAndDisplay);
    });

  function populateDropdowns(data) {
    const regionSet = new Set();
    const universitySet = new Set();
    const itemSet = new Set();

    data.forEach(row => {
      regionSet.add(row.지역);
      universitySet.add(row.대학);
      itemSet.add(row.항목);
    });

    setOptions("regionFilter", regionSet);
    setOptions("universityFilter", universitySet);
    setOptions("itemFilter", itemSet);
  }

  function setOptions(id, items) {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="전체">${id.replace("Filter", "")} 전체</option>`;
    Array.from(items).sort().forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      select.appendChild(option);
    });
  }

  function displayData(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.지역}</td>
        <td>${row.대학}</td>
        <td>${row.항목}</td>
        <td>${row.구분}</td>
        <td>${row.학년도_2027}</td>
        <td>${row.학년도_2026}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
