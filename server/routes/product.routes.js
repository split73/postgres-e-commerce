const Router = require("express");
const router = new Router;
const productController = require("../controllers/product.controller");

router.post('/add-product', productController.addProduct);
router.get('/get-single-product/:id', productController.getSingleProduct)
router.get('/product/:p', productController.getProductRelativeToPage)
router.get('/all-product', productController.getAllProduct)
router.get('/get-page-amount', productController.getAmountOfProduct)
router.get('/search-input/:input', productController.getProductBySearch)
router.get('/main-page', productController.getStartingPageProduct)
module.exports = router;