import { Component, Input } from '@angular/core';
import { Data } from '../../../models/data';

@Component({
  selector: 'app-cardstudent',
  standalone: false,
  templateUrl: './cardstudent.component.html',
  styleUrl: './cardstudent.component.css'
})
export class CardstudentComponent {
  @Input() studentData?: any;
}
