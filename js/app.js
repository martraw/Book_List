// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {
  addBookToList(book) {
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

  clearFormFields() {
    const formFields = document.querySelectorAll('.form-input');

    formFields.forEach(field => {
      field.value = '';
    });
  }

  showMessage(message, cssClass) {
    const messageBox = document.querySelector('#message-box');
    //Create message element
    const div = document.createElement('div');
    div.className = `message ${cssClass}`;
    div.innerText = message;
    
    //Append message element to message box
    messageBox.appendChild(div);

    //Remove message after 3s.
    setTimeout(() => {
      messageBox.removeChild(div);
    }, 3000);
  }
  
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

// Instantiate UI object
const ui = new UI();

// Local Storage class

class LStorage {
  //Get books from LS
  static getBooks() {
    let books;
    //Check if there are any books in LS
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  //Add books from LS to table
  static displayBooks() {
    const books = LStorage.getBooks();
    
    books.forEach(book => {
      ui.addBookToList(book);
    })
  }

  //Add book to Local Storage
  static addBookToLS(book) {
    const books = this.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  //Remove book from Local Storage
  static removeBookFromLS(isbn) {
    const books = this.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}


//Gets books from Local Storage after page load
document.addEventListener('DOMContentLoaded', LStorage.displayBooks);

// Event listenter for add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get input values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  //Validate form fields

  if (title === '' || author === '' || isbn === '') {
    // Show appropriate message
    ui.showMessage('Please fill in all fields!', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add to Local Storage
    LStorage.addBookToLS(book);

    //Clear form fields
    ui.clearFormFields();
    
    ui.showMessage('Book added', 'success');
  }

  e.preventDefault();
});

// Event listenter for remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //Remove book from list
  ui.deleteBook(e.target);

  //Remove book from Local Storage
    //Gets isbn field text conttent
  LStorage.removeBookFromLS(e.target.parentElement.previousElementSibling.textContent);
  ui.showMessage('Book deleted!', 'success');
  e.preventDefault();
});
