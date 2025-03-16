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
        { title: 'progresse d\'informations', link: '/dashboard/progresse' },
        { title: 'Statistiques', link: '/dashboard/stats' },
        { title: 'Rapports', link: '/dashboard/reports' }
      ]
    },
    // { 
    //   title: 'Student Profile', 
    //   icon: 'person', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'Informations personnelles', link: '/profile/personal' },
    //     { title: 'Coordonnées', link: '/profile/contact' },
    //     { title: 'Documents', link: '/profile/documents' }
    //   ]
    // },
    // { 
    //   title: 'Admission Status', 
    //   icon: 'school', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'État de la candidature', link: '/admission/status' },
    //     { title: 'Documents requis', link: '/admission/documents' },
    //     { title: 'Prochaines étapes', link: '/admission/next-steps' }
    //   ]
    // },
    // { 
    //   title: 'Academic Records', 
    //   icon: 'library_books', 
    //   link: '/home', 
    //   active: false,
    //   subItems: [
    //     { title: 'Relevés de notes', link: '/academic/transcripts' },
    //     { title: 'Cours suivis', link: '/academic/courses' },
    //     { title: 'Diplômes', link: '/academic/degrees' }
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
