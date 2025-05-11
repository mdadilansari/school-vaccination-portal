import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent  {
  @Input() students: any[] = [];
  @Input() vaccinationOptions: string[] = [];
  @Output() addStudentEvent = new EventEmitter<any>();
  @Output() enrollStudentEvent = new EventEmitter<string>();
  @Output() deleteStudentEvent = new EventEmitter<string>();

  newStudent = {
    name: '',
    class: '',
    dateOfBirth: '',
    vaccinations: []
  };

  enrollStudent(id: string) {
    this.enrollStudentEvent.emit(id);
  }

  deleteStudent(id: string) {
    this.deleteStudentEvent.emit(id);
  }
}
