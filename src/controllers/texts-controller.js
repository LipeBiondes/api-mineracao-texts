const textsModel = require('../models/texts-model')
const sanitizeText = require('../services/openai')

const getAllTexts = async (_, response) => {
  try {
    const texts = await textsModel.getAllTexts()

    if (!texts) {
      response.status(404).json({ error: 'No texts found' })
    }

    return response.status(200).json(texts)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const createText = async (request, response) => {
  const { title, autor, content } = request.body

  try {
    contentSanitized = await sanitizeText.sanitizeText(content)
    const newText = await textsModel.createText(title, autor, contentSanitized)

    if (!newText) {
      response.status(400).json({ error: 'Error creating text' })
    }

    return response.status(201).json(newText)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const deleteText = async (request, response) => {
  const { id } = request.params

  try {
    const text = await textsModel.deleteText(id)

    if (!text) {
      response.status(404).json({ error: 'Text not found' })
    }

    return response.status(200).json(text)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const updateText = async (request, response) => {
  const { id } = request.params
  const { title, autor, content } = request.body

  try {
    const text = await textsModel.updateText(id, title, autor, content)

    if (!text) {
      response.status(404).json({ error: 'Text not found' })
    }

    return response.status(200).json(text)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

module.exports = { getAllTexts, createText, deleteText, updateText }
