import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-footer',
  template: `
    <button
      class="link"
      [ngClass]="className"
      [attr.aria-label]="label"
      tabindex="0"
      [attr.data-id]="item.id"
      (click)="handleClick()"
    >
      <i [ngClass]="iconClasses"></i> <span>{{ label }}</span>
    </button>
  `
})
export class ButtonFooterComponent<T extends { id?: number | string }> {
  @Input() label = '';
  @Input() className = '';
  @Input() iconClasses = '';
  @Input() item!: T;
  @Input() dataId = '';

  @Output() clicked = new EventEmitter<T>();

  handleClick() {
    this.clicked.emit(this.item);
  }
}
