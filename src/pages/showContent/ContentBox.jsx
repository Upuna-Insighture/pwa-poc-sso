


import { useState } from "react"
import EditNote from "./EditNote";

export function ContentBox(data) {
  const [edit, setEdit] = useState(false);


  return (
    <div className="bg-gray-200 text-black p-4 rounded-lg m-2 w-64">
      <h2>Content Cards</h2>

      <EditNote isOpen={edit} onClose={setEdit} data={data} />

      <div className="text-gray-700">{data.data.text}</div>
      <div className="flex justify-end">
        <div onClick={() => setEdit(true)} className="bg-red-300 w-24 rounded p-1 text-center cursor-pointer hover:bg-red-400">Edit</div>
      </div>
    </div>
  )
}
