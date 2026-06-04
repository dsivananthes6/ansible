import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PLAYBOOK_TEMPLATES } from '../../constants/playbook-templates';

@Component({
  selector: 'app-sample-commands',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card header="Sample Commands" class="sample-card">
      <div class="commands-grid">
        <button
          type="button"
          class="command-card"
          *ngFor="let template of templates"
          (click)="selectCommand(template.command)"
        >
          <div class="card-top">
            <span class="command-icon pi pi-network-wired"></span>
            <span class="arrow pi pi-chevron-right"></span>
          </div>
          <div class="card-copy">
            <span class="command-title">{{ template.command }}</span>
            <span class="command-description">{{ template.description }}</span>
          </div>
        </button>
      </div>
    </p-card>
  `,
  styles: [
    `
      .sample-card {
        width: 100%;
        background: rgba(17, 25, 40, 0.9);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-soft);
      }

      .commands-grid {
        display: grid;
        gap: 0.9rem;
      }

      .command-card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem;
        align-items: center;
        width: 100%;
        padding: 1.15rem 1.2rem;
        border-radius: 16px;
        border: 1px solid transparent;
        background: rgba(11, 19, 35, 0.95);
        color: var(--text-primary);
        text-align: left;
        cursor: pointer;
        transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
      }

      .command-card:hover {
        transform: translateY(-2px);
        border-color: rgba(79, 140, 255, 0.32);
        background: rgba(17, 25, 40, 1);
      }

      .card-top {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }

      .command-icon {
        display: inline-flex;
        width: 2.6rem;
        height: 2.6rem;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: linear-gradient(135deg, rgba(79, 140, 255, 0.22), rgba(139, 92, 246, 0.18));
        color: var(--accent-blue);
        font-size: 1.1rem;
      }

      .card-copy {
        display: grid;
        gap: 0.25rem;
      }

      .command-title {
        font-weight: 700;
        font-size: 0.99rem;
        color: var(--text-primary);
      }

      .command-description {
        font-size: 0.9rem;
        color: var(--text-secondary);
      }

      .arrow {
        color: rgba(255, 255, 255, 0.44);
        font-size: 1rem;
      }
    `
  ]
})
export class SampleCommandsComponent {
  @Output() readonly commandSelected = new EventEmitter<string>();

  readonly templates = PLAYBOOK_TEMPLATES;

  selectCommand(command: string): void {
    this.commandSelected.emit(command);
  }
}
