const express = require('express')
const router = express.Router()

const { create, list, update, read, remove, listBy, searchFilters, createImages, removeImage } = require('../controller/product')
const { authCheck, adminCheck } = require('../middleware/authCheck')
// @ENDPOINT http://localhost:5001/api/product
router.post('/product', create)
router.get('/products/:count', list)
router.put('/product/:id', update)
router.get('/product/:id', read)
router.delete('/product/:id', remove)
router.post('/productby', listBy)
router.post('/search/filters', searchFilters)

router.post('/images', authCheck, adminCheck ,createImages)
router.post('/removeImage', authCheck, adminCheck, removeImage)




module.exports = router