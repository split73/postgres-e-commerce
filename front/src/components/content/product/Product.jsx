import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Product.css"

const Product = ({filter, minPriceInput, maxPriceInput}) => {
    const [fetchData, setFetchData] = useState();
    const [pagination, setPagination] = useState([]);
    const [order, setOrder] = useState('id');
    const [currentPage, setCurrentPage] = useState(0)
    const [amountOfPages, setAmountOfPages] = useState(0)
    const [currentFilter, setCurrentFilter] = useState("")
    const [brands, setBrands] = useState()

    const handleOrderPriceLowHigh = () => {
      if (order !== 'price ASC'){
        setOrder('price ASC')
      }
    }

    const handleOrderPriceHighLow = () => {
      if (order !== 'price DESC'){
        setOrder('price DESC')
      }
    }

    const handleChangePage = (page) => {
      setCurrentPage(page)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      
    }

    const handleNextPage = () => {
      if(currentPage < amountOfPages){
        setCurrentPage((prevValue) => (prevValue + 1))
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handlePreviusPage = () => {
      if(currentPage > 1){
        setCurrentPage((prevValue) => (prevValue - 1))
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    useEffect(() => {
      document.body.style.overflow = "visible"
      if (currentFilter !== filter){
        
      }
      let page = "";

      if (currentPage !== 0){
        page = currentPage;
      } else {
        for (let i = window.location.href.length - 1; i > 0; i--){
          if (window.location.href[i] === "/"){
            for (let j = i + 1; j < window.location.href.length; j++){
              page += window.location.href[j]
            }
            break;
          }
        }
        setCurrentPage(Number(page))
      }
  
      const fetch = async () => {
        let mainDataResponse;
   
        Promise.all([
          mainDataResponse = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/product/${page}`, {
              params: {
              order: order,
              filter: filter,
              minPriceInput: minPriceInput,
              maxPriceInput: maxPriceInput,
              }
            }
          ) .then(console.log("fetched succes"))
            .catch((error => {
              console.log("fetched err", error)
              }))
        ])

        let tmpAmountOfPages = (Math.floor(mainDataResponse.data.countProduct/21))
        //21 -> product.controller product amount 

        function paginate (){
          let tmpPagination = [];

          if (tmpAmountOfPages < 10){
            for (let i = 1; i <= tmpAmountOfPages; i++){
              if (i === currentPage){
                tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}   class="page-link active" onClick={() => handleChangePage(i)}>{i}</Link></li>)
              } else {
                tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}   class="page-link" onClick={() => handleChangePage(i)}>{i}</Link></li>)
              }
            }
          } else {
            if (currentPage <= 5){
              for (let i = 1; i <= 8; i++){
                if (i === currentPage){
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}  class="page-link active" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                } else {
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}  class="page-link" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                }
              }
              tmpPagination.push(<li class="page-item"><div class="page-link" >...</div></li>)
              tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${tmpAmountOfPages}`}  class="page-link" onClick={() => handleChangePage(tmpAmountOfPages)}>{tmpAmountOfPages}</Link></li>)
            } else if (tmpAmountOfPages - currentPage <= 4){
              tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/1`}  class="page-link" onClick={() => handleChangePage(1)}>1</Link></li>)
              tmpPagination.push(<li class="page-item"><div class="page-link" >...</div></li>)
              for (let i = tmpAmountOfPages - 7; i <= tmpAmountOfPages; i++){
                if (i === currentPage){
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}  class="page-link active" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                } else {
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}  class="page-link" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                }
              }
            } else {
              tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/1`} class="page-link" onClick={() => handleChangePage(1)}>1</Link></li>)
              tmpPagination.push(<li class="page-item"><div class="page-link" >...</div></li>)
              for (let i = currentPage - 3; i <= currentPage + 3; i++){
                if (i === currentPage){
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`}  class="page-link active" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                } else {
                  tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${i}`} class="page-link" onClick={() => handleChangePage(i)}>{i}</Link></li>)
                }
              }
              tmpPagination.push(<li class="page-item"><div class="page-link" >...</div></li>)
              tmpPagination.push(<li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${tmpAmountOfPages}`} class="page-link" onClick={() => handleChangePage(tmpAmountOfPages)}>{tmpAmountOfPages}</Link></li>)
            }
          }

          setPagination(tmpPagination)
        }
        
        paginate()

        setAmountOfPages(tmpAmountOfPages)
        
        setFetchData(mainDataResponse.data.productData)


        mapBrands()

        function mapBrands () {
          const mapBrand = {}

          for (let i = 0; i < mainDataResponse.data.brandsData.length; i++){
            if (Object.hasOwn(mapBrand, mainDataResponse.data.brandsData[i].brand)){
              mapBrand[mainDataResponse.data.brandsData[i].brand] = mapBrand[mainDataResponse.data.brandsData[i].brand] + 1
            } else {
              mapBrand[mainDataResponse.data.brandsData[i].brand] = 1
            }
          }

          setBrands(structuredClone(mapBrand))
        }


        for (let j = 0; j < mainDataResponse.data.productData.length; j++){
          for (let i = 0; i < mainDataResponse.data.productData[0].specs.length; i++){
            tmpSpecs.push(JSON.parse(mainDataResponse.data.productData[0].specs[i]))
          }
          tmpSpecs = []
        }      
      }
        
      let tmpSpecs = []
      fetch();
      
    }, [order, filter, currentPage, minPriceInput, maxPriceInput])



  return (
    <div id='product' class="container border-bottom" style={{backgroundColor: "#DADDE2"}}>
      <div class="dropdown">
        <button class="btn btn-lg btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Price
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" onClick={handleOrderPriceLowHigh}>Price low-high</button>
          <button class="dropdown-item" onClick={handleOrderPriceHighLow}>Price high-low</button>
        </div>
      </div>
        <div class="row row-cols-3 g-3" >
          {fetchData?.map((e) => (
            <div class="col">
              <div className='card-container' class="card rounded-4 border-0 shadow p-3 bg-white rounded " style={{width:"15rem", margin: "1rem", height: "30rem"}}>
                <Link to={"/guitar/"+e.id}>
                  <div className='card-image'>
                    <img class="card-img-top border-bottom " src={e.lowresolutionimageurl} alt="Card image"/>
                    <div class="image-overlay"/>
                  </div>
                </Link>

                <div class="card-body">
                  <h4 class="card-title" style={{ height: "8rem"}}>{e.name}</h4>
                  <Link href={"/guitar/"+e.id} class="btn btn-primary rounded-3">get</Link>
                  <span class="float-end">${e.price / 100}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ul class="pagination" style={{margin: "auto"}}>
          {currentPage > 1 && <li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${currentPage-1}`} class="page-link" href="#" onClick={handlePreviusPage}>Previus</Link></li>}
          {pagination}
          {currentPage < amountOfPages && <li class="page-item"><Link to={`${process.env.REACT_APP_CLIENT_URL}/store/${currentPage + 1}`} class="page-link" href="#" onClick={handleNextPage}>Next</Link></li>}
        </ul>

    </div>
  )
}

export default Product