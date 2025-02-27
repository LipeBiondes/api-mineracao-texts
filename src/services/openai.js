const { OpenAIApi, Configuration } = require('openai')
const dotenv = require('dotenv')

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const sanitizeText = async (text) => {
  const prompt = `
  Sanitizar o seguinte texto substituindo abreviações comuns por suas formas completas, convertendo tudo para letras minúsculas, removendo pontuações, artigos definidos e indefinidos, stop words, remova números, quebras de linha, substitua os verbos para sua forma no infinitivo ou para a sua forma nominal e retorne o texto como uma frase. Aqui está o texto: "${text}"
  `

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
    return completion.data.choices[0].message.content
  } catch (error) {
    console.log(`Error getting OpenAI completion: ${error}`)
    return 'Não foi possível completar a mensagem. Tente novamente mais tarde.'
  }
}

module.exports = { sanitizeText }
