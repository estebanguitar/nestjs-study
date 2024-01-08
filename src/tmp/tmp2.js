const { Worker, isMainThread } = require('worker_threads')
// const request = require('request')

const run = async () => {
  const url2 = 'http://localhost:3000/system/health'
  await fetch(url2)
}
setInterval(run, 50)
