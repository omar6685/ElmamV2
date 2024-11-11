import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNationalityReportDto } from './dto/nationality-reports/create.dto';
import { UpdateNationalityReportDto } from './dto/nationality-reports/update.dto';
import { NationalityReport } from './entities/nationality-report.entity';
import { CrnEntities } from 'src/entities/entities/crn-entity.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(NationalityReport)
    private readonly nationalityReportsRepository: Repository<NationalityReport>,
    @InjectRepository(CrnEntities)
    private readonly crnEntitiesRepository: Repository<CrnEntities>,
  ) {}
  async create(createReportDto: CreateNationalityReportDto) {
    try {
      // const { saudis, totalEmployees, result, maxAddition } =
      //   this.extractReportFields(createReportDto);
      // const newReport: NationalityReport =
      //   this.nationalityReportsRepository.create({
      //     name: `Report-${new Date().getTime().toString()}`,
      //     saudis,
      //     totalEmployees,
      //     result,
      //     maxAddition,
      //     entityId: createReportDto.entityId,
      //     userId: createReportDto.userId,
      //   });
      // await this.nationalityReportsRepository.save(newReport);
      // return newReport;
      // change the logic of the create method to the following
      // when receiving a request to generate a nationality report the body will only contain the entityId
      // we will use crnEntitiesRepository to get all the CRNs that belong to the entity
      // every crn will have a nationalities field which an aray of objects containings nationalities and their count
      // for ex: "[{""name"": ""هندي"", ""count"": 31}, {""name"": ""فلبيني"", ""count"": 1}, {""name"": ""نيبالي"", ""count"": 7}, {""name"": ""باكستاني"", ""count"": 4}, {""name"": ""مصرى"", ""count"": 5}, {""name"": ""سعودي"", ""count"": 8}, {""name"": ""يمني"", ""count"": 15}, {""name"": ""سوداني"", ""count"": 1}]"
      // after that we will calculate the total number of employees and the number of saudis and the result field for all the nationalities inside the crn entities and combine them in one report

      const crnEntities = await this.crnEntitiesRepository.find({
        where: { entityId: createReportDto.entityId },
      });

      console.log('CrnEntities that belong to the entity', crnEntities);

      const nationalities = crnEntities.reduce(
        (acc, crn) => {
          const crnNationalities = crn.nationalities || [];
          return acc.concat(crnNationalities);
        },
        [] as { name: string; count: number }[],
      );

      console.log('Nationalities extracted from the CRNs', nationalities);

      const { saudis, totalEmployees, result, maxAddition } =
        this.extractReportFields({ nationalities });

      console.log('saudis', result);

      const newReport: NationalityReport =
        this.nationalityReportsRepository.create({
          name: `Report-${new Date().getTime().toString()}`,
          saudis,
          totalEmployees,
          result,
          maxAddition,
          entityId: createReportDto.entityId,
          userId: createReportDto.userId,
        });

      await this.nationalityReportsRepository.save(newReport);

      return newReport;
    } catch (err) {
      console.log(err);
      throw new Error('Error creating nationality report');
    }
  }

  async findAll() {
    return await this.nationalityReportsRepository.find();
  }

  async findOne(id: number) {
    const nationalityReport = await this.nationalityReportsRepository.findOne({
      where: { id },
    });

    if (!nationalityReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return nationalityReport;
  }

  async update(
    id: number,
    updateReportDto: UpdateNationalityReportDto,
  ): Promise<NationalityReport> {
    const nationalityReport = await this.findOne(id); // Find the nationalityReport, throw error if not found

    Object.assign(nationalityReport, updateReportDto); // Merge new data with the existing nationalityReport
    return await this.nationalityReportsRepository.save(nationalityReport);
  }

  async remove(id: number): Promise<void> {
    const nationalityReport = await this.findOne(id); // Find the nationalityReport, throw error if not found
    await this.nationalityReportsRepository.remove(nationalityReport);
  }

  private extractReportFields(data: {
    nationalities: { name: string; count: number }[];
  }) {
    console.log('extractReportFields called with data', data);
    // Calculate the total number of employees
    const totalEmployees = data.nationalities.reduce(
      (sum, { count }) => sum + count,
      0,
    );

    // Get the number of Saudis (assuming 'Saudis' is one of the nationalities)
    const saudis =
      data.nationalities.find((nat) => nat.name.toLowerCase() === 'سعودي')
        ?.count || 0;

    // Build the result field (formatted string with name, count, and percentage)
    const totalForeignerEmployees = totalEmployees - saudis;
    const result = data.nationalities
      .filter((nat) => nat.name.toLowerCase() !== 'سعودي')
      .map(({ name, count }) => {
        const percentage = ((count / totalForeignerEmployees) * 100).toFixed(2);
        return `${name},${count},${percentage}%`;
      })
      .join(',');

    // Calculate the max addition for each nationality
    const maxAddition = this.calculateMaxAddition(
      data.nationalities as { name: string; count: number }[],
      totalEmployees,
    );

    return {
      saudis,
      totalEmployees,
      result,
      maxAddition: JSON.stringify(maxAddition), // Storing as JSON string
    };
  }

  // Helper function to calculate max addition
  private calculateMaxAddition(
    nationalities: { name: string; count: number }[],
    totalEmployees: number,
  ) {
    const maxAdditions: Record<string, number> = {};

    nationalities.forEach(({ name, count }) => {
      let inc = 0;
      const allowedPercentage = this.calculateAllowedPercentage(name); // Define your logic here for allowed percentage
      let actualPercentage = (count / totalEmployees) * 100;

      while (true) {
        inc += 1;
        actualPercentage = ((count + inc) / (totalEmployees + inc)) * 100;
        if (actualPercentage > allowedPercentage) break;
      }

      maxAdditions[name] = Math.max(0, inc - 1);
    });

    return maxAdditions;
  }

  // Mock function to calculate allowed percentage for a nationality (replace with actual logic)
  private calculateAllowedPercentage(nationality: string): number {
    // For example, you can define specific allowed percentages based on the nationality
    switch (nationality.toLowerCase()) {
      case 'سعودي':
        return 30; // Example allowed percentage for Saudis
      default:
        return 10; // Default allowed percentage for other nationalities
    }
  }
}
