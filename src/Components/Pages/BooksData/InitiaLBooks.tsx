// import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import { Mutation } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import PageLoader from 'Components/Shares/PageLoader/PageLoader';

interface BooksData {
  books: BooksData[];
  _id: String;
  isbn: String;
  title: String;
  author: String;
  description: String;
  published_year: any;
  publisher: String;
  updated_date: any;
  book: any;
}

interface BooksDataVars {
  bookId: String;
}

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

const DefultBooksData = () => {
  const { loading, data } = useQuery <BooksData, BooksDataVars>(
    GET_BOOKS
  );
//


  return (
    <>
      {loading ? (
        <PageLoader></PageLoader>
      ) : (
        <div className="container">
          <div className={`panel`}>
    
          {  <div className="overflow-x-auto ">
                <table className="table w-full rounded-2xl h-screen  mb-20 shadow-2xl">
                  {/* head*/}
                  <thead className='text-info text-xl font-bold'>
                    <tr>
                      <th>Serial number </th>
                      <th>Book name</th>
                      <th>Author</th>
                      <th>Show details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.books.map((book: any, index: any) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{book.title}</td>
                        <td>{book?.author}</td>
                        <td><Link to={`/details/${book?._id}`} className="btn btn-primary"> Show details </Link> </td>
                      </tr>
                    ))}
                  
                  </tbody>
                </table>
              </div>}
          </div>
        </div>


      )}
  <>
            
        </>
    </>
  )
};


export default DefultBooksData;