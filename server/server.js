// TODO: write tests for dockerCommands.js
// TODO: update README
// TODO: setup basic working rest api for docker commands
// TODO: add index.html that uses vue/bootstrap/axios to provide a gui for 
      // displaying docker data and eventual user interaction

const express =  require('express')

const {getDockerImages, getDockerContainers} = require('./utils/dockerCommands')

const port  = process.env.PORT || 3000
const app = express()

// temporary route to confirm express is working
app.get('/', (req, res) => {
  res.send('Hey there, try visiting the route /docker/allthethings ;)')
})

app.get('/docker/allthethings', (req, res) => {
  Promise.all([getDockerImages(), getDockerContainers()])
    .then( dockerInfo => res.json(dockerInfo))
    .catch( (err) => {
      console.log(err)
      res.status(500).send()
    })
})
// end temporary

app.listen(port, () => console.log(`listening on http://localhost:${port}`))