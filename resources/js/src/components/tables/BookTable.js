import React, {useState } from 'react'

const FileDownload = require('js-file-download');
const BookTable = (props) => {
  const [fileType, setFileType] = useState('CSV')
  const [exportType, setExportType] = useState('titleandauthor')


  const handleFileTypeInput = (event) => {
      setFileType(event.target.value)
  }
  const handleExportTypeInput = (event) => {
      setExportType(event.target.value)      
  }
  return (
    <div className='mt-5 md:w-2/3 mx-auto'>
         <div className="border-gray-500 border rounded text-left">
          <form className='todo-form bg-gray-100 p-4 w-full' onSubmit={event => {
            event.preventDefault()
            if(fileType == 'CSV')
            {
                axios
              .post("/api/exportcsv", [fileType,exportType])
              .then(res => {
                  FileDownload(res.data, 'book.csv');
              })
              .catch(err => {
                  props.showModal(true)
                  props.modalMessage(['Error',err.response.data['message']])
              });

            }
            else if(fileType == 'XML')
            {
              axios
              .post("/api/exportxml", [fileType,exportType])
              .then(res => {
                  FileDownload(res.data, 'book.xml');
              })
              .catch(err => {
                  props.showModal(true)
                  props.modalMessage(['Error',err.response.data['message']])
              });
  
            }
            }}>
            <select className="mx-1 border border-gray-500" defaultValue={fileType} onChange={handleFileTypeInput}>
              <option value="CSV">CSV</option>
              <option value="XML">XML</option>
            </select>
            <select className="mx-1 border border-gray-500" defaultValue={exportType} onChange={handleExportTypeInput}>
              <option value="titleandauthor">Title and Author</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select> 
            <button className='bg-blue-600 text-white py-1 px-2 mt-6 ml-5 rounded'>
              Download
            </button>
          </form>
         
          <table className="w-full table mb-0">
            <thead>
              <tr>
                <th className="font-semibold border border-r border-gray-500 p-2">Title 
                <button className='bg-blue-500 px-1 py-1 mx-1 text-white leading-none inline-block' onClick={() => {
                        props.sortRow('title','asc')
                      }}><i className="fas fa-sort-up"></i></button>
                <button className='bg-blue-500 px-1 py-1 mx-1 text-white leading-none inline-block' onClick={() => {
                        props.sortRow('title','desc')
                      }}><i className="fas fa-sort-down"></i></button>
                </th>
                <th className="font-semibold border border-r border-gray-500 p-2">Author
                <button className='bg-blue-500 px-1 py-1 mx-1 text-white leading-none inline-block' onClick={() => {
                        props.sortRow('author','asc')
                      }}> <i className="fas fa-sort-up"></i></button>
                <button className='bg-blue-500 px-1 py-1 mx-1 text-white leading-none inline-block' onClick={() => {
                        props.sortRow('author','desc')
                      }}> <i className="fas fa-sort-down"></i></button>

                </th>
                <th className="font-semibold border border-r border-gray-500 p-2">Edit</th>
                <th className="font-semibold border border-r border-gray-500 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              { props.books.length > 0 ? (
                props.books.map((book, index) => (
                  <tr key={index}>
                    <td className='border-r border border-gray-500 p-2'> {book.title} </td>
                    <td className='border-r border border-gray-500 p-2'>{book.author}</td>
                    <td className='border-r border border-gray-500 p-2'>
                    <button className='bg-blue-500 px-1 py-1 text-white leading-none block' onClick={() => {
                        props.editRow(book)
                      }}><i className="fas fa-edit"></i></button>
                    </td>
                    <td className='border border-gray-500 p-2'>
                        <button className='bg-red-500 px-2 py-1 text-white leading-none block' onClick={() => props.deleteBook(book.id)}><i className="fas fa-trash-alt"></i> </button>
                    </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No Books</td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>         
    </div>
  )
  
}

export default BookTable