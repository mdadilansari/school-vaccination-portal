import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  students: any[] = [];
  drive: any;
  driveId: string = '';
  displayedColumns: string[] = ['studentId', 'name', 'age', 'dob', 'vaccinations', 'registered', 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchDrive();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:5000/api/students').subscribe(data => {
      this.students = data;
    });
  }

  fetchDrive() {
    this.http.get<any>('http://localhost:5000/api/drive').subscribe(data => {
      this.drive = data;
      this.driveId = data._id;
    });
  }

  isEnrolled(studentId: string): boolean {
    return this.drive?.enrolledStudents?.includes(studentId);
  }

  enrollStudent(studentId: string) {
    if (this.isEnrolled(studentId)) {
      alert('Student already enrolled!');
      return;
    }

    this.http.put(`http://localhost:5000/api/drive/${this.driveId}/enroll`, { studentId }).subscribe(() => {
      this.fetchDrive();
      alert('Student enrolled!');
    });
  }

  deleteStudent(studentId: string) {
    this.http.delete(`http://localhost:5000/api/students/${studentId}`).subscribe(() => {
      this.fetchStudents();
      alert('Student deleted!');
    });
  }
}
