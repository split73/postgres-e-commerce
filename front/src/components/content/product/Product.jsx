import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Product.css"
import { Card } from 'react-bootstrap';

const Product = () => {
    const [fetchData, setFetchData] = useState();
    const [order, setOrder] = useState('id');

    const handleOrderPrice = () => {
        console.log("order", order);
        if (order === "id"){
            setOrder('price DESC')
        } else {
            setOrder('id')
        }
        
    }

    useEffect(() => {
        let page = "";

        for (let i = window.location.href.length - 1; i > 0; i--){
            if (window.location.href[i] === "/"){
                for (let j = i + 1; j < window.location.href.length; j++){
                    page += window.location.href[j]
                }
                break;
            }
        }

        let res;

        const fetch = async () => {
          res = await axios.get(
            `http://localhost:8080/api/product/${page}`, {
              params: {
              order: order
              }
            }
          )

          setFetchData(res.data)

          for (let j = 0; j < res.data.length; j++){
            for (let i = 0; i < res.data[0].specs.length; i++){
              tmpSpecs.push(JSON.parse(res.data[0].specs[i]))
            }
            tmpSpecs = []
          }
        }
        
      let tmpSpecs = []
      fetch();
    }, [order])

  return (
    <div id='product' class="container" style={{backgroundColor: "#DADDE2"}}>
        {/* <button onClick={handleOrderPrice}>{order}</button> */}
        {fetchData?.map((e) => (
          
        
        <div class="row row-cols-3 g-3" key={e.id} >


          <div class="col">

          <div className='card-container' class="card rounded-4 border-0 shadow p-3 mb-5 bg-white rounded " style={{width:"15rem", margin: "1rem", height: "30rem"}}>
            <Link to={"/guitar/"+e.id}>
              <div className='card-image'>
                <img class="card-img-top border-bottom " src={e.lowresolutionimageurl} alt="Card image"/>
                <div class="image-overlay">
                </div>
              </div>
            </Link>

            <div class="card-body">
              <h4 class="card-title" style={{ height: "8rem"}}>{e.name}</h4>
              <a href={"/guitar/"+e.id} class="btn btn-primary rounded-3">get</a>
              <span class="float-end">${e.price / 100}</span>
            </div>
          </div>
        </div>
          </div>
          
        ))}
    </div>
  )
}

export default Product