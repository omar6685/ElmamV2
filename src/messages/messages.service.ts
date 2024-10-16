import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  // Create a new message
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(newMessage);
  }

  // Find all messages
  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      relations: ['user', 'notification'], // Include related entities if needed
    });
  }

  // Find a single message by ID
  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['user', 'notification'], // Include related entities if needed
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  // Update an existing message
  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id); // Find the message, throw error if not found

    Object.assign(message, updateMessageDto); // Merge new data with the existing message
    return await this.messageRepository.save(message);
  }

  // Remove a message by ID
  async remove(id: number): Promise<void> {
    const message = await this.findOne(id); // Find the message, throw error if not found
    await this.messageRepository.remove(message);
  }
}
