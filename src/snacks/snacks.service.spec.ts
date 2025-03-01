import { Test, TestingModule } from '@nestjs/testing';
import { SnacksService } from './snacks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AddSnackDto } from './dto/add-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

describe('SnacksService', () => {
  let service: SnacksService;
  let prismaService: PrismaService;

  const mockSnack = { id: 'test-id', name: 'Chips', link: null };

  const prismaServiceMock = {
    snack: {
      findMany: jest.fn().mockResolvedValue([mockSnack]),
      create: jest.fn().mockResolvedValue(mockSnack),
      findUnique: jest.fn(),
      update: jest
        .fn()
        .mockResolvedValue({ ...mockSnack, link: 'http://example.com' }),
      delete: jest.fn().mockResolvedValue(mockSnack),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnacksService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<SnacksService>(SnacksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSnacks', () => {
    it('모든 간식 리스트 리턴', async () => {
      const snacks = await service.getSnacks();
      expect(prismaService.snack.findMany).toHaveBeenCalled();
      expect(snacks).toEqual([mockSnack]);
    });
  });

  describe('간식 추가', () => {
    it('새로운 간식을 추가한다.', async () => {
      const dto: AddSnackDto = { name: 'Chips' };
      const result = await service.addSnack(dto);
      expect(prismaService.snack.create).toHaveBeenCalledWith({
        data: { name: dto.name },
      });
      expect(result).toEqual(mockSnack);
    });
  });

  describe('updateSnackLink', () => {
    it('should update the snack link if the snack exists', async () => {
      const dto: UpdateSnackDto = { link: 'http://example.com' };
      // 모킹: findUnique가 snack을 반환하도록 설정
      prismaService.snack.findUnique.mock(mockSnack);
      const result = await service.updateSnackLink(mockSnack.id, dto);
      expect(prismaService.snack.findUnique).toHaveBeenCalledWith({
        where: { id: mockSnack.id },
      });
      expect(prismaService.snack.update).toHaveBeenCalledWith({
        where: { id: mockSnack.id },
        data: { link: dto.link },
      });
      expect(result).toEqual({ ...mockSnack, link: dto.link });
    });

    it('should throw NotFoundException if the snack does not exist', async () => {
      prismaService.snack.findUnique.mockResolvedValueOnce(null);
      const dto: UpdateSnackDto = { link: 'http://example.com' };
      await expect(
        service.updateSnackLink('non-existent-id', dto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeSnack', () => {
    it('should remove the snack if it exists', async () => {
      prismaService.snack.findUnique.mockResolvedValueOnce(mockSnack);
      const result = await service.removeSnack(mockSnack.id);
      expect(prismaService.snack.findUnique).toHaveBeenCalledWith({
        where: { id: mockSnack.id },
      });
      expect(prismaService.snack.delete).toHaveBeenCalledWith({
        where: { id: mockSnack.id },
      });
      expect(result).toEqual(mockSnack);
    });

    it('should throw NotFoundException if the snack does not exist', async () => {
      prismaService.snack.findUnique.mockResolvedValueOnce(null);
      await expect(service.removeSnack('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
