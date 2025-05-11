import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  @Input() students: any[] = [];
  @Output() enrollStudentEvent = new EventEmitter<string>();
  @Output() deleteStudentEvent = new EventEmitter<string>();

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'studentId', 'name', 'age', 'dob', 'vaccinations', 'registered', 'actions'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngOnChanges(): void {
    if (this.students) {
      this.dataSource = new MatTableDataSource(this.students);
    }
  }

  enrollStudent(id: string) {
    this.enrollStudentEvent.emit(id);
  }

  deleteStudent(id: string) {
    this.deleteStudentEvent.emit(id);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  exportSelected() {
    const exportData = this.selection.selected.map(student => ({
      StudentID: student.studentId,
      Name: student.name,
      Age: student.age,
      DOB: student.dateOfBirth,
      Vaccinations: student.vaccinations.map((v: any) => v.vaccineName).join(', ') || 'None',
      Registered: student.enrolledInDrive ? 'Yes' : 'No'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Students');
    XLSX.writeFile(workbook, 'selected_students.xlsx');
  }
}
