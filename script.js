"use strict";

const form = document.querySelector("#form");
const newBook = document.querySelector("#new-book");
const overlay = document.querySelector(".overlay");
const bookshelf = document.querySelector(".bookshelf");
let books = JSON.parse(localStorage.getItem("books")) || [];
let formOpen = false;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(i) {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);

    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${title}`;

    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${author}`;

    let pageNode = document.createElement("h3");
    pageNode.innerHTML = `Pages: ${pages}`;

    let readNode = document.createElement("h3");
    readNode.innerHTML = `Read? ${read}${read === "Yes" ? "😃" : "😢"}`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

    let trashNode = document.createElement("button");
    trashNode.classList = "trash";
    trashNode.innerHTML = `Delete <i class="fas fa-trash-alt"></i>`;

    const book = new Book(title, author, pages, read);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);
    form.reset();

    // update book status
    updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read? No 😢") {
            readNode.innerHTML = "Read? Yes 😃";
            book.read = "Yes";
            localStorage.setItem("books", JSON.stringify(books));
        } else {
            readNode.innerHTML = "Read? No 😢";
            book.read = "No";
            localStorage.setItem("books", JSON.stringify(books));
        }
    });

    // delete book
    trashNode.addEventListener("click", () => {
        bookshelf.removeChild(bookNode);
        books.splice(books.indexOf(book), 1);
        localStorage.setItem("books", JSON.stringify(books));
    });
}

function getBooks() {
    books.forEach((book, i) => {
        let bookNode = document.createElement("div");
        bookNode.classList.add("book");
        bookNode.setAttribute("data-index", `${i}`);

        let titleNode = document.createElement("h2");
        titleNode.innerHTML = `Title: ${book.title}`;

        let authorNode = document.createElement("h3");
        authorNode.innerHTML = `Author: ${book.author}`;

        let pageNode = document.createElement("h3");
        pageNode.innerHTML = `Pages: ${book.pages}`;

        let readNode = document.createElement("h3");
        readNode.innerHTML = `Read? ${book.read}${book.read === "Yes" ? "😃" : "😢"}`;

        let updateNode = document.createElement("button");
        updateNode.classList = "update";
        updateNode.innerHTML = `Update <i class="fas fa-pen"></i>`;

        let trashNode = document.createElement("button");
        trashNode.classList = "trash";
        trashNode.innerHTML = `Delete <i class="fas fa-trash-alt"></i>`;

        bookNode.appendChild(titleNode);
        bookNode.appendChild(authorNode);
        bookNode.appendChild(pageNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(updateNode);
        bookNode.appendChild(trashNode);
        bookshelf.appendChild(bookNode);

        // update book status
        updateNode.addEventListener("click", () => {
            if (readNode.innerHTML === "Read? No 😢") {
                readNode.innerHTML = "Read? Yes 😃";
                book.read = "Yes";
                localStorage.setItem("books", JSON.stringify(books));
            } else {
                readNode.innerHTML = "Read? No 😢";
                book.read = "No";
                localStorage.setItem("books", JSON.stringify(books));
            }
        });

        // delete book
        trashNode.addEventListener("click", () => {
            bookshelf.removeChild(bookNode);
            books.splice(books.indexOf(book), 1);
            localStorage.setItem("books", JSON.stringify(books));
        });
    });
}

window.addEventListener("load", getBooks);

form.addEventListener("submit", (e, i) => {
    e.preventDefault();
    addBook(i);
});
