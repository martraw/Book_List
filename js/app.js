// Book constructor
function Book(title, author, isbn) {
  this.title  = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {

}
//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');
  //Create new row in table
  const row = document.createElement('tr');

  row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td class="delete-td"><span class="delete">X</span></td>`;

  // Append new row to table                  
  list.appendChild(row);
} 

UI.prototype.clearFormFields = function() {
  const formFields = document.querySelectorAll('.form-input');
  
  formFields.forEach(field => {
    field.value = '';
  })
}

// instatniate UI object
const ui = new UI();

document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get input values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Instatiate book
  const book = new Book(title, author, isbn)

  //Add book to list
  ui.addBookToList(book);

  ui.clearFormFields();

  e.preventDefault()
})