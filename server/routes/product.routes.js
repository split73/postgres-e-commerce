const Router = require("express");
const router = new Router;
const productController = require("../controllers/product.controller");

router.post('/add-product', productController.addProduct);
router.get('/get-single-product/:id', productController.getSingleProduct)
router.get('/product/:p', productController.getProductRelativeToPage)
router.get('/all-product', productController.getAllProduct)
module.exports = router;