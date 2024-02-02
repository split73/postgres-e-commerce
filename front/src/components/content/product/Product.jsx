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
    <div id='product'>
        {/* <button onClick={handleOrderPrice}>{order}</button> */}
        {fetchData?.map((e) => (
          
        
        <div key={e.id} className='card-container'>

        <Card style={{ width: '300px', height: "500px" }}>
      <Card.Img style={{ width: '300px', height: "375"}} variant="top" src={e.lowresolutionimageurl} />
      <Card.Body>
        <Card.Title>{e.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Link href={"/guitar/"+e.id}>Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
        </div>
        ))}
    </div>
  )
}

export default Product