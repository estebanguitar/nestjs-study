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
  const url = 'http://localhost:3000/api/admin'
  const option = {
    method: 'POST',
    headers: {
      cookie:
        'takc=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluYWRtaW5hIiwicm9sZSI6MSwic3RhdHVzIjoyLCJleHAiOjE3MDQyNjUxMjEsImlhdCI6MTcwNDI2MTUyMX0.INtTkyt4_JZwRsbDeJ_Or2v5sGB9SAIanJM1psJIWGQ; trke=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluYWRtaW5hIiwicm9sZSI6MSwic3RhdHVzIjoyLCJleHAiOjE3MDU5ODk1MjEsImlhdCI6MTcwNDI2MTUyMX0.e9I7mKCNrdjmaj1NjPItf_uBfwjZKhXPK9XyXHPN51g',
      // Accept: 'application/json',
    },
    body: JSON.stringify({
      signinId: `${randomString(6)}`,
      signinPw: `${randomString(8)}`,
      name: `${randomString(6)}`,
      role: 'VIEWER',
    }),
  }
  fetch(url, option)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
}
run()
// setInterval(run, 75)
