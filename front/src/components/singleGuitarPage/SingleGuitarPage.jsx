import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./singleGuitarPage.css"
import { Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleGuitarPage = () => {
  const [fetchData, setFetchData] = useState({});
  const [imageToDisplay, setImageToDisplay] = useState("placeHolder");
  const [imageStyle, setImageStyle] = useState({backgroundImage: `url(${imageToDisplay})`,backgroundPosition: '0% 0%'});
  const [overview, setOverview] = useState(["PLACEHOLDER"]);
  const [specification, setSpecification] = useState(["PLACEHOLDER"]);
  const [showToggle, setShowToggle] = useState(true)
  const [keyFeatures, setKeyFeatures] = useState(["placeholder"])
  const [specs, setSpecs] = useState([]);

  const handleZoomOnHover = (e) => {
    const {left, top, width, height} = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setImageStyle({ ...imageStyle, backgroundPosition: `${x}% ${y}%`})
  }

  const handleLogFetch = () => {
    console.log(fetchData[0])
  }

  const handleShowOverview = () => {
    setShowToggle(true)
  }

  const handleShowSpecification = () => {
    setShowToggle(false)
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

    let tmpSpecefication = [];
    let tmpOverview = [];
    let tmpKeyFeatures = [];
    let tmpSpecs = [];

    for (let i = 0; i < res.data[0].specification.length; i++){
      tmpSpecefication.push(JSON.parse(res.data[0].specification[i]))
    }

    for (let i = 0; i < res.data[0].overview.length; i++){
      tmpOverview.push(JSON.parse(res.data[0].overview[i]))
    }

    for (let i = 0; i < res.data[0].keyfeatures.length; i++){
      tmpKeyFeatures.push(JSON.parse(res.data[0].keyfeatures[i]))
    }

    for (let i = 0; i < res.data[0].specs.length; i++){
      tmpSpecs.push(JSON.parse(res.data[0].specs[i]))
    }

    console.log(tmpSpecs[0].specsBody)

    setSpecification(tmpSpecefication)
    setOverview(tmpOverview)
    setKeyFeatures(tmpKeyFeatures)
    setSpecs(tmpSpecs)

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
        <h1 className='title'>{fetchData[0]?.name || <Skeleton/>}</h1>
        <h2 className='price'>{fetchData[0]?.price || <Skeleton/>}</h2>
      </div>
      
      <div className='wrapper-overview-specs'>
        <h1 className='select-overview-specs'>
        <Button onClick={handleLogFetch} style={{width: 100}}>LOG</Button>
          <Button onClick={handleShowOverview}>overview</Button>
          <Button onClick={handleShowSpecification}>specification</Button>
        </h1>
        <p className='overview-specs'>
          {showToggle && overview.map((e, index) => (
                <em key={index + "over"} className='overview'>{e.overviewBody}</em> 
            ))}
          <ul>
            {showToggle && keyFeatures.map((e, index) => (
              <li key={index + "keyFeat"}>
                <em className='overview'>{e.keyFeaturesBody}</em> 
              </li>
                
            ))}
          </ul>
          
          <ul>
            {showToggle && specs.map((e, index) => (
              <li key={index + "spec"}>
                <em className='overview'>{e.specsBody}</em> 
              </li>
            ))} 
          </ul>
           
        </p>
        <ul>
            {!showToggle && specification.map((e, index) => (
              <li key={index + "spec"}>
                <p className='specification'>{e.keySpecification}{e.valueSpecification}</p> 
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default SingleGuitarPage