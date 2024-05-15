export interface ITeacher {
  id?: number;
  name?: string;
  subject?: string;
  email?: string;
  feePerHour?: number;
}

export const defaultValue: Readonly<ITeacher> = {};
