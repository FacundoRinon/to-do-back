import { Test, TestingModule } from '@nestjs/testing';
import { UserlistsService } from './userlists.service';

describe('UserlistsService', () => {
  let service: UserlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserlistsService],
    }).compile();

    service = module.get<UserlistsService>(UserlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
