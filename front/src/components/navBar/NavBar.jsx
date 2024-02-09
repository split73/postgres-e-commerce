import React, { useState } from 'react'
import "./NavBar.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const NavBar = ({setFilter}) => {
  const [searchInput, setSearchInput] = useState("");
  const [onFocusElements, setOnFocusElements] = useState({data:"", focused: false})

  const handleInput = (e) => {
    let input = e.target.value;

    if (/^\s/.test(input)){
      input = '';
    } 

    setSearchInput(input.toLowerCase())

    const fetch = async() => {
      const fetchSearch = await axios.get(`http://localhost:8080/api/search-input/${input.toLowerCase()}`)
      const fetchedData = fetchSearch.data;
      const tmpOnFocusElements = [];

      if (fetchedData.length > 0){
        fetchedData.forEach(element => {
          tmpOnFocusElements.push(
           <div class="container">
            <div class="row">
              <div class="col-md-2">
                <img class="img-fluid img-thumbnail" src={element.lowresolutionimageurl}/>
              </div>
              <Link to={"/guitar/"+element.id} class="col list-group-item list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1 text-break">{element.name}</h5>
                  <small>${element.price/100}</small>
                </div>  
                <p class="mb-1 text-break">{element.overview && JSON.parse(element?.overview[0])?.overviewBody}</p>
              </Link>
            </div>
           </div>
          )
        });
        setOnFocusElements({data: tmpOnFocusElements, focused: true})
      } else {
          setOnFocusElements({data:

              <div class="md-2">
                <p class="col list-group-item list-group-item-action flex-column align-items-start active">
                  no results
                </p>
              </div>

          , focused: true})
      }

      
    }

    if (input.length > 0){
      fetch()
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(searchInput)
  }

  const handleFocusInput = () => {
    setOnFocusElements({...onFocusElements, focused: true})
  }

  const handleBlurInput = () => {
    setTimeout(() => {
      setOnFocusElements({...onFocusElements, focused: false})
    }, 100)
    
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