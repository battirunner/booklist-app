import React, { useState } from 'react'

const AddBookForm = (props) => {
    const initialFormState = { id: null, title: '', author: '' }
    const [book, setBook] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
      
        setBook({ ...book, [name]: value })
    }

  return (
    <div className='mt-12 md:w-2/3 mx-auto'>
        <div className="border-gray-500 border rounded text-left">
            <form className='todo-form bg-gray-100 p-8 w-full' onSubmit={event => {
                    event.preventDefault()
                    if (!book.title || !book.author)
                        return
         

                    axios
                    .post("/api/addbooklist", book)
                    .then(res => {
                        console.log(res.data,res.data.id)
                        props.addBook(book,res.data.id)
                        setBook(initialFormState)
                    })
                    .catch(err => {
                        console.log(err.response);
                    });

                    
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
                        
                        className='w-3/4 py-1 px-2 border-gray-500 border-2 rounded bg-white'
                        value={book.author}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='border-t mt-12'>
                    <button className='bg-blue-600 text-white py-1 px-2 mt-6 ml-40 rounded'>
                        Add
                    </button>
                </div>          

            </form>
        </div>
        
     </div>   
    
  )
}

export default AddBookForm