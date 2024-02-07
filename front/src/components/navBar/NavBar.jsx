import React, { useState } from 'react'
import "./NavBar.css"
import axios from 'axios';
const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [onFocusElements, setOnFocusElements] = useState({data:"no results", focused: false})

  const handleInput = (e) => {
    setSearchInput(e.target.value.toLowerCase())
    const fetch = async() => {
      const fetchSearch = await axios.get(`http://localhost:8080/api/search-input/${e.target.value.toLowerCase()}`)
      console.log("FEETETET", fetchSearch.data)
      const fetchedData = fetchSearch.data;

      let tmpOnFocusElements = [];
      console.log("wwwww", fetchedData[1])
      // console.log("QQ", JSON.parse(fetchedData[1].overview[0]).overviewBody)
  
      fetchedData.forEach(element => {
        tmpOnFocusElements.push(

         <div class="container">
          <div class="row">
            <div class="col-md-2">
              <img class="img-fluid img-thumbnail" src={element.lowresolutionimageurl}/>
            </div>
            <a href="#" class="col list-group-item list-group-item-action flex-column align-items-start active">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-break">{element.name}</h5>
                <small>3 days ago</small>
              </div>  
              <p class="mb-1 text-break">{element.overview && JSON.parse(element?.overview[0])?.overviewBody}</p>
              <small>Donec id elit non mi porta.</small>
            </a>
          </div>
         </div>
            
        
        )
      });

      setOnFocusElements({data: tmpOnFocusElements, focused: true})
    }

    if (e.target.value.length > 0){
      fetch()
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const fetch = async() => {
      const fetchSearch = await axios.get(`http://localhost:8080/api/search-input/${searchInput}`)
      console.log(fetchSearch)
    }
    fetch()
  }

  const handleFocusInput = () => {
    console.log(onFocusElements.data)
    setOnFocusElements({...onFocusElements, focused: true})
    console.log("FOC")
  }

  const handleBlurInput = () => {
    setOnFocusElements({...onFocusElements, focused: false})
  }

  return (
    <div id="navbar">
      <nav class="navbar navbar-light bg-light justify-content-center">
        <form class="form-inline w-50">
          <div class="input-group">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onBlur={handleBlurInput} onFocus={handleFocusInput} onInput={(e) => handleInput(e)}/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => handleSearch(e)}>Search</button>
          </div>
        </form>
      </nav>
      {onFocusElements.focused && <div class="list-group" style={{minWidth: "700px", maxWidth: "50%", height: "50px", position: "absolute", top: "140%", left: "50%", transform: "translate(-50%, -50%)"}}>{onFocusElements.data}</div>}
    </div>
  )
}

export default NavBar