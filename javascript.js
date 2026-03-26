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

function displayAllBooks() {
    const container = document.createElement("div");
    const table = createTable(myLibrary[0]);
    myLibrary.forEach(function (book){
        const row = appendRow(table, book);
        table.appendChild(row);
    });

    container.appendChild(table);
    const body = document.querySelector("body");
    body.prepend(container);
}

function createTable(book) {
    const table = document.createElement("table");
    table.style.margin = "0 auto";
    const row = document.createElement("tr");
    for (prop in book) {
        if (typeof book[prop] === "function") {
            continue;
        }
        const th = document.createElement("th");
        th.textContent = prop;
        table.appendChild(th);
        console.log(typeof book[prop]);
    }
    return table;
}

function appendRow(table, book) {
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






// const book1 = new Book("Harry Potter", "J.K. Rowling", 500, true);
// book1.info();
addBookToLibrary("Harry Potter", "Rowling", 500, false);
addBookToLibrary("Harry Potter2", "Rowling", 500, true);

console.log(myLibrary);
displayAllBooks();
