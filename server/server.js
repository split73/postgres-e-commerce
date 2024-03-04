const express = require('express')
const productRouter = require("./routes/product.routes")
const cors = require('cors')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 8080;

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', productRouter)
app.set("trus proxy", 1)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })