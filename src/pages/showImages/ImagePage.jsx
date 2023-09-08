import { useState } from "react";
import ImageUploader from "./imageUploader";
import ImageCard from "./imageCard";
import { useEffect } from "react";
import colors from '../../app/colors'

// get image data 


const ImagePage = () => {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:4000/getImages')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then((data) => {
                console.log(JSON.stringify(images))
                setImages(data); // Update the state with the fetched data
                setLoading(false); // Set loading to false
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    const [uploader, setUploader] = useState(false);
    return (
        <>
            <div className="flex w-full justify-center gap-10">
                <div>The Image Section</div>
                <div className={` ${colors.okButton} p-1 w-32 text-center rounded`} onClick={() => { setUploader(true) }}>Add image?</div>
            </div>


            <ImageUploader isOpen={uploader} onClose={setUploader} />

            <div className="flex items-center justify-center">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 text-white">
            {loading ? "Loading data..." :
                images?.map((data, index) => {
                    return (
                        <div key={index}>
                            <ImageCard data={data} />
                        </div>
                    )
                })
            }
              </div>
              </div>

        </>
    );
}

export default ImagePage;