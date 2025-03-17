export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  availability: string[];
  created_at: string;
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  availability: string[];
  specialization: string;
  created_at: string;
}

export interface Interview {
  id: string;
  candidate_id: string;
  recruiter_id: string;
  datetime: string;
  status: string;
  created_at: string;
}