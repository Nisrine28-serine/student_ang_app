import { Component, HostListener } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { InfoCard } from '../../models/infoCard';
import { StudentCard } from '../../models/studentCard';
import { CandidacyCard } from '../../models/candidacyCard';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMobile = window.innerWidth < 768;
  searchQuery = '';
  isSearching = false;
  studentData?: Data;
  searchError = '';

  constructor(private dataService: DataService) {}

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  onSearch(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.searchError = 'Please enter a student ID';
      return;
    }

    this.isSearching = true;
    this.searchError = '';
    
    // Pour le développement, utiliser getData pour afficher toutes les données
    // Dans un environnement de production, utilisez getStudentById
    this.dataService.getData(+this.searchQuery).subscribe({
      next: (data) => {
        this.studentData = data;
        console.log('Data received:', this.studentData);
        this.isSearching = false;
        
        // Si aucune donnée n'est trouvée
        if (!this.studentData) {
          this.searchError = 'No student found with this ID';
        }
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
        this.searchError = 'Error retrieving data. Please try again.';
        this.isSearching = false;
      }
    });
    
    /* Décommentez ce code pour utiliser la recherche par ID en production
    this.dataService.getStudentById(this.searchQuery.trim()).subscribe({
      next: (data) => {
       this.studentData = data;
        console.log('Data received:', this.studentData);
        this.isSearching = false;
        
        // Si aucune donnée n'est trouvée
        if (!this.studentData) {
          this.searchError = 'No student found with this ID';
        }
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
        this.searchError = 'Error retrieving data. Please try again.';
        this.isSearching = false;
      }
    });
    */
  }

  // Méthodes pour calculer la complétion des données personnelles
  getPersonalInfoCompletion(): number {
    if (!this.studentData || !this.studentData.info) return 0;

    const info: InfoCard = this.studentData.info;
    const fields = [
      'first_name', 'last_name', 'name_format', 'middle_name', 'birth_name',
      'email_address', 'mobile_phone', 'idNum', 'appid', 'stud_mstr_employ'
    ];
    
    let filledFields = 0;
    fields.forEach(field => {
      if (info[field as keyof InfoCard] !== null && info[field as keyof InfoCard] !== undefined && info[field as keyof InfoCard] !== '') {
        filledFields++;
      }
    });
    
    return Math.round((filledFields / fields.length) * 100);
  }

  getPersonalInfoMissing(): number {
    if (!this.studentData || !this.studentData.info) return 0;

    const info: InfoCard = this.studentData.info;
    const fields = [
      'first_name', 'last_name', 'name_format', 'middle_name', 'birth_name',
      'email_address', 'mobile_phone', 'idNum', 'appid', 'stud_mstr_employ'
    ];
    
    let missingFields = 0;
    fields.forEach(field => {
      if (info[field   as keyof InfoCard] === null || info[field as keyof InfoCard] === undefined || info[field as keyof InfoCard] === '') {
        missingFields++;
      }
    });
    
    return missingFields;
  }

  getPersonalInfoCompletionClass(): string {
    const completion = this.getPersonalInfoCompletion();
    if (completion < 50) return 'text-red-600';
    if (completion < 80) return 'text-yellow-600';
    return 'text-green-600';
  }

  // Méthodes pour calculer la complétion des données étudiantes
  getStudentInfoCompletion(): number {
    if (!this.studentData || !this.studentData.student) return 0;

    const student: StudentCard = this.studentData.student;
    const fields = [
      'idNum', 'studentEmployCode', 'webGroup', 'tuitionCode', 'entranceYear',
      'entranceTerm', 'currentClassCode', 'hold1Code', 'hold2Code', 'hold3Code',
      'hold4Code', 'hold5Code', 'hold6Code', 'numOfCourses', 'hoursEnrolled',
      'termHoursEarned', 'careerGpa', 'degreeCode', 'major1', 'minor1', 'concentration1'
    ];
    
    let filledFields = 0;
    fields.forEach(field => {
      if (student[field as keyof StudentCard] !== null && student[field as keyof StudentCard] !== undefined && student[field as keyof StudentCard] !== '') {
        filledFields++;
      }
    });
    
    return Math.round((filledFields / fields.length) * 100);
  }

  getStudentInfoMissing(): number {
    if (!this.studentData || !this.studentData.student) return 0;

    const student : StudentCard = this.studentData.student;
    const fields = [
      'idNum', 'studentEmployCode', 'webGroup', 'tuitionCode', 'entranceYear',
      'entranceTerm', 'currentClassCode', 'hold1Code', 'hold2Code', 'hold3Code',
      'hold4Code', 'hold5Code', 'hold6Code', 'numOfCourses', 'hoursEnrolled',
      'termHoursEarned', 'careerGpa', 'degreeCode', 'major1', 'minor1', 'concentration1'
    ];
    
    let missingFields = 0;
    fields.forEach(field => {
      if (student[field as keyof StudentCard] === null || student[field as keyof StudentCard] === undefined || student[field as keyof StudentCard] === '') {
        missingFields++;
      }
    });
    
    return missingFields;
  }

  getStudentInfoCompletionClass(): string {
    const completion = this.getStudentInfoCompletion();
    if (completion < 50) return 'text-red-600';
    if (completion < 80) return 'text-yellow-600';
    return 'text-green-600';
  }

  // Méthodes pour calculer la complétion des données de candidature
  getCandidacyInfoCompletion(): number {
    if (!this.studentData || !this.studentData.candiday || this.studentData.candiday.length === 0) return 0;

    const candidacy  : CandidacyCard= this.studentData.candiday[0]; // Utiliser la première candidature
    const fields = [
      'idNum', 'yearCode', 'divisionCode', 'stage', 'programCode', 'termCode',
      'bacYear', 'highSchool', 'highSchoolDiploma', 'highSchoolDistinction',
      'hsOrgTypeAd', 'gpa', 'totalApCredits', 'totalInstCredits', 'clOrgTypeAd',
      'clGpa', 'clTotalApCredits', 'clTotalInstCredits', 'schoolType', 'udef1a1',
      'act', 'gat', 'gre', 'sat', 'satRc', 'satWc', 'tef', 'toepp', 'birthDate',
      'citizenOf', 'city', 'country', 'addressLine1', 'birthName', 'firstName',
      'lastName', 'emailAddress', 'gender', 'mobile', 'fatherAddress', 'motherAddress',
      'fatherPhone', 'motherPhone', 'fatherOccupation', 'motherOccupation', 'appFeeDate'
    ];
    
    let filledFields = 0;
    fields.forEach(field => {
      if (candidacy[field as keyof CandidacyCard] !== null && candidacy[field as keyof CandidacyCard] !== undefined && candidacy[field as keyof CandidacyCard] !== '') {
        filledFields++;
      }
    });
    
    return Math.round((filledFields / fields.length) * 100);
  }

  getCandidacyInfoMissing(): number {
    if (!this.studentData || !this.studentData.candiday || this.studentData.candiday.length === 0) return 0;

    const candidacy : CandidacyCard = this.studentData.candiday[0]; // Utiliser la première candidature
    const fields = [
      'idNum', 'yearCode', 'divisionCode', 'stage', 'programCode', 'termCode',
      'bacYear', 'highSchool', 'highSchoolDiploma', 'highSchoolDistinction',
      'hsOrgTypeAd', 'gpa', 'totalApCredits', 'totalInstCredits', 'clOrgTypeAd',
      'clGpa', 'clTotalApCredits', 'clTotalInstCredits', 'schoolType', 'udef1a1',
      'act', 'gat', 'gre', 'sat', 'satRc', 'satWc', 'tef', 'toepp', 'birthDate',
      'citizenOf', 'city', 'country', 'addressLine1', 'birthName', 'firstName',
      'lastName', 'emailAddress', 'gender', 'mobile', 'fatherAddress', 'motherAddress',
      'fatherPhone', 'motherPhone', 'fatherOccupation', 'motherOccupation', 'appFeeDate'
    ];
    
    let missingFields = 0;
    fields.forEach(field => {
      if (candidacy[field as keyof CandidacyCard] === null || candidacy[field as keyof CandidacyCard] === undefined || candidacy[field as keyof CandidacyCard] === '') {
        missingFields++;
      }
    });
    
    return missingFields;
  }

  getCandidacyInfoCompletionClass(): string {
    const completion = this.getCandidacyInfoCompletion();
    if (completion < 50) return 'text-red-600';
    if (completion < 80) return 'text-yellow-600';
    return 'text-green-600';
}
}
