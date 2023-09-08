import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import colors from '../../app/colors';
import { storeImageLocally } from '../../localStorage/localStorageUtils';

const ImageUploader = ({ isOpen, onClose }) => {
  const [base64Image, setBase64Image] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (navigator.onLine) {
      try {
        const response = await fetch('http://localhost:4000/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageText: base64Image, timestamp: Date.now() }),
        });

        if (response.ok) {
          console.log('Image data stored successfully.');
          navigate(0);

        } else {
          console.error('Failed to store image data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      onClose(false);
    } else {
      storeImageLocally(base64Image);
      console.log("No internet. Storing data locally ")
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'
          }`}
      >
        <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>

        <div className="bg-white p-6 rounded-lg shadow-xl z-50">
          <h2 className="text-2xl text-red-500 w-96 mb-4">Upload Images</h2>
          <input className='bg-gray-200 p-4 w-full rounded-lg' type="file" accept="image/*" onChange={handleImageUpload} />
          <div>
            {base64Image && (
              <div>
                <h3>Base64 Encoded Image:</h3>
                <img src={base64Image} width={"100px"} alt="" />
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">

            <button
              className={`px-4 py-2 rounded ${colors.noButton} `}
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 ml-2 rounded ${colors.okButton} `}
              onClick={handleSave}
            >
              Save
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
