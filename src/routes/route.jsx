import { Route, Routes } from 'react-router-dom';
import NavBar from '../pages/NavBar/NavBar';
import ShowContent from '../pages/showContent/ShowContent';
import ImagePage from '../pages/showImages/ImagePage';

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
                    </Routes>
                </div>
            </div>
        </>
    )
}
export default RouterFile;