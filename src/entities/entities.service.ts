import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entities } from './entities/entity.entity'; // Import the Entities entity
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { CrnEntities } from './entities/crn-entity.entity';
import { CreateCrnEntityDto } from './dto/create-crn-entity.dto';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entities)
    private readonly entitiesRepository: Repository<Entities>,
    @InjectRepository(CrnEntities)
    private readonly crnEntitiesRepository: Repository<CrnEntities>,
  ) {}

  // Create a new entity
  async create(createEntityDto: CreateEntityDto): Promise<Entities> {
    const newEntity = this.entitiesRepository.create(createEntityDto);
    return await this.entitiesRepository.save(newEntity);
  }

  // Create a new CRN entity
  async createCrnEntity(
    createCrnEntityDto: CreateCrnEntityDto,
  ): Promise<CrnEntities> {
    const newCrnEntity = this.crnEntitiesRepository.create(createCrnEntityDto);
    return await this.crnEntitiesRepository.save(newCrnEntity);
  }

  // Retrieve all entities
  async findAll(): Promise<Entities[]> {
    return await this.entitiesRepository.find();
  }

  // Retrieve all CRN entities
  async findAllCrnEntities(entityId?: string): Promise<CrnEntities[]> {
    const query = this.crnEntitiesRepository
      .createQueryBuilder('crnEntities')
      .leftJoinAndSelect('crnEntities.commercialRegistrationNumber', 'crNumber') // Join with CommercialRegistrationNumber
      .addSelect(['crNumber.crName', 'crNumber.company', 'crNumber.businessType', 'crNumber.location']) // Select specific fields
      .leftJoinAndSelect('crnEntities.entity', 'entity') // Optionally include the entity information if required
      .orderBy('crnEntities.id', 'ASC'); // Order by id for consistency
  
    if (entityId && !isNaN(parseInt(entityId))) {
      query.where('crnEntities.entityId = :entityId', { entityId: parseInt(entityId) });
    }
  
    return await query.getMany();
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
  async update(
    id: number,
    updateEntityDto: UpdateEntityDto,
  ): Promise<Entities> {
    await this.entitiesRepository.update(id, updateEntityDto);
    const updatedEntity = await this.entitiesRepository.findOne({
      where: { id },
    });
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
