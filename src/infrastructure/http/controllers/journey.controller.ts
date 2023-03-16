import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetJourneysUseCase } from 'src/application/use-cases/journey';
import { CreateJourneyUseCase } from 'src/application/use-cases/journey/create-journey.use-case';
import { DeleteJourneyUseCase } from 'src/application/use-cases/journey/delete-journey.use-case';
import { GetJourneyUseCase } from 'src/application/use-cases/journey/get-journey.use-case';
import { UpdateJourneyUseCase } from 'src/application/use-cases/journey/update-journey.use-case';
import { CreateJourneyDTO } from '../dtos/journey/create-journey.dto';
import { JourneyDTO } from '../dtos/journey/journey.dto';
import { UpdateJourneyDTO } from '../dtos/journey/update-journey.dto';
import { IdCheckInterceptor } from '../interceptors/id-check.interceptor';
import { JourneyMapper } from '../mappers/journey.mapper';

@Controller('journeys')
@ApiTags('Journeys')
@UseInterceptors(IdCheckInterceptor)
export class JourneyController {
  constructor(
    private readonly createJourneyUseCase: CreateJourneyUseCase,
    private readonly getJourneyUseCase: GetJourneyUseCase,
    private readonly updateJourneyUseCase: UpdateJourneyUseCase,
    private readonly deleteJourneyUseCase: DeleteJourneyUseCase,
    private readonly getJourneysUseCase: GetJourneysUseCase,
  ) {}

  @Post()
  async createJourney(
    @Body() data: CreateJourneyDTO,
  ): Promise<{ journey: JourneyDTO }> {
    const { journey } = await this.createJourneyUseCase.execute(data);
    return { journey: JourneyMapper.toDto(journey) };
  }

  @Get()
  async getJourneys(
    @Query('departureDate') departureDate: string,
    @Query('departurePlace') departurePlace: string,
    @Query('arrivalPlace') arrivalPlace: string,
  ): Promise<JourneyDTO[]> {
    const journeys = await this.getJourneysUseCase.execute({
      departureDate: departureDate ? new Date(departureDate) : undefined,
      departurePlace,
      arrivalPlace,
    });

    return journeys.map((journey) => JourneyMapper.toDto(journey));
  }

  @Get(':journeyId')
  async getJourney(
    @Param('journeyId') journeyId: string,
  ): Promise<{ journey: JourneyDTO }> {
    const { journey } = await this.getJourneyUseCase.execute({ journeyId });
    return { journey: JourneyMapper.toDto(journey) };
  }

  @Put(':journeyId')
  async updateJourney(
    @Body() data: UpdateJourneyDTO,
    @Param('journeyId') journeyId: string,
  ): Promise<{ journey: JourneyDTO }> {
    const { journey } = await this.updateJourneyUseCase.execute({
      ...data,
      id: journeyId,
    });
    return { journey: JourneyMapper.toDto(journey) };
  }

  @Delete(':journeyId')
  async deleteJourney(@Param('journeyId') journeyId: string): Promise<void> {
    await this.deleteJourneyUseCase.execute({ journeyId });
  }
}
