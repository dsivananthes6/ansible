import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, CheckboxModule],
  template: `
    <p-card class="message-card" [ngClass]="{ user: message.sender === 'user', bot: message.sender === 'bot' }">
      <div class="message-top">
        <div class="avatar">{{ message.sender === 'user' ? 'U' : 'A' }}</div>
        <div class="header-copy">
          <div class="sender">{{ message.sender | titlecase }}</div>
          <div class="timestamp">{{ message.timestamp | date: 'shortTime' }}</div>
        </div>
      </div>

      <ng-container [ngSwitch]="message.type">
        <div *ngSwitchCase="'yaml'">
          <div class="yaml-title-bar">
            <span class="yaml-badge">YAML</span>
            <span class="yaml-label">Generated Playbook</span>
          </div>

          <pre class="yaml-block">{{ message.message }}</pre>

          <div class="action-row">
            <div class="left-actions">
              <button pButton type="button" label="Copy" icon="pi pi-copy" class="p-button-sm copy-button" (click)="copy.emit(message.message)"></button>
              <button pButton type="button" label="Expand" icon="pi pi-external-link" class="p-button-sm expand-button" (click)="expand.emit(message.message)"></button>
            </div>

            <label class="review-toggle">
              <p-checkbox
                [binary]="true"
                [value]="message.reviewed"
                (onChange)="onReviewChange($event.checked)"
              ></p-checkbox>
              <span>I have reviewed this playbook</span>
            </label>

            <button
              pButton
              type="button"
              label="Download"
              icon="pi pi-download"
              class="p-button-sm download-button"
              [disabled]="!message.reviewed"
              (click)="download.emit(message)"
            ></button>
          </div>
        </div>

        <div *ngSwitchDefault>
          <div class="text-bubble">{{ message.message }}</div>
        </div>
      </ng-container>
    </p-card>
  `,
  styles: [
    `
      .message-card {
        margin-bottom: 1rem;
        padding: 1.2rem;
        border-radius: 18px;
        border: 1px solid var(--border-color);
        background: rgba(17, 25, 40, 0.92);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      }

      .message-top {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .avatar {
        min-width: 3rem;
        min-height: 3rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(79, 140, 255, 0.24), rgba(139, 92, 246, 0.18));
        color: var(--text-primary);
        font-weight: 700;
        font-size: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .header-copy {
        display: grid;
        gap: 0.15rem;
      }

      .sender {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--text-primary);
      }

      .timestamp {
        font-size: 0.82rem;
        color: var(--text-secondary);
      }

      .text-bubble {
        background: rgba(79, 140, 255, 0.12);
        border: 1px solid rgba(79, 140, 255, 0.18);
        padding: 1rem;
        border-radius: 16px;
        color: var(--text-primary);
        line-height: 1.65;
      }

      .yaml-title-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.9rem;
      }

      .yaml-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.45rem 0.75rem;
        border-radius: 999px;
        background: rgba(79, 140, 255, 0.16);
        color: var(--accent-blue);
        font-size: 0.78rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .yaml-label {
        color: var(--text-primary);
        font-weight: 600;
      }

      .yaml-block {
        background: linear-gradient(180deg, rgba(6, 12, 27, 0.96), rgba(13, 24, 47, 0.98));
        color: #e5e7eb;
        padding: 1.1rem;
        border-radius: 16px;
        overflow: auto;
        margin: 0;
        border: 1px solid rgba(255, 255, 255, 0.06);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
        line-height: 1.7;
        max-height: 400px;
      }

      .action-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
      }

      .left-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .review-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        color: var(--text-secondary);
        font-size: 0.95rem;
      }

      .review-toggle .pi {
        color: var(--accent-purple);
      }

      .copy-button,
      .expand-button,
      .download-button {
        min-width: 100px;
      }

      .download-button.p-button-disabled {
        opacity: 0.55;
      }
    `
  ]
})
export class MessageItemComponent {
  @Input() message!: ChatMessage;
  @Output() readonly copy = new EventEmitter<string>();
  @Output() readonly expand = new EventEmitter<string>();
  @Output() readonly reviewChange = new EventEmitter<{ id: string; reviewed: boolean }>();
  @Output() readonly download = new EventEmitter<ChatMessage>();

  onReviewChange(checked: boolean): void {
    this.reviewChange.emit({ id: this.message.id, reviewed: checked });
  }
}
