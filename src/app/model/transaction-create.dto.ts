import { TransactionType } from './transaction-type';

export class TransactionCreateDto {
  readonly name!: string;
  readonly description?: string | null;
  readonly idPerson?: string | null;
  readonly personName?: string | null;
  readonly date!: Date;
  readonly type!: TransactionType;
  readonly total!: number;

  static readonly idPersonMaxLength = 13;
  static readonly nameMinLength = 3;
  static readonly nameMaxLength = 40;
  static readonly descriptionMaxLength = 500;
  static readonly personNameMaxLength = 150;
  static readonly personNameMinLength = 3;
  static readonly totalMin = Number.EPSILON;
  static readonly totalMax = Number.MAX_SAFE_INTEGER;
}
