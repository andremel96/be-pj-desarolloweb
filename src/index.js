const express = require('express')
const routes = require('./routes/approute')

const app = express();
app.use(express.json())
routes(app)

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`
    🚀 Server ready at: http://localhost:3000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
})