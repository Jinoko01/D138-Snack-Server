import { Test, TestingModule } from '@nestjs/testing';
import { SnacksController } from './snacks.controller';
import { SnacksService } from './snacks.service';
import { AddSnackDto } from './dto/add-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

describe('SnackController', () => {
  let controller: SnacksController;
  let service: SnacksService;

  const mockSnack = { id: 'test-id', name: 'Chips', link: null };

  const snackServiceMock = {
    getSnacks: jest.fn().mockResolvedValue([mockSnack]),
    addSnack: jest.fn().mockResolvedValue(mockSnack),
    updateSnackLink: jest
      .fn()
      .mockResolvedValue({ ...mockSnack, link: 'http://example.com' }),
    removeSnack: jest.fn().mockResolvedValue(mockSnack),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnacksController],
      providers: [{ provide: SnacksService, useValue: snackServiceMock }],
    }).compile();

    controller = module.get<SnacksController>(SnacksController);
    service = module.get<SnacksService>(SnacksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSnacks', () => {
    it('should return an array of snacks', async () => {
      const result = await controller.getSnacks();
      expect(service.getSnacks).toHaveBeenCalled();
      expect(result).toEqual([mockSnack]);
    });
  });

  describe('addSnack', () => {
    it('should add a new snack', async () => {
      const dto: AddSnackDto = { name: 'Chips' };
      const result = await controller.addSnack(dto);
      expect(service.addSnack).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockSnack);
    });
  });

  describe('updateSnackLink', () => {
    it('should update snack link', async () => {
      const dto: UpdateSnackDto = { link: 'http://example.com' };
      const result = await controller.updateSnackLink(mockSnack.id, dto);
      expect(service.updateSnackLink).toHaveBeenCalledWith(mockSnack.id, dto);
      expect(result).toEqual({ ...mockSnack, link: dto.link });
    });
  });

  describe('removeSnack', () => {
    it('should remove a snack', async () => {
      const result = await controller.removeSnack(mockSnack.id);
      expect(service.removeSnack).toHaveBeenCalledWith(mockSnack.id);
      expect(result).toEqual(mockSnack);
    });
  });
});
