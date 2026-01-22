const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const articleRouter = require('./routes/article')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
}))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/article', articleRouter)

app.get('/', (req, res) => {
  res.redirect('/article')
})

const authorRoutes = require('./routes/author.js')
app.use('/author', authorRoutes)

app.use('/author', authorRoutes)

app.listen(3003, () => {
  console.log('Server is running on http://localhost:3003')
})
