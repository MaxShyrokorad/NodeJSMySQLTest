const express = require('express')
const dotenv = require('dotenv')
const userRouter = require('./routes/user.route')
const path = require("path");
const upload = require('./utils/uploadImage.utils')

const app = express()

dotenv.config()

app.use(express.json())

app.use(express.static(path.join(__dirname, 'static')))

app.use(upload)

const port = Number(process.env.PORT || 8080)

app.use(`/api`, userRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});


app.listen(port, () => console.log(`Server running on port ${port}....`))

module.exports = app