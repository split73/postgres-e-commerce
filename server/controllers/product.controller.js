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
            if (singleElementJsonFile.specs){
                for (let k = 0; k < singleElementJsonFile.specs.length; k++){
                    let specsBodySting = "";
                    let specsValueSting = ""

                    for (let i = 0; i < singleElementJsonFile.specs[k].specsBody.length; i++){
                        
                        if (singleElementJsonFile.specs[k].specsBody[i] === ":"){
                            while (singleElementJsonFile.specs[k].specsBody[i] !== undefined){
                                i++;
                                if (singleElementJsonFile.specs[k].specsBody[i] !== undefined && singleElementJsonFile.specs[k].specsBody[i] !== " "){
                                    specsValueSting += singleElementJsonFile.specs[k].specsBody[i];
                                }
                            }
                        } else {
                            specsBodySting += singleElementJsonFile.specs[k].specsBody[i]
                        }
                    }
                        specsBodyArray.push([specsBodySting, specsValueSting])
                }
            }

            // console.log(specsBodyArray[0])
            for (let i = 0; i < specsBodyArray.length; i++){
                console.log("QQ", specsBodyArray[i][0], specsBodyArray[i][1])
                
            }
                
            

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
        res.json((amountOfProductById.rows))
    }

    async getSingleProduct(req, res) {
        const id = req.params.id;
        const singleProduct = await db.query('SELECT * FROM product WHERE id = $1', [id]);
        res.json(singleProduct.rows)
    }

    async getProductRelativeToPage(req, res) {
        const queryParams = {
            page: req.params.p,
            productAmount: 21,
            sortOrder: req.query.order,
            searchFilter: req.query.filter,
            minPriceInput: req.query.minPriceInput * 100,
            maxPriceInput: req.query.maxPriceInput * 100
        }
        const getProductStartingFrom = queryParams.page * queryParams.productAmount - queryParams.productAmount;

        let productQuery = `SELECT * FROM product WHERE price >= ${queryParams.minPriceInput} and price <= ${queryParams.maxPriceInput} `
        let pageQuery = `SELECT COUNT(id) FROM product WHERE price >= ${queryParams.minPriceInput} and price <= ${queryParams.maxPriceInput}`;
        
        if (queryParams.searchFilter !== undefined && queryParams.searchFilter.length > 0){
            productQuery += ` AND position('${queryParams.searchFilter}' in LOWER(name))>0 `
            pageQuery += ` And position('${queryParams.searchFilter}' in LOWER(name))>0 `
        }
     
        productQuery += `ORDER BY ${queryParams.sortOrder} OFFSET ${getProductStartingFrom} ROWS FETCH FIRST ${queryParams.productAmount} ROW ONLY`
        console.log(productQuery)
        // productQuery must be passed to productWithinPage as string
        const productWithinPage = await db.query(productQuery)
        const getAmountOfProduct = await db.query(pageQuery)
        const countProduct = getAmountOfProduct.rows[0].count
        const result = {productData: [...productWithinPage.rows], countProduct}
        res.json(result)
    }

    async getStartingPageProduct(req, res) {
        const getProductStartingFrom = 95

        const productQuery = await db.query('SELECT * FROM product OFFSET $1 ROWS FETCH FIRST 10 ROW ONLY', [getProductStartingFrom])
        res.json(productQuery.rows)
    }

    async getAllProduct(req, res) {
        const allProduct = await db.query("SELECT * FROM product");
        res.json(allProduct.rows)
    }

    async getProductBySearch(req, res) {
        const userInput = req.params.input
        const searchResult = await db.query('SELECT * FROM product WHERE position(($1) in LOWER(name))>0 FETCH FIRST 5 ROW ONLY', [userInput])
        res.json(searchResult.rows)
    }
}

module.exports = new ProductController()