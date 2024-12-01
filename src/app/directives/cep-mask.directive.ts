import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCepMask]' // Nome da diretiva, usado como atributo no input
})
export class CepMaskDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Aplica a máscara ao campo quando o usuário digitar
  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = this.el.nativeElement;
    let value = input.value;

    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Aplica a máscara 00000-000
    if (value.length <= 5) {
      value = value.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    } else {
      value = value.replace(/(\d{5})(\d{3})(\d{0,3})/, '$1-$2');
    }

    // Atualiza o valor do campo com a máscara
    this.renderer.setProperty(input, 'value', value);
  }
}
