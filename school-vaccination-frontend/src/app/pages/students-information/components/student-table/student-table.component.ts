import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {
  displayedColumns: string[] = ['studentId', 'name', 'age', 'dob', 'vaccinations', 'registered', 'actions'];
  @Input() students: any[] = [];
  @Output() enrollStudentEvent = new EventEmitter<string>();
  @Output() deleteStudentEvent = new EventEmitter<string>();

  enrollStudent(id: string) {
    this.enrollStudentEvent.emit(id);
  }

  deleteStudent(id: string) {
    this.deleteStudentEvent.emit(id);
  }
}
