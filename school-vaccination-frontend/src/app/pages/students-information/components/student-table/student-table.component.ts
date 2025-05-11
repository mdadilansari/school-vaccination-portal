import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentEditDialogComponent } from '../student-edit-dialog/student-edit-dialog.component';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
})
export class StudentTableComponent implements OnInit {
  @Input() students: any[] = [];
  @Output() enrollStudentEvent = new EventEmitter<string>();
  @Output() deleteStudentEvent = new EventEmitter<string>();
  @Output() uploadFile = new EventEmitter<FormData>();

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [
    'select',
    'studentId',
    'name',
    'age',
    'class',
    'dob',
    'vaccinations',
    'registered',
    'actions',
  ];
  showFilters = false;

  filterValues: any = {
    name: '',
    class: '',
    age: '',
    vaccinations: '',
    registered: '',
  };

  constructor(private http: HttpClient,private dialog: MatDialog) {}

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
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  exportSelected() {
    const exportData = this.selection.selected.map((student) => ({
      StudentID: student.studentId,
      Name: student.name,
      Age: student.age,
      Class: student.class,
      DOB: student.dateOfBirth,
      Vaccinations:
        student.vaccinations.map((v: any) => v.vaccineName).join(', ') ||
        'None',
      Registered: student.enrolledInDrive ? 'Yes' : 'No',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Students');
    XLSX.writeFile(workbook, 'selected_students.xlsx');
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file: File = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.uploadFile.emit(formData);
    fileInput.value = '';
  }

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }

  clearFilters() {
    this.filterValues = {
      name: '',
      class: '',
      age: '',
      vaccinations: '',
      registered: '',
    };
    this.applyFilters();
  }

  cancelFilters() {
    this.showFilters = false;
  }

  applyFilters() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filters = JSON.parse(filter);

      const matchName = data.name
        ?.toLowerCase()
        .includes(filters.name?.toLowerCase() || '');
      const matchClass = data.class?.toString().includes(filters.class || '');
      const matchAge = data.age?.toString().includes(filters.age || '');
      const matchVaccine = data.vaccinations
        ?.map((v: any) => v.vaccineName)
        .join(', ')
        .toLowerCase()
        .includes(filters.vaccinations?.toLowerCase() || '');
      const matchReg =
        filters.registered === '' ||
        (filters.registered === 'Yes' && data.enrolledInDrive) ||
        (filters.registered === 'No' && !data.enrolledInDrive);

      return matchName && matchClass && matchAge && matchVaccine && matchReg;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  openEditDialog(student: any) {
  const dialogRef = this.dialog.open(StudentEditDialogComponent, {
    width: '400px',
    data: { ...student },
  });

  dialogRef.afterClosed().subscribe(updated => {
    if (updated) {
      // Update the local table if needed
      const index = this.students.findIndex(s => s.studentId === updated.studentId);
      if (index !== -1) {
        this.students[index] = updated;
        this.dataSource.data = [...this.students];
      }
    }
  });
}
}
