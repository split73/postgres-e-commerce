import React, { useEffect, useRef, useState } from 'react'
import "./mainPage.css"
import axios from 'axios'

const MainPage = () => {
  const [data, setData] = useState([]);
  const track = useRef();
  const allTheRefs = useRef({})

  const handleOnDown = (e) => {
    track.current.dataset.mouseDownAt = e.clientX
  }

  const handleOnUp = (e) => {
    track.current.dataset.mouseDownAt = "0";  
    track.current.dataset.prevPercentage = track.current.dataset.percentage;
  }

  const handleOnMove = e => {
    if(track.current.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.current.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.current.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    track.current.dataset.percentage = nextPercentage;

    track.current.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    if (allTheRefs[0] !== null){

    for (let i = 0; i < track.current.getElementsByClassName("image").length; i++){
      allTheRefs?.current[i]?.current?.animate({  
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
    }
  }



  useEffect(() => {
    document.body.style.overflow = "hidden"
    window.addEventListener('mousemove', handleOnMove)
    window.addEventListener('mouseup', handleOnUp)
    window.addEventListener('mousedown', handleOnDown)

    const fetch = async() => {
      const fetchSearch = await axios.get(
        "http://localhost:8080/api/main-page"
      )

      setData(fetchSearch.data)
    }
    fetch()
  }, [])

  return (
    <div id='wrapper'>
      <div id='image-track' ref={track} mouseDownAt="0" data-mouse-down-at="0" data-prev-percentage="0">
        {data.map((e, index) => (
          <img className='image' ref={allTheRefs.current[index] ??= { current: null }}  key={ index } src={e.fullresolutionimageurl} draggable="false"></img>
        ))}
      </div>
    </div>
  )
}

export default MainPage