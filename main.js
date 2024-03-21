function createTableRow(task) {
    var tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${task.userId}</td>
      <td>${task.title}</td>
      <td>${task.completed}</td>
  `;
    return tableRow;
}

// Функция для отрисовки таблицы
function renderTable(tasks) {
    var tableBody = document.getElementById("rows");
    tableBody.innerHTML = ""; // Очищаем таблицу перед заполнением

    tasks.forEach(function (task) {
        var tableRow = createTableRow(task);
        tableBody.appendChild(tableRow);
    });
}

// Функция для сортировки таблицы по столбцу
function sortTable(columnName) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.sort(function (a, b) {
        if (a[columnName] < b[columnName]) return -1 * sortOrder;
        else return 1 * sortOrder;
    });
    renderTable(tasks);
}

// грузим таблицу с json
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("tasks", JSON.stringify(data));
            renderTable(data);
        })
        .catch((error) => console.error("Ошибка загрузки данных:", error));
});

let sortOrder = 1;
let lastSortedField = "";

// Обработка клика
document.addEventListener("click", function (event) {
    if (event.target.tagName === "TH") {
        var columnName = event.target.dataset.column;
        checkColumn(columnName);
        sortTable(columnName);
    }
});

function checkColumn(columnName) {
    if (lastSortedField === columnName) {
        sortOrder *= -1;
    } else {
        lastSortedField = columnName;
        sortOrder = 1;
    }
}
