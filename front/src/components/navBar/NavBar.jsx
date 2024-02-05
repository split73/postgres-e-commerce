import React, { useState } from 'react'
import "./NavBar.css"
import axios from 'axios';
const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [onFocusElements, setOnFocusElements] = useState({data:"no results", focused: false})
  const handleInput = (e) => {
    setSearchInput(e.target.value)
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
    setOnFocusElements({data: <div class="list-group" style={{minWidth: "700px", maxWidth: "50%", height: "50px", position: "absolute", top: "140%", left: "50%", transform: "translate(-50%, -50%)"}}>
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
          <small>3 days ago</small>
      </div>
      <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <small>Donec id elit non mi porta.</small>
    </a>
    </div>, focused: true})
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
      {onFocusElements.focused && onFocusElements.data}
    </div>
  )
}

export default NavBar