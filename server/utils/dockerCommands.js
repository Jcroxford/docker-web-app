const exec = require('child_process').exec

const runDockerCommand = (command) => {
  return new Promise( (resolve, reject) => {
    exec(command, (err, stdoutStr, stdErrStr) => {
      if(err) reject(err)

      let results = stdoutStr.split('\n').slice(0, -1).map( result => JSON.parse(result))
      resolve(results)
    })
  })
}

const getDockerImages = () => {
  const dkrImagesCMD = `docker images --format "{\\"id\\":\\"{{.ID}}\\", \\"repo\\": \\"{{.Repository}}\\", \\"tag\\":\\"{{.Tag}}\\", \\"digest\\":\\"{{.Digest}}\\", \\"createdSince\\":\\"{{.CreatedSince}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"size\\":\\"{{.Size}}\\"}"`
  
  return runDockerCommand(dkrImagesCMD)
}

const getDockerContainers = () => {
  const dkrPsCMD = `docker ps -a --format "{\\"id\\":\\"{{.ID}}\\", \\"image\\":\\"{{.Image}}\\", \\"createdAt\\":\\"{{.CreatedAt}}\\", \\"runningFor\\":\\"{{.RunningFor}}\\", \\"ports\\":\\"{{.Ports}}\\", \\"status\\":\\"{{.Status}}\\", \\"size\\":\\"{{.Size}}\\", \\"names\\":\\"{{.Names}}\\", \\"labels\\":\\"{{.Labels}}\\", \\"mounts\\":\\"{{.Mounts}}\\", \\"networks\\":\\"{{.Networks}}\\"}"`

  return runDockerCommand(dkrPsCMD)
}


// command for removing containers from docker:
  // one container -> docker -rm ID
  // all exited containers -> docker rm $(docker ps -a -f status=exited -q)
module.exports = {
  getDockerImages,
  getDockerContainers, 
  runDockerCommand
}
