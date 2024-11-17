import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Budget } from '../../models/budget.resource';
import { DialogOrderInformationComponent } from '../dialogs/dialog-order-information/dialog-order-information.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { BudgetService } from '../../services/budget.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

const ELEMENT_DATA: Budget[] = [
  { 
    id: 1, 
    cliente: { id: 1, name: 'Victor' },
    dtEntrega: new Date('2024-11-01'), 
    dtOrcamento: new Date('2024-10-20'), 
    dtRetorno: new Date('2024-11-05'), 
    dtSaida: new Date('2024-11-10'), 
    status: 'Montagem', 
    vlTotal: 1007.9 
  },
  { 
    id: 2, 
    cliente: { id: 2, name: 'Adryan' },
    dtEntrega: new Date('2024-11-02'), 
    dtOrcamento: new Date('2024-10-22'), 
    dtRetorno: new Date('2024-11-06'), 
    dtSaida: new Date('2024-11-11'), 
    status: 'Importado', 
    vlTotal: 4002.6 
  },
  { 
    id: 3, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-03'), 
    dtOrcamento: new Date('2024-10-23'), 
    dtRetorno: new Date('2024-11-07'), 
    dtSaida: new Date('2024-11-12'), 
    status: 'Concluído', 
    vlTotal: 6941 
  },
  { 
    id: 4, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-04'), 
    dtOrcamento: new Date('2024-10-24'), 
    dtRetorno: new Date('2024-11-08'), 
    dtSaida: new Date('2024-11-13'), 
    status: 'Saída', 
    vlTotal: 6951 
  },
  { 
    id: 5, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-05'), 
    dtOrcamento: new Date('2024-10-25'), 
    dtRetorno: new Date('2024-11-09'), 
    dtSaida: new Date('2024-11-14'), 
    status: 'Recolher', 
    vlTotal: 6991 
  },
  { 
    id: 6, 
    cliente: { id: 1, name: 'Victor' },
    dtEntrega: new Date('2024-11-06'), 
    dtOrcamento: new Date('2024-10-26'), 
    dtRetorno: new Date('2024-11-10'), 
    dtSaida: new Date('2024-11-15'), 
    status: 'Montagem', 
    vlTotal: 1007.9 
  },
  { 
    id: 7, 
    cliente: { id: 2, name: 'Adryan' },
    dtEntrega: new Date('2024-11-07'), 
    dtOrcamento: new Date('2024-10-27'), 
    dtRetorno: new Date('2024-11-11'), 
    dtSaida: new Date('2024-11-16'), 
    status: 'Importado', 
    vlTotal: 4002.6 
  },
  { 
    id: 8, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-08'), 
    dtOrcamento: new Date('2024-10-28'), 
    dtRetorno: new Date('2024-11-12'), 
    dtSaida: new Date('2024-11-17'), 
    status: 'Concluído', 
    vlTotal: 6941 
  },
  { 
    id: 9, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-09'), 
    dtOrcamento: new Date('2024-10-29'), 
    dtRetorno: new Date('2024-11-13'), 
    dtSaida: new Date('2024-11-18'), 
    status: 'Saída', 
    vlTotal: 6951 
  },
  { 
    id: 10, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-10'), 
    dtOrcamento: new Date('2024-10-30'), 
    dtRetorno: new Date('2024-11-14'), 
    dtSaida: new Date('2024-11-19'), 
    status: 'Recolher', 
    vlTotal: 6991 
  },
  { 
    id: 11, 
    cliente: { id: 2, name: 'Adryan' },
    dtEntrega: new Date('2024-11-11'), 
    dtOrcamento: new Date('2024-10-31'), 
    dtRetorno: new Date('2024-11-15'), 
    dtSaida: new Date('2024-11-20'), 
    status: 'Importado', 
    vlTotal: 4002.6 
  },
  { 
    id: 12, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-12'), 
    dtOrcamento: new Date('2024-11-01'), 
    dtRetorno: new Date('2024-11-16'), 
    dtSaida: new Date('2024-11-21'), 
    status: 'Concluído', 
    vlTotal: 6941 
  },
  { 
    id: 13, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-13'), 
    dtOrcamento: new Date('2024-11-02'), 
    dtRetorno: new Date('2024-11-17'), 
    dtSaida: new Date('2024-11-22'), 
    status: 'Saída', 
    vlTotal: 6951 
  },
  { 
    id: 14, 
    cliente: { id: 3, name: 'Matheus' },
    dtEntrega: new Date('2024-11-14'), 
    dtOrcamento: new Date('2024-11-03'), 
    dtRetorno: new Date('2024-11-18'), 
    dtSaida: new Date('2024-11-23'), 
    status: 'Recolher', 
    vlTotal: 6991 
  }
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
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatTooltipModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe,
    DatePipe,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filter = {
    id: '',
    cliente: '',
    dataInicio: '',
    dataFim: ''
  };

  displayedColumns: string[] = ['id', 'cliente', 'vlTotal', 'entrega', 'status', 'actions'];
  dataSource = new MatTableDataSource<Budget>(ELEMENT_DATA);
  activeTab: string = 'Todos';

  selectedIndex: number = 0; 
  statusMap: { [key: string]: string } = {
    'Todos': '',
    'Importado': 'Importado',
    'Montagem': 'Montagem',
    'Saída': 'Saída',
    'Recolher': 'Recolher',
    'Concluído': 'Concluído'
  };

  indexToTabMap: { [key: string]: number } = {
    'Todos': 0,
    'Importado': 1,
    'Montagem': 2,
    'Saída': 3,
    'Recolher': 4,
    'Concluído': 5,
  };

  totalItems: number = 14;  // Armazena o total de itens
  pageSize: number = 5;  // Número de itens por página
  pageIndex: number = 0;  // Índice da página atual

  budgets: any[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private budgetService: BudgetService) {}
  
  ngOnInit(): void {
    this.loadBudgets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  search() {
    const filteredData = ELEMENT_DATA.filter(budget => {
      const matchesId = this.filter.id ? budget.id === Number(this.filter.id) : true;
      const matchesCliente = this.filter.cliente ? budget.cliente.name.toLowerCase().includes(this.filter.cliente.toLowerCase()) : true;
      const matchesDataInicio = this.filter.dataInicio ? new Date(budget.dtSaida).toLocaleDateString() >= new Date(this.filter.dataInicio).toLocaleDateString() : true;
      const matchesDataFim = this.filter.dataFim ? new Date(budget.dtSaida).toLocaleDateString() <= new Date(this.filter.dataFim).toLocaleDateString() : true;
      
      return matchesId && matchesCliente && matchesDataInicio && matchesDataFim;
    });

    this.dataSource.data = filteredData;
  }

  loadData(): void {
  //  this.http.get<any>(`/api/budgets?page=${this.pageIndex + 1}&size=${this.pageSize}`).subscribe(response => {
  //    this.dataSource.data = response.data;
   //   this.totalItems = response.totalItems;
  // });
  }

  loadBudgets(): void {
    this.budgetService.getPaginatedBudgets(this.pageIndex, this.pageSize).subscribe(
      (response) => {
        console.log('response: ', response.content)
        this.budgets = response.content; 
        console.log(this.budgets);
      },
      (error) => {
        console.error('Erro ao carregar orçamentos:', error);
      }
    );
  }

  onTabChange(event: any): void {
    let selectedIndex: number;
    
    if (typeof event === 'object' && event.tab.textLabel) {
      selectedIndex = this.indexToTabMap[event.tab.textLabel] || 0;
    } else {
      selectedIndex = event.index;
    }

    const selectedTabLabel = event.tab.textLabel;
    const status = this.statusMap[selectedTabLabel];
    this.activeTab = selectedTabLabel;
    this.applyStatusFilter(status);
    this.selectedIndex = selectedIndex;
    console.log('index: ', this.selectedIndex)
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
          // Substitui o item da tabela pelo atualizado
          this.dataSource.data = [...this.dataSource.data.slice(0, indexAtualizado), updatedOrder, ...this.dataSource.data.slice(indexAtualizado + 1)];
          
          this.dataSource._updateChangeSubscription();
  
          // Verifica se houve mudança de status e atualiza a aba
          this.updateTabBasedOnStatus(updatedOrder.status);
        }
      }
    });
  }

  updateTabBasedOnStatus(status: string): void {
    const statusToTabMap: { [key: string]: string } = {
      'Importado': 'Importado',
      'Montagem': 'Montagem',
      'Saída': 'Saída',
      'Recolher': 'Recolher',
      'Concluído': 'Concluído',
    };

    const newTab = statusToTabMap[status] || 'Todos';
  
    if (this.activeTab !== newTab || (newTab === this.activeTab && this.activeTab === 'Concluído')) {
      this.activeTab = newTab;
      this.onTabChange({ tab: { textLabel: this.activeTab } });
    }
  }

  onDelete(element: Budget): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Tem certeza que deseja excluir o orçamento de ${element.cliente.name}?` },
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