import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

export interface PostProps {
  externalId: string;
  title: string;
  content: string;
  isDraft: boolean;
  isRestrict: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

interface Optionals {
  externalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Post {
  constructor(
    private props: Replace<PostProps, Optionals>,
    private _id?: number,
  ) {
    this.props = {
      ...props,
      externalId: props.externalId ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): number {
    return this._id;
  }

  public get externalId(): string {
    return this.props.externalId;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get isDraft(): boolean {
    return this.props.isDraft;
  }

  public set isDraft(isDraft: boolean) {
    this.props.isDraft = isDraft;
  }

  public get isRestrict(): boolean {
    return this.props.isRestrict;
  }

  public set isRestrict(isRestrict: boolean) {
    this.props.isRestrict = isRestrict;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public set userId(userId: number) {
    this.props.userId = userId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public update() {
    this.props.updatedAt = new Date();
  }
}
