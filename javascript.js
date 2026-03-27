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
    row.setAttribute("book_id", book.id);
    const newRow = addButtonToRow(row, book.id, "d");
    return addButtonToRow(row, book.id, "r");
}


function addButtonToRow(row, book_id, mode) {
    const btn = document.createElement("td");
    if(mode === "d"){
        btn.textContent = "Delete";
        btn.setAttribute("data-book_b_id", book_id); 
    }
    else {
        btn.textContent = "Toggle read";
        btn.setAttribute("data-book_r_id", book_id); 
    }
    row.appendChild(btn);
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


function updateTable(e, inserted) {
    e.preventDefault();
    const container = document.querySelector(".container");
    const table = document.querySelector("table");
    if (table !== null){
        container.removeChild(table);
    }

    if(inserted){
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").value;
        addBookToLibrary(title, author, pages, read);
        dialog.close();
        clearInputs();
    }
    displayBooks();
}


// Table must be updated after deletion of a row
function updateLibrary(book_b_id) {
    let delBook;
    myLibrary.forEach((book) => {
        if (book.id == book_b_id){
            delBook = book;
        }
    });
    const i = myLibrary.indexOf(delBook);
    myLibrary.splice(i, 1);
}


Book.prototype.toggleRead = function () {
    if (this.read.toLowerCase() === "no") {
        this.read = "yes";
    }
    else {
        this.read = "no";
    }
};


const myLibrary = [];

// When button is clicked, the user should be able to insert book infos
const newBook = document.querySelector(".outer");
const dialog = document.querySelector("dialog");
newBook.addEventListener("click", () => {
    dialog.showModal();
})

// Add book details by pressing submit button
const submit = document.querySelector(".inner");
const inserted = true;
submit.addEventListener("click", (e) => updateTable(e, inserted));

// When delete button is clicked, associated row must be deleted
const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
    // Delete Book
    let book_id = e.target.dataset.book_b_id;
    if(book_id !== undefined){
        updateLibrary(book_id);
    }
    // Toggle read
    book_id = e.target.dataset.book_r_id;
    console.log(e.target, book_id);
    if(book_id !== undefined) {
        myLibrary.forEach((book) => {
            if (book.id === book_id) {
                book.toggleRead();
            }
        })
    }
    const inserted = false;
    updateTable(e, inserted);
})