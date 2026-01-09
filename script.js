
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("data.json");
  const data = await response.json();

  const regionSelect = document.getElementById("regionSelect");
  const collegeSelect = document.getElementById("collegeSelect");
  const fieldSelect = document.getElementById("fieldSelect");
  const tableBody = document.querySelector("tbody");

  function populateDropdown(select, values) {
    select.innerHTML = '<option value="">전체</option>';
    [...new Set(values)].forEach(value => {
      if (value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      }
    });
  }

  populateDropdown(regionSelect, data.map(d => d["지역"]));
  populateDropdown(collegeSelect, data.map(d => d["대학"]));
  populateDropdown(fieldSelect, data.map(d => d["항목"]));

  function renderTable(filteredData) {
    tableBody.innerHTML = "";
    filteredData.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row["지역"]}</td>
        <td>${row["대학"]}</td>
        <td>${row["항목"]}</td>
        <td>${row["구분"]}</td>
        <td>${row["2027학년도"]}</td>
        <td>${row["2026학년도"]}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function filterData() {
    const region = regionSelect.value;
    const college = collegeSelect.value;
    const field = fieldSelect.value;

    const filtered = data.filter(item =>
      (!region || item["지역"] === region) &&
      (!college || item["대학"] === college) &&
      (!field || item["항목"] === field)
    );
    renderTable(filtered);
  }

  regionSelect.addEventListener("change", filterData);
  collegeSelect.addEventListener("change", filterData);
  fieldSelect.addEventListener("change", filterData);

  renderTable(data);
});
