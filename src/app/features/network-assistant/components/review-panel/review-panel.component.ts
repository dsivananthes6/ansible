import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-review-panel',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <p-card header="Review Guidance" class="review-card">
      <div class="guidance-list">
        <div class="guidance-item"><span class="pi pi-check-circle"></span> Verify generated playbook</div>
        <div class="guidance-item"><span class="pi pi-check-circle"></span> Inspect YAML syntax</div>
        <div class="guidance-item"><span class="pi pi-check-circle"></span> Review network configuration details</div>
        <div class="guidance-item"><span class="pi pi-check-circle"></span> Use expand to view full playbook</div>
      </div>
    </p-card>
  `,
  styles: [
    `
      .review-card {
        width: 100%;
        background: rgba(17, 25, 40, 0.9);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-soft);
      }

      .guidance-list {
        display: grid;
        gap: 0.9rem;
      }

      .guidance-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        color: var(--text-secondary);
        padding: 0.35rem 0;
      }

      .guidance-item .pi {
        color: var(--accent-blue);
        font-size: 1.05rem;
      }
    `
  ]
})
export class ReviewPanelComponent {}
