const express = require('express')

const router = express.Router()

const textsController = require('./controllers/texts-controller')
const textMiddleware = require('./middlewares/text-middleware')

router.get('/texts', textsController.getAllTexts)
router.post(
  '/texts',
  textMiddleware.validateContentBody,
  textsController.createText
)
router.delete(
  '/texts/:id',
  textMiddleware.validateIdParam,
  textsController.deleteText
)
router.put(
  '/texts/:id',
  textMiddleware.validateIdParam,
  textsController.updateText
)

module.exports = router
