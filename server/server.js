const express = require('express')
const productRouter = require("./routes/product.routes")
const cors = require('cors')

const PORT = process.env.PORT || 8080;

const app = express()

app.use(express.json())

app.use(cors());


app.use('/api', productRouter)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
  })