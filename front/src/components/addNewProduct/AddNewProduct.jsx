import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const AddNewProduct = () => {
    const [file, setFile] = useState();

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log({product: JSON.parse(text).product[0]})
          setFile({product: JSON.parse(text).product})
        };
        reader.readAsText(e.target.files[0])
      }

    const handlePost = () => {
        for (let i = 0; i < file.product.length; i++){
          axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add-product`, file.product[i], {
          headers: {
            "Content-Type": "application/json"
          }
        })
            .then(response => console.log(response))
            .catch(error => {
                console.log(error)
              })
        }
        
    }

  return (
    <div>AddNewProduct
        <input type='file' onChange={showFile}></input>
        <button onClick={handlePost}>post</button>
    </div>
  )
}

export default AddNewProduct