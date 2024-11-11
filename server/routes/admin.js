const express = require('express')
const router = express.Router()
const { authCheck } = require('../middleware/authCheck')
const { changeOrderStatus, getOrderAdmin } = require('../controller/admin')

router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)

module.exports = router