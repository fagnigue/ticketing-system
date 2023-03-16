import { Journey } from 'src/domain/entities/journey';
import { JourneyDTO } from '../dtos/journey/journey.dto';

export class JourneyMapper {
  private constructor() {
    throw new Error(
      'JourneyMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(journey: Journey): JourneyDTO {
    return {
      id: journey?.id,
      createdAt: journey?.createdAt,
      updatedAt: journey?.updatedAt,
      label: journey?.label,
      departureDate: journey?.departureDate,
      departurePlace: journey?.departurePlace,
      arrivalPlace: journey?.arrivalPlace,
    };
  }
}
