import { Component, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';

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
  pdfSrc: string = "";  // A URL ou o conteúdo base64 do PDF
  email: string = "";

  constructor(
    public dialogRef: MatDialogRef<ExportReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializa o PDF com uma URL ou conteúdo base64, vindo dos dados do componente pai
    this.pdfSrc = data?.pdfSrc || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onEnviar(): void {
    if (this.email) {
      console.log(`Enviando relatório para ${this.email}`);
      this.dialogRef.close();
    } else {
      console.log("Por favor, insira um e-mail válido.");
    }
  }

}
