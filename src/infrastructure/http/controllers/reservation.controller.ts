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
  CancelReservationUseCase,
  CreateReservationUseCase,
  DeleteReservationUseCase,
  GetReservationsUseCase,
  GetReservationUseCase,
  UpdateReservationUseCase,
} from 'src/application/use-cases/reservation';
import { CreateReservationDTO } from '../dtos/reservation/create-reservation.dto';
import { ReservationDTO } from '../dtos/reservation/reservation.dto';
import { UpdateReservationDTO } from '../dtos/reservation/update-reservation.dto';
import { IdCheckInterceptor } from '../interceptors/id-check.interceptor';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ReservationMapper } from '../mappers/reservation.mapper';

@Controller('reservations')
@ApiTags('Reservations')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
    private readonly getReservationUseCase: GetReservationUseCase,
    private readonly updateReservationUseCase: UpdateReservationUseCase,
    private readonly deleteReservationUseCase: DeleteReservationUseCase,
    private readonly cancelReservationUseCase: CancelReservationUseCase,
    private readonly getReservationsUseCase: GetReservationsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(IdCheckInterceptor)
  async createReservation(
    @Body() data: CreateReservationDTO,
  ): Promise<{ reservation: ReservationDTO }> {
    const { reservation } = await this.createReservationUseCase.execute(data);
    return { reservation: ReservationMapper.toDto(reservation) };
  }

  @Get()
  async getReservations(
    @Query('userId') userId: string,
    @Query('journeyId') journeyId: string,
  ) {
    const reservations = await this.getReservationsUseCase.execute({
      userId,
      journeyId,
    });

    return reservations.map((reservation) =>
      ReservationMapper.toDto(reservation),
    );
  }

  @Get(':reservationId')
  @UseGuards(JwtAuthGuard)
  async getReservation(@Param('reservationId') reservationId: string) {
    const { reservation } = await this.getReservationUseCase.execute({
      reservationId,
    });

    return { reservation: ReservationMapper.toDto(reservation) };
  }

  @Put(':reservationId/cancel')
  @ApiOperation({ summary: 'Cancel reservation' })
  @UseGuards(JwtAuthGuard)
  async cancelReservation(@Param('reservationId') reservationId: string) {
    const { reservation } = await this.cancelReservationUseCase.execute({
      reservationId,
    });
    return { reservation: ReservationMapper.toDto(reservation) };
  }

  @Put(':reservationId')
  @UseGuards(JwtAuthGuard)
  async updateReservation(
    @Body() data: UpdateReservationDTO,
    @Param('reservationId') reservationId: string,
  ) {
    const { reservation } = await this.updateReservationUseCase.execute({
      ...data,
      reservationId,
    });

    return { reservation: ReservationMapper.toDto(reservation) };
  }

  @Delete(':reservationId')
  @UseGuards(JwtAuthGuard)
  async deleteReservation(@Param('reservationId') reservationId: string) {
    await this.deleteReservationUseCase.execute({ reservationId });
  }
}
