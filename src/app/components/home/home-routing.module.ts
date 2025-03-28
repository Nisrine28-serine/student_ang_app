import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'progressDashboard', component: ProgressDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
