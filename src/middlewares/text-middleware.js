const validateContentBody = (request, response, next) => {
  const { body } = request

  if (body.content === undefined) {
    return response
      .status(400)
      .json({ message: 'The field "content" is required' })
  }

  next()
}

const validateIdParam = (request, response, next) => {
  const { id } = request.params

  if (!id) {
    return response.status(400).json({ message: 'The field "id" is required' })
  }

  next()
}

module.exports = { validateContentBody, validateIdParam }
