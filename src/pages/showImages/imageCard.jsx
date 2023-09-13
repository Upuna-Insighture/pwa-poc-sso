import { useState } from "react";
import ImageUpdater from "./updateImage";
import colors from "../../app/colors";

const ImageCard = (data) => {
    const [updater, setUpdater] = useState(false);
    return ( 
        <>
            <ImageUpdater isOpen={updater} onClose={setUpdater} data={data.data} />
            <div className="p-4 m-4 w-96 flex justify-center flex-col rounded-lg bg-red-100">
                <div className="flex justify-center"><img src={data.data.imageText} width={'200px'} alt="showing image" /></div>
                <div className="flex justify-end mt-4"><div className={`p-1 rounded text-center ${colors.okButton} w-32`} onClick={()=>{setUpdater(true)}}>click to update</div></div>
            </div>
        </>
     );
}
 
export default ImageCard;