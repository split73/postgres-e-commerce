import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./singleGuitarPage.css"
import { Button } from 'react-bootstrap';

const SingleGuitarPage = () => {
  const [fetchData, setFetchData] = useState({});
  const [imageToDisplay, setImageToDisplay] = useState("placeHolder");
  const [imageStyle, setImageStyle] = useState({backgroundImage: `url(${imageToDisplay})`,backgroundPosition: '0% 0%'})
  
  const handleZoomOnHover = (e) => {
    const {left, top, width, height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setImageStyle({ ...imageStyle, backgroundPosition: `${x}% ${y}%`})
  }

  const handleLogFetch = () => {
    console.log(fetchData[0])
  }

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

    let res;

    const fetch = async () => {
      res = await axios.get(
         `http://localhost:8080/api/get-single-product/${page}`
     )

    setFetchData(res.data[0])

    if(res.data[0].fullresolutionimageurl){
      setImageToDisplay(res.data[0].fullresolutionimageurl)
      setImageStyle({backgroundImage: `url(${res.data[0].fullresolutionimageurl})`,backgroundPosition: '0% 0%'})
    } else {
      setImageToDisplay(res.data[0].lowresolutionimageurl)
      setImageStyle({backgroundImage: `url(${res.data[0].lowresolutionimageurl})`,backgroundPosition: '0% 0%'})
    }
    
    setFetchData(res.data)
 }

 fetch();
  }, [])

  return (
    <div className='wrapper'>
      <figure className='main-image-figure' onMouseMove={handleZoomOnHover} style={imageStyle}>
        <img className='main-image' src={imageToDisplay} />
      </figure>
      <div className='main-info'>
        <h1 className='title'>{fetchData[0]?.name}</h1>
        <h2 className='price'>{fetchData[0]?.price}</h2>
      </div>
      <Button onClick={handleLogFetch} style={{width: 100}}>LOG</Button>
      <div className='wrapper-overview-specs'>
        <h1 className='select-overview-specs'>
          <Button>overview</Button>
          <Button>specification</Button>
        </h1>
        <p className='overview-specs'>
          {fetchData[0]?.overview}
        </p>
      </div>
    </div>
  )
}

export default SingleGuitarPage