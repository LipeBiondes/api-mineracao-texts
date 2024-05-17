const openAiRequire = require('openai')

const dotenv = require('dotenv')

dotenv.config()

const openai = new openAiRequire.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const sanitizeText = async text => {
  const prompt = `
  Sanitizar o seguinte texto substituindo abreviações comuns por suas formas completas, convertendo tudo para letras minúsculas, removendo pontuações, artigos definidos e indefinidos, stop words, remova numeros, quebra de linha, subistitua os verbos para sua forma no infinitivo ou para a sua forma nominal e retorne o texto como uma frase. Aqui está o texto: "${text}"
  `

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
    return completion.choices[0].message.content
  } catch (error) {
    console.log(`Error getting OpenAI completion: ${error}`)
    return 'Não foi possível completar a mensagem. Tente novamente mais tarde.'
  }
}

module.exports = { sanitizeText }
