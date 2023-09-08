import colors from "../../app/colors";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return ( 
    <>
    <div className={`${colors.navBar} w-full h-16 flex justify-center items-center`}>
        <div className="flex text-white gap-4">
            <div onClick={()=>navigate('showContent')} className={`${colors.mainButton} ${colors.mainBHover} cursor-pointer p-2 rounded`}>Add Notes</div>
            <div className={`p-2`}>|</div>
            <div onClick={()=>navigate('upload')} className={`${colors.mainButton} ${colors.mainBHover} cursor-pointer p-2 rounded`}>Add Images</div>
        </div>
    </div>
    </> );
}
 
export default NavBar;