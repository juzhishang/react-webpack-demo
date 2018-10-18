const express = require('express')
const fs= require('fs')
const ReactRSS = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default
const app = express()
const path = require('path')
var favicon = require('serve-favicon')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

app.use('/public', express.static(path.join(__dirname, '../dist')))

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.get('*', function(req, res) {
  const appString  =  ReactRSS.renderToString(serverEntry)
  res.send(template.replace('<app></app>', appString))
})

app.listen(1234, function(){
  console.log('server is listening at 1234')
})