import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Budget } from '../../models/budget.resource';
import { DialogOrderInformationComponent } from '../dialogs/dialog-order-information/dialog-order-information.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

const ELEMENT_DATA: Budget[] = [
  { id: 1, cliente: 'Victor', vlTotal: 1.0079, dtEntrega: new Date(), status: 'Montagem', type: 'client' },
  { id: 2, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 3, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 4, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 5, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' },
  { id: 6, cliente: 'Victor', vlTotal: 1.0079, dtEntrega: new Date(), status: 'Montagem', type: 'client' },
  { id: 7, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 8, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 9, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 10, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' },
  { id: 11, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 12, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 13, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 14, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' }
];

@Component({
  selector: 'app-budget-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatTooltipModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe,
    DatePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'cliente', 'vlTotal', 'entrega', 'status', 'actions'];
  dataSource = new MatTableDataSource<Budget>(ELEMENT_DATA);
  activeTab: string = 'Todos';

  selectedIndex: number = 0; 
  statusMap: { [key: string]: string } = {
    'Todos': '',
    'Importados': 'Importado',
    'Montagem': 'Montagem',
    'Saída': 'Saída',
    'Recolher': 'Recolher',
    'Concluídos': 'Concluído'
  };

  totalItems: number = 14;  // Armazena o total de itens
  pageSize: number = 5;  // Número de itens por página
  pageIndex: number = 0;  // Índice da página atual
  readonly dialog = inject(MatDialog);

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
  //  this.http.get<any>(`/api/budgets?page=${this.pageIndex + 1}&size=${this.pageSize}`).subscribe(response => {
  //    this.dataSource.data = response.data;
   //   this.totalItems = response.totalItems;
  // });
  }

  onTabChange(event: any): void {
    const selectedTabLabel = event.tab.textLabel as keyof typeof this.statusMap; // Garantindo que seja uma chave válida
    const status = this.statusMap[selectedTabLabel];
    this.applyStatusFilter(status);
  }

  applyStatusFilter(status: string): void {
    if (status) {
      this.dataSource.filter = status.toLowerCase();
    } else {
      this.dataSource.filter = ''; // "Todos" exibe todos os orçamentos
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Montagem': return 'status-yellow';
      case 'Importado': return 'status-gray';
      case 'Concluído': return 'status-green';
      case 'Saída': return 'status-orange';
      case 'Recolher': return 'status-red';
      default: return '';
    }
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();  
  }

  openDialog(order?: Budget): void {
    const dialogRef = this.dialog.open(DialogOrderInformationComponent, {
      data: order,
      width: '90vw',
      maxWidth: '800px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedOrder = result;
        const indexAtualizado = this.dataSource.data.findIndex(order => order.id === updatedOrder.id);
        
        if (indexAtualizado !== -1) {
          // Substituir o item da tabela pelo atualizado
          this.dataSource.data = [...this.dataSource.data.slice(0, indexAtualizado), updatedOrder, ...this.dataSource.data.slice(indexAtualizado + 1)];
          
          this.dataSource._updateChangeSubscription();
  
          if (updatedOrder.status === 'Montagem') {
            this.selectedIndex = 2;
            this.activeTab = 'Montagem'; 
            this.onTabChange({ tab: { textLabel: this.activeTab } }); 
          }

          console.log('active: ', this.activeTab)
        }
      }
    });
  }

  onDelete(element: Budget): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Tem certeza que deseja excluir o orçamento de ${element.cliente}?` },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.indexOf(element);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1); // Remove o item da lista
          this.dataSource._updateChangeSubscription(); // Atualiza a tabela
          this.totalItems--;  // Atualiza o total de itens
        }
      }
    });
  }
}