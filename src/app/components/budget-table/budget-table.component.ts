import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

const ELEMENT_DATA: Budget[] = [
  { id: 1, cliente: 'Victor', vlTotal: 1.0079, dtEntrega: new Date(), status: 'Montagem', type: 'client' },
  { id: 2, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 3, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 4, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 5, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' },
  { id: 1, cliente: 'Victor', vlTotal: 1.0079, dtEntrega: new Date(), status: 'Montagem', type: 'client' },
  { id: 2, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 3, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 4, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 5, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' },
  { id: 2, cliente: 'Adryan', vlTotal: 4.0026, dtEntrega: new Date(), status: 'Importado', type: 'client' },
  { id: 3, cliente: 'Matheus', vlTotal: 6.941, dtEntrega: new Date(), status: 'Concluído', type: 'other' },
  { id: 4, cliente: 'Matheus', vlTotal: 6.951, dtEntrega: new Date(), status: 'Saída', type: 'other' },
  { id: 5, cliente: 'Matheus', vlTotal: 6.991, dtEntrega: new Date(), status: 'Recolher', type: 'other' }
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

  budgetList = ELEMENT_DATA;
  activeTab = 'Todos';
  searchTerm: string = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog) {
    this.filterData();  
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;  
  }

  filterData() {
    this.dataSource.data = this.budgetList.filter(element => {
      const matchesType = this.activeTab === 'Todos' || element.type === this.activeTab;
      const matchesSearchTerm = element.cliente.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesType && matchesSearchTerm;
    });
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    this.filterData();
  }

  applyFilter(value: string) {
    this.searchTerm = value;
    this.filterData();
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Concluído': 
        return 'status-green';
      case 'Importado': 
        return 'status-gray';
      case 'Montagem': 
        return 'status-yellow';
      case 'Saída': 
        return 'status-orange';
      case 'Recolher': 
        return 'status-red';
      default:
        return '';
    }
  }

  openDialog(order?: Budget): void {
    const dialogRef = this.dialog.open(DialogOrderInformationComponent, {
      data: order,
      width: '80vw',
      maxWidth: '600px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}