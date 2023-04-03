import { useQuery } from "@tanstack/react-query";
import PageLoader from "Components/Shares/PageLoader/PageLoader";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';

const AllBooks = () => {
    const [searchData, setSearchData]: any = useState("");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    let pages = Math.ceil(count / pageSize);
    const [loadingPage, setLoadingPage] = useState<Boolean>(true);
    const [data, setData]: any = useState([]);

    const uri = `https://books-libarary.vercel.app/getBooks?page=${page}&size=${pageSize}`;
    //
    useQuery({
        queryKey: [page, pageSize],
        queryFn: () => fetch(uri, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setCount(data?.count);
                setData(data?.data);
                setLoadingPage(false);
            })
    })

    //search data
    const handleSearchFeild = (searchText: any) => {
        const findData: any = data?.filter((bookData: any) => bookData?.bookName?.toLowerCase().includes(searchText?.toLowerCase()));
        setSearchData(findData);
    }

    if (loadingPage) return <PageLoader></PageLoader>
    return (
        <>
            <Helmet> <title> All books  </title> </Helmet>

            {
                data?.length === 0 &&
                <h2 className="text-5xl font-extrabold text-info text-center h-screen mt-40">
                    <Typewriter
                        words={[' Books ', 'data', 'not', 'found !!']}
                        loop={Infinity}
                        cursor
                        cursorStyle='_'
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
            }
            {data?.length !== 0 && <>


                <div className="searchDiv my-8 flex justify-center ">
                    <input type="search" placeholder='Search by book name Example (Calculas)'
                        onChange={(e) => handleSearchFeild(e.target.value)} className='input input-primary w-full ml-5' />
                    <i className="fa-solid fa-magnifying-glass text-4xl ml-2 mr-6 btn btn-primary pb-7 pt-1 px-3"></i>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 gap-7">
                    {
                        searchData?.length === 0 && <>
                            {
                                data?.map((book: any) =>
                                    <div className="card w-96  h-auto bg-base-100 shadow-xl" key={book?._id} data-aos="zoom-in">
                                        <figure><img src={book?.bookImage ? book?.bookImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                            className="h-60 w-full" alt="Book" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title"> <span className="text-info">Book name : </span> {book?.bookName ? book?.bookName : "book name not found"}</h2>
                                            <h2 className="card-title"><span className="text-info">Author : </span>{book?.author ? book?.author : "author not found"}</h2>
                                            <p><span className="text-info">Description : </span>{book?.description ? book?.description?.length > 32 ?
                                                book?.description?.slice(0, 32) + "...." : book?.description : "book description not found"}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/details/${book?._id}`} className="btn btn-primary"> Show details<i className="fa-solid fa-arrow-right text-white  ml-3"></i> </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </>

                    }
                    {
                        searchData?.length !== 0 && <>
                            {
                                searchData?.map((book: any) =>
                                    <div className="card w-96  h-auto bg-base-100 shadow-xl" key={book?._id} data-aos="zoom-in">
                                        <figure><img src={book?.bookImage ? book?.bookImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                            className="h-60 w-full" alt="Book" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title"> <span className="text-info">Book name : </span> {book?.bookName ? book?.bookName : "book name not found"}</h2>
                                            <h2 className="card-title"><span className="text-info">Author : </span>{book?.author ? book?.author : "author not found"}</h2>
                                            <p><span className="text-info">Description : </span>{book?.description ? book?.description?.length > 32 ?
                                                book?.description?.slice(0, 32) + "...." : book?.description : "book description not found"}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/details/${book?._id}`} className="btn btn-primary"> Show details<i className="fa-solid fa-arrow-right text-white  ml-3"></i> </Link>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </>

                    }


                </div>
                {/* pagination start  */}
                {
                    <div className="text-center my-8">

                        {
                            //page + 1 >=
                            page + 1 >= [...Array(pages).keys()]?.length &&
                            <button
                                className={`btn btn-primary text-white fs-5 fw-bold py-2 px-4 mx-3 ${pages === 1 && 'hidden'}`}
                                onClick={() => setPage(page - 1)}>
                                <i className="fa-solid fa-chevron-left text-white text-lg font-bold"></i>
                                <i className="fa-solid fa-chevron-left text-white text-lg font-bold"></i>
                            </button>
                        }

                        {
                            [...Array(pages).keys()].map(pageNumber =>
                                <button className={`
                             ${pageNumber === page ? 'btn btn-primary mx-2 px-4 py-2 fs-5 fw-bold my-3'
                                        : 'btn px-4 fs-5 fw-bold py-2 btn-success mx-2'} `}
                                    onClick={() => setPage(pageNumber)}
                                >{pageNumber + 1}</button>
                            )
                        }

                        {

                            [...Array(pages).keys()]?.length > page + 1 &&
                            <button
                                className={`btn btn-primary text-white fs-5 fw-bold py-2 px-4 mx-3 ${pages === 1 && 'hidden'}`}
                                onClick={() => setPage(page + 1)}>
                                <i className="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                                <i className="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                            </button>
                        }

                        {/* page size set  */}
                        <select className='btn btn-success text-white  fw-bold py-2 px-4 mx-3' onChange={(e: any) => setPageSize(e.target.value)}>
                            <option className='text-info fw-bold' selected disabled> Select page size. </option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                            <option value="110">110</option>
                            <option value="120">120</option>
                            <option value="300">130</option>
                        </select>

                    </div>

                }

                {/* pagination end  */}

            </>}

        </>
    );
}

export default AllBooks;


