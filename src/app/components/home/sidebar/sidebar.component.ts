import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  menuItems = [
    { title: 'Dashboard', icon: 'dashboard', link: '/home', active: true },
    { title: 'Progress', icon: 'insights', link: '/progressDashboard', active: false }
  ];

  setActiveItem(index: number, link: string): void {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
    this.router.navigateByUrl(link);
  }

  logout(): void {
    // TODO: Implement logout logic
    this.router.navigate(['/login']);
  }
}
