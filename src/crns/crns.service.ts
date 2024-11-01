import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { CommercialRegistrationNumber } from './entities/crn.entity';
import { CreateCommercialRegistrationDto } from './dto/create-crn.dto';
import { UpdateCommercialRegistrationDto } from './dto/update-crn.dto';
import { TWathqInfoResponse } from './types/wathq-response.type';

@Injectable()
export class CrnsService {
  private readonly logger = new Logger(CrnsService.name);
  constructor(
    @InjectRepository(CommercialRegistrationNumber)
    private readonly crnsRepository: Repository<CommercialRegistrationNumber>,
    private readonly httpService: HttpService,
  ) {}

  async create(createCrnDto: CreateCommercialRegistrationDto) {
    const { crNumber, userId } = createCrnDto;

    // 1. Create new CommercialRegistrationNumber entity
    const newCrn = this.crnsRepository.create(createCrnDto);

    // 2. Fetch data from the API
    const response = await this.fetchCrnData(crNumber);

    // 3. Check API response code
    if (response.status === 200) {
      const data = response.data;

      // 4. Update newCrn with data from API
      // this.updateCrnFromApiResponse(newCrn, data, userId);

      // 5. Business logic for Main CRN and Branch CRN
      // await this.handleCrnTypeLogic(newCrn, userId);

      // 6. Save the new CRN
      const savedCrn = await this.crnsRepository.save(newCrn);
      return savedCrn;
    } else {
      throw new NotFoundException(
        'Invalid or expired commercial registration number',
      );
    }
  }

  async findAll() {
    return await this.crnsRepository.find();
  }

  async findOne(id: number) {
    const crn = await this.crnsRepository.findOne({
      where: { id },
    });

    if (!crn) {
      throw new NotFoundException(
        `Commercial registration number with ID ${id} not found`,
      );
    }

    return crn;
  }

  async update(
    id: number,
    updateCommercialRegistrationNumberDto: UpdateCommercialRegistrationDto,
  ): Promise<CommercialRegistrationNumber> {
    const crn = await this.findOne(id); // Find the crn, throw error if not found

    Object.assign(crn, updateCommercialRegistrationNumberDto); // Merge new data with the existing crn
    return await this.crnsRepository.save(crn);
  }

  async remove(id: number): Promise<void> {
    const crn = await this.findOne(id); // Find the crn, throw error if not found
    await this.crnsRepository.remove(crn);
  }

  private async fetchCrnData(
    crNumber: string,
  ): Promise<AxiosResponse<TWathqInfoResponse>> {
    const url = `https://api.wathq.sa/v5/commercialregistration/info/${crNumber}`;
    const apiKey = process.env.WATHQ_API_KEY.toString();

    const headers = {
      accept: 'application/json',
      apiKey,
    };

    return await firstValueFrom(this.httpService.get(url, { headers }));
  }

  private updateCrnFromApiResponse(
    crn: CommercialRegistrationNumber,
    data: TWathqInfoResponse,
    userId: string,
  ) {
    // Update properties similar to your Ruby code (crName, crMainNumber, etc.)
    crn.crName = data.crName;
    crn.crNumber = data.crNumber;
    crn.crIssueDate = data.issueDate;
    crn.crExpiryDate = data.expiryDate;
    crn.trueCrNumber = Number(data.crNumber);
    crn.crEntityNumber = Number(data.crEntityNumber);
    crn.crMainEntityNumber = Number(data.crMainEntityNumber);
    crn.businessType = JSON.stringify(data.businessType);
    crn.crStatus == JSON.stringify(data.status);
    crn.location = JSON.stringify(data.location);
    crn.company = JSON.stringify(data.company);
    crn.activities = JSON.stringify(data.activities);
    // crn.crType = data.crMainNumber ? 'branch cr' : 'main cr';
    crn.crMainNumber = data.crMainNumber;
    crn.subscriptionStatus = 'incomplete';
    crn.userId = userId;
  }

  private async handleCrnTypeLogic(
    crn: CommercialRegistrationNumber,
    userId: string,
  ) {
    // Check for main CRN existence for the user
    const existingMainCrn = await this.crnsRepository.findOne({
      where: { userId, crType: 'main cr' },
    });

    // Logic for Main CRN and Branch CRN (similar to your Ruby code)
    if (!crn.crMainNumber) {
      // Main CRN logic
      if (existingMainCrn) {
        throw new Error('You can only create one main CRN per user.');
      }
      crn.crType = 'main cr';
    } else {
      // Branch CRN logic
      if (!existingMainCrn) {
        throw new Error(
          'Please create the main CRN first before adding branches.',
        );
      }
      const mainCrn = existingMainCrn;
      if (mainCrn.trueCrNumber.toString() !== crn.crMainNumber) {
        throw new Error(
          'The branch CRN must be related to the existing main CRN.',
        );
      }
      crn.crType = 'branch cr';
    }
  }
}
