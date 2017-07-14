// TODO: figure out what options to include in gui(e.g. remove container? start container? stop container etc.)
// TODO: where should these options be displayed on the page?
// TODO: should we change display configuration? (tables that scroll separate pages, etc)
// TODO: setup api routes to handle said requests
// TODO: setup vue ajax reqs to those routes
// TODO: update readme
// TODO: modify tests for dockerCommands.js
// TODO: modify index.html to provide more functionality to docker.
      // the images section should have a button we can click to run a docker image
      // the containers should have a delete option 

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

app.get('/api/docker/images', (req, res) => {
  getDockerImages()
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

app.get('/api/docker/containers', (req, res) => {
  getDockerContainers()
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// allows express testing
module.exports.app = app