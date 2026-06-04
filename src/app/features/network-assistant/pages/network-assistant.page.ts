import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ChatbotService } from '../services/chatbot.service';
import { ExportService } from '../services/export.service';
import { SampleCommandsComponent } from '../components/sample-commands/sample-commands.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { PlaybookViewerComponent } from '../components/playbook-viewer/playbook-viewer.component';
import { ReviewPanelComponent } from '../components/review-panel/review-panel.component';

@Component({
  selector: 'app-network-assistant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CardModule,
    ToastModule,
    ToolbarModule,
    SampleCommandsComponent,
    ChatWindowComponent,
    PlaybookViewerComponent,
    ReviewPanelComponent
  ],
  providers: [MessageService],
  template: `
    <div class="assistant-shell">
      <section class="page-header">
        <div class="header-copy">
          <span class="eyebrow">Network Operations</span>
          <h1>Network Automation Assistant</h1>
          <p>Generate predefined Ansible playbooks for routine network tasks.</p>
        </div>

        <div class="header-actions">
          <button pButton type="button" label="Export Chat" icon="pi pi-download" class="p-button-outlined header-action-button" (click)="exportChat()"></button>
          <button pButton type="button" label="Clear Chat" icon="pi pi-trash" class="p-button-outlined header-action-button" (click)="clearChat()"></button>
        </div>
      </section>

      <section class="page-body">
        <aside class="left-panel">
          <app-sample-commands (commandSelected)="populateCommand($event)"></app-sample-commands>
          <app-review-panel></app-review-panel>
        </aside>

        <main class="main-panel">
          <app-chat-window
            [messages]="chatHistory()"
            (copy)="copyYaml($event)"
            (expand)="openViewer($event)"
            (reviewChange)="setReviewed($event)"
            (download)="downloadPlaybook($event)"
          ></app-chat-window>

          <div class="input-panel">
            <textarea
              pInputTextarea
              rows="4"
              placeholder="Enter a networking request, for example: Create VLAN 100"
              [formControl]="requestControl"
            ></textarea>

            <div class="footer-actions">
              <button pButton type="button" label="Send" icon="pi pi-send" class="p-button-raised" (click)="sendRequest()"></button>
            </div>
          </div>
        </main>
      </section>

      <app-playbook-viewer
        [visible]="dialogVisible()"
        [yaml]="dialogYaml()"
        (visibleChange)="dialogVisible.set($event)"
      ></app-playbook-viewer>

      <p-toast position="top-right"></p-toast>
    </div>
  `,
  styles: [
    `
      .assistant-shell {
        display: grid;
        gap: 1.5rem;
        padding: 2rem;
        min-height: 100vh;
        background: radial-gradient(circle at top left, rgba(79, 140, 255, 0.16), transparent 24%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.14), transparent 20%), var(--bg-primary);
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.6rem 1.8rem;
        background: rgba(18, 28, 50, 0.92);
        border: 1px solid var(--border-color);
        border-radius: 18px;
        box-shadow: var(--shadow-soft);
        backdrop-filter: blur(18px);
      }

      .header-copy {
        max-width: 700px;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 0.75rem;
        color: var(--accent-blue);
        font-size: 0.85rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .page-header h1 {
        margin: 0;
        font-size: clamp(2rem, 2.5vw, 2.8rem);
        color: var(--text-primary);
      }

      .page-header p {
        margin: 1rem 0 0;
        max-width: 640px;
        line-height: 1.75;
      }

      .header-actions {
        display: flex;
        gap: 0.85rem;
        flex-wrap: wrap;
        align-items: center;
      }

      .header-action-button {
        border-color: rgba(255, 255, 255, 0.14) !important;
        color: var(--text-primary) !important;
      }

      .page-body {
        display: grid;
        grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
        gap: 1.5rem;
      }

      .left-panel {
        display: grid;
        gap: 1.25rem;
        position: sticky;
        top: 1.5rem;
        align-self: start;
      }

      .main-panel {
        display: grid;
        gap: 1.5rem;
      }

      .input-panel {
        position: relative;
        width: 100%;
        bottom: 0;
        padding: 1.2rem;
        background: rgba(11, 19, 35, 0.9);
        border: 1px solid var(--border-color);
        border-radius: 18px;
        backdrop-filter: blur(18px);
        box-shadow: var(--shadow-soft);
      }

      textarea[pInputTextarea] {
        width: 100%;
        min-height: 120px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(15, 25, 42, 0.9);
        color: var(--text-primary);
        padding: 1rem 1rem;
        resize: none;
      }

      textarea[pInputTextarea]::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }

      .footer-actions {
        display: flex;
        justify-content: flex-end;
      }

      @media screen and (max-width: 1080px) {
        .page-body {
          grid-template-columns: 1fr;
        }

        .left-panel {
          position: relative;
          top: 0;
        }
      }
    `
  ]
})
export class NetworkAssistantPage {
  private readonly chatbotService = inject(ChatbotService);
  private readonly exportService = inject(ExportService);
  private readonly messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  readonly requestControl = this.fb.control('', Validators.required);
  readonly chatHistory = this.chatbotService.history;
  readonly dialogVisible = signal(false);
  readonly dialogYaml = signal('');

  sendRequest(): void {
    const request = this.requestControl.value?.trim();
    if (!request) {
      this.messageService.add({ severity: 'warn', summary: 'Empty Request', detail: 'Please enter a network request.' });
      return;
    }

    this.chatbotService.sendUserMessage(request);
    this.requestControl.reset();
  }

  populateCommand(command: string): void {
    this.requestControl.setValue(command);
  }

  clearChat(): void {
    this.chatbotService.clearHistory();
  }

  copyYaml(yaml: string): void {
    navigator.clipboard.writeText(yaml).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Copied', detail: 'Playbook YAML copied to clipboard.' });
    });
  }

  openViewer(yaml: string): void {
    this.dialogYaml.set(yaml);
    this.dialogVisible.set(true);
  }

  setReviewed(event: { id: string; reviewed: boolean }): void {
    this.chatbotService.toggleReview(event.id, event.reviewed);
  }

  downloadPlaybook(message: { message: string; id: string }): void {
    this.exportService.downloadFile('playbook.yml', message.message, 'application/x-yaml');
  }

  exportChat(): void {
    const payload = this.chatbotService.exportChatHistoryText();
    this.exportService.downloadFile('chat-history.txt', payload);
  }
}
