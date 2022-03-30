const express = require('express')
const app = express()

port = 5000

app.get('/', (req,res) => {
    const home = require("./pages/index");
    const homeFunction = home.loadNFTs()
    res.send(homeFunction, (err) => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log("Listening on port ${port}")
})


