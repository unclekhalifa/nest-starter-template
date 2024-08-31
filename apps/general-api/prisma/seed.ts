import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    // Wipe the database
    await prisma.user.deleteMany({});
    await prisma.post.deleteMany({});

    // Seed the database with some data
    const alice = await prisma.user.create({
      data: {
        email: 'alice@prisma.io',
        name: 'Alice'
      }
    });

    const bob = await prisma.user.create({
      data: {
        email: 'bob@prisma.io',
        name: 'Bob'
      }
    });

    await prisma.post.create({
      data: {
        title: 'Hello World',
        content: 'This is my first blog post',
        published: true,
        author: {
          connect: {
            id: alice.id
          }
        },
      }
    });

    await prisma.post.create({
      data: {
        title: 'Second Post',
        content: 'This is my second blog post',
        published: false,
        author: {
          connect: {
            id: bob.id
          }
        },
      }
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();
