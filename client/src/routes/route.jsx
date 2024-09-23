import { Route, Routes } from 'react-router-dom';
import NavBar from '../pages/NavBar/NavBar';
import ShowContent from '../pages/showContent/ShowContent';
import ImagePage from '../pages/showImages/ImagePage';
import Login from '../pages/Login/Login';

const RouterFile = () => {
    return (
        <>
            <div>
                <div className='w-full fixed'>
                    <NavBar />
                </div>
                <div className='pt-24'>
                    <Routes>
                        <Route path='/showContent' element={<ShowContent />} />
                        <Route path='/upload' element={<ImagePage />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}
export default RouterFile;