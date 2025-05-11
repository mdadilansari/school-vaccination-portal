import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { StudentListComponent } from 'src/app/pages/students-information/components/student-list/student-list.component';
import { DriveComponent } from 'src/components/drive/drive.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsInformationPage } from './pages/students-information/students-information.page';
import { DrivesInformationPage } from './pages/drives-information/drives-information.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { StudentTableComponent } from 'src/app/pages/students-information/components/student-table/student-table.component';
import { RegisterStudentComponent } from './pages/students-information/components/register-student/register-student.component';
import { StudentEditDialogComponent } from './pages/students-information/components/student-edit-dialog/student-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    DriveComponent,
    StudentTableComponent,
    StudentsInformationPage,
    DrivesInformationPage,
    DashboardPage,
    RegisterStudentComponent,
    StudentEditDialogComponent,
    LoginPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
