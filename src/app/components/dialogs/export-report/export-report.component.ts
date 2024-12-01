import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { JasperReportService } from '../../../services/jasper-report.service';

@Component({
  selector: 'app-export-report',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    PdfViewerModule
  ],
  templateUrl: './export-report.component.html',
  styleUrl: './export-report.component.scss'
})
export class ExportReportComponent {
  pdfSrc: string = ""; 
  email: string = "";
  numOrcamento: number = 2;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jasperReportService: JasperReportService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ExportReportComponent>
  ) {
    this.pdfSrc = data?.pdfSrc || '';
    this.email = data?.email || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  enviarRelatorioParaEmail(): void {
    if (!this.numOrcamento || !this.email) {
      this.toastr.warning('Preencha todos os campos antes de enviar o relatório.', 'Atenção!');
      return;
    }

    this.jasperReportService.enviarRelatorioParaEmail(this.numOrcamento, this.email).subscribe((success) => {
      this.toastr.success('Relatório enviado para o e-mail com sucesso!', 'Sucesso!');
      this.dialogRef.close();
    });
  }

  onEnviar(): void {
    if (this.email) {
      this.enviarRelatorioParaEmail();
    } else {
      console.log("Por favor, insira um e-mail válido.");
    }
  }

}
