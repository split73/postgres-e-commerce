import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Tst = () => {
    const [keyFeatures, setKeyFeatures] = useState([])
// useEffect(() => {
//     const fetch = async () => {
//         const res = await axios.get(
//             "http://localhost:8080/api/get-single-product/1"
//         )
//         setKeyFeatures(res.data[0].keyfeatures)
//         console.log(res)
//     }
//     fetch();
//     console.log("Q", keyFeatures[0])
// }, [])

  return (
    <div>
        {keyFeatures.map((e) => (
            <div>eee{(e)}</div>
        ))}
    </div>
  )
}

export default Tst