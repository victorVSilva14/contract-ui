import { Component, Inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductTableComponent } from '../../product-table/product-table.component';

import { MatIconModule } from '@angular/material/icon';
import { ExportReportComponent } from '../export-report/export-report.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-address',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ProductTableComponent,
    ExportReportComponent
  ],
  templateUrl: './dialog-address.component.html',
  styleUrl: './dialog-address.component.scss'
})
export class DialogAddressComponent {
  orderForm: FormGroup;
  isEditing: boolean = false;  

  pdfSrc: string = '';

  statusSequence: string[] = ['Importado', 'Validar', 'Montagem', 'Saída', 'Recolher', 'Concluído'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this.fb.group({
      id: [this.data.id],
      cep: [{ value: null, disabled: true }, Validators.required],
      rua: [{ value: null, disabled: true }, Validators.required],
      numero: [{ value: null, disabled: true }, Validators.required],
      complemento: [{ value: null, disabled: true }],
      pontoReferencia: [{ value: null, disabled: true }],
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
      this.openAccessInformationDialog();
      // const { status } = this.orderForm.controls;

      //const newStatus = this.getNextStatus(status.value);
      //this.orderForm.get('status')?.setValue(newStatus); 

      //const formData = this.orderForm.getRawValue();
      //this.dialogRef.close(formData);

      //this.toastr.success('Endereço validado com sucesso!', 'Sucesso!');
    }
  }

  onEdit(): void {
    this.isEditing = true;
    if (this.data.status != 'Concluído') this.orderForm.enable();
    this.orderForm.get('observacao')?.enable();
  }

  onCancel(): void {
    this.isEditing = false;
    this.orderForm.disable();
  }

  openAccessInformationDialog(): void {
    this.dialog.open(ExportReportComponent, {
      width: '800px',
      data: { pdfSrc: this.pdfSrc, email: this.data.cliente.email }
    });
  }
}
