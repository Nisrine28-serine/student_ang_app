export interface StudentCard {
  idNum: number;
  studentEmployCode: string;
  webGroup: string;
  tuitionCode: string;
  entranceYear: string;
  entranceTerm: string;
  currentClassCode: string;
  hold1Code: string | null;
  hold2Code: string | null;
  hold3Code: string | null;
  hold4Code: string | null;
  hold5Code: string | null;
  hold6Code: string | null;
  numOfCourses: number;
  hoursEnrolled: number;
  termHoursEarned: number;
  careerGpa: number;
  degreeCode: string;
  major1: string;
  minor1: string | null;
  concentration1: string | null;
}