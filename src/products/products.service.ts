import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFound } from 'src/errors';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }
  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: { ...createProductDto, quantity: 0 },
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.product.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFound(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFound(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFound(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }
}
