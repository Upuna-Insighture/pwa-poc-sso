


import { useState } from "react"
import EditNote from "./EditNote";

export function ContentBox(data) {
  const [edit, setEdit] = useState(false);


  return (
    <div className="bg-red-100 grid text-black p-4 rounded-lg w-96 min-h-48">
      <h2 className="text-lg">Content Cards</h2>

      <EditNote isOpen={edit} onClose={setEdit} data={data} />

      <div className="text-gray-700">{data.data.text}</div>
      <div className="flex justify-end">
        <div onClick={() => setEdit(true)} className="bg-red-300 w-20 p-1 rounded flex justify-center items-center text-center cursor-pointer hover:bg-red-400">Edit</div>
      </div>
    </div>
  )
}
