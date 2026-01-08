export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: CandidateStatus;
  position: string;
  cvUrl?: string;
  coverLetterUrl?: string;
  skills: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum CandidateStatus {
  NEW = 'NEW',
  REVIEWED = 'REVIEWED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEWED = 'INTERVIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface CreateCandidateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  cvFile?: File;
  coverLetterFile?: File;
}

export interface UpdateCandidateDto extends Partial<CreateCandidateDto> {
  status?: CandidateStatus;
  skills?: string[];
  notes?: string;
}