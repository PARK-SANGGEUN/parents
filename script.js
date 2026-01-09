
let data = [];
let regionMap = {};

function highlightText(text, keyword) {
    if (!keyword) return text;
    return text.replace(new RegExp(keyword, 'gi'), match => `<span class="highlight">${match}</span>`);
}

function renderTable(filteredData, keyword = '') {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    filteredData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${highlightText(row.지역, keyword)}</td>
            <td>${highlightText(row.대학, keyword)}</td>
            <td>${highlightText(row.항목, keyword)}</td>
            <td>${highlightText(row.구분, keyword)}</td>
            <td>${highlightText(row["2027학년도"], keyword)}</td>
            <td>${highlightText(row["2026학년도"], keyword)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function populateFilters(data) {
    const regionSet = new Set(data.map(d => d.지역));
    const itemSet = new Set(data.map(d => d.항목));
    const regionFilter = document.getElementById("regionFilter");
    const univFilter = document.getElementById("univFilter");
    const itemFilter = document.getElementById("itemFilter");

    regionSet.forEach(region => {
        const opt = document.createElement("option");
        opt.value = region;
        opt.textContent = region;
        regionFilter.appendChild(opt);
    });

    itemSet.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        itemFilter.appendChild(opt);
    });

    regionMap = {};
    data.forEach(row => {
        if (!regionMap[row.지역]) regionMap[row.지역] = new Set();
        regionMap[row.지역].add(row.대학);
    });

    regionFilter.addEventListener("change", () => {
        const selectedRegion = regionFilter.value;
        univFilter.innerHTML = '<option value="전체">대학 전체</option>';
        if (selectedRegion !== "전체" && regionMap[selectedRegion]) {
            regionMap[selectedRegion].forEach(univ => {
                const opt = document.createElement("option");
                opt.value = univ;
                opt.textContent = univ;
                univFilter.appendChild(opt);
            });
        } else {
            const allUnivs = [...new Set(data.map(d => d.대학))];
            allUnivs.forEach(univ => {
                const opt = document.createElement("option");
                opt.value = univ;
                opt.textContent = univ;
                univFilter.appendChild(opt);
            });
        }
        filterAndRender();
    });
}

function filterAndRender() {
    const regionVal = document.getElementById("regionFilter").value;
    const univVal = document.getElementById("univFilter").value;
    const itemVal = document.getElementById("itemFilter").value;
    const keyword = document.getElementById("searchInput").value.trim();

    let filtered = data.filter(row => {
        return (regionVal === "전체" || row.지역 === regionVal) &&
               (univVal === "전체" || row.대학 === univVal) &&
               (itemVal === "전체" || row.항목 === itemVal) &&
               Object.values(row).some(val => val.toLowerCase().includes(keyword.toLowerCase()));
    });

    renderTable(filtered, keyword);
}

fetch("data.json")
    .then(res => res.json())
    .then(json => {
        data = json;
        populateFilters(data);
        filterAndRender();
        document.getElementById("searchInput").addEventListener("input", filterAndRender);
        document.getElementById("univFilter").addEventListener("change", filterAndRender);
        document.getElementById("itemFilter").addEventListener("change", filterAndRender);
    });
