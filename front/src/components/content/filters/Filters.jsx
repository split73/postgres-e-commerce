import React from 'react'
import "./Filters.css"

const category = ["brand", "price", "stock"]

const Filters = () => {
  return (
    <div id='filters'>
        <div className='individual-filter'>
            <span>
                category
            </span>
        </div>
    </div>
  )
}

export default Filters