
export interface HearingDto {
  id?: number;
  caseId: number;
  lawyerId: number;
  date: Date;
  decision: string;
}

export interface HearingListDto {
  id?: number;
  case: string;
  lawyer: string;
  date: Date;
  decision: string;
}
