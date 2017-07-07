const express =  require('express')

const {getDockerImages, getDockerContainers} = require('./dockerCommands')

getDockerImages()
    .then( (imagesJSON) => {
        console.log(imagesJSON)
    })
    .catch( (err) => {
        console.log(err)
    })
getDockerContainers()
    .then( (containersJSON) => {
        console.log(containersJSON)
    })
    .catch( (err) => {
        console.log(err)
    })
