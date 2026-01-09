
let jsonData = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    jsonData = data;
    populateDropdown('regionFilter', [...new Set(data.map(item => item.지역))]);
    populateDropdown('universityFilter', [...new Set(data.map(item => item.대학))]);
    populateDropdown('categoryFilter', [...new Set(data.map(item => item.항목))]);
    displayTable(data);
  });

function populateDropdown(id, values) {
  const select = document.getElementById(id);
  values.forEach(val => {
    const option = document.createElement('option');
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });
}

function displayTable(data) {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
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

document.getElementById('searchInput').addEventListener('input', filterTable);
document.getElementById('regionFilter').addEventListener('change', filterTable);
document.getElementById('universityFilter').addEventListener('change', filterTable);
document.getElementById('categoryFilter').addEventListener('change', filterTable);

function filterTable() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const region = document.getElementById('regionFilter').value;
  const univ = document.getElementById('universityFilter').value;
  const category = document.getElementById('categoryFilter').value;

  const filtered = jsonData.filter(item => {
    return (!region || item.지역 === region) &&
           (!univ || item.대학 === univ) &&
           (!category || item.항목 === category) &&
           Object.values(item).some(val => String(val).toLowerCase().includes(keyword));
  });

  displayTable(filtered);
}
