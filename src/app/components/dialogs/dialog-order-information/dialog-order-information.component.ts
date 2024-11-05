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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Produto {
  id: number;
  nome: string;
}

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
    MatTableModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  templateUrl: './dialog-order-information.component.html',
  styleUrls: ['./dialog-order-information.component.scss']
})
export class DialogOrderInformationComponent implements OnInit {
  orderForm: FormGroup;
  produtos: Produto[] = [
    { id: 1, nome: 'Produto A' },
    { id: 2, nome: 'Produto B' },
    { id: 3, nome: 'Produto C' }
  ];
  isEditing: boolean = false;  

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this.fb.group({
      cliente: [{ value: this.data.cliente, disabled: true }],
      idorcamento: [{ value: this.data.id, disabled: true }],
      observacao: [this.data.observacao || ''],
      dtImportacao: [this.data.dtImportacao || null, Validators.required],
      dtEntrega: [this.data.dtEntrega || null, Validators.required],
      status: [{ value: this.data.status, disabled: true }]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Formulário enviado:', this.orderForm.value);
    }
  }

  onEdit(): void {
    this.isEditing = true;
    this.orderForm.enable();
  }

  onCancel(): void {
    this.isEditing = false;
    this.orderForm.disable();
  }
}
