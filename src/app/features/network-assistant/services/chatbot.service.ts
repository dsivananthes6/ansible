import { Injectable, computed, signal } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { PLAYBOOK_TEMPLATES } from '../constants/playbook-templates';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly historySignal = signal<ChatMessage[]>([]);
  readonly history = this.historySignal.asReadonly();
  readonly hasMessages = computed(() => this.historySignal().length > 0);

  sendUserMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    this.appendMessage(this.createUserMessage(trimmed));
    this.appendMessage(this.createBotMessage(trimmed));
  }

  clearHistory(): void {
    this.historySignal.set([]);
  }

  toggleReview(messageId: string, reviewed: boolean): void {
    this.historySignal.update((history) =>
      history.map((message) =>
        message.id === messageId ? { ...message, reviewed } : message
      )
    );
  }

  exportChatHistoryText(): string {
    return this.historySignal()
      .map((message) => {
        const header = `[${message.timestamp.toLocaleString()}] ${message.sender.toUpperCase()}`;
        if (message.type === 'yaml') {
          return `${header}\n${message.message}\n`;
        }
        return `${header} ${message.message}`;
      })
      .join('\n');
  }

  private normalizeCommand(value: string): string {
    return value.trim().toLowerCase();
  }

  private findTemplate(command: string) {
    const normalizedCommand = this.normalizeCommand(command);
    return PLAYBOOK_TEMPLATES.find(
      (template) => this.normalizeCommand(template.command) === normalizedCommand
    );
  }

  private createBotMessage(userText: string): ChatMessage {
    const matchedTemplate = this.findTemplate(userText);
    const messageContent = matchedTemplate
      ? matchedTemplate.yaml
      : 'No predefined playbook found.';

    return {
      id: this.generateId(),
      sender: 'bot',
      type: matchedTemplate ? 'yaml' : 'text',
      message: messageContent,
      timestamp: new Date(),
      reviewed: false
    };
  }

  private createUserMessage(text: string): ChatMessage {
    return {
      id: this.generateId(),
      sender: 'user',
      type: 'text',
      message: text,
      timestamp: new Date()
    };
  }

  private appendMessage(message: ChatMessage): void {
    this.historySignal.update((history) => [...history, message]);
  }

  private generateId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 12);
  }
}
