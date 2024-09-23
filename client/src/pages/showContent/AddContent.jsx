import { useState } from "react"
import { storeNoteLocally } from "../../localStorage/localStorageUtils";
import { Workbox } from "workbox-window";

export function AddContent({ onCancel, onSave }) {
  const [text, setText] = useState([]);
  const [popup, setPopup] = useState(false);
  const wb = new Workbox('/service-worker.js');
  wb.register();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (navigator.onLine) {

      try {
        const response = await fetch('https://api-4cx1.onrender.com/addNote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: text, timecode: Date.now() }),
        });
        if (response.status === 201) {
          console.log('Note added successfully');
          onSave(Date.now());
          setText('')
          onCancel(false)
        } else {
          console.error('Failed to add note');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      storeNoteLocally({ text });
      console.log("No internet. Storing data locally ")
      onCancel(false)
      alert("Connection Lost! Storing locally...")
      setPopup(true);
      // const response = await wb.messageSW({type: 'offline'});
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex backdrop-blur-sm items-center justify-center }`}
    >
      <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>

      <div className="bg-white z-50 p-6 w-96 rounded-lg">
        <span className="text-red-500 text-2xl">Add a note</span>
        <div className="w-full mt-2">
          <textarea
            className="w-full h-32 border rounded p-2"
            placeholder="Enter text..."
            value={text}
            onChange={handleTextChange}
          />
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => { onCancel(false) }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 ml-2 text-white rounded hover:bg-red-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>

  )
}
