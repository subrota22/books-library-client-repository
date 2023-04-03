import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { MdFileUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import GetBooks from '../GetBooks/GetBooks';

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [bookInfo, setBookInfo] = useState<any>({});

  //navigate
  const navigate = useNavigate();

  //image bb key 
  const image_bb_key = process.env.REACT_APP_imageBbKey;
  //get form data 
  let formData = new FormData();
  formData.append("image", profile);

  const { name }: any = profile;

  //save user information in the mongo atlas 
  const collectNewBook = (bookPicture: String) => {
    setLoading(true);
      const bookCollectionData = {
      ...bookInfo,
      bookImage: bookPicture,
      date: new Date().toLocaleDateString(),
    }


    fetch("https://books-libarary.vercel.app/grpahql", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(bookCollectionData)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.existed) {
          toast.info("Already this book inserted please try another.");
          setLoading(false);
          return;
        }
        if (data.insertedId) {
          setLoading(false);
          toast.success("Congratulation your book added  successfully 😀 ");
          navigate("/");
        }
      }).catch(error => {
        setLoading(false);
        console.log(" Error: ", error)
      })
  }

//





  //submit form data 
  const handleSubmitForm = (e:any) => {
    e.preventDefault();
    //create new user email and password based 
    setLoading(true);
    fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`, {
      method: "POST",
      body: formData,
    },)
      .then(res => res.json())
      .then(data => {
        const bookImage = data.data?.url;
        collectNewBook(bookImage);
        e.target.reset() ;
        setProfile({}) ;
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);

      })
  }


  //hanldeInputFeilds
  const hanldeInputFeilds = (e: any) => {
    const feild = e.target.name;
    const value = e.target.value;
    let newValue = { ...bookInfo };
    newValue[feild] = value;
    setBookInfo(newValue);
  }

  //on drop image callback 
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setProfile(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <>
      <Helmet><title>Add books</title></Helmet>

      <div className="hero min-h-screen  shadow-xl text-primary">
        <div className="hero-content flex-col lg:flex-row-reverse justify-between">
          <div className="text-start lg:text-left w-96 ml-24 mt-18">
            <h1 className="text-5xl  font-bold"> Add new book now !! </h1>
            <p className="py-6 ">Add your new book to show everybody. Everybody can see your book this is
              the best place to promote your book, So what you are waiting for let's start.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-md rounded-2  shadow-2xl">
            <form className="card-body" autoComplete='off' onSubmit={handleSubmitForm}>
              <h2 className='text-white text-3xl font-bold text-start uppercase my-4 animate-pulse duration-1000'> Add New Book </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary">Book name </span>
                </label>
                <input type="text" placeholder="Please enter book name" onChange={hanldeInputFeilds} name='bookName' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary">Writer name </span>
                </label>
                <input type="text" placeholder="Please enter writer" name='writerName' onChange={hanldeInputFeilds} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary"> Description </span>
                </label>
                <textarea placeholder="Please write your book description." name='description' onChange={hanldeInputFeilds} className="textarea textarea-primary" rows={4} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary"> Book image </span>
                </label>
                <div {...getRootProps()} className="hover:cursor-pointer">
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <div className='border-2 border-dotted py-6 px-2 text-info rounded-md border-lime-600  text-center '>
                        <BeatLoader color="white" />
                        <p> Your profile pictures is uploading ....  </p>
                      </div>

                      :

                      <div className='border-2 border-dashed py-6 px-2 rounded-md border-blue-800 '>
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

              <div className="form-control mt-6">
                <button className="btn btn-primary text-primary" type='submit'>
                  {
                    loading ? <div className='text-sm'>
                      <BeatLoader color="white" />
                    </div> : "Add book"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
<GetBooks></GetBooks>
    </>
  );
};

export default AddBook;