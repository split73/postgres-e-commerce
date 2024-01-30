import React, { useEffect } from 'react'
import Product from './product/Product'
import "./Content.css"
import Filters from './filters/Filters'
const Content = () => {
    useEffect(() => {

    }, [])
  return (
    <div id='content'>
      <Filters></Filters>
      <Product></Product>
    </div>
  )
}

export default Content