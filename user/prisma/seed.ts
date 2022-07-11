import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const users: Array<Prisma.UserCreateInput> = [
  {
    email: 'michael.lawson@reqres.in',
    name: 'Michael Lawson',
    password: 'michael',
  },
  {
    email: 'lindsay.ferguson@reqres.in',
    name: 'Lindsay Ferguson',
    password: 'lindsay',
  },
  {
    email: 'tobias.funke@reqres.in',
    name: 'Tobias Funke',
    password: 'tobias',
  },
  {
    email: 'byron.fields@reqres.in',
    name: 'Byron Fields',
    password: 'byron',
  },
  {
    email: 'george.edwards@reqres.in',
    name: 'George Edwards',
    password: 'george',
  },
  {
    email: 'rachel.howell@reqres.in',
    name: 'Rachel Howell',
    password: 'rachel',
  },
]

const prisma = new PrismaClient()

async function main() {
  const upsertUsers = users.map(async (user) => {
    return await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      },
    })
  })

  const result = await Promise.all(upsertUsers)

  result.forEach((user) => console.log(`Upsert user "${user.name} (${user.email})"`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
