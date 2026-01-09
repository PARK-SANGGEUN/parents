
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#dataTable tbody");
    const input = document.getElementById("searchInput");

    const render = (filtered) => {
      tbody.innerHTML = "";
      filtered.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row["지역"] || ""}</td>
          <td>${row["대학"] || ""}</td>
          <td>${row["항목"] || ""}</td>
          <td>${row["구분"] || ""}</td>
          <td>${row["전형_2027"] || ""}</td>
          <td>${row["전형_2026"] || ""}</td>
        `;
        tbody.appendChild(tr);
      });
    };

    input.addEventListener("input", () => {
      const keyword = input.value.toLowerCase();
      const filtered = data.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(keyword)
        )
      );
      render(filtered);
    });

    render(data);
  });
