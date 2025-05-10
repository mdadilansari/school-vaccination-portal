import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  newStudent = {
    name: '',
    age: null,
    class: null,
    dateOfBirth: '',
    vaccinations: []
  };

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(data => this.students = data);
  }

  addStudent() {
    this.http.post('http://localhost:5000/api/students', this.newStudent).subscribe(() => {
      this.fetchStudents();
      this.newStudent = { name: '', age: null, class: null, dateOfBirth: '', vaccinations: [] };
    });
  }

  deleteStudent(id: string) {
    this.http.delete(`http://localhost:5000/api/students/${id}`).subscribe(() => this.fetchStudents());
  }
}
