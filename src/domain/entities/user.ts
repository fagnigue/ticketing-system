import * as bcrypt from 'bcryptjs';
import { Reservation } from './reservation';

export interface UserProps {
  id?: string;
  email?: string;
  password?: string;
  lastname?: string;
  firstname?: string;
  createdAt?: Date;
  updatedAt?: Date;
  reservations?: Reservation[];
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
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

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set firstname(firstname: string) {
    this.props.firstname = firstname;
  }

  public get firstname(): string {
    return this.props.firstname;
  }

  public set lastname(lastname: string) {
    this.props.lastname = lastname;
  }

  public get lastname(): string {
    return this.props.lastname;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set createdAt(createAt: Date) {
    this.props.createdAt = createAt;
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

  public set reservations(reservations: Reservation[]) {
    this.props.reservations = reservations;
  }

  public get reservations(): Reservation[] {
    return this.props.reservations;
  }

  hashPassword() {
    this.props.password = bcrypt.hashSync(this.props.password, 8);
  }

  comparePassword(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.props.password);
  }
}
