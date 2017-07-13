const expect = require('expect')

const dockerCommands = require('../../utils/dockerCommands')
const {runDockerCommand, getDockerContainers, getDockerImages} = dockerCommands

describe('DockerCommands tests', () => {
  describe('runDockerCommands tests', () => {
    it('should throw an error when given invalid command', (done) => {
      const invalidCommand = `docker imagesBAD_REQUEST --format "{\\"id\\":\\"{{.ID}}\\"}"`

      runDockerCommand(invalidCommand)
        .then( results => done(results))
        .catch( err => {
          expect(err).toExist()
          done()
        })
    })

    it('should return a valid object when given a valid command', (done) => {
      const validCommand = `docker images --format "{\\"id\\":\\"{{.ID}}\\"}"`

      runDockerCommand(validCommand)
        .then( results => {
          expect(results).toExist()
          done()
        })
        .catch( err => done(err))
    })
  })
  
  describe('getDockerImages tests', () => {
    it('should return a valid json', (done) => {
      getDockerImages()
        .then( results => {
          expect(results).toExist()
          done()
        })
        .catch( err => done(err))
    })
  })

  describe('getDockerContainers tests', () => {
    it('should return a valid json', (done) => {
      getDockerContainers()
        .then( results => {
          expect(results).toExist()
          done()
        })
        .catch( err => done(err))
    })
  })
})