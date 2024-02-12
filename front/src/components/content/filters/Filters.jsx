import React, { useState } from 'react'
import "./Filters.css"

const category = ["brand", "price", "stock"]

const Filters = ({setMaxPriceInput, setMinPriceInput}) => {
  const [localMinPriceInput, setLocalMinPriceInput] = useState(0);
  const [localMaxPriceInput, setLocalMaxPriceInput] = useState(1000000);

  const hadnlePassMinPriceInput = () => {
    setMinPriceInput(localMinPriceInput)
  }

  const hadnlePassMaxPriceInput = () => {
    setMaxPriceInput(localMaxPriceInput)
  }

  const handleMinPriceInput = (e) => {
    if (e.target.value.length > 0){
      if (e.target?.value[e.target?.value.length - 1].charCodeAt() >= 48 && e.target?.value[e.target?.value.length - 1].charCodeAt() <= 57){
        setLocalMinPriceInput(e.target.value)
      }
    } else {
      setLocalMinPriceInput(e.target.value)
    }
  }

  const handleMaxPriceInput = (e) => {
    if (e.target.value.length > 0){
      if (e.target?.value[e.target?.value.length - 1].charCodeAt() >= 48 && e.target?.value[e.target?.value.length - 1].charCodeAt() <= 57){
        setLocalMaxPriceInput(e.target.value)
      }
    } else {
      setLocalMaxPriceInput(e.target.value)
    }
  }
  
  return (
    <div id='filters'>
        <div class="border-top border-bottom border-secondary border-2" style={{marginRight: "10px"}}>
            <span>
                filter
            </span>
            <div class="border-top border-bottom border-secondary border-2">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">min price</span>
                </div>
                <input type="number" value={localMinPriceInput} class="form-control" aria-label="Default" onBlur={hadnlePassMinPriceInput} onInput={(e) => handleMinPriceInput(e)} placeholder={localMinPriceInput} aria-describedby="inputGroup-sizing-default"/>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">max price</span>
                </div>
                <input type="number" value={localMaxPriceInput} class="form-control" aria-label="Default" onBlur={hadnlePassMaxPriceInput} onInput={(e) => handleMaxPriceInput(e)} placeholder={localMaxPriceInput} aria-describedby="inputGroup-sizing-default"/>
              </div>
            </div>
            <span>
                brand
            </span>
            <div>
                in stock
            </div>
        </div>
    </div>
  )
}

export default Filters