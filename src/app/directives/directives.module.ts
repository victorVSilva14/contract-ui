import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CepMaskDirective } from './cep-mask.directive'; 

@NgModule({
  declarations: [CepMaskDirective],
  imports: [CommonModule],
  exports: [CepMaskDirective] 
})
export class DirectivesModule {}
