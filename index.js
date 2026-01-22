const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')
const mysql = require('mysql2')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))

app.use(express.static('public'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'joga_mysql'
})

con.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL database')
})

app.get('/', (req, res) => {
    let query = 'SELECT * FROM article'
    let articles = []

    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', { articles: articles })
    })
})

app.get('/article/:slug', (req, res) => {
    let query = `
        SELECT article.*, author.name AS author_name
        FROM article
        JOIN author ON article.author_id = author.id
        WHERE article.slug = '${req.params.slug}'
    `

    con.query(query, (err, result) => {
        if (err) throw err
        res.render('article', { article: result })
    })
})

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003')
})