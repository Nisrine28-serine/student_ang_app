import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student_app';
  sidebarCollapsed = false;
  
  onToggleSidebar(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }
}
