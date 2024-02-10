import React, { useState, useEffect } from 'react'
import Product from './product/Product'
import "./Content.css"
import Filters from './filters/Filters'
import NavBar from '../navBar/NavBar'

const Content = () => {
  const [filter, setFilter] = useState("");
  const [minPriceInput, setMinPriceInput] = useState(0)
  const [maxPriceInput, setMaxPriceInput] = useState(1000000)
  
    useEffect(() => {

    }, [])

  return (
    <div>
    <NavBar setFilter={setFilter}></NavBar>
      <div id='content'>
      <Filters setMaxPriceInput={setMaxPriceInput} setMinPriceInput={setMinPriceInput}></Filters>
      <Product filter={filter} minPriceInput={minPriceInput} maxPriceInput={maxPriceInput}></Product>
    </div>
    </div>
    
  )
}

export default Content