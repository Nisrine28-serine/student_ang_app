import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProgressComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    RouterModule
  ]
})
export class ProgressModule { }
