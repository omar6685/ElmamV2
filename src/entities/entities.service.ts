import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entities } from './entities/entity.entity'; // Import the Entities entity
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entities)
    private readonly entitiesRepository: Repository<Entities>,
  ) {}

  // Create a new entity
  async create(createEntityDto: CreateEntityDto): Promise<Entities> {
    const newEntity = this.entitiesRepository.create(createEntityDto);
    return await this.entitiesRepository.save(newEntity);
  }

  // Retrieve all entities
  async findAll(): Promise<Entities[]> {
    return await this.entitiesRepository.find();
  }

  // Retrieve a single entity by ID
  async findOne(id: number): Promise<Entities> {
    const entity = await this.entitiesRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  // Update an existing entity by ID
  async update(id: number, updateEntityDto: UpdateEntityDto): Promise<Entities> {
    await this.entitiesRepository.update(id, updateEntityDto);
    const updatedEntity = await this.entitiesRepository.findOne({ where: { id } });
    if (!updatedEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return updatedEntity;
  }

  // Remove an entity by ID
  async remove(id: number): Promise<void> {
    const deleteResult = await this.entitiesRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
  }
}
