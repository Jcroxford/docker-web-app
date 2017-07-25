// TODO: figure out what options to include in gui(e.g. remove container? start container? stop container etc.)
// TODO: should we change display configuration? (tables that scroll separate pages, etc)
// TODO: setup api routes to handle said requests
// TODO: setup vue ajax reqs to those routes
// TODO: update readme
// TODO: modify tests for dockerCommands.js
// TODO: modify index.html to provide more functionality to docker.
      // images and containers section should have a button we can click to run a docker instance
      // and a button to delete a docker instance

const express =  require('express')
const path = require('path')

const {
  getDockerImages, 
  startDockerImage,
  deleteDockerImage,
  getDockerContainers, 
  removeDockerContainer,
  startDockerContainer,
  stopDockerContainer
} = require('./utils/dockerCommands')

const publicPath = (`${__dirname}/public`)
const port  = process.env.PORT || 3000
const app = express()

app.use(express.static(publicPath))

// image routes
app.get('/api/docker/images', (req, res) => {
  getDockerImages()
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

app.get('/api/docker/images/start/:repo', (req, res) => {
  startDockerImage(req.params.repo)
  .then( response => res.json({success: 'image successfully started'}))
  .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

app.get('/api/docker/images/delete/:repo', (req, res) => {
  deleteDockerImage(req.params.repo)
    .then( response => res.json({success: 'image successfully removed'}))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

// container routes
app.get('/api/docker/containers', (req, res) => {
  getDockerContainers()
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})

app.get('/api/docker/containers/remove/:id', (req, res) => {
  removeDockerContainer(req.params.id)
    .then( () => res.json({success: 'container successfully deleted'}))
    .catch( (err) => {
      console.log(err)
      res.status(500).json({error: 'unable to remove container'})
    })
})

app.get('/api/docker/containers/start/:id', (req, res) => {
  startDockerContainer(req.params.id)
    .then( () => res.json({success: 'container is now running'}))
    .catch( (err) => {
      console.log(err)
      res.status(500).json({error: 'unable to start container'})
    })
})

app.get('/api/docker/containers/stop/:id', (req, res) => {
  stopDockerContainer(req.params.id)
    .then( () => res.json({success: 'container is has stopped'}))
    .catch( (err) => {
      console.log(err)
      res.status(500).json({error: 'unable to stop container'})
    })
})

app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// allows express testing
module.exports.app = app