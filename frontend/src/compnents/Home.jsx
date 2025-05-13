import HeroBanner from "./Herosection.jsx";
import Navbar from "./Navbar.jsx";
import Slide from "./SLide.jsx";
import Store from "./Store.jsx";

function Home(){
    return(
        <div>
           <Navbar/>
           <HeroBanner/>
           {/* <Slide/> */}
           <Store/>
        </div>
    )
}
export default Home;