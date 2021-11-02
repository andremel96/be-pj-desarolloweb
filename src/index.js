const express = require('express')
const routes = require('./routes/approute')

const app = express();
app.use(express.json())
routes(app)
const PORT=process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server ready at: http://localhost:${PORT}
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
})