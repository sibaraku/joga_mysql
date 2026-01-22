const express = require('express')
const router = express.Router()

const articleController = require('../controllers/article.js')

router.get('/', articleController.getAllArticles)
router.get('/:slug', articleController.getArticleBySlug)

module.exports = router;