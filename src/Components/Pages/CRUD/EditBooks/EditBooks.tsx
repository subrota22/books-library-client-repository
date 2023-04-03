import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import { useCallback, useContext, useState } from 'react';
import { AuthProvider } from 'UserContext/UserContext';
import { useLoaderData } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';
import { Helmet } from 'react-helmet';

const EditBooks = () => {
    const bookDataGet: any = useLoaderData();
    const [book, setBook] = useState(bookDataGet);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthProvider);
    const [bookImage, setBookImage] = useState<any>({});
    const handleInputFeild = (event: any) => {
        const key = event.target.name;
        const value = event.target.value;
        let newValue: any = { ...book };
        newValue[key] = value;
        setBook(newValue);
    }
    //image bb key 
    const image_bb_key = process.env.REACT_APP_imageBbKey;

    //get form data 
    let formData = new FormData();
    formData.append("image", bookImage);


    const editBook = (event: any) => {
        event.preventDefault();
        setLoading(true);
        const insertingData = {
            name: user?.displayName,
            email: user?.email,
            profilePicture: user?.photoURL,
            ...book,
            date: new Date()
        }
        //send post data 
        const uri = `https://books-libarary.vercel.app/editBook?id=${bookDataGet._id}&email=${user?.email}`;

        fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
            method: "POST",
            body: formData,
        },)
            .then(res => res.json())
            .then(data => {
                const bookImage = data.data?.url;

                fetch(uri, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        authentication: `Bearer ${localStorage.getItem("book-store")} `,
                    },
                    body: JSON.stringify({ ...insertingData, bookImage: bookImage ? bookImage : bookDataGet?.bookImage })
                })
                    .then(res => {
                        if (res.status === 403) {
                            toast.warning("  😩 😩 You do have'nt access to edit this data. ");
                            setLoading(false);
                            return;
                        } else {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data?.acknowledged) {
                            toast.success("Congrasulation your book data updated successfully!!");
                            setLoading(false);
                        }

                    }).catch(error => {
                        setLoading(false);
                        console.log(error);
                    })
            });

    };
    const { name }: any = bookImage;

    //on drop image callback 
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        setBookImage(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <Helmet> <title> Edit boook </title> </Helmet>
            <div className="container mx-auto shadow-2xl my-12 p-9 rounded-lg" style={{ "width": "40%" }}>
                <div className="panel">

                    <div className="panel-body">

                        <form onSubmit={editBook} className="pb-20">
                            <p className="panel-title text-info my-4  font-extrabold">
                                EDIT BOOK
                            </p>
                            <div className="form-control">
                                <label className="label" htmlFor="isbn">ISBN:</label>
                                <input type="text" className="input input-info" name="isbn"
                                    onChange={handleInputFeild} defaultValue={`${bookDataGet?.isbn}`} placeholder="Please enter ISBN" />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="title">Book name:</label>
                                <input type="text" className="input input-info" name="bookName"
                                    defaultValue={`${bookDataGet?.bookName}`} onChange={handleInputFeild} placeholder="Please enter book name" />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Author:</label>
                                <input type="text" className="input input-info" name="author"
                                    onChange={handleInputFeild} defaultValue={`${bookDataGet?.author}`}
                                    placeholder="Please enter author name" />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="description">Description:</label>
                                <textarea className="input h-28 input-info pt-2 pb-7 px-4"
                                    onChange={handleInputFeild} defaultValue={`${bookDataGet?.description}`}
                                    name="description" placeholder="Please enter book description" rows={5} />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Publisher:</label>
                                <input type="text" className="input input-info" name="publisher"
                                    onChange={handleInputFeild} defaultValue={`${bookDataGet?.publisher}`}
                                    placeholder="Please enter publisher name" />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Published Date:</label>
                                <input type="date" className="input input-info" name="published_year"
                                    onChange={handleInputFeild} defaultValue={`${bookDataGet?.published_year}`}
                                    placeholder="Please published year" />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Book image :</label>
                                <div {...getRootProps()} className="hover:cursor-pointer">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <div className='border-2 border-dotted py-6 px-2 text-info rounded-md border-lime-600  text-center '>
                                                <BeatLoader color="white" />
                                                <p> Your book image is uploading ....  </p>
                                            </div>

                                            :

                                            <div className='border-2 border-dashed py-6 px-2 rounded-md border-lime-600 '>
                                                <MdFileUpload className='text-center text-3xl font-bold text-info
                                                  mx-auto '></MdFileUpload>
                                                {
                                                    name ? <p> Your book image name is  {name}</p> :
                                                        <>
                                                            <p>Drag and drop your book image here or click on
                                                                this area to select an file </p>
                                                            <img src={bookDataGet?.bookImage ? bookDataGet?.bookImage : "https://i.ibb.co/RSCmwXf/imagenot.jpg"}
                                                                className="h-20 w-20 rounded-full border-2 border-info mx-auto my-4" alt="book" />
                                                        </>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <button type="submit" className="btn my-7 w-full float-right px-14 text-white mx-auto btn-primary">
                                {
                                    loading ? <BeatLoader color="white" /> : "Save book"
                                }
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBooks;