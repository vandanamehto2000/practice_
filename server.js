const express = require("express");
const app = express()
const db = require("./config/dbConfig")

app.use(express.json())

const controller = require("./routes/route")
app.use(controller);

app.listen(8000, () => {
    console.log("server has started on port 8000");
})

db();