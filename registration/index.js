require('dotenv').config()
const app = require('./app.js')

PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
})