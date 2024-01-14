import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [fetchData, setFetchData] = useState();
    const [currentPage, setCurrentPage] = useState();
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
        console.log(order)
        let page = "";

        for (let i = window.location.href.length - 1; i > 0; i--){
      
            if (window.location.href[i] === "/"){
                for (let j = i + 1; j < window.location.href.length; j++){
                    page += window.location.href[j]
                    
                }
                break;
            }
        }

        setCurrentPage(window.location.href[page])

        let res;

        const fetch = async () => {
             res = await axios.get(
                `http://localhost:8080/api/product/${page}`, {
                    params: {
                      order: order
                    }
                  }
            )
            console.log("RES DATA", res.data)
            res.data.forEach(element => {
                console.log(element.price)
            });
            setFetchData(res.data)
        }

        fetch();
    }, [order])

  return (
    <div>
        <button onClick={handleOrderPrice}>{order}</button>
        {fetchData?.map((e) => (
            <div className='card-container'>
            <Link to={"/guitar/"+e.id}>
                <img className='card-image' src={e.lowresolutionimageurl}/>
            </Link>
            
        </div>
        ))}
        
    Product
    </div>
  )
}

export default Product