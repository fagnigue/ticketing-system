import { Journey } from './journey';
import { Reservation } from './reservation';

export interface SeatProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  journeyId?: string;
  journey?: Journey;
  reservations?: Reservation[];
}

export class Seat {
  private props: SeatProps;

  constructor(props: SeatProps) {
    this.props = {
      ...props,
    };
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get id(): string {
    return this.props.id;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set deleted(deleted: boolean) {
    this.props.deleted = deleted;
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }

  public set journeyId(journeyId: string) {
    this.props.journeyId = journeyId;
  }

  public get journeyId(): string {
    return this.props.journeyId;
  }

  public set journey(journey: Journey) {
    this.props.journey = journey;
  }

  public get journey(): Journey {
    return this.props.journey;
  }

  public set reservations(reservations: Reservation[]) {
    this.props.reservations = reservations;
  }

  public get reservations(): Reservation[] {
    return this.props.reservations;
  }
}
