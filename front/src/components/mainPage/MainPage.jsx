import React, { useEffect, useRef, useState } from 'react'
import "./mainPage.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [data, setData] = useState([]);
  const track = useRef();
  const allTheRefs = useRef({})
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    console.log(id)
    navigate("/guitar/"+id)
  }





  useEffect(() => {
    const handleOnDown = (e) => {
      console.log("EE", track)
      if (track.current !== null){
        track.current.dataset.mouseDownAt = e.clientX
      }
  
    }

    const handleOnUp = (e) => {
      console.log("rr", track)
      if (track.current !== null){
        track.current.dataset.mouseDownAt = "0";  
      if (track.current.dataset.percentage === undefined){
        track.current.dataset.prevPercentage = 0
      } else {
        track.current.dataset.prevPercentage = track.current.dataset.percentage;
      }
      }
    }

    const handleOnMove = e => {
      document.body.style.overflow = "hidden"
      
      if(track?.current?.dataset?.mouseDownAt === "0" || track.current == null) return;
      const mouseDelta = parseFloat(track.current.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
            
      const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.current.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            
      track.current.dataset.percentage = nextPercentage;
  
      track.current.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
  
      for (let i = 0; i < track.current.getElementsByClassName("image").length; i++){
        allTheRefs?.current[i]?.current?.animate({  
          objectPosition: `${80 + nextPercentage /1.8}% center`
        }, { duration: 1200, fill: "forwards" });
      }
      
    }

    window.addEventListener('mousemove', handleOnMove)
    window.addEventListener('mouseup', handleOnUp)
    window.addEventListener('mousedown', handleOnDown)

    const fetch = async() => {
      const fetchSearch = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/main-page`
      )

      setData(fetchSearch.data)
    }
    fetch()

    return  () => {
      window.removeEventListener('mousemove', handleOnMove)
      window.removeEventListener('mouseup', handleOnUp)
      window.removeEventListener('mousedown', handleOnDown)
    }
  }, [])

  return (
    <div id='wrapper'>
      <div id='image-track' ref={track} mouseDownAt="0" data-mouse-down-at="0" data-prev-percentage="0">
        {data.map((e, index) => (

            <img className='image' ref={allTheRefs.current[index] ??= { current: null }}  key={ index } src={e.fullresolutionimageurl} draggable="false" onClick={ () => handleNavigate(e.id)}></img>

        ))}
        <img className='image' ref={allTheRefs.current[7] ??= { current: null }} src={"https://www.pmtonline.co.uk/media/catalog/product/cache/a1b28cf8fc4652b664c189b33cb20963/S/H/SH-NCL-040953-1.jpg"} draggable="false" onClick={() => handleNavigate(101)}></img>
        <Link to={'http://localhost:3000/1'} ref={allTheRefs.current[8] ??= { current: null }} className='image more-button' draggable="false" >
          <h1 id="store-link-text">
            more
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default MainPage