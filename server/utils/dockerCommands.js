const exec = require('child_process').exec

const runDockerCommandWithResults = (command) => {
  return new Promise( (resolve, reject) => {
    exec(command, (err, stdoutStr, stdErrStr) => {
      if(err) {
        reject(err)
      }

      let results = stdoutStr.split('\n').slice(0, -1).map( result => JSON.parse(result))
      resolve(results)
    })
  })
}

const runDockerCommandWithoutResults = (command) => {
  return new Promise( (resolve, reject) => {
    exec(command, (err, stdoutStr, stdErrStr) => {
      if(err) {
        reject(err)
      }
      resolve()
    })
  })
}


// image commands
const getDockerImages = () => {
  const dkrImagesCMD = `docker images --format "{\\"id\\":\\"{{.ID}}\\", \\"repo\\": \\"{{.Repository}}\\", \\"tag\\":\\"{{.Tag}}\\", \\"digest\\":\\"{{.Digest}}\\", \\"createdSince\\":\\"{{.CreatedSince}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"size\\":\\"{{.Size}}\\"}"`
  
  return runDockerCommandWithResults(dkrImagesCMD)
}

// this function uses repo name to start because the image name that is passed to the new container
  // is the value it's given during run command
const startDockerImage = (repo) => {
  const dkrStartCMD = `docker run ${repo}`

  return runDockerCommandWithoutResults(dkrStartCMD)
}

const deleteDockerImage = (repo) => {
  // running with -f allows the removal of image even if it has existing containers(this will change the name of the container to it's id)
  const dkrRemoveCMD = `docker image rm -f ${repo}`

  return runDockerCommandWithoutResults(dkrRemoveCMD)
}

// container commands
const getDockerContainers = () => {
  const dkrPsCMD = `docker ps -a --format "{\\"id\\":\\"{{.ID}}\\", \\"image\\":\\"{{.Image}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"runningFor\\":\\"{{.RunningFor}}\\", \\"ports\\":\\"{{.Ports}}\\", \\"status\\":\\"{{.Status}}\\", \\"size\\":\\"{{.Size}}\\", \\"names\\":\\"{{.Names}}\\", \\"labels\\":\\"{{.Labels}}\\", \\"mounts\\":\\"{{.Mounts}}\\", \\"networks\\":\\"{{.Networks}}\\"}"`

  return runDockerCommandWithResults(dkrPsCMD)
}

const removeDockerContainer = (id) => {
  const dkrRmCMD = `docker rm ${id}` 

  return runDockerCommandWithoutResults(dkrRmCMD)
}

const startDockerContainer = (id) => {
  const dkrStartCMD = `docker start ${id}`

  return runDockerCommandWithoutResults(dkrStartCMD)
}

stopDockerContainer = (id) => {
  const dkrStopCMD = `docker stop ${id}`

  return runDockerCommandWithoutResults(dkrStopCMD)
}

module.exports = {
  getDockerImages,
  startDockerImage,
  deleteDockerImage,
  getDockerContainers, 
  runDockerCommandWithResults,
  removeDockerContainer,
  startDockerContainer,
  stopDockerContainer
}
