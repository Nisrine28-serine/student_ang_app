import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: "",
    loadChildren:()=>import("./components/home/home.module").then(m=>m.HomeModule)
  },
  { 
    path: "progress",
    loadChildren:()=>import("./components/progress/progress.module").then(m=>m.ProgressModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
