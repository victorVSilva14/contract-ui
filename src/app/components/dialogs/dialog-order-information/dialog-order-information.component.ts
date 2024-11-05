import { Component, OnInit } from '@angular/core';
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
  styleUrl: './dialog-order-information.component.scss'
})
export class DialogOrderInformationComponent  implements OnInit {
  orderForm: FormGroup;
  produtos: Produto[] = [
    { id: 1, nome: 'Produto A' },
    { id: 2, nome: 'Produto B' },
    { id: 3, nome: 'Produto C' }
  ];
  orders: any[] = [];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      cliente: [{ value: '', disabled: true }],
      produto: [{ value: null, disabled: true }],
      idorcamento: [{ value: null, disabled: true }],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      observacao: [''],
      dtImportacao: [null, Validators.required],
      dtEntrega: [null, Validators.required],
      status: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.valid) {
      this.orders.push(this.orderForm.value);
      this.orderForm.reset();
    }
  }
}