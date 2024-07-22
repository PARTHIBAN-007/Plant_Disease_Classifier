import React, { useState } from 'react';
import axios from 'axios';
import logo1 from "./images/logo1.svg"
import logo from "./images/logo.svg"
const App = () => {
  const [file, setFile] = useState(null);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult1(response.data.class);
      setResult2(response.data.confidence.toFixed(2));
      // Display uploaded image
      const imageURL = URL.createObjectURL(selectedFile);
      setUploadedImage(imageURL);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult1("");
    setResult2("");
    setUploadedImage(null);
  };

  return (
    <>
      <div className='h-20 flex flex-center bg-green-300'>
      <img className=' flex ml-5 mt-5 mr-1 w-10 h-12 mb-1' src={logo1}/>
      <h1 className=" text-2xl font-bold py-6">
        Potato Disease CLASSIFIER</h1>
      </div>
      <div className="bg-agriculture bg-cover bg-no-repeat h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">POTATO DISEASE CLASSIFIER</h1>
          <div className="flex justify-center mb-4">
            {!uploadedImage ? (
              <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-400 text-white rounded-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500">
                <img className='w-10 h-12 mb-1' src={logo}/>
                <span>Choose an image</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="max-w-md mx-auto">
                <img src={uploadedImage} alt="Uploaded" className="rounded-lg shadow-md mb-4" />
                <p className="mb-2 text-lg font-bold">Result: {result1}</p>
                <p className="text-lg">Confidence: {result2}</p>
                <button onClick={resetForm} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Reset</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
