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
  
  // Variables pour la pagination
  currentPage = 0;
  allCandidacies: any[] = [];
  totalCandidacies = 0;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentData']) {
      this.initializeCandidacies();
    }
  }
  
  // Initialiser le tableau de toutes les candidatures
  initializeCandidacies() {
    if (this.studentData && this.studentData.candiday && this.studentData.candiday.length > 0) {
      this.allCandidacies = this.studentData.candiday;
      this.totalCandidacies = this.allCandidacies.length;
      this.currentPage = 0;
      console.log(`Trouvé ${this.totalCandidacies} candidatures`);
    } else {
      this.allCandidacies = [];
      this.totalCandidacies = 0;
    }
  }

  // Getter pour accéder à la candidature actuelle (basée sur la page actuelle)
  get candidacyData() {
    if (this.allCandidacies.length > 0 && this.currentPage < this.allCandidacies.length) {
      return this.allCandidacies[this.currentPage];
    }
    return null;
  }
  
  // Méthodes de navigation pour la pagination
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

  // Méthode pour obtenir les pages à afficher (pour la pagination)
  get pageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5; // Nombre maximum de boutons de page à afficher
    
    if (this.totalCandidacies <= maxVisiblePages) {
      // Si le nombre total de pages est inférieur au maximum, on affiche toutes les pages
      for (let i = 0; i < this.totalCandidacies; i++) {
        pages.push(i);
      }
    } else {
      // Autrement, afficher la première page, la dernière page, la page courante et une page avant/après
      let startPage = Math.max(0, this.currentPage - 1);
      let endPage = Math.min(this.totalCandidacies - 1, this.currentPage + 1);
      
      // Ajuster si on est proche du début ou de la fin
      if (startPage <= 1) {
        endPage = Math.min(this.totalCandidacies - 1, 3);
      }
      if (endPage >= this.totalCandidacies - 2) {
        startPage = Math.max(0, this.totalCandidacies - 4);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Ajouter des ellipses si nécessaire
      if (startPage > 0) {
        pages.unshift(0);
        if (startPage > 1) {
          pages.splice(1, 0, -1); // '-1' représente une ellipse
        }
      }
      
      if (endPage < this.totalCandidacies - 1) {
        if (endPage < this.totalCandidacies - 2) {
          pages.push(-1); // '-1' représente une ellipse
        }
        pages.push(this.totalCandidacies - 1);
      }
    }
    
    return pages;
  }

  // Méthode sécurisée pour formater les dates
  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return 'None';
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR'); // Format: DD/MM/YYYY
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }

  // Méthode pour gérer les valeurs nulles
  getValueOrDefault(value: any): string {
    return value !== null && value !== undefined ? value.toString() : 'None';
  }
}
