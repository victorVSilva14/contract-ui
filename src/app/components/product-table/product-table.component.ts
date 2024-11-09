import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ItemsBudget } from '../../models/items-budget.resource';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

const ELEMENT_DATA: ItemsBudget[] = [
  {
    Orcamento: {
      id: 1,
      cliente: 'Victor',
      vlTotal: 1000.50,
      dtEntrega: new Date('2024-12-15T14:30:00'),
      status: 'Montagem',
      type: 'client'
    },
    produto: {
      codigo: 101,
      descricao: 'Produto A',
      tipoProd: 'Eletrônico',
      peso: 1.5
    },
    quantidade: 3,
    pVenda: 350.75
  },
  {
    Orcamento: {
      id: 2,
      cliente: 'Adryan',
      vlTotal: 1500.20,
      dtEntrega: new Date('2024-12-20T10:00:00'),
      status: 'Importado',
      type: 'client'
    },
    produto: {
      codigo: 102,
      descricao: 'Produto B',
      tipoProd: 'Móveis',
      peso: 8.0
    },
    quantidade: 2,
    pVenda: 550.60
  },
  {
    Orcamento: {
      id: 3,
      cliente: 'Matheus',
      vlTotal: 2000.00,
      dtEntrega: new Date('2024-12-18T16:00:00'),
      status: 'Concluído',
      type: 'other'
    },
    produto: {
      codigo: 103,
      descricao: 'Produto C',
      tipoProd: 'Ferramentas',
      peso: 5.0
    },
    quantidade: 5,
    pVenda: 400.00
  },
  {
    Orcamento: {
      id: 4,
      cliente: 'João',
      vlTotal: 750.90,
      dtEntrega: new Date('2024-12-22T09:00:00'),
      status: 'Recolher',
      type: 'client'
    },
    produto: {
      codigo: 104,
      descricao: 'Produto D',
      tipoProd: 'Roupas',
      peso: 0.7
    },
    quantidade: 10,
    pVenda: 75.09
  },
  {
    Orcamento: {
      id: 5,
      cliente: 'Lucas',
      vlTotal: 1200.45,
      dtEntrega: new Date('2024-12-23T11:30:00'),
      status: 'Saída',
      type: 'other'
    },
    produto: {
      codigo: 105,
      descricao: 'Produto E',
      tipoProd: 'Alimentos',
      peso: 2.0
    },
    quantidade: 8,
    pVenda: 150.05
  }
];

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
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
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['codigoProduto', 'descricao', 'tipoProd', 'peso', 'quantidade', 'pVenda', 'actions'];
  dataSource = new MatTableDataSource<ItemsBudget>(ELEMENT_DATA);
  activeTab: string = 'Todos';

  totalItems: number = ELEMENT_DATA.length; 
  pageSize: number = 2;  // Número de itens por página
  pageIndex: number = 0;  // Índice da página atual

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();  
  }

  onDelete(item: ItemsBudget) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir este item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        const index = this.dataSource.data.indexOf(item);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.totalItems = this.dataSource.data.length;
          this.dataSource = new MatTableDataSource(this.dataSource.data); 
          this.dataSource.paginator = this.paginator; 
        }
      }
    });
  }

  private loadData() { }
}
