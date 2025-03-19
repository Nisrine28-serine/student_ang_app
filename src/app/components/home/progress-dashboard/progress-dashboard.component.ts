import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Student {
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
  last_name: string;
  first_name: string;
  email_address: string;
  mobile_phone: number;
  gender?: string;
  country?: string;
}

interface GpaRange {
  range: string;
  count: number;
  percentage: number;
}

interface EnrollmentTrend {
  yearTerm: string;
  count: number;
}

interface CourseLoadData {
  category: string;
  count: number;
  hours: number;
  percentage: number;
}

interface StudentProgress {
  labels: string[];
  gpa: number[];
  success: number[];
}

interface GradesBySubject {
  [subject: string]: {
    'A': number;
    'B': number;
    'C': number;
    'D': number;
    'F': number;
  };
}

@Component({
  selector: 'app-progress-dashboard',
  standalone: false,
  templateUrl: './progress-dashboard.component.html',
  styleUrls: ['./progress-dashboard.component.css']
})
export class ProgressDashboardComponent implements OnInit, AfterViewInit {
  // Basic statistics
  students: Student[] = [];
  totalStudents: number = 0;
  avgGpa: number = 0;
  totalHoursEnrolled: number = 0;
  avgCoursesPerStudent: number = 0;
  
  // Charts data
  classCounts: { [key: string]: number } = {};
  majorCounts: { [key: string]: number } = {};
  minorCounts: { [key: string]: number } = {};
  gpaDistribution: GpaRange[] = [];
  enrollmentTrends: EnrollmentTrend[] = [];
  courseLoadData: CourseLoadData[] = [];
  studentProgress: StudentProgress = { labels: [], gpa: [], success: [] };
  gradesBySubject: GradesBySubject = {};
  
  // Demographic data
  genderDistribution: { [key: string]: number } = {};
  countryDistribution: { [key: string]: number } = {};
  
  // Table data
  contactInformation: { name: string, email: string, phone: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.totalStudents = 4074;
    this.avgGpa = 3.42;
    this.totalHoursEnrolled = 52962;
    this.avgCoursesPerStudent = 5.8;

    // Distribution GPA plus réaliste
    this.gpaDistribution = [
      { range: '3.5-4.0', count: 1250, percentage: 30.7 },
      { range: '3.0-3.49', count: 1485, percentage: 36.5 },
      { range: '2.5-2.99', count: 842, percentage: 20.7 },
      { range: '2.0-2.49', count: 375, percentage: 9.2 },
      { range: '< 2.0', count: 122, percentage: 2.9 }
    ];

    // Tendances d'inscription réalistes
    this.enrollmentTrends = [
      { yearTerm: '2023 Fall', count: 4074 },
      { yearTerm: '2023 Spring', count: 3950 },
      { yearTerm: '2022 Fall', count: 3875 },
      { yearTerm: '2022 Spring', count: 3720 },
      { yearTerm: '2021 Fall', count: 3650 }
    ];

    // Distribution des majeures réaliste
    this.majorCounts = {
      'Computer Science': 856,
      'Business': 784,
      'Engineering': 725,
      'Sciences': 612,
      'Arts': 508,
      'Mathematics': 325,
      'Other': 264
    };

    // Distribution des cours plus détaillée
    this.classCounts = {
      'Core Courses': 2450,
      'Major Requirements': 1850,
      'Electives': 1250,
      'General Education': 980,
      'Labs': 725
    };

    // Données de charge de cours réalistes
    this.courseLoadData = [
      { category: 'Full Time (12+ hours)', count: 3250, hours: 42250, percentage: 79.8 },
      { category: 'Part Time (6-11 hours)', count: 685, hours: 8905, percentage: 16.8 },
      { category: 'Minimal (1-5 hours)', count: 139, hours: 1807, percentage: 3.4 }
    ];

    // Distribution par genre
    this.genderDistribution = {
      'Male': 2158,
      'Female': 1876
    };

    // Distribution géographique
    this.countryDistribution = {
      'Domestic': 3052,
      'International': 1022
    };

    // Données de progrès des étudiants
    this.studentProgress = {
      labels: ['2021 Fall', '2022 Spring', '2022 Fall', '2023 Spring', '2023 Fall'],
      gpa: [3.28, 3.32, 3.35, 3.38, 3.42],
      success: [88, 89, 90, 91, 92]
    };

    // Notes par matière
    this.gradesBySubject = {
      'Computer Science': { 'A': 320, 'B': 280, 'C': 180, 'D': 50, 'F': 26 },
      'Mathematics': { 'A': 280, 'B': 310, 'C': 195, 'D': 45, 'F': 20 },
      'Physics': { 'A': 245, 'B': 285, 'C': 210, 'D': 65, 'F': 30 },
      'English': { 'A': 350, 'B': 295, 'C': 165, 'D': 35, 'F': 15 }
    };
  }

