import { useEffect } from "react";
import AOS from  "aos";
import { routers } from "Components/routers/routers";
import {RouterProvider} from "react-router-dom" ;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

useEffect(() => {
AOS.init({
 
  duration: 1500,
   easing: 'ease-in-sine',
  delay: 300,
})
}, []);

  return (
    <>
  <RouterProvider router={routers}/>
  <ToastContainer />
    </>
  );
}

export default App;
