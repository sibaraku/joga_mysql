const connection = require('../utils/db.js')

const getAuthorArticles = (req, res) => {
    let authorId = req.params.id

    let authorQuery = `SELECT name FROM author WHERE id = ${authorId}`
    let articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`

    connection.query(authorQuery, (err, authorResult) => {
        if (err) throw err

        let authorName = authorResult[0].name

        connection.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err

            res.render('author', {
                author_name: authorName,
                articles: articlesResult
            })
        })
    })
}

module.exports = { getAuthorArticles }