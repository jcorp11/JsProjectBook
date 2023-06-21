let library;
const DEFAULT_DATA = [
  { name: "The Lord of the Rings", author: "Tolkien", status: "read" },
  {
    name: "Alice in Wonderland",
    author: "Lewis Caroll",
    status: "not read",
  },
  { name: "Naruto", author: "Masashi Kishimoto", status: "read" },
];

function Book(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
}


// const for accesing the dom
const name = document.querySelector("#name"); // <input type="text" id="name">
const author = document.querySelector("#author"); // <input type="text" id="author">
const status = document.querySelector("#status"); // <input type="text" id="status">
const table = document.querySelector("#book-table-body"); //input type="text" id="book-table-body">
const form = document.querySelector("form");

library = DEFAULT_DATA;

function render(){
    let htmlBook = "";
    library.forEach((book)=>{
        htmlBook += `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td><button class="status-button">${book.status}</button></td>
            <td><button class="delete">delete</button></td>
        <tr>
        `;
    })

    table.innerHTML = htmlBook;

}

form.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents the page from reloading
    addBookToLibrary();
    render();
});


function addBookToLibrary(){
  if(name.value.length === 0 || author.value.length === 0){
    alert("Please, fill all the fields");
    return;
  }
  const newBook = new Book(name.value, author.value, status.value);
  library.push(newBook);
}

table.addEventListener("click", (e)=>{
  const currentTarget = e.target;
  const bookName = currentTarget.parentNode.parentNode.childNodes[1].innerText;
  // console.log(currentTarget.parentNode.parentNode.childNodes);
  if(currentTarget.classList.contains("status-button")){
    changeStatus(bookIndex(bookName));
  }
  if(currentTarget.classList.contains("delete")){
    deleteBook(bookIndex(bookName));
  }
  render();
})

function changeStatus(bookIndex){ //es el indice
  if(library[bookIndex].status === "read"){
    library[bookIndex].status = "not read";
  }else library[bookIndex].status = "read";
}

function bookIndex(bookName){
  for(let i = 0; i < library.length; i++){
    if(library[i].name === bookName){
      return i;
    }
  }
}

function deleteBook(bookIndex){
  library.splice(bookIndex, bookIndex + 1);
}

//Initial render
render();