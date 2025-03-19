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
    this.loadStudentData();
    this.calculateStatistics();
  }

  ngAfterViewInit(): void {
    // Attendre que le DOM soit chargé avant d'initialiser les graphiques
    setTimeout(() => {
      this.initializeCharts();
    }, 0);
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

  private initializeCharts(): void {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        title: {
          display: true,
          font: {
            size: 16,
            weight: 'bold' as const
          }
        }
      }
    };

    // GPA Distribution
    new Chart('gpaChart', {
      type: 'bar',
      data: {
        labels: this.gpaDistribution.map(d => d.range),
        datasets: [{
          label: 'Number of Students',
          data: this.gpaDistribution.map(d => d.count),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'GPA Distribution'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students'
            }
          }
        }
      }
    });

    // Enrollment Trends
    new Chart('enrollmentChart', {
      type: 'line',
      data: {
        labels: this.enrollmentTrends.map(trend => trend.yearTerm),
        datasets: [{
          label: 'Number of Enrollments',
          data: this.enrollmentTrends.map(trend => trend.count),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Enrollment Trends'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students'
            }
          }
        }
      }
    });

    // Student Progress
    new Chart('studentProgressChart', {
      type: 'line',
      data: {
        labels: this.studentProgress.labels,
        datasets: [
          {
            label: 'Average GPA',
            data: this.studentProgress.gpa,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            yAxisID: 'y',
            tension: 0.4
          },
          {
            label: 'Success Rate (%)',
            data: this.studentProgress.success,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            yAxisID: 'y1',
            tension: 0.4
          }
        ]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Student Progress'
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
            max: 4
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Success Rate (%)'
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

    // Major Performance
    new Chart('majorPerformanceChart', {
      type: 'radar',
      data: {
        labels: Object.keys(this.majorCounts),
        datasets: [{
          label: 'Number of Students',
          data: Object.values(this.majorCounts),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Major Distribution'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            pointLabels: {
              font: {
                size: 12
              }
            },
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    });

    // Course Distribution
    new Chart('courseDistributionChart', {
      type: 'doughnut',
      data: {
        labels: Object.keys(this.majorCounts),
        datasets: [{
          data: Object.values(this.majorCounts),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Course Distribution'
          }
        }
      }
    });

    // Course Load
    new Chart('courseLoadChart', {
      type: 'pie',
      data: {
        labels: this.courseLoadData.map(item => item.category),
        datasets: [{
          data: this.courseLoadData.map(item => item.count),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Course Load Distribution'
          }
        }
      }
    });

    // Gender Distribution
    new Chart('genderChart', {
      type: 'pie',
      data: {
        labels: Object.keys(this.genderDistribution),
        datasets: [{
          data: Object.values(this.genderDistribution),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Gender Distribution'
          }
        }
      }
    });

    // Geographic Distribution
    new Chart('geographicChart', {
      type: 'bar',
      data: {
        labels: Object.keys(this.countryDistribution),
        datasets: [{
          label: 'Number of Students',
          data: Object.values(this.countryDistribution),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Geographic Distribution'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students'
            }
          }
        }
      }
    });

    // Grades by Subject
    const grades = ['A', 'B', 'C', 'D', 'F'] as const;
    type Grade = typeof grades[number];
    
    new Chart('gradesBySubjectChart', {
      type: 'bar',
      data: {
        labels: Object.keys(this.gradesBySubject),
        datasets: grades.map((grade, index) => ({
          label: grade,
          data: Object.values(this.gradesBySubject).map(subject => subject[grade as Grade]),
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ][index],
          borderWidth: 1
        }))
      },
      options: {
        ...defaultOptions,
        plugins: {
          ...defaultOptions.plugins,
          title: {
            ...defaultOptions.plugins.title,
            text: 'Grades by Subject'
          }
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Subjects'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students'
            }
          }
        }
      }
    });
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