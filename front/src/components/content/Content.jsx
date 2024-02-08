import React, { useState, useEffect } from 'react'
import Product from './product/Product'
import "./Content.css"
import Filters from './filters/Filters'
import NavBar from '../navBar/NavBar'

const Content = () => {
  const [filter, setFilter] = useState("");

    useEffect(() => {

    }, [])

  return (
    <div>
    <NavBar setFilter={setFilter}></NavBar>
      <div id='content'>
      <Filters></Filters>
      <Product filter={filter}></Product>
    </div>
    </div>
    
  )
}

export default Content