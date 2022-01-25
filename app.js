let myLibrary = []

// Book constructor
function Book(title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = false
}

// Add book to library
function addBookToLibrary(book) {
  console.log('add book to libr')
  const newBook = document.createElement('div')
  newBook.classList.add('book-card')

  const newBookTitle = document.createElement('h4')
  newBookTitle.innerText = book.title

  const newBookAuthor = document.createElement('p')
  newBookAuthor.innerText = book.author

  const newBookPages = document.createElement('p')
  newBookPages.innerText = `${book.pages} pages`

  const newBookRead = document.createElement('button')
  setRead(newBook, newBookRead)

  newBookRead.addEventListener('click', () => {
    book.read = !book.read
    setRead(book, newBookRead)
  })

  // Delete book from library
  const newBookDelete = document.createElement('button')
  newBookDelete.innerHTML = 'Delete'
  newBookDelete.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(newBook), 1)
    updateBooks()
  })

  newBook.append(
    newBookTitle,
    newBookAuthor,
    newBookPages,
    newBookRead,
    newBookDelete
  )

  document.getElementById('books-wrapper').append(newBook)
}

// Book form logic
const addBookForm = document.getElementById('add-book-form')
addBookForm.addEventListener('submit', (event) => {
  console.log('submited form')
  event.preventDefault()

  const bookToAdd = new Book(
    event.target.elements[0].value,
    event.target.elements[1].value,
    event.target.elements[2].value
  )

  addBookToLibrary(bookToAdd)
  myLibrary.push(bookToAdd)
  clearForm(addBookForm)
  hide(addBookForm)
})

// Update books in library
function updateBooks() {
  if (myLibrary) {
    document.getElementById('books-wrapper').innerHTML = ''
    myLibrary.forEach((book) => addBookToLibrary(book))
  }
}

// Trigger form to show
const addBookButton = document.getElementById('add-book-button')
addBookButton.addEventListener('click', (button) => {
  if (addBookForm.dataset.show === 'true') {
    hide(addBookForm)
    addBookForm.dataset.show = 'false'
  } else {
    show(addBookForm)
    addBookForm.dataset.show = 'true'
  }
})

// Close book form
const addBookFormClose = document.getElementById('add-book-form__close')
addBookFormClose.addEventListener('click', (event) => {
  event.preventDefault()
  clearForm(addBookForm)
  hide(addBookForm)
})

// Helper functions
function hide(element) {
  element.classList.remove('show')
  element.classList.add('hide')
}

function show(element) {
  element.classList.remove('hide')
  element.classList.add('show')
}

function setRead(book, readButton) {
  readButton.innerText = book.read ? 'Read' : 'Not Read'
}

function clearForm(form) {
  const formInputElements = form.children

  for (i = 0; i < formInputElements.length; i++) {
    if (
      formInputElements[i].nodeName === 'INPUT' &&
      (formInputElements[i].type === 'text' ||
        formInputElements[i].type === 'number')
    ) {
      formInputElements[i].value = ''
    }
  }
}

updateBooks()
