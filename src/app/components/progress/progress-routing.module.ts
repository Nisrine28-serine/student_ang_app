import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressComponent } from './progress.component';

const routes: Routes = [
  {  path: ":id" , component : ProgressComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressRoutingModule { }
