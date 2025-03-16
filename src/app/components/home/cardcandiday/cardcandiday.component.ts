import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Data } from '../../../models/data';

@Component({
  selector: 'app-cardcandiday',
  standalone: false,
  templateUrl: './cardcandiday.component.html',
  styleUrl: './cardcandiday.component.css'
})
export class CardcandidayComponent implements OnChanges {
  @Input() studentData?: any;
  
  // Variables for pagination
  currentPage = 0;
  allCandidacies: any[] = [];
  totalCandidacies = 0;
  
  // Variable for tabs
  activeTab = 'academic'; // Default active tab
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentData']) {
      this.initializeCandidacies();
    }
  }
  
  // Initialize the array of all candidacies
  initializeCandidacies() {
    if (this.studentData && this.studentData.candiday && this.studentData.candiday.length > 0) {
      this.allCandidacies = this.studentData.candiday;
      this.totalCandidacies = this.allCandidacies.length;
      this.currentPage = 0;
      console.log(`Found ${this.totalCandidacies} candidacies`);
    } else {
      this.allCandidacies = [];
      this.totalCandidacies = 0;
    }
  }

  // Method to change active tab
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  // Getter to access the current candidacy (based on current page)
  get candidacyData() {
    if (this.allCandidacies.length > 0 && this.currentPage < this.allCandidacies.length) {
      return this.allCandidacies[this.currentPage];
    }
    return null;
  }
  
  // Navigation methods for pagination
  nextPage() {
    if (this.currentPage < this.totalCandidacies - 1) {
      this.currentPage++;
    }
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  goToPage(page: number) {
    if (page >= 0 && page < this.totalCandidacies) {
      this.currentPage = page;
    }
  }

  // Method to get the pages to display (for pagination)
  get pageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to display
    
    if (this.totalCandidacies <= maxVisiblePages) {
      // If the total number of pages is less than the maximum, display all pages
      for (let i = 0; i < this.totalCandidacies; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, display the first page, the last page, the current page and one page before/after
      let startPage = Math.max(0, this.currentPage - 1);
      let endPage = Math.min(this.totalCandidacies - 1, this.currentPage + 1);
      
      // Adjust if we are near the beginning or end
      if (startPage <= 1) {
        endPage = Math.min(this.totalCandidacies - 1, 3);
      }
      if (endPage >= this.totalCandidacies - 2) {
        startPage = Math.max(0, this.totalCandidacies - 4);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipses if necessary
      if (startPage > 0) {
        pages.unshift(0);
        if (startPage > 1) {
          pages.splice(1, 0, -1); // '-1' represents an ellipsis
        }
      }
      
      if (endPage < this.totalCandidacies - 1) {
        if (endPage < this.totalCandidacies - 2) {
          pages.push(-1); // '-1' represents an ellipsis
        }
        pages.push(this.totalCandidacies - 1);
      }
    }
    
    return pages;
  }

  // Safe method to format dates
  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return 'None';
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US'); // Format: MM/DD/YYYY
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }

  // Method to handle null values
  getValueOrDefault(value: any): string {
    return value !== null && value !== undefined ? value.toString() : 'None';
  }
}
