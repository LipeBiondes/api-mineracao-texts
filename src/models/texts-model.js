const prisma = require('../lib/prisma')

const getAllTexts = async () => {
  const texts = prisma.text.findMany()

  if (!texts) {
    throw new Error('No texts found')
  }

  return texts
}

const createText = async (title, autor, contentSanitized) => {
  if (!contentSanitized) {
    throw new Error('Content is required')
  }

  if (!title || !autor) {
    title = 'Sem título'
    autor = 'Anonimo'
  }

  const newText = prisma.text.create({
    data: {
      title,
      autor,
      content: contentSanitized
    }
  })

  return newText
}

const deleteText = async id => {
  if (!id) {
    throw new Error('ID is required')
  }

  const text = prisma.text.delete({
    where: {
      id
    }
  })

  if (!text) {
    throw new Error('Text not found')
  }

  return text
}

const updateText = async (id, title, autor, content) => {
  if (!id) {
    throw new Error('ID is required')
  }

  if (!content) {
    throw new Error('Content is required')
  }

  if (!title || !autor) {
    title = 'Sem título'
    autor = 'Anonimo'
  }

  const textExists = prisma.text.findUnique({
    where: {
      id
    }
  })

  if (!textExists) {
    throw new Error('Text not found')
  }

  const text = prisma.text.update({
    where: {
      id
    },
    data: {
      title,
      autor,
      content
    }
  })

  return text
}
module.exports = {
  getAllTexts,
  createText,
  deleteText,
  updateText
}
