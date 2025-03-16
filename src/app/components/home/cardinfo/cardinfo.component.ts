import { Component, Input } from '@angular/core';
import { Data } from '../../../models/data';

@Component({
  selector: 'app-cardinfo',
  standalone: false,
  templateUrl: './cardinfo.component.html',
  styleUrl: './cardinfo.component.css'
})
export class CardinfoComponent {
    constructor(){}
    @Input() studentData ? : Data ;
}
