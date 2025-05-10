import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent: {
    name: string;
    class: string;
    dateOfBirth: string;
    vaccinations: string[];
  } = {
    name: '',
    class: '',
    dateOfBirth: '',
    vaccinations: []
  };

  vaccinationOptions = ['TT', 'Measles', 'None'];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(data => this.students = data);
  }

   addStudent() {
    const vaccinations = this.newStudent.vaccinations.includes('None') ? [] : this.newStudent.vaccinations;

    const studentPayload = {
      ...this.newStudent,
      vaccinations
    };

    this.http.post('http://localhost:5000/api/students', studentPayload).subscribe(() => {
      this.fetchStudents();
      this.newStudent = {
        name: '',
        class: '',
        dateOfBirth: '',
        vaccinations: []
      };
    });
  }

  deleteStudent(id: string) {
    this.http.delete(`http://localhost:5000/api/students/${id}`).subscribe(() => this.fetchStudents());
  }
}
