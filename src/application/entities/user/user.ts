import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export interface UserProps {
  externalId: string;
  name: string;
  email: string;
  confirmedEmail: boolean;
  password: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Optionals {
  externalId?: string;
  confirmedEmail?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  constructor(
    private props: Replace<UserProps, Optionals>,
    private _id?: number,
  ) {
    this.props = {
      ...props,
      externalId: props.externalId ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      confirmedEmail: props.confirmedEmail ?? false,
    };
  }

  public get id(): number {
    return this._id;
  }

  public get externalId(): string {
    return this.props.externalId;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get photoUrl(): string {
    return this.props.photoUrl;
  }

  public set photoUrl(photoUrl: string) {
    this.props.photoUrl = photoUrl;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get confirmedEmail(): boolean {
    return this.props.confirmedEmail;
  }

  public confirmEmail() {
    this.props.confirmedEmail = true;
  }

  public update() {
    this.props.updatedAt = new Date();
  }
}
