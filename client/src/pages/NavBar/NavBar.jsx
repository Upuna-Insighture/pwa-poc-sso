import colors from "../../app/colors";
import { useNavigate } from "react-router-dom";
import Network from "./Network";
import { useState } from "react";
import { Workbox } from "workbox-window";
import InstallPWA from "./install";
import React, { useContext } from 'react';
import { AuthContext } from "../../auth/AuthProvider";

const NavBar = () => {
    const { user } = useContext(AuthContext);
    const [network, setNetwork] = useState(navigator.onLine ? "online" : "offline")
    const navigate = useNavigate();
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const wb = new Workbox('/service-worker.js');
    wb.register();

    window.addEventListener('offline', async () => {
        setNetwork('offline')
    });

    window.addEventListener('online', async () => {
        setNetwork('online')
        const response = await wb.messageSW({ type: 'resetSync' });
    });

    const logout = () => {
        window.open(process.env.REACT_APP_AUTH_SERVER_URL + "auth/logout", "_self");
    };
    
    return (
        <>
            <div className={`bg-red-600/80 w-full h-16 flex justify-center items-center`}>
                <div className="flex text-white gap-4">
                    <div onClick={() => navigate('showContent')} className={` ${colors.mainBHover}  cursor-pointer p-2 rounded`}>Show Notes</div>
                    <div onClick={() => navigate('upload')} className={` ${colors.mainBHover} cursor-pointer p-2  rounded`}>Show Images</div>
                    <div><Network status={network} /></div>
                    <div><InstallPWA /></div>
                </div>
                <div className="flex text-white gap-4 items-center">
                    {user && <div>{user.displayName}</div>}
                    {user && (
                        <div className="cursor-pointer p-2 rounded bg-gray-800 hover:bg-gray-700" onClick={logout}>
                            Logout
                        </div>
                    )}
                </div>
            </div>
        </>);
}

export default NavBar;