import React, { useState, useEffect } from 'react'
import './App.css';
import BookTable from './components/tables/BookTable'
import AddBookForm from './components/forms/AddBookForm'
import EditBookForm from './components/forms/EditBookForm'
import Confirmation from './components/notifications/ConfirmationModal'
import Error from './components/notifications/ErrorModal'
import axios from 'axios';

function App() {


  const [books, setBooks] = useState([])
  

    useEffect( () => {
      axios.get('/api/home')
      .then( res => {
        setBooks(res.data)

      }).catch( err => {
        console.log(err)
        setErrorStatus(true)
      })
    }, [])
    

  const addBook = (book,id) => {
    book.id = id
    console.log(book.id)
    setBooks([...books, book])
  }

  const deleteBook = (id) => {
    console.log(id)
    setDeleteId(id)
    setDeleteConfirm(true)
  }

  const sortByValue = (value,order) => {

    
    axios.get('/api/home?sort='+value+'&order='+order)
      .then( res => {
        console.log(res.data)
        setBooks(res.data)

      }).catch( err => {
        console.log(err)
        setErrorStatus(true)
      })
  }

  const closeModal = (status) => {
    setDeleteConfirm(false)
  }
  const closeError = () => {
    setErrorStatus(false)
  }
  
  
  const [editing, setEditing] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
  const [deleteId, setDeleteId] = useState([])
  const [exportList, setExportList] = useState([])
  const initialFormState = { id: null, title: '', author: '' }
  const [currentBook, setCurrentBook] = useState(initialFormState)
  const [responseMessage, setResponseMessage] = useState([])
  const [validationmessage, setValidationMessage] = useState([])
  
  const setErrorModalStatus = (status) => {
    setErrorStatus(status)
  } 
  const setErrorModalMessage = (message) => {
    setResponseMessage(message)
  } 
  const editRow = (book) => {
    setEditing(true)
    setCurrentBook({ id: book.id, title: book.title, author: book.author })
  }

  const updateBook = (id, updatedBook) => {
    setEditing(false)
    setBooks(books.map((book) => (book.id === id ? updatedBook : book)))
  }

  const confirmdelete = (id) => {
    console.log(id)
    axios
        .post("/api/deletebooklist", {id})
        .then(res => {
            console.log(res.data);
            setDeleteConfirm(false)
            setErrorModalStatus(true)
            setErrorModalMessage(['Deleted',res.data.message])
            
        })
        .catch(err => {
            console.log(err);
            setErrorModalStatus(true)
            setErrorModalMessage(['Error',res.data.message])
        });

        setBooks(books.filter((book) => book.id !== id))
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
              <AddBookForm addBook={addBook} showModal={setErrorModalStatus} modalMessage = {setErrorModalMessage} validation={validationmessage}/>
            </div>
          )}
        <BookTable books={books} editRow={editRow} deleteBook={deleteBook} sortRow={sortByValue} export={setExportList} exportValue={exportList} showModal={setErrorModalStatus} modalMessage = {setErrorModalMessage} />
        <Confirmation show={deleteConfirm} deleteId={deleteId} confirmdelete={confirmdelete} close={closeModal}/>
        <Error show={errorStatus} message={responseMessage} close={closeError}/>
        
    </div>
  );
}

export default App;
