import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent {
  @Input() students: any[] = [];
  @Input() vaccinationOptions: string[] = [];
  @Output() addStudentEvent = new EventEmitter<any>();
  @Output() enrollStudentEvent = new EventEmitter<string>();
  @Output() deleteStudentEvent = new EventEmitter<string>();

  newStudent = {
    name: '',
    class: '',
    dateOfBirth: '',
    vaccinations: [],
  };

  addStudent() {
    this.addStudentEvent.emit(this.newStudent);
    this.newStudent = {
      name: '',
      class: '',
      dateOfBirth: '',
      vaccinations: [],
    };
  }
}
