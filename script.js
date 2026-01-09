
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    const tableBody = document.querySelector("#dataTable tbody");
    const regionFilter = document.getElementById("regionFilter");
    const universityFilter = document.getElementById("universityFilter");
    const searchInput = document.getElementById("searchInput");

    const renderTable = (filteredData) => {
        tableBody.innerHTML = "";
        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.지역}</td>
                <td>${row.대학}</td>
                <td>${row.항목}</td>
                <td>${row.구분}</td>
                <td>${row["2027학년도"]}</td>
                <td>${row["2026학년도"]}</td>
            `;
            tableBody.appendChild(tr);
        });
    };

    const updateFilters = () => {
        const regions = [...new Set(data.map(d => d.지역))].sort();
        const univs = [...new Set(data.map(d => d.대학))].sort();

        regions.forEach(r => {
            const option = document.createElement("option");
            option.value = r;
            option.textContent = r;
            regionFilter.appendChild(option);
        });

        univs.forEach(u => {
            const option = document.createElement("option");
            option.value = u;
            option.textContent = u;
            universityFilter.appendChild(option);
        });
    };

    const applyFilters = () => {
        const regionVal = regionFilter.value;
        const univVal = universityFilter.value;
        const keyword = searchInput.value.trim();

        const filtered = data.filter(row => {
            return (!regionVal || row.지역 === regionVal)
                && (!univVal || row.대학 === univVal)
                && Object.values(row).some(v => v.toString().includes(keyword));
        });

        renderTable(filtered);
    };

    updateFilters();
    renderTable(data);

    regionFilter.addEventListener("change", applyFilters);
    universityFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
});
