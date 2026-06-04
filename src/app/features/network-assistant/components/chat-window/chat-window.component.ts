import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { MessageItemComponent } from '../message-item/message-item.component';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, CardModule, ScrollPanelModule, MessageItemComponent],
  template: `
    <p-card header="Chat History" class="chat-card">
      <p-scrollPanel styleClass="history-scroll" style="height: 100%;">
        <div class="message-stack">
          <ng-container *ngFor="let message of messages">
            <app-message-item
              [message]="message"
              (copy)="copy.emit($event)"
              (expand)="expand.emit($event)"
              (reviewChange)="reviewChange.emit($event)"
              (download)="download.emit($event)"
            ></app-message-item>
          </ng-container>
        </div>
      </p-scrollPanel>
    </p-card>
  `,
  styles: [
    `
      .chat-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        min-height: 0;
        border: 1px solid var(--border-color);
        background: rgba(12, 20, 37, 0.95);
        box-shadow: var(--shadow-soft);
      }

      :host ::ng-deep .p-card-content {
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      .message-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 0;
      }

      .chat-card ::ng-deep .p-scrollpanel-wrapper,
      .chat-card ::ng-deep .p-scrollpanel-content {
        min-height: 0;
      }

      :host ::ng-deep .history-scroll {
        height: 100%;
        background: transparent;
        padding-right: 0.75rem;
      }
    `
  ]
})
export class ChatWindowComponent {
  @Input() messages: ChatMessage[] = [];
  @Output() readonly copy = new EventEmitter<string>();
  @Output() readonly expand = new EventEmitter<string>();
  @Output() readonly reviewChange = new EventEmitter<{ id: string; reviewed: boolean }>();
  @Output() readonly download = new EventEmitter<ChatMessage>();
}
