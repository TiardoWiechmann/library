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
    const id = crypto.randomUUID;
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}

/* const book1 = new Book("Harry Potter", "J.K. Rowling", 500, true);
book1.info(); */
addBookToLibrary("Harry Potter", "Rowling", 500, false);

console.log(myLibrary);