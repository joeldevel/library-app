
//get inputs
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.getElementsByName('read');

const table = document.querySelector('.display-books');
const createNewBook = document.querySelector('#create-new-book');


function checkRead(input) {
  for (let i of input) {
    if (i.checked) return i;
  }
}

let myLibrary = [];

function Book(title, author, pages, read ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  let readStatus = this.read ? 'already read' : 'not read yet';
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${readStatus}.`;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  const readStatus = checkRead(read).value;
  const book = new Book(title.value, author.value, parseInt(pages.value), parseBool(readStatus));

  myLibrary.push(book);
  appendBookToTable(book);
}

function displayBooks(books) {
  books.forEach(appendBookToTable);
}

function parseBool(str) {
    if(str.toLowerCase() === 'true') return true;
    if(str.toLowerCase() === 'false') return false;
}

function findBookIndex(title) {
  let index = myLibrary.findIndex( element => {
    if (element.title === title) {
      return true;
    }
  });
  return index;
}

function appendBookToTable(book) {
  const row = `<tr data-book-id="${findBookIndex(book.title)}">
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><button type="button" name="toggle-read-button">${book.read?'yes':'no'}</button></td>
      <td><button type="button" name="delete-button">delete</button></td>
  </tr>`;
  table.insertAdjacentHTML("beforeend", row);
}

function deleteBookFromTable(bookId) {
  const row = document.querySelector(`[data-book-id="${bookId}"]`);
  console.log(row);
  table.removeChild(row);

}

function updateReadStatus(bookId) {
  myLibrary[bookId].toggleReadStatus();
}


//********************************************************************/
//                          populate books
//********************************************************************/

let book1 = new Book('Ivy Gripped the Steps', 'Elizabeth Bowen', 23, true);
let book2 = new Book('A Good Investment', 'Joyce Cary', 14, false);
let book3 = new Book('The Killing Bottle', 'L. P. Hartley', 40, true);
let book4 = new Book('The Scapegoat', 'V. S. Pritchett', 38, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

displayBooks(myLibrary);

//********************************************************************/
//                    event listeners
//********************************************************************/

createNewBook.addEventListener('click', addBookToLibrary);

// add event listener to dinamically generated elements
// attach the listener to the body and then check for the target
// (the element clicked)
document.querySelector('body').addEventListener('click', function(event) {

  // row to delete
  const row = event.target.parentNode.parentNode;
  const id = row.getAttribute("data-book-id");

  if (event.target.name.toLowerCase() === 'delete-button') {
    deleteBookFromTable(id);
  }
  if( event.target.name.toLowerCase() === 'toggle-read-button') {
      // change data in myLibrary
    updateReadStatus(id);

    // update GUI
    const button = row.querySelector(`[name="toggle-read-button"]`);
    if(button.textContent==='yes') {
      button.textContent = 'no';
    }
    else if(button.textContent==='no') {
      button.textContent = 'yes';
    }
  }
});


//********************************************************************/
//               add functionality to book
//********************************************************************/
function toggleReadStatus() {
  this.read = !this.read;
}

Book.prototype.toggleReadStatus = toggleReadStatus;


// examples
// console.log(book1.info());

// Student.prototype.sayName = function() {
//   console.log(this.name)
// }


// let index = myArray.findIndex( element => {
//   if (element.name === 'Maria') {
//     return true;
//   }
// });

/*
for (let i of read) {
if (i.checked) {
    console.log(i);
  }
}
*/
