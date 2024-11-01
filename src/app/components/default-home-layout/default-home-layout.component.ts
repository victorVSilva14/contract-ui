import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BudgetTableComponent } from '../budget-table/budget-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-default-home-layout',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    BudgetTableComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BudgetTableComponent
  ],
  templateUrl: './default-home-layout.component.html',
  styleUrl: './default-home-layout.component.scss'
})
export class DefaultHomeLayoutComponent {
  @Input() title: string = "";
  isMobile: boolean = false;

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
}

checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; 
}
}
