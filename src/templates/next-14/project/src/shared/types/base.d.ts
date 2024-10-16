export type UniqueIdentifier = string | number;

export interface BaseDto {
  id: UniqueIdentifier;
  createdAt: string;
  updatedAt: string;
}
