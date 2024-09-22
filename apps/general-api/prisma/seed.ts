import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ROUNDS_OF_HASHING = 10;

(async () => {
  try {
    // Wipe the database
    await prisma.user.deleteMany({});
    await prisma.post.deleteMany({});

    // Seed the database with some data
    const passwordAlice = await bcrypt.hash('alice_password', ROUNDS_OF_HASHING);
    const alice = await prisma.user.create({
      data: {
        email: 'alice@prisma.io',
        password: passwordAlice,
        name: 'Alice',
        role: 'admin'
      }
    });

    const passwordBob = await bcrypt.hash('bob_password', ROUNDS_OF_HASHING);
    const bob = await prisma.user.create({
      data: {
        email: 'bob@prisma.io',
        password: passwordBob,
        name: 'Bob',
        role: 'user'
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
