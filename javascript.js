const myLibrary = [];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        const r = this.read ? "read it" : "not read it yet";
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${r}`);
    }
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}


function displayBooks() {
    const container = document.querySelector(".container");
    const properties = ["id", "title", "author", "pages", "read"];
    const table = createTable(properties);
    myLibrary.forEach(function (book){
        const row = appendRow(book);
        table.appendChild(row);
    });

    container.appendChild(table);
}


function createTable(properties) {
    const table = document.createElement("table");
    table.style.margin = "0 auto";
    const row = document.createElement("tr");
    for (prop of properties) {
        const th = document.createElement("th");
        th.textContent = strToTitle(prop);
        row.appendChild(th);
    }
    table.appendChild(row);
    return table;
}

function appendRow(book) {
    const row = document.createElement("tr");
    for (prop in book) {
        if (typeof book[prop] === "function") {
            continue;
        }
        const cell = document.createElement("td");
        cell.textContent = book[prop];
        row.appendChild(cell);
    }
    return row;
}


function strToTitle(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function clearInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    })
};



// When button is clicked, the user should be able to insert book infos
const newBook = document.querySelector(".outer");
const dialog = document.querySelector("dialog");

newBook.addEventListener("click", () => {
    dialog.showModal();
})


function updateTable(e) {
    e.preventDefault();
    const container = document.querySelector(".container");
    const table = document.querySelector("table");
    if (table !== null){
        container.removeChild(table);
    }

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    addBookToLibrary(title, author, pages, read);
    dialog.close();
    displayBooks();
    clearInputs();
}


const submit = document.querySelector(".inner");
submit.addEventListener("click", updateTable);



