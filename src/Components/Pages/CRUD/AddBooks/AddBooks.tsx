import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import { useCallback, useContext, useState } from 'react';
import { AuthProvider } from 'UserContext/UserContext';
import { MdFileUpload } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';

const AddBooks = () => {

    const [book, setBook] = useState({});
    const [bookImage, setBookImage] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthProvider);

    //image bb key 
    const image_bb_key = process.env.REACT_APP_imageBbKey;

    //get form data 
    let formData = new FormData();
    formData.append("image", bookImage);

    //handle Input Feild
    const handleInputFeild = (event: any) => {
        const key = event.target.name;
        const value = event.target.value;
        let newValue: any = { ...book };
        newValue[key] = value;
        setBook(newValue);
    }

    const addNewBook = (event: any) => {
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
        const uri = `https://books-libarary.vercel.app/addBook`;
        if(!name){
            toast.info("Please provide your book image") ;
            setLoading(false) ;
            return ;
            }
        
        fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
            method: "POST",
            body: formData,
        },)
            .then(res => res.json())
            .then(data => {
                const bookImage = data.data?.url;

                fetch(uri, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...insertingData, bookImage: bookImage })
                })

                    .then(res => res.json())
                    .then(data => {
                        if (data?.acknowledged) {
                            toast.success("Congrasulation your new book added successfully!!");
                            setLoading(false);
                            event.target.reset();
                            setBookImage({});
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
        <Helmet> <title> Add book </title> </Helmet>
            <div className="container mx-auto shadow-2xl my-12 p-9 rounded-lg" style={{ "width": "40%" }}  data-aos="zoom-in">
                <div className="panel">

                    <div className="panel-body">

                        <form onSubmit={addNewBook} className="pb-6">
                            <p className="panel-title text-info my-4  font-extrabold">
                                ADD BOOK
                            </p>
                            <div className="form-control">
                                <label className="label" htmlFor="isbn">ISBN :</label>
                                <input type="text" className="input input-info" name="isbn"
                                    onChange={handleInputFeild} placeholder="Please enter ISBN" required />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="title">Book name :</label>
                                <input type="text" className="input input-info" name="bookName"
                                    onChange={handleInputFeild} placeholder="Please enter book name" required />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Author :</label>
                                <input type="text" className="input input-info" name="author"
                                    onChange={handleInputFeild} placeholder="Please enter author name" required />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="description">Description :</label>
                                <textarea className="input h-28 input-info pt-2 pb-7 px-4"
                                    onChange={handleInputFeild}
                                    name="description" placeholder="Please enter book description" rows={5} />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Publisher :</label>
                                <input type="text" className="input input-info" name="publisher"
                                    onChange={handleInputFeild}
                                    placeholder="Please enter publisher name" required />
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label" htmlFor="author">Published Date :</label>
                                <input type="date" className="input input-info" name="published_year"
                                    onChange={handleInputFeild}
                                    placeholder="Please published year" required />
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
                                                        <p>Drag and drop your book image here or click on this area to select an file </p>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>

                            <button type="submit" className="btn mt-9 w-full  px-14 mx-auto btn-primary">
                                {
                                    loading ? <BeatLoader color="white" /> : "Add book"
                                }
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBooks;