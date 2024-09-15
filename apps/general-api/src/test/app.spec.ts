import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import request from 'supertest';

const createMock = jest.fn();
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        user: {
          create: createMock,
        },
      };
    }),
  };
});

describe('General API', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let server: any;

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
    server = app.getHttpServer();
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    const userMock = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@test.com',
    };
    it('should return 201', async () => {
      createMock.mockResolvedValue(userMock);
      const response = await request(server).post('/api/users')
        .send(userMock);
      expect(response.status).toBe(201);
      expect(response.body).toMatchSnapshot();
    });
  });

});
