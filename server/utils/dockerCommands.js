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


const getDockerImages = () => {
  const dkrImagesCMD = `docker images --format "{\\"id\\":\\"{{.ID}}\\", \\"repo\\": \\"{{.Repository}}\\", \\"tag\\":\\"{{.Tag}}\\", \\"digest\\":\\"{{.Digest}}\\", \\"createdSince\\":\\"{{.CreatedSince}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"size\\":\\"{{.Size}}\\"}"`
  
  return runDockerCommandWithResults(dkrImagesCMD)
}

const getDockerContainers = () => {
  const dkrPsCMD = `docker ps -a --format "{\\"id\\":\\"{{.ID}}\\", \\"image\\":\\"{{.Image}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"runningFor\\":\\"{{.RunningFor}}\\", \\"ports\\":\\"{{.Ports}}\\", \\"status\\":\\"{{.Status}}\\", \\"size\\":\\"{{.Size}}\\", \\"names\\":\\"{{.Names}}\\", \\"labels\\":\\"{{.Labels}}\\", \\"mounts\\":\\"{{.Mounts}}\\", \\"networks\\":\\"{{.Networks}}\\"}"`

  return runDockerCommandWithResults(dkrPsCMD)
}

const removeDockerContainer = (id) => {
  const dkrRmCMD = `docker rm ${id}`

  return runDockerCommandWithoutResults(dkrRmCMD)
}

// const startDockerImage = ()
const startDockerContainer = (id) => {
  const dkrStartCMD = `docker start ${id}`

  return runDockerCommandWithoutResults(dkrStartCMD)
}

stopDockerContainer = (id) => {
  const dkrStopCMD = `docker stop ${id}`

  return runDockerCommandWithoutResults(dkrStopCMD)
}

// commad for stopping running containers
  // one container -> docker stop ID
  // stop multiple containers -> docker stop ID $(docker ps -a -f -q)
module.exports = {
  getDockerImages,
  getDockerContainers, 
  runDockerCommandWithResults,
  removeDockerContainer,
  startDockerContainer,
  stopDockerContainer
}
