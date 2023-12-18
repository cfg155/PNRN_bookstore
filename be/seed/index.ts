import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        fullname: 'Baba baba',
        email: 'baba@baba.com',
        password: '123456',
      },
      {
        fullname: 'baba babaan',
        email: 'baba02@baba.com',
        password: '123456',
      },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
