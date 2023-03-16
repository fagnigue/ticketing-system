import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateSeatUseCase,
  DeleteSeatUseCase,
  GetAvailableSeatsByJourneyUseCase,
  GetSeatsUseCase,
  GetSeatUseCase,
  UpdateSeatUseCase,
} from 'src/application/use-cases/seat';
import { CreateSeatDTO } from '../dtos/seat/create-seat.dto';
import { SeatDTO } from '../dtos/seat/seat.dto';
import { UpdateSeatDTO } from '../dtos/seat/update-seat.dto';
import { IdCheckInterceptor } from '../interceptors/id-check.interceptor';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { SeatMapper } from '../mappers/seat.mapper';

@Controller('seats')
@ApiTags('Seats')
@UseInterceptors(IdCheckInterceptor)
export class SeatController {
  constructor(
    private readonly createSeatUseCase: CreateSeatUseCase,
    private readonly getSeatUseCase: GetSeatUseCase,
    private readonly getSeatsUseCase: GetSeatsUseCase,
    private readonly updateSeatUseCase: UpdateSeatUseCase,
    private readonly deleteSeatUseCase: DeleteSeatUseCase,
    private readonly getAvailableSeatsByJourneyUseCase: GetAvailableSeatsByJourneyUseCase,
  ) {}

  @Post()
  async createSeat(@Body() data: CreateSeatDTO): Promise<{ seat: SeatDTO }> {
    const { seat } = await this.createSeatUseCase.execute(data);
    return { seat: SeatMapper.toDto(seat) };
  }

  @Get()
  @ApiOperation({ summary: 'Get all seats' })
  async getSeats(@Query('journeyId') journeyId: string): Promise<SeatDTO[]> {
    const seats = await this.getSeatsUseCase.execute({ journeyId });
    return seats.map((seat) => SeatMapper.toDto(seat));
  }

  @Get('available')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all available seats' })
  async getAvailableSeats(@Query('journeyId') journeyId: string) {
    const seats = await this.getAvailableSeatsByJourneyUseCase.execute({
      journeyId,
    });

    return seats.map((seat) => SeatMapper.toDto(seat));
  }

  @Get(':seatId')
  async getSeat(@Param('seatId') seatId: string): Promise<{ seat: SeatDTO }> {
    const { seat } = await this.getSeatUseCase.execute({ seatId });
    return { seat: SeatMapper.toDto(seat) };
  }

  @Put(':seatId')
  async updateSeat(
    @Body() data: UpdateSeatDTO,
    @Param('seatId') seatId: string,
  ) {
    const { seat } = await this.updateSeatUseCase.execute(data);
    return SeatMapper.toDto(seat);
  }

  @Delete(':seatId')
  async deleteSeat(@Param('seatId') seatId: string) {
    await this.deleteSeatUseCase.execute({ seatId });
  }
}
