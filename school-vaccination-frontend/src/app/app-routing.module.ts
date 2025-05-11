import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrivesInformationPage } from './pages/drives-information/drives-information.page';
import { StudentsInformationPage } from './pages/students-information/students-information.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'students-information', component: StudentsInformationPage },
  { path: 'drives-information', component: DrivesInformationPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
