import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeDropdown: number | null = null;
  
  constructor(private router: Router) {}

  menuItems = [
    { title: 'AUI PORTAL', icon: 'account_balance', link: '/home', active: false },
    { 
      title: 'Dashboard', 
      icon: 'dashboard', 
      link: '/home', 
      active: true,
      subItems: [
        { title: 'Data Progress', link: '/dashboard/progresse' },
        { title: 'Statistics', link: '/dashboard/stats' },
        { title: 'Reports', link: '/dashboard/reports' }
      ]
    },
    // { 
    //   title: 'Student Profile', 
    //   icon: 'person', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'Personal Information', link: '/profile/personal' },
    //     { title: 'Contact Details', link: '/profile/contact' },
    //     { title: 'Documents', link: '/profile/documents' }
    //   ]
    // },
    // { 
    //   title: 'Admission Status', 
    //   icon: 'school', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'Application Status', link: '/admission/status' },
    //     { title: 'Required Documents', link: '/admission/documents' },
    //     { title: 'Next Steps', link: '/admission/next-steps' }
    //   ]
    // },
    // { 
    //   title: 'Academic Records', 
    //   icon: 'library_books', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'Transcripts', link: '/academic/transcripts' },
    //     { title: 'Courses Taken', link: '/academic/courses' },
    //     { title: 'Degrees', link: '/academic/degrees' }
    //   ]
    // }
  ];

  setActiveItem(index: number): void {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
    
    // Toggle dropdown state
    if (this.activeDropdown === index) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = index;
    }
  }
  
  isDropdownActive(index: number): boolean {
    return this.activeDropdown === index;
  }

  logout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/login']);
  }
}
