let myLibrary = [
  // {
  //   title: 'The Hobbit',
  //   author: 'J.R.R. Tolkien',
  //   pages: 234,
  //   read: true
  // },
  // {
  //   title: 'Hunger Games',
  //   author: 'Suzanna Collins',
  //   pages: 150,
  //   read: false
  // }
]

function Book(title, author, pages) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = false
}

function addBookToLibrary(book) {
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

const addBookForm = document.getElementById('add-book-form')
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const bookToAdd = new Book(
    event.target.elements[0].value,
    event.target.elements[1].value,
    event.target.elements[2].value
  )

  addBookToLibrary(bookToAdd)
  myLibrary.push(bookToAdd)

  event.target.elements[0].value = ''
  event.target.elements[1].value = ''
  event.target.elements[2].value = ''
})

function updateBooks() {
  if (myLibrary) {
    document.getElementById('books-wrapper').innerHTML = ''

    myLibrary.forEach((book) => addBookToLibrary(book))
  }
}

function setRead(book, readButton) {
  readButton.innerText = book.read ? 'Read' : 'Not Read'
}

updateBooks()
