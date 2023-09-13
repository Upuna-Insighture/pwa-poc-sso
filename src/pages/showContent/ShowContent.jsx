

import { ContentBox } from "./ContentBox";
import { AddContent } from "./AddContent";
import { useState, useEffect } from "react";
import colors from "../../app/colors";

const ShowContent = () => {
    const [addData, setAddData] = useState(false)
    const [update, setUpdate] = useState('')
    const [tempData, setTempData] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/getNotes")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setTempData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [update]);

    return (
        <>
            <div>
                <div className="flex justify-center">
                    <div className={`${colors.okButton} p-2 px-4 rounded m-2`} onClick={() => { setAddData(true) }}>Add Note</div>
                </div>
                <div className="flex justify-center">
                    {addData ? <AddContent onCancel={setAddData} onSave={setUpdate} /> : ""}
                </div>
                <div className="flex items-center justify-center">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 gap-10 text-white">
                        {
                            tempData?.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <ContentBox key={index} data={data} />
                                    </div>
                                )
                            })
                        }
                        {tempData.length < 1 ? "No Data to show. Add something..." : "sss"}
                    </div>
                </div>
            </div>
        </>);
}

export default ShowContent;