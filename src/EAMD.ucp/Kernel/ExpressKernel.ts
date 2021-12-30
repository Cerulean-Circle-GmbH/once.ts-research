import { NodeJsKernel } from './NodeJsKernel.js'
import express from 'express'
import http from 'http'
import cors from 'cors'
import serveIndex from 'serve-index'
import  path  from 'path'

export  class ExpressKernel extends NodeJsKernel {
  protected express = express()

async start (port = 8080) {
  console.log('running in node')
  this.express.use(cors())

  this.express.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/Once.html'))
  })
  this.express.use('/', serveIndex('dist', { icons: true }))
  this.express.use('/', express.static('dist', {}))
  this.express.use('/docs', express.static('docs', {}))


  await this.startServer(port)
  return this
}

protected logUrls(url:string){
  console.log(`localhost:   ${url}`)
  console.log(`repository:  ${url}/EAMD.ucp`)
  console.log(`docs:        ${url}/docs`)
}

protected async startServer (port:number) {
  const server = http.createServer(this.express)
  server.listen(port, () =>  this.logUrls(`http://localhost:${port}`))
}
}
