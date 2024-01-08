const { Worker, isMainThread } = require('worker_threads')
// const request = require('request')

function randomString(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

const run = async () => {
  const url = 'http://localhost:3000/api/admin/1'
  const option = {
    method: 'PUT',
    headers: {
      cookie: `takc=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluMTIzNDEyMzQxMjM0Iiwicm9sZSI6MSwic3RhdHVzIjoyLCJleHAiOjE3MDQyNjUwOTAsImlhdCI6MTcwNDI2MTQ5MH0.mnYKjbI81ExQS3BcZeEMMOtblKS2OCnk8C54Keyj5gs; trke=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluMTIzNDEyMzQxMjM0Iiwicm9sZSI6MSwic3RhdHVzIjoyLCJleHAiOjE3MDU5ODk0OTAsImlhdCI6MTcwNDI2MTQ5MH0.0hUea5kmgyvMcraVwfUYL_SLk3VjrnJL0Ia81Kj2igY`,
    },
    body: {
      signinPw: randomString(8),
      name: randomString(8),
      role: 'ADMIN',
      status: 'REGISTERED',
    },
  }
  await fetch(url, option)
}
setInterval(run, 100)
