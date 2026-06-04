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
      <p-scrollPanel styleClass="history-scroll" [style]="{ height: 'auto' }">
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
        border: 1px solid var(--border-color);
        background: rgba(12, 20, 37, 0.95);
        box-shadow: var(--shadow-soft);
      }

      .message-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      :host ::ng-deep .history-scroll {
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
