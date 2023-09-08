import React, { useState, useTransition } from 'react';
import colors from '../../app/colors';
import {useNavigate} from "react-router-dom"

const EditNote = ({ isOpen, onClose, data }) => {
  const [editedText, setEditedText] = useState(data.data.text);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleSave = async () => {
    if (navigator.onLine) {
    fetch('http://localhost:4000/editNote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newText : editedText, timecode : data.data.timecode}),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage('Note edited successfully');
          navigate(0); // reload 
        } else {
          console.error('Error editing note');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    onClose(false);
    }else {
      alert("Connection Lost! Try again later")
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center backdrop-blur-sm justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>

      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-96">
        <h2 className="text-2xl text-red-500 mb-4">Edit your note</h2>
        <textarea
          className="w-full p-2 border rounded"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <div className="mt-4 flex  sm:justify-end justify-center">
          <button
            className={`px-4 py-2 rounded  ${colors.noButton}`}
            onClick={()=>onClose(false)}
          >
            Cancel
          </button>
              <button
            className={`px-4 py-2 ml-2 rounded ${colors.okButton}`}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
