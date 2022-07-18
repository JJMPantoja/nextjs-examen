import React, {useState} from 'react';
import { FileUploader } from "react-drag-drop-files";

export default function UploadChild() {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [images, setImages] = useState([]);
  let imagenes = [];


  const handleChange = (file) => {
    imagenes = [
      ...imagenes,
      file.name
    ]
    console.log(file);
    setImages(imagenes);
  };
  return (
    <>
      <div className='containerDragDrop'>
        <FileUploader className='uploadDragDropElement' handleChange={handleChange} name="file" types={fileTypes} />
      </div>

      {imagenes.map((imagen) => {
        
        <img src={imagen} style={{width: '150px', height:'150px'}}/>
          
      })}
    </>
  );
}
