import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database';

describe('UsersService', () => {
  let service: UsersService;

  const createMock = jest.fn();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: DatabaseService,
        useValue: {
          user: {
            create: createMock,
          },
        },
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call create on the database service', () => {
      const createUserDto = { name: 'John Doe', email: 'john.doe@test.com' };
      service.create(createUserDto);
      expect(createMock).toHaveBeenCalledWith({ data: createUserDto });
    });
  });
});
