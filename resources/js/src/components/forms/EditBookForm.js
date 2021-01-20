import React, { useState, useEffect } from 'react'

const EditBookForm = (props) => {

  const [book, setBook] = useState(props.currentBook)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setBook({ ...book, [name]: value })
  }

  useEffect(() => {
    setBook(props.currentBook)
  }, [props])

  return (
    <div className='mt-20 md:w-2/3 mx-auto'>
        <div className="border-gray-500 border rounded text-left">

            <form className='todo-form bg-gray-100 p-8 w-full' onSubmit={event => {
                    event.preventDefault()

                    axios
                    .post("/api/editbooklist", book)
                    .then(res => {
                        props.showModal(true)
                        props.modalMessage(['Updated',res.data.message])
                    })
                    .catch(err => {
                        props.showModal(true)
                        props.modalMessage(['Error',err.response.data['message']])
                    });

                    props.updateBook(book.id, book)
                }}>
                
                <div className='form-group mb-4 flex'>
                    <label htmlFor='title' className='w-1/4 block font-bold'> Book Title
                        <span className='text-red-500'>*</span>
                    </label>
                    <input
                        placeholder='Add book'
                        type='text'
                        name='title'
                        className='todo-input edit w-3/4 py-1 px-2 border-gray-500 border-2 rounded bg-white'
                        value={book.title}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='form-group mb-4 flex'>
                    <label htmlFor='author' className='w-1/4 block font-bold'>Author
                        <span className='text-red-500'>*</span>
                    </label>
                    <input
                        placeholder='Add Author'
                        type='text'
                        name='author'
                        className='todo-input edit w-3/4 py-1 px-2 border-gray-500 border-2 rounded bg-white'
                        value={book.author}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='md:block flex border-t mt-12'>
                    <button className='bg-yellow-400 text-black py-1 px-2 mt-6 ml-12 md:ml-40 rounded'>
                        Update Book
                    </button>
                    <button
                        onClick={() => props.setEditing(false)}
                        className="bg-blue-600 text-white py-1 px-2 mt-6 ml-12 md:ml-40 rounded"
                    >
                        Cancel
                    </button>
                </div>          

            </form>
        </div>
    </div> 
  )
}

export default EditBookForm
