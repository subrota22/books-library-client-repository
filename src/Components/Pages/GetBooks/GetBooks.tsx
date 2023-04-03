import React, {  useState } from "react" ;
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import { Mutation } from 'react-apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
     booksQuery{
        _id
        title
        author
        published_year
  }

  }`; 


  
const SEND_PAGE = gql`
mutation booksQuery(
    $page: String!,
    $size: String!
    )
     {
        booksQuery(
        page: $page,
        size: $size
      ) 
  }

`;

// mutation addBook(
//     $isbn: String!,
//     $title: String!,
//     $author: String!,
//     $description: String!,
//     $publisher: String!,
//     $published_year: Int!
    
//     )  {
//     addBook(
//         isbn: $isbn,
//         title: $title,
//         author: $author,
//         description: $description,
//         publisher: $publisher,
//         published_year: $published_year
//         )   {
//         _id
//     }
// }

const GetBooks = () => {

  const { loading, data } = useQuery<BooksData, BooksDataVars>(
    GET_BOOKS
  );

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  let pages = Math.ceil(count / pageSize);

//
const [sendPageNumbers, {error  }] = useMutation(SEND_PAGE);

  React.useEffect(() => {
  sendPageNumbers({ variables: { page: page, pageSize: pageSize} });
  }, [page , pageSize , sendPageNumbers]);


// console.log(" <----------- data -----------> " , data , sendPageNumbers );
  return (
    <>


      {loading ? (
        <PageLoader></PageLoader>
      ) : (
        <div className="container">
          <div className="panel">
            <div className="panel-heading flex justify-between my-9 mx-6 flex-col lg:flex-row ">
              <p className="panel-title text-3xl mt-5 animate-pulse duration-1000  font-bolder text-center text-success uppercase">
                LIST OF BOOKS
              </p>
              <p className='btn btn-primary mx-7'><Link to="/add-books">Add Book</Link></p>
            </div>
              <div className="overflow-x-auto">
                <table className="table w-full rounded-2xl h-screen  mb-20 shadow-2xl">
                  {/* head*/}
                  <thead className='text-info text-xl font-bold'>
                    <tr>
                      <th>Serial number </th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Show details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.books.map((book: any, index: any) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{book.title}</td>
                        <td>{book?.title}</td>
                        <td><Link to={`/details/${book?._id}`} className="btn btn-primary"> Show details </Link> </td>
                      </tr>
                    ))}
                  
                  </tbody>
                </table>
              </div>
          </div>
        </div>


      )}
    </>
  )
};


export default GetBooks;