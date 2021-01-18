
const BookTable = (props) => {
  return (
    <div className='mt-5 md:w-2/3 mx-auto'>
         <div className="border-gray-500 border rounded text-left">
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