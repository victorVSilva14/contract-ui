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
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductTableComponent } from '../../product-table/product-table.component';

import { MatIconModule } from '@angular/material/icon';
import { ExportReportComponent } from '../export-report/export-report.component';
import { CepService } from '../../../services/cep.service';

import { ToastrService } from 'ngx-toastr';
import { DirectivesModule } from '../../../directives/directives.module';

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
    DirectivesModule,
    ProductTableComponent,
    ExportReportComponent
  ],
  templateUrl: './dialog-address.component.html',
  styleUrl: './dialog-address.component.scss'
})
export class DialogAddressComponent {
  addressForm: FormGroup;
  isEditing: boolean = false;  

  pdfSrc: string = '';

  initialData: any;

  statusSequence: string[] = ['Importado', 'Validar', 'Montagem', 'Saída', 'Recolher', 'Concluído'];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cepService: CepService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initialData = { ...this.data };
    this.addressForm = this.fb.group({
      id: [this.data.id],
      cep: [
        { value: null, disabled: true },
        [Validators.required, Validators.pattern(/^\d{8}$/), Validators.maxLength(8), Validators.minLength(8)] // Validação de CEP (8 dígitos)
      ],
      estado: [{ value: null, disabled: true }, Validators.required],
      logradouro: [{ value: null, disabled: true }, Validators.required],
      cidade: [{ value: null, disabled: true }, Validators.required],
      bairro: [{ value: null, disabled: true }, Validators.required],
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
    if (this.addressForm.valid) {
      this.openAccessInformationDialog();
      // const { status } = this.addressForm.controls;

      //const newStatus = this.getNextStatus(status.value);
      //this.addressForm.get('status')?.setValue(newStatus); 

      //const formData = this.addressForm.getRawValue();
      //this.dialogRef.close(formData);

      //this.toastr.success('Endereço validado com sucesso!', 'Sucesso!');
    }
  }

  onEdit(): void {
    this.isEditing = true;
    if (this.data.status != 'Concluído') this.addressForm.enable();
    this.addressForm.get('observacao')?.enable();
  }

  onCancel(): void {
    this.isEditing = false;
    this.addressForm.disable();
    this.addressForm.reset(this.initialData);
  }

  openAccessInformationDialog(): void {
    // this.dialog.open(DialogAccessInformationComponent, {
    //  width: '800px',
    //  data: this.addressForm 
    //});
  }


  onCepBlur(): void {
    const cep = this.addressForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.cepService.getAddressByCep(cep).subscribe(
        data => {
          if (data.erro) {
            this.toastr.warning('CEP não encontrado!', 'Atenção!');
            this.resetAddressFields();
          } else {
            console.log('data: ', data)
            this.addressForm.patchValue({
              estado: data.estado,
              logradouro: data.logradouro,
              cidade: data.localidade,
              bairro: data.bairro,
              complemento: data.complemento,
            });
          }
        },
        error => {
          this.toastr.error('Erro ao buscar CEP!', 'Erro!');
          this.resetAddressFields();
        }
      );
    }
  }

  resetAddressFields(): void {
    this.addressForm.patchValue({
      rua: '',
      complemento: '',
      numero: '',
      pontoReferencia: ''
    });
  }
}
