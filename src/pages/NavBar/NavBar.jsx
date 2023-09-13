import colors from "../../app/colors";
import { useNavigate } from "react-router-dom";
import Network from "./Network";
import { useState } from "react";
import { Workbox } from "workbox-window";



const NavBar = () => {
    const [network, setNetwork] = useState('online')
    const navigate = useNavigate();
    const wb = new Workbox('/service-worker.js');
    wb.register();
  

    window.addEventListener('offline', async () => {
        setNetwork('offline')
    });

    window.addEventListener('online', async () => {
        setNetwork('online')
        const response = await wb.messageSW({type: 'resetSync'});
    });

    return (
        <>
            <div className={`${colors.navBar} w-full h-16 flex justify-center items-center`}>
                <div className="flex text-white gap-4">
                    <div onClick={() => navigate('showContent')} className={`${colors.mainButton} ${colors.mainBHover} cursor-pointer p-2 rounded`}>Add Notes</div>
                    <div className={`p-2`}>|</div>
                    <div onClick={() => navigate('upload')} className={`${colors.mainButton} ${colors.mainBHover} cursor-pointer p-2 rounded`}>Add Images</div>
                    <div><Network status={network} /></div>
                </div>
            </div>
        </>);
}

export default NavBar;