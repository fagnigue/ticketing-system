import { Seat } from './seat';

export interface JourneyProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  label?: string;
  departureDate?: Date;
  departurePlace?: string;
  arrivalPlace?: string;
  seats?: Seat[];
}

export class Journey {
  private props: JourneyProps;

  constructor(props: JourneyProps) {
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public set deleted(deleted: boolean) {
    this.props.deleted = deleted;
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }

  public get label(): string {
    return this.props.label;
  }

  public set label(label: string) {
    this.props.label = label;
  }

  public get departureDate(): Date {
    return this.props.departureDate;
  }

  public set departureDate(departureDate: Date) {
    this.props.departureDate = departureDate;
  }

  public get departurePlace(): string {
    return this.props.departurePlace;
  }

  public set departurePlace(departurePlace: string) {
    this.props.departurePlace = departurePlace;
  }

  public get arrivalPlace(): string {
    return this.props.arrivalPlace;
  }

  public set arrivalPlace(arrivalPlace: string) {
    this.props.arrivalPlace = arrivalPlace;
  }

  public get seats(): Seat[] {
    return this.props.seats;
  }

  public set seats(seats: Seat[]) {
    this.props.seats = seats;
  }
}
