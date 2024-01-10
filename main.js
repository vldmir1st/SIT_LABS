async function getResponse() {
    let response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/todos"
    );
    let content = await response.json();

    let list = document.querySelector(".rows");

    for (let key in content) {
        list.innerHTML += `
            <tr class="row">
                <td>${content[key].userId}</td>
                <td>${content[key].title}</td>
                <td>${content[key].completed}</td>
            </tr>
        `;
    }
}

getResponse();
