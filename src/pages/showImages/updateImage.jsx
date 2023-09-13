import React, { useState } from 'react';

const ImageUpdater = ({ isOpen, onClose, data }) => {
  const [base64Image, setBase64Image] = useState(data.imageText);

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

      fetch('http://localhost:4000/updateImage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageText: base64Image, timestamp: data.timestamp }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Image data updated successfully');
          } else if (response.status === 404) {
            console.log('Image not found');
          } else {
            console.log('Error updating image data');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      onClose(false);
    } else {
      alert("Connection Lost! Try again later!")
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
          <h2 className="text-2xl font-semibold mb-4">Image to Base64 updater</h2>


          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div>
            {base64Image && (
              <div>
                <h3 className='text-red-400'>Base64 Encoded Image upater:</h3>
                {base64Image ? "Uploaded!!!!" : " "}
                <img src={base64Image} width={"100px"} alt="" />
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpdater;
