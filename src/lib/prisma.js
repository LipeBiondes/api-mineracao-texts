const prismaClient = require('@prisma/client')

const prisma = new prismaClient.PrismaClient({
  log: ['query']
})

module.exports = prisma
