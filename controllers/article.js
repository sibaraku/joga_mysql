const connection = require('../utils/db.js')

const getAllArticles = (req, res) => {
    let query = 'SELECT * FROM article'
    connection.query(query, (err, result) => {
        if (err) throw err
        res.render('index', { articles: result })
    })
}

const getArticleBySlug = (req, res) => {
    let query = `
        SELECT article.*, author.name AS author_name
        FROM article
        JOIN author ON article.author_id = author.id
        WHERE article.slug = '${req.params.slug}'
    `

    connection.query(query, (err, result) => {
        if (err) throw err
        res.render('article', { article: result })
    })
}

module.exports = { getAllArticles, getArticleBySlug }