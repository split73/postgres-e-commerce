import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SingleGuitarPage = () => {
  const [fetchData, setFetchData] = useState();
  const [imageToDisplay, setImageToDisplay] = useState("placeHolder")
  useEffect(() => {
    let page = "";

        for (let i = window.location.href.length - 1; i > 0; i--){
      
            if (window.location.href[i] === "/"){
                for (let j = i + 1; j < window.location.href.length; j++){
                    page += window.location.href[j]
                    
                }
                break;
            }
        }
    console.log("QQ", page)
    
    let res;

    const fetch = async () => {
      res = await axios.get(
         `http://localhost:8080/api/get-single-product/${page}`
     )
    console.log(res.data)
    if(res.data[0].fullresolutionimageurl){
      setImageToDisplay(res.data[0].fullresolutionimageurl)
    } else {
      setImageToDisplay(res.data[0].lowresolutionimageurl)
    }
    
    setFetchData(res.data)
 }

 fetch();
  }, [])

  return (
    <div>singleGuitarPage
      <img src={imageToDisplay}/>
    </div>
  )
}

export default SingleGuitarPage