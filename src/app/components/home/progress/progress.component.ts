import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit, AfterViewInit {
  studentData?: any;
  
  // Data for charts
  personalInfoFields: { name: string, filled: boolean }[] = [];
  studentInfoFields: { name: string, filled: boolean }[] = [];
  candidacyInfoFields: { name: string, filled: boolean }[] = [];
  
  // Variables to control the display of missing fields
  showPersonalFields: boolean = false;
  showStudentFields: boolean = false;
  showCandidacyFields: boolean = false;
  
  constructor(
    private dataService: DataService,
    private router: Router,
    private location: Location,
    private elementRef: ElementRef
  ) {}
  
  ngOnInit(): void {
    // Get student data from the service
    this.dataService.getData().subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['']);
          return;
        }
        
        this.studentData = data;
        this.initializeFieldsData();
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
        this.router.navigate(['']);
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Ensure scrolling is enabled
    this.enableScrolling();
  }
  
  // Methods to toggle the display of missing fields
  togglePersonalFields(): void {
    this.showPersonalFields = !this.showPersonalFields;
  }
  
  toggleStudentFields(): void {
    this.showStudentFields = !this.showStudentFields;
  }
  
  toggleCandidacyFields(): void {
    this.showCandidacyFields = !this.showCandidacyFields;
  }
  
  // Enable scrolling on the page
  enableScrolling(): void {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Ensure HTML and BODY have appropriate height
    htmlElement.style.height = '100%';
    bodyElement.style.height = '100%';
    bodyElement.style.overflow = 'auto';
    
    // Ensure the component itself is scrollable
    const hostElement = this.elementRef.nativeElement;
    hostElement.style.height = '100%';
    hostElement.style.overflowY = 'auto';
    
    // Reset scroll position
    window.scrollTo(0, 0);
  }
  
  // Initialize field data for charts
  initializeFieldsData(): void {
    // Personal information
    if (this.studentData?.info) {
      const info = this.studentData.info;
      const personalFields = [
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'name_format', label: 'Name Format' },
        { key: 'middle_name', label: 'Middle Name' },
        { key: 'birth_name', label: 'Birth Name' },
        { key: 'email_address', label: 'Email' },
        { key: 'mobile_phone', label: 'Mobile Phone' },
        { key: 'id_num', label: 'Student ID' },
        { key: 'appid', label: 'Application ID' },
        { key: 'stud_mstr_employ', label: 'Student Employment' }
      ];
      
      this.personalInfoFields = personalFields.map(field => ({
        name: field.label,
        filled: this.isFieldFilled(info[field.key])
      }));
    }
    
    // Student information
    if (this.studentData?.student) {
      const student = this.studentData.student;
      const studentFields = [
        { key: 'idNum', label: 'Student ID' },
        { key: 'studentEmployCode', label: 'Employment Code' },
        { key: 'webGroup', label: 'Web Group' },
        { key: 'tuitionCode', label: 'Tuition Code' },
        { key: 'entranceYear', label: 'Entrance Year' },
        { key: 'entranceTerm', label: 'Entrance Term' },
        { key: 'currentClassCode', label: 'Current Class Code' },
        { key: 'hold1Code', label: 'Hold Code 1' },
        { key: 'hold2Code', label: 'Hold Code 2' },
        { key: 'hold3Code', label: 'Hold Code 3' },
        { key: 'hold4Code', label: 'Hold Code 4' },
        { key: 'hold5Code', label: 'Hold Code 5' },
        { key: 'hold6Code', label: 'Hold Code 6' },
        { key: 'numOfCourses', label: 'Number of Courses' },
        { key: 'hoursEnrolled', label: 'Hours Enrolled' },
        { key: 'termHoursEarned', label: 'Term Hours Earned' },
        { key: 'careerGpa', label: 'GPA' },
        { key: 'degreeCode', label: 'Degree Code' },
        { key: 'major1', label: 'Major' },
        { key: 'minor1', label: 'Minor' },
        { key: 'concentration1', label: 'Concentration' }
      ];
      
      this.studentInfoFields = studentFields.map(field => ({
        name: field.label,
        filled: this.isFieldFilled(student[field.key])
      }));
    }
    
    // Candidacy information
    if (this.studentData?.candiday && this.studentData.candiday.length > 0) {
      const candidacy = this.studentData.candiday[0];
      const candidacyFields = [
        { key: 'idNum', label: 'Student ID' },
        { key: 'yearCode', label: 'Academic Year' },
        { key: 'divisionCode', label: 'Division' },
        { key: 'stage', label: 'Stage' },
        { key: 'programCode', label: 'Program' },
        { key: 'termCode', label: 'Term' },
        { key: 'bacYear', label: 'Baccalaureate Year' },
        { key: 'highSchool', label: 'High School' },
        { key: 'highSchoolDiploma', label: 'High School Diploma' },
        { key: 'highSchoolDistinction', label: 'High School Distinction' },
        { key: 'hsOrgTypeAd', label: 'HS Organization Type' },
        { key: 'gpa', label: 'GPA' },
        { key: 'totalApCredits', label: 'Total AP Credits' },
        { key: 'totalInstCredits', label: 'Total Institution Credits' },
        { key: 'clOrgTypeAd', label: 'CL Organization Type' },
        { key: 'clGpa', label: 'CL GPA' },
        { key: 'clTotalApCredits', label: 'CL Total AP Credits' },
        { key: 'clTotalInstCredits', label: 'CL Total Institution Credits' },
        { key: 'schoolType', label: 'School Type' },
        { key: 'udef1a1', label: 'UDEF1A1' },
        { key: 'act', label: 'ACT' },
        { key: 'gat', label: 'GAT' },
        { key: 'gre', label: 'GRE' },
        { key: 'sat', label: 'SAT' },
        { key: 'satRc', label: 'SAT RC' },
        { key: 'satWc', label: 'SAT WC' },
        { key: 'tef', label: 'TEF' },
        { key: 'toepp', label: 'TOEPP' },
        { key: 'birthDate', label: 'Birth Date' },
        { key: 'citizenOf', label: 'Citizenship' },
        { key: 'city', label: 'City' },
        { key: 'country', label: 'Country' },
        { key: 'addressLine1', label: 'Address' },
        { key: 'birthName', label: 'Birth Name' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'emailAddress', label: 'Email' },
        { key: 'gender', label: 'Gender' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'fatherAddress', label: 'Father Address' },
        { key: 'motherAddress', label: 'Mother Address' },
        { key: 'fatherPhone', label: 'Father Phone' },
        { key: 'motherPhone', label: 'Mother Phone' },
        { key: 'fatherOccupation', label: 'Father Occupation' },
        { key: 'motherOccupation', label: 'Mother Occupation' },
        { key: 'appFeeDate', label: 'Application Fee Date' }
      ];
      
      this.candidacyInfoFields = candidacyFields.map(field => ({
        name: field.label,
        filled: this.isFieldFilled(candidacy[field.key])
      }));
    }
  }
  
  // Check if a field is filled
  isFieldFilled(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
  
  // Get the number of filled fields for personal information
  getFilledPersonalFields(): number {
    return this.personalInfoFields.filter(field => field.filled).length;
  }
  
  // Get the number of filled fields for student information
  getFilledStudentFields(): number {
    return this.studentInfoFields.filter(field => field.filled).length;
  }
  
  // Get the number of filled fields for candidacy information
  getFilledCandidacyFields(): number {
    return this.candidacyInfoFields.filter(field => field.filled).length;
  }
  
  // Get the number of missing fields for personal information
  getMissingPersonalFields(): number {
    return this.personalInfoFields.length - this.getFilledPersonalFields();
  }
  
  // Get the number of missing fields for student information
  getMissingStudentFields(): number {
    return this.studentInfoFields.length - this.getFilledStudentFields();
  }
  
  // Get the number of missing fields for candidacy information
  getMissingCandidacyFields(): number {
    return this.candidacyInfoFields.length - this.getFilledCandidacyFields();
  }
  
  // Get the list of missing fields for personal information
  getMissingPersonalFieldsList(): { name: string, filled: boolean }[] {
    return this.personalInfoFields.filter(field => !field.filled);
  }
  
  // Get the list of missing fields for student information
  getMissingStudentFieldsList(): { name: string, filled: boolean }[] {
    return this.studentInfoFields.filter(field => !field.filled);
  }
  
  // Get the list of missing fields for candidacy information
  getMissingCandidacyFieldsList(): { name: string, filled: boolean }[] {
    return this.candidacyInfoFields.filter(field => !field.filled);
  }
  
  // Calculate the completion percentage for personal information
  getPersonalInfoCompletion(): number {
    if (!this.personalInfoFields.length) return 0;
    
    const filledFields = this.getFilledPersonalFields();
    return Math.round((filledFields / this.personalInfoFields.length) * 100);
  }
  
  // Calculate the completion percentage for student information
  getStudentInfoCompletion(): number {
    if (!this.studentInfoFields.length) return 0;
    
    const filledFields = this.getFilledStudentFields();
    return Math.round((filledFields / this.studentInfoFields.length) * 100);
  }
  
  // Calculate the completion percentage for candidacy information
  getCandidacyInfoCompletion(): number {
    if (!this.candidacyInfoFields.length) return 0;
    
    const filledFields = this.getFilledCandidacyFields();
    return Math.round((filledFields / this.candidacyInfoFields.length) * 100);
  }
  
  // Get the CSS class for the completion percentage
  getCompletionClass(percentage: number): string {
    if (percentage < 50) return 'text-red-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-green-600';
  }
  
  // Navigate to the home page
  goBack(): void {
    this.location.back();
  }
}
