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

app.get('/author/:id', (req, res) => {
    let authorId = req.params.id

    let authorQuery = `SELECT name FROM author WHERE id = ${authorId}`
    let articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`

    let authorName = ''
    let articles = []

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err
        authorName = authorResult[0].name

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err
            articles = articlesResult

            res.render('author', {
                author_name: authorName,
                articles: articles
            })
        })
    })
})

app.listen(3003, () => {
    console.log('Server is running on http://localhost:3003')
})