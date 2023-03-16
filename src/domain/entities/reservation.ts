import { Seat } from './seat';
import { User } from './user';

export interface ReservationProps {
  id?: string;
  createdAt?: Date;
  cancelledAt?: Date;
  deleted?: boolean;
  userId?: string;
  seatId?: string;
  user?: User;
  seat?: Seat;
}

export class Reservation {
  private props: ReservationProps;

  constructor(props: ReservationProps) {
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

  public set cancelledAt(cancelledAt: Date) {
    this.props.cancelledAt = cancelledAt;
  }

  public get cancelledAt(): Date {
    return this.props.cancelledAt;
  }

  public set deleted(deleted: boolean) {
    this.props.deleted = deleted;
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set seatId(seatId: string) {
    this.props.seatId = seatId;
  }

  public get seatId(): string {
    return this.props.seatId;
  }

  public set user(user: User) {
    this.props.user = user;
  }

  public get user(): User {
    return this.props.user;
  }

  public set seat(seat: Seat) {
    this.props.seat = seat;
  }

  public get seat(): Seat {
    return this.props.seat;
  }

  public cancel() {
    this.props.cancelledAt = new Date();
  }
}
