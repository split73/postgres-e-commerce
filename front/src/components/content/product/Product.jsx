import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Product.css"
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
            console.log(res)
        }
        

        fetch();
    }, [order])

  return (
    <div id='product'>
        {/* <button onClick={handleOrderPrice}>{order}</button> */}
        {fetchData?.map((e) => (
            <div key={e.id} className='card-container'>
            <Link to={"/guitar/"+e.id}>
                <img className='card-image' src={e.lowresolutionimageurl} alt='placeholder'/>
            </Link>
            
        </div>
        ))}
    </div>
  )
}

export default Product