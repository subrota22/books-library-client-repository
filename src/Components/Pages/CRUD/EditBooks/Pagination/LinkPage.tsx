import { gql } from 'graphql-request';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
const LinkPage = () => {
    const [count, setCount] = useState(30);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    let pages = Math.ceil(count / pageSize);

    const SEND_PAGES:any = gql`
    mutation booksQuery($page: Int! , $size:Int!) {
        booksQuery(page:$page, size:$size) {
      _id
    }
    }
    `;
    const [sendPage , {error , loading , data} ] = useMutation(SEND_PAGES);

    React.useEffect(() => {
        sendPage({ variables: { page:page, size:pageSize } });
    }, [page  , pageSize , sendPage ]);
    return (
        <>
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

                        [...Array(pages).keys()]?.length > page + 1  &&
                        <button
                            className={`btn btn-primary text-white fs-5 fw-bold py-2 px-4 mx-3 ${pages === 1 &&  'hidden'}`}
                            onClick={() => setPage(page + 1)}>
                             <i className="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                             <i className="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                        </button>
                    }

                    {/* page size set  */}
                    <select className='btn btn-success text-white  fw-bold py-2 px-4 mx-3' onChange={(e:any) => setPageSize(e.target.value)}>
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
        </>
    );
};

export default LinkPage;