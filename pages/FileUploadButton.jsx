import React, { useRef } from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';

// const server_link = "http://192.168.0.130:3000/upload_link/"; // work
const server_link = "http://localhost:3000/upload_link/MEDANCO_zjd34jh78gl_" // cafe

const FileUploadButton = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      // const headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');

    console.log(file)
    return fetch(server_link + "myid" + Math.floor(Math.random()*1000), {
      method: 'POST',
      body: formData,
      //headers: headers
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error sending file: ' + response.status);
      }
      return response;
    })
    .then(data => {
      // Process the response data here
      alert('Файл успешно загружен в базу');
      router.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button onPress={handleButtonClick}>Загрузить лист согласования</Button>
    </div>
  );
};

export default FileUploadButton;