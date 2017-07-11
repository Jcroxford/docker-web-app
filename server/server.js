// TODO: write tests for dockerCommands.js
// TODO: update README
// TODO: setup basic working rest api for docker commands
// TODO: add index.html that uses vue/bootstrap/axios to provide a gui for 
      // displaying docker data and eventual user interaction

const express =  require('express')
const path = require('path')

const {getDockerImages, getDockerContainers} = require('./utils/dockerCommands')

const publicPath = (`${__dirname}/public`)
const port  = process.env.PORT || 3000
const app = express()

app.use(express.static(publicPath))

// temporary route to confirm express is working
app.get('/api/docker/allthethings', (req, res) => {
  Promise.all([getDockerImages(), getDockerContainers()])
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})
// end temporary

app.listen(port, () => console.log(`listening on http://localhost:${port}`))