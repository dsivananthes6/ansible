import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playbook-viewer',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog header="Full Playbook" [(visible)]="visible" [modal]="true" [style]="{ width: '700px' }" (onHide)="visibleChange.emit(false)">
      <pre class="yaml-panel">{{ yaml }}</pre>
      <div class="dialog-footer">
        <button pButton type="button" label="Close" (click)="visible = false; visibleChange.emit(false)"></button>
      </div>
    </p-dialog>
  `,
  styles: [
    `
      :host ::ng-deep .p-dialog .p-dialog-content {
        background: rgba(12, 20, 37, 0.97);
        border-radius: 22px;
        padding: 1.4rem;
      }

      .yaml-panel {
        background: linear-gradient(180deg, rgba(7, 15, 32, 0.96), rgba(17, 26, 48, 0.98));
        color: #f8fafc;
        padding: 1.15rem;
        border-radius: 18px;
        max-height: 470px;
        overflow: auto;
        white-space: pre-wrap;
        border: 1px solid rgba(255, 255, 255, 0.07);
      }

      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 1.3rem;
      }
    `
  ]
})
export class PlaybookViewerComponent {
  @Input() visible = false;
  @Input() yaml = '';
  @Output() readonly visibleChange = new EventEmitter<boolean>();
}
