export type ExperienceType = {
  companyLogo: null;
  companyName: string;
  createdAt: string;
  description: string;
  endDate: Date;
  id: number;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  startDate: Date;
  updatedAt: string;
  user_id: number;
};

export type User = {
  imageData?: Blob;
  file?: Blob | null;
  age: number;
  createdAt: string;
  experience: number;
  experiences: ExperienceType[];
  description: string;
  id: number;
  name: string;
  profilePicture: null;
  updatedAt: string;
};

export type Values = Partial<User>;

export type FormValues = Partial<ExperienceType & User>;
