import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentResponse {
  data: {
    info: StudentInfo;
    candiday: StudentCandidate[];
    student: StudentAcademic;
  };
  status: number;
}

export interface StudentInfo {
  appid: number;
  id_num: number;
  name_format: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  birth_name: string;
  mobile_phone: number;
  email_address: string;
  stud_mstr_employ: string;
}

export interface StudentCandidate {
  idNum: number;
  yearCode: string;
  programCode: string;
  gpa: number;
  birthDate: string;
  citizenOf: string;
  city: string;
  country: string;
  addressLine1: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  mobile: string;
}

export interface StudentAcademic {
  idNum: number;
  currentClassCode: string;
  numOfCourses: number;
  hoursEnrolled: number;
  termHoursEarned: number;
  careerGpa: number;
  degreeCode: string;
  major1: string;
  minor1: string | null;
  concentration1: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://tour.aui.ma/api/student';

  constructor(private http: HttpClient) {}

  getStudentById(id: string): Observable<StudentResponse> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return this.http.post<StudentResponse>(this.apiUrl, {
      id: id,
      page: 1,
      limit: 5
    }, { headers, withCredentials: true });
  }
}
