
import WebsiteNavbar from 'Components/Shares/WebsiteNavbar/WebsiteNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shares/Footer/Footer';

const MainLayOut = () => {
    return (
        <>
         <WebsiteNavbar></WebsiteNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayOut;