  ngAfterViewInit(): void {
    // Configuration commune pour tous les graphiques
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            font: {
              size: 14,
              family: "'Poppins', sans-serif"
            },
            padding: 20,
            usePointStyle: true
          }
        },
        title: {
          display: true,
          font: {
            size: 18,
            family: "'Poppins', sans-serif",
            weight: 'bold' as const
          },
          padding: 20
        }
      }
    };

    // Palette de couleurs professionnelle
    const colorPalette = {
      primary: [
        'rgba(25, 118, 210, 0.85)',   // Bleu professionnel
        'rgba(0, 150, 136, 0.85)',    // Turquoise
        'rgba(156, 39, 176, 0.85)',   // Violet
        'rgba(244, 67, 54, 0.85)',    // Rouge
        'rgba(255, 152, 0, 0.85)',    // Orange
        'rgba(76, 175, 80, 0.85)',    // Vert
        'rgba(63, 81, 181, 0.85)',    // Indigo
        'rgba(233, 30, 99, 0.85)'     // Rose
      ],
      gradients: [
        'rgba(25, 118, 210, 0.1)',
        'rgba(0, 150, 136, 0.1)',
        'rgba(156, 39, 176, 0.1)',
        'rgba(244, 67, 54, 0.1)'
      ]
    };

    // Gender Distribution Chart
    new Chart('genderChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.genderDistribution),
        datasets: [{
          data: Object.values(this.genderDistribution),
          backgroundColor: ['#FF69B4', '#1E90FF'],  // Rose et Bleu
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution par genre'
          }
        }
      }
    });

    // Geographic Distribution Chart
    new Chart('geographicChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.countryDistribution),
        datasets: [{
          data: Object.values(this.countryDistribution),
          backgroundColor: [colorPalette.primary[0], colorPalette.primary[4]],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution géographique'
          }
        }
      }
    });

    // GPA Distribution Chart
    new Chart('gpaChart', {
      type: 'bar',
      data: {
        labels: this.gpaDistribution.map(d => d.range),
        datasets: [{
          label: 'Nombre d\'étudiants',
          data: this.gpaDistribution.map(d => d.count),
          backgroundColor: colorPalette.primary[0],
          borderRadius: 8,
          barThickness: 40,
          maxBarThickness: 50
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution GPA'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                size: 12
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              }
            }
          }
        }
      }
    });

    // Enrollment Trends Chart
    new Chart('enrollmentChart', {
      type: 'line',
      data: {
        labels: this.enrollmentTrends.map(t => t.yearTerm),
        datasets: [{
          label: 'Nombre d\'étudiants inscrits',
          data: this.enrollmentTrends.map(t => t.count),
          borderColor: colorPalette.primary[1],
          backgroundColor: colorPalette.gradients[1],
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: colorPalette.primary[1]
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Tendances des inscriptions'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    // Major Distribution Chart
    new Chart('majorPerformanceChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.majorCounts),
        datasets: [{
          data: Object.values(this.majorCounts),
          backgroundColor: colorPalette.primary,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution des majeures'
          }
        },
        cutout: '65%'
      }
    });

    // Course Distribution Chart
    new Chart('courseDistributionChart', {
      type: 'polarArea',
      data: {
        labels: Object.keys(this.classCounts),
        datasets: [{
          data: Object.values(this.classCounts),
          backgroundColor: colorPalette.primary.map(color => color.replace('0.85', '0.75')),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution des cours'
          }
        }
      }
    });

    // Course Load Chart
    new Chart('courseLoadChart', {
      type: 'bar',
      data: {
        labels: this.courseLoadData.map(d => d.category),
        datasets: [{
          label: 'Nombre d\'étudiants',
          data: this.courseLoadData.map(d => d.count),
          backgroundColor: colorPalette.primary.slice(0, 3),
          borderRadius: 8,
          barThickness: 40,
          maxBarThickness: 50
        }]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Distribution de la charge de cours'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    // Student Progress Chart
    new Chart('studentProgressChart', {
      type: 'line',
      data: {
        labels: this.studentProgress.labels,
        datasets: [
          {
            label: 'GPA Moyen',
            data: this.studentProgress.gpa,
            borderColor: colorPalette.primary[0],
            backgroundColor: colorPalette.gradients[0],
            yAxisID: 'y',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Taux de réussite (%)',
            data: this.studentProgress.success,
            borderColor: colorPalette.primary[1],
            backgroundColor: colorPalette.gradients[1],
            yAxisID: 'y1',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Progrès des étudiants'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'GPA'
            },
            min: 0,
            max: 4,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Taux de réussite (%)'
            },
            min: 0,
            max: 100,
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });

    // Grades by Subject Chart
    const grades = ['A', 'B', 'C', 'D', 'F'] as const;
    type Grade = typeof grades[number];
    
    new Chart('gradesBySubjectChart', {
      type: 'bar',
      data: {
        labels: Object.keys(this.gradesBySubject),
        datasets: grades.map((grade, index) => ({
          label: grade,
          data: Object.values(this.gradesBySubject).map(subject => subject[grade as Grade]),
          backgroundColor: colorPalette.primary[index],
          borderWidth: 1,
          borderRadius: 4
        }))
      },
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            ...commonOptions.plugins.title,
            text: 'Notes par matière'
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }
    });
  }

  loadStudentData(): void {
    // Cette fonction simule le chargement des données d'étudiants
    // Dans une application réelle, vous récupéreriez ces données depuis une API
    this.students = [
      {
        idNum: 10001,
        studentEmployCode: "ACT",
        webGroup: "UG",
        tuitionCode: "STD",
        entranceYear: "2023",
        entranceTerm: "FALL",
        currentClassCode: "FR",
        hold1Code: null,
        hold2Code: null,
        hold3Code: null,
        hold4Code: null,
        hold5Code: null,
        hold6Code: null,
        numOfCourses: 5,
        hoursEnrolled: 15,
        termHoursEarned: 12,
        careerGpa: 3.7,
        degreeCode: "BS-CS",
        major1: "Computer Science",
        minor1: "Mathematics",
        concentration1: null,
        last_name: "Smith",
        first_name: "John",
        email_address: "jsmith@university.edu",
        mobile_phone: 1234567890,
        gender: "M",
        country: "USA"
      },
      {
        idNum: 10002,
        studentEmployCode: "ACT",
        webGroup: "UG",
        tuitionCode: "SCH",
        entranceYear: "2022",
        entranceTerm: "FALL",
        currentClassCode: "SO",
        hold1Code: null,
        hold2Code: null,
        hold3Code: null,
        hold4Code: null,
        hold5Code: null,
        hold6Code: null,
        numOfCourses: 4,
        hoursEnrolled: 12,
        termHoursEarned: 12,
        careerGpa: 3.9,
        degreeCode: "BA-ENG",
        major1: "English",
        minor1: "Psychology",
        concentration1: null,
        last_name: "Johnson",
        first_name: "Emma",
        email_address: "ejohnson@university.edu",
        mobile_phone: 2345678901,
        gender: "F",
        country: "Canada"
      },
      {
        idNum: 10003,
        studentEmployCode: "ACT",
        webGroup: "GR",
        tuitionCode: "STD",
        entranceYear: "2021",
        entranceTerm: "SPRING",
        currentClassCode: "JR",
        hold1Code: null,
        hold2Code: null,
        hold3Code: null,
        hold4Code: null,
        hold5Code: null,
        hold6Code: null,
        numOfCourses: 6,
        hoursEnrolled: 18,
        termHoursEarned: 18,
        careerGpa: 3.5,
        degreeCode: "BS-BIO",
        major1: "Biology",
        minor1: null,
        concentration1: null,
        last_name: "Garcia",
        first_name: "Maria",
        email_address: "mgarcia@university.edu",
        mobile_phone: 3456789012,
        gender: "F",
        country: "Mexico"
      },
      // Ajout de plus d'étudiants pour de meilleures données de visualisation
      {
        idNum: 10004,
        studentEmployCode: "ACT",
        webGroup: "UG",
        tuitionCode: "STD",
        entranceYear: "2023",
        entranceTerm: "FALL",
        currentClassCode: "FR",
        hold1Code: null,
        hold2Code: null,
        hold3Code: null,
        hold4Code: null,
        hold5Code: null,
        hold6Code: null,
        numOfCourses: 5,
        hoursEnrolled: 15,
        termHoursEarned: 15,
        careerGpa: 3.2,
        degreeCode: "BS-CS",
        major1: "Computer Science",
        minor1: "Business",
        concentration1: null,
        last_name: "Lee",
        first_name: "David",
        email_address: "dlee@university.edu",
        mobile_phone: 4567890123,
        gender: "M",
        country: "China"
      },
      {
        idNum: 10005,
        studentEmployCode: "ACT",
        webGroup: "UG",
        tuitionCode: "STD",
        entranceYear: "2022",
        entranceTerm: "SPRING",
        currentClassCode: "SO",
        hold1Code: null,
        hold2Code: null,
        hold3Code: null,
        hold4Code: null,
        hold5Code: null,
        hold6Code: null,
        numOfCourses: 6,
        hoursEnrolled: 18,
        termHoursEarned: 18,
        careerGpa: 4.0,
        degreeCode: "BS-PHY",
        major1: "Physics",
        minor1: "Mathematics",
        concentration1: null,
        last_name: "Wilson",
        first_name: "Sophia",
        email_address: "swilson@university.edu",
        mobile_phone: 5678901234,
        gender: "F",
        country: "USA"
      }
    ];
  }

  calculateStatistics(): void {
    this.totalStudents = this.students.length;
    this.avgGpa = this.students.reduce((sum, student) => sum + student.careerGpa, 0) / this.totalStudents;
    this.totalHoursEnrolled = this.students.reduce((sum, student) => sum + student.hoursEnrolled, 0);
    this.avgCoursesPerStudent = this.students.reduce((sum, student) => sum + student.numOfCourses, 0) / this.totalStudents;

    // Préparation des données pour les graphiques
    this.prepareChartData();
  }

  prepareChartData(): void {
    // GPA Distribution
    const gpaRanges = ['0.0-1.0', '1.1-2.0', '2.1-3.0', '3.1-4.0'];
    this.gpaDistribution = gpaRanges.map(range => {
      const [min, max] = range.split('-').map(Number);
      return {
        range,
        count: Math.floor(Math.random() * 15) + 5,
        percentage: 0
      };
    });

    // Major Distribution
    this.majorCounts = {
      'Computer Science': 35,
      'Business': 28,
      'Engineering': 25,
      'Sciences': 20,
      'Arts': 15
    };

    // Gender Distribution
    this.genderDistribution = {
      'Male': 52,
      'Female': 48
    };

    // Geographic Distribution
    this.countryDistribution = {
      'USA': 40,
      'UK': 25,
      'China': 20,
      'India': 15
    };

    // Enrollment Trends
    const terms = ['2023 FALL', '2024 SPRING', '2024 FALL', '2025 SPRING'];
    this.enrollmentTrends = terms.map((term, index) => ({
      yearTerm: term,
      count: 65 + Math.floor(Math.random() * 10) + (index * 2)
    }));

    // Course Load
    this.courseLoadData = [
      { category: 'Full Time', count: 75, hours: 900, percentage: 75 },
      { category: 'Part Time', count: 25, hours: 150, percentage: 25 }
    ];

    // Student Progress
    this.studentProgress = {
      labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
      gpa: [3.2, 3.4, 3.5, 3.7],
      success: [85, 87, 90, 92]
    };

    // Grades by Subject
    this.gradesBySubject = {
      'Mathematics': {
        'A': 30,
        'B': 25,
        'C': 20,
        'D': 15,
        'F': 10
      },
      'Computer Science': {
        'A': 35,
        'B': 30,
        'C': 20,
        'D': 10,
        'F': 5
      },
      'Physics': {
        'A': 25,
        'B': 30,
        'C': 25,
        'D': 15,
        'F': 5
      },
      'English': {
        'A': 40,
        'B': 30,
        'C': 20,
        'D': 8,
        'F': 2
      }
    };
  }

  translateClassCode(code: string): string {
    // Traduit les codes de classe en noms complets
    const translations: { [key: string]: string } = {
      'FR': 'Freshman',
      'SO': 'Sophomore',
      'JR': 'Junior',
      'SR': 'Senior',
      'GR': 'Graduate'
    };
    
    return translations[code] || code;
  }
}