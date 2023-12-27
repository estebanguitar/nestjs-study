import * as fs from 'fs'

function envSetup() {
  const filename = process.env.ENV === 'prod' ? 'env.prod.json' : 'env.dev.json'
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const env = JSON.parse(data)
    Object.keys(env).forEach((key) => {
      // console.log(key, env[key])
      process.env[key] = env[key]
    })
    import('./app.main')
  })
}

envSetup()
