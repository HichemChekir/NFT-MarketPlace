// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
*/

const express = require('express')
const app = express()

app.get('/', (req,res) => {
  res.send(Home())
})

let port = 4050
app.listen(port,() => {
  console.log("listening on port ${port}")
} )