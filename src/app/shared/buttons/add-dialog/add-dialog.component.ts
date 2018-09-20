import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  columns: string[];
  title: string;
  inputs = {};
  form;

  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = this.data.title;

    this.createTable();
    this.createJsonInputs();
    this.createFormGroup();
  }

  save() {
    this.dialogRef.close(this.inputs);
  }

  // Slice the first columns named: No. and selection (those is automatically generated)
  // from the first and last position in the array
  private createTable() {
    this.columns = this.data.columns.slice(1);
    this.columns.pop();
  }

  private createJsonInputs() {
    this.columns.forEach(element => {
      this.inputs[element] = '';
    });
  }

  // Dynamically creating form controls
  private createFormGroup() {
    this.form = new FormGroup({});
    this.columns.forEach(element => {
      this.form.addControl(element, new FormControl('', [Validators.required]));
    });
  }
}
