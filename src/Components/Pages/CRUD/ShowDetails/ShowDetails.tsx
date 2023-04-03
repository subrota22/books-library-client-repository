import { NavLink, useLoaderData } from 'react-router-dom';
import PageLoader from 'Components/Shares/PageLoader/PageLoader';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Typewriter } from 'react-simple-typewriter';

const ShowDetails = () => {
  const bookDataGet: any = useLoaderData();
  const [loadingPage, setLoadingPage] = useState<Boolean>(true);
  const [data, setData]: any = useState({});
  const uri = `https://books-libarary.vercel.app/bookData/${bookDataGet._id}`;
  useQuery({
    queryKey: [bookDataGet._id],
    queryFn: () => fetch(uri, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoadingPage(false);
      })
  })

  return (
    <>
      <Helmet> <title>  Book details  </title> </Helmet>
      <div>

        <h2 className="text-5xl font-extrabold text-info text-center mb-10 m-10">
          <Typewriter
            words={['Book name', data.bookName ? data.bookName : "Book name not found !!"]}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        {loadingPage ? (
          <PageLoader></PageLoader>
        ) : (
          <div className="card  bg-base-100 shadow-xl h-auto mx-auto mb-10" key={data?._id} style={{ width: "60%" }}>
            <figure><img src={data?.bookImage ? data?.bookImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
              className="h-60 w-full" alt="Book" /></figure>
            <div className="card-body">
              <h2 className="card-title"> <span className="text-info">Book name : </span> {data?.bookName ? data?.bookName : "book name not found"}</h2>
              <h2 className="card-title"><span className="text-info">Author : </span>{data?.author ? data?.author : "author not found"}</h2>
              <p><span className="text-info">Description : </span>{data?.description ? data?.description : "book description not found"}</p>
            </div>
          </div>
        )}


        <div className='text-center'>
          <NavLink to="/" className="btn btn-primary mx-auto mb-6" style={{ width: "60%" }}>Go back</NavLink>
        </div>

      </div>
    </>
  );
};

export default ShowDetails;


