const db = require("../db");

class ProductController {
    async  addProduct(req, res) {
        if (Object.keys(req.body).length < 7){ 
            res.json("NORES")
        } else {
            const singleElementJsonFile = req.body;
            let fullImageUrlString = ""; 
            
            let specsBodyArray = [];
            // add specs !!!!!!!!!!!
            // if (singleElementJsonFile.specs){
            //     for (let k = 0; k < singleElementJsonFile.specs.length; k++){
            //         let specsBodySting = "";
            //         for (let i = 0; i < singleElementJsonFile.specs[k].specsBody.length; i++){
            //             if (singleElementJsonFile.specs[k].specsBody[i] === ":"){
            //                 while (singleElementJsonFile.specs[k].specsBody[i] !== undefined){
            //                     i++;
            //                     if (singleElementJsonFile.specs[k].specsBody[i] !== undefined && singleElementJsonFile.specs[k].specsBody[i] !== " "){
            //                         specsValueSting += singleElementJsonFile.specs[k].specsBody[i];
            //                     }
            //                 }
            //             } else {
            //                 specsBodySting += singleElementJsonFile.specs[k].specsBody[i]
            //             }
            //         }
            //             specsBodyArray.push([specsBodySting, specsValueSting])
            //     }
            // }
                
            

            if (singleElementJsonFile.fullImage) {
                const startIndexOffullresolutionimgurl = singleElementJsonFile.fullImage.indexOf("&quot;https:") + 6;
                const endIndexOffullresolutionimgurl = singleElementJsonFile.fullImage.indexOf(".jpg&quot;") + 4;
    
                for (let k = startIndexOffullresolutionimgurl; k < endIndexOffullresolutionimgurl; k++){
                        fullImageUrlString += singleElementJsonFile.fullImage[k];
                }
            }
               
            if (singleElementJsonFile.price){
                for (let j = 0; j < singleElementJsonFile.price.length; j++) {
                    if (typeof singleElementJsonFile.price[j] === 'number' && isFinite(singleElementJsonFile.price[j])){
                            stringPriceToInteger += singleElementJsonFile.price[j];
                    }
                }
            }
    
            function stingToNumber() {
                let matches = singleElementJsonFile.price.match(/(\d+)/g);
                return matches
            }

            if (!singleElementJsonFile.specs){
                singleElementJsonFile.specs = [{specsBody: "no data"}]
            }
    
            let stringPriceToInteger = Number(stingToNumber().join(""));
    
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let newProduct = await db.query("INSERT INTO product (name, brand, stock, lowresolutionimageurl, fullresolutionimageurl, price, overview, keyfeatures, specs, specification) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
                [singleElementJsonFile.guitarName, singleElementJsonFile.specification[0].valueSpecification, getRandomInt(0, 200), singleElementJsonFile.image, fullImageUrlString, stringPriceToInteger, singleElementJsonFile.newOverview, singleElementJsonFile.keyFeatures, singleElementJsonFile.specs, singleElementJsonFile.specification]);
                
            res.json(newProduct)
        }
    }

    async getAmountOfProduct(req, res){
        let amountOfProductById = await db.query("SELECT COUNT(id) FROM product");
        console.log(amountOfProductById.rows)
        res.json((amountOfProductById.rows))
    }

    async getSingleProduct(req, res) {
        console.log("GETsinngke", req.params)
        const id = req.params.id;
        const singleProduct = await db.query('SELECT * FROM product WHERE id = $1', [id]);
        res.json(singleProduct.rows)
    }

    async getProductRelativeToPage(req, res) {
        console.log(req.params, req.query.order)
        const page = req.params.p;
        const sortOrder = req.query.order
        const productAmount = 20;
        const getProductStartingFrom = page * productAmount - productAmount;
        console.log(getProductStartingFrom, productAmount)
        const query = `SELECT * FROM product ORDER BY ${sortOrder} OFFSET ${getProductStartingFrom} ROWS FETCH FIRST ${productAmount} ROW ONLY`
        const productWithinPage = await db.query(query)
        res.json(productWithinPage.rows)
    }

    async getAllProduct(req, res) {
        const allProduct = await db.query("SELECT * FROM product");
        res.json(allProduct.rows)
    }

    async getProductBySearch(req, res) {
        console.log(req.params)
        const userInput = req.params.input
        const searchResult = await db.query('SELECT * FROM product WHERE name = ($1)', [userInput])
        res.json(searchResult.rows)
    }
}

module.exports = new ProductController()