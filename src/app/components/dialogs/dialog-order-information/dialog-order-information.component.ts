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
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductTableComponent } from '../../product-table/product-table.component';

import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { ExportReportComponent } from '../export-report/export-report.component';
import { JasperReportService } from '../../../services/jasper-report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-order-information',
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
  templateUrl: './dialog-order-information.component.html',
  styleUrls: ['./dialog-order-information.component.scss']
})
export class DialogOrderInformationComponent implements OnInit {
  orderForm: FormGroup;
  isEditing: boolean = false;  

  pdfSrc: string = '';

  statusSequence: string[] = ['Importado', 'Validar', 'Montagem', 'Saída', 'Recolher', 'Concluído'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogOrderInformationComponent>,
    private jasperReportService: JasperReportService,
    private dialog: MatDialog,
    private toastr: ToastrService,
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

      dtSaida: [
        { value: this.data.dtSaida ? moment(this.data.dtSaida).format('YYYY-MM-DD') : null, disabled: true }
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

      this.toastr.success('Orçamento alterado com sucesso!', 'Sucesso!');
    }
  }

  onEdit(): void {
    this.isEditing = true;
    if (this.data.status != 'Concluído') this.orderForm.get('dtEntrega')?.enable();
    this.orderForm.get('observacao')?.enable();
  }

  onCancel(): void {
    this.isEditing = false;
    this.orderForm.disable();
  }

  openReportDialog(): void {
    this.dialog.open(ExportReportComponent, {
      width: '800px',
      data: { pdfSrc: this.pdfSrc, email: this.data.cliente.email }
    });
  }
  
  gerarRelatorio() {
    const numOrcamento = this.data.id;
    if (numOrcamento) {
      this.jasperReportService.gerarRelatorio(numOrcamento).subscribe(
        (pdfData) => {
          const pdfBlob = pdfData;
          this.pdfSrc = URL.createObjectURL(pdfBlob);
          this.openReportDialog();
        },
        (error) => {
          console.error('Erro ao gerar relatório:', error);
        }
      );
    } else {
      alert('Informe um número de orçamento válido!');
    }
  }
}
