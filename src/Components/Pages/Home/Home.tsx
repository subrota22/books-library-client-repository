import BasicCard from "./Home/FirestSection/FirstSection";
import { Helmet } from 'react-helmet';
const Home = () => {
    return (
        <>
        <Helmet> <title>Home page</title> </Helmet>
       <BasicCard></BasicCard>
        </>
    );
};

export default Home;