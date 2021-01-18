import React, { useState, useEffect } from 'react'
import './App.css';
import BookTable from './components/tables/BookTable'
import AddBookForm from './components/forms/AddBookForm'
import EditBookForm from './components/forms/EditBookForm'
import axios from 'axios';

function App() {


  const [books, setBooks] = useState([])
  

    useEffect( () => {
      axios.get('/api/home')
      .then( res => {
        setBooks(res.data)

      }).catch( err => {
        console.log(err)

      })
    }, [])
    

  const addBook = (book,id) => {
    book.id = id
    console.log(book.id)
    setBooks([...books, book])
  }

  const deleteBook = (id) => {
    console.log(id)
  }

  const sortByValue = (value,order) => {

    
    axios.get('/api/home?sort='+value+'&order='+order)
      .then( res => {
        console.log(res.data)
        setBooks(res.data)

      }).catch( err => {
        console.log(err)

      })
  }

  
  
  const [editing, setEditing] = useState(false)
  const [exportList, setExportList] = useState([])
  const initialFormState = { id: null, title: '', author: '' }
  const [currentBook, setCurrentBook] = useState(initialFormState)
  
  const editRow = (book) => {
    setEditing(true)
    setCurrentBook({ id: book.id, title: book.title, author: book.author })
  }

  const updateBook = (id, updatedBook) => {
    setEditing(false)
    setBooks(books.map((book) => (book.id === id ? updatedBook : book)))
  }


  return (
    <div className='main-area px-4'>
        <h1 className='text-4xl text-center mt-20 font-bold'>BookList Application</h1>
          {editing ? (
            <div>
              <EditBookForm
                setEditing={setEditing}
                currentBook={currentBook}
                updateBook={updateBook}
                showModal={setErrorModalStatus} 
                modalMessage = {setErrorModalMessage}
              />
            </div>
          ) : (
            <div>
              <AddBookForm addBook={addBook}/>
            </div>
          )}
        <BookTable books={books} editRow={editRow} deleteBook={deleteBook} sortRow={sortByValue} export={setExportList} exportValue={exportList} />        
    </div>
  );
}

export default App;
