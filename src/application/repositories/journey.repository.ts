import { Journey } from 'src/domain/entities/journey';
import { GetJourneysParams } from 'src/utils/types/get-journeys-params.type';

export abstract class JourneyRepository {
  abstract createJourney(journey: Journey): Promise<Journey>;
  abstract getJourney(id: string): Promise<Journey>;
  abstract getJourneys(params: GetJourneysParams): Promise<Journey[]>;
  abstract updateJourney(journey: Journey): Promise<Journey>;
  abstract deleteJourney(id: string): Promise<void>;
}
