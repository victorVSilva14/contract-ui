import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductTableComponent } from '../../product-table/product-table.component';

import moment from 'moment';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-order-information',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProductTableComponent
  ],
  templateUrl: './dialog-order-information.component.html',
  styleUrls: ['./dialog-order-information.component.scss']
})
export class DialogOrderInformationComponent implements OnInit {
  orderForm: FormGroup;
  isEditing: boolean = false;  

  statusSequence: string[] = ['Importado', 'Montagem', 'Saída', 'Recolher', 'Concluído'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogOrderInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this.fb.group({
      id: [this.data.id],
      cliente: [{ value: this.data.cliente, disabled: true }],
      idorcamento: [{ value: this.data.id, disabled: true }],
      observacao: [{ value: this.data.orcamento  || '', disabled: true }],
      dtImportacao: [
        { value: this.data.dtImportacao ? moment(this.data.dtImportacao).format('YYYY-MM-DD') : null, disabled: true }
      ],
      dtEntrega: [
        { value: this.data.dtEntrega ? moment(this.data.dtEntrega).format('YYYY-MM-DD') : null, disabled: true }
      ],
      vlTotal: [this.data.vlTotal],
      status: [{ value: this.data.status, disabled: true }]
    });
  }

  ngOnInit(): void {}

  getNextStatus(currentStatus: string): string {
    const currentIndex = this.statusSequence.indexOf(currentStatus);
    if (currentIndex >= 0 && currentIndex < this.statusSequence.length - 1) {
      return this.statusSequence[currentIndex + 1];
    }
    return currentStatus; 
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const { status } = this.orderForm.controls;

      const newStatus = this.getNextStatus(status.value);
      this.orderForm.get('status')?.setValue(newStatus); 

      const formData = this.orderForm.getRawValue();
      this.dialogRef.close(formData);
    }
  }

  onEdit(): void {
    this.isEditing = true;
    this.orderForm.get('dtEntrega')?.enable();
    this.orderForm.get('observacao')?.enable();
  }

  onCancel(): void {
    this.isEditing = false;
    this.orderForm.disable();
  }
}
