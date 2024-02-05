import React, { useState } from 'react'
import "./NavBar.css"
const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
  }

  const handleFocusInput = () => {
    console.log("FOC")
  }

  return (
    <div id="navbar">
      <nav class="navbar navbar-light bg-light justify-content-center">
        <form class="form-inline w-50">
          <div class="input-group">
            <input class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" onFocus={handleFocusInput} onInput={(e) => handleInput(e)}/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => handleSearch(e)}>Search</button>
          </div>
        </form>
      </nav>
    </div>
  )
}

export default NavBar