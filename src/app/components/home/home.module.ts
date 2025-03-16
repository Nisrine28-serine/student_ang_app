import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CardinfoComponent } from './cardinfo/cardinfo.component';
import { CardstudentComponent } from './cardstudent/cardstudent.component';
import { CardcandidayComponent } from './cardcandiday/cardcandiday.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    CardinfoComponent,
    CardstudentComponent,
    CardcandidayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
