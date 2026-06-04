# Network Automation Assistant

## 1. Overview

### Project Name

**Network Automation Assistant**

### Project Type

Hackathon MVP

### Objective

Build a chatbot-style Angular application that helps network engineers quickly generate predefined Ansible playbook templates from natural language requests.

The application does not execute automation and does not connect to any backend services.

The generated playbook must be reviewed by the user before it can be downloaded.

This demonstrates a Human-in-the-Loop approach to network automation.

---

# 2. Problem Statement

Network engineers repeatedly create similar automation playbooks for routine operational tasks such as:

* VLAN creation
* NTP configuration
* SNMP configuration
* OSPF configuration
* BGP configuration
* Configuration backup

Creating these playbooks manually is repetitive and time-consuming.

The goal is to provide a simple assistant that converts common networking requests into reusable Ansible playbook templates.

---

# 3. Goals

The application should:

* Accept networking requests in a chat interface
* Match requests against predefined commands
* Display corresponding Ansible playbooks
* Allow users to review generated playbooks
* Allow users to download playbooks as YAML files
* Demonstrate Human-in-the-Loop validation

---

# 4. Out Of Scope

The following are explicitly out of scope:

* AI integrations
* LLM integrations
* OpenAI APIs
* Copilot APIs
* Rovo APIs
* Backend services
* Database
* Authentication
* Authorization
* Playbook execution
* Real network device connectivity
* Real-time automation

---

# 5. Users

### Primary User

Network Engineers

### Secondary Users

* Network Administrators
* Infrastructure Engineers
* DevOps Engineers

---

# 6. Technology Stack

## Frontend

* Angular 20
* TypeScript
* Angular Signals
* Angular Reactive Forms
* SCSS
* PrimeNG

## Deployment

* Localhost
* Static Web Hosting

---

# 7. Functional Requirements

## FR-001 Chat Interface

Provide a chatbot-style interface.

### User Actions

User enters:

```text
Create VLAN 100
```

or

```text
Configure NTP
```

or

```text
Configure SNMP
```

User clicks Send.

### Expected Result

Message appears in chat history.

---

## FR-002 Command Matching

System shall perform local command matching.

### Rules

* Case insensitive
* Trim spaces
* Exact match sufficient

Example:

```text
create vlan 100
```

matches

```text
Create VLAN 100
```

---

## FR-003 Playbook Generation

System shall return predefined YAML template.

Example:

```yaml
---
- name: Create VLAN
  hosts: switches

  tasks:
    - name: Create VLAN 100
      ios_vlan:
        vlan_id: 100
```

Bot response shall be displayed in chat.

---

## FR-004 Unsupported Commands

If no template exists:

Display:

```text
No predefined playbook found.
```

---

## FR-005 Chat History

System shall maintain conversation history.

Each message shall contain:

* Message text
* Sender
* Timestamp

History remains available until browser refresh.

---

## FR-006 Copy Playbook

Each generated playbook shall provide:

Copy Button

Expected behavior:

* Copies YAML to clipboard
* Displays success toast

---

## FR-007 Expand Playbook

Provide:

Expand View Button

Expected behavior:

* Opens dialog
* Displays full YAML

---

## FR-008 Human Review

Generated playbook shall include:

Checkbox

```text
I have reviewed this playbook
```

---

## FR-009 Download Enablement

Download button remains disabled until:

```text
I have reviewed this playbook
```

is checked.

---

## FR-010 Download Playbook

User clicks Download.

System shall:

* Create Blob
* Download YAML file

Filename:

```text
playbook.yml
```

---

## FR-011 Clear Chat

Provide:

```text
Clear Chat
```

button.

Expected behavior:

* Removes all messages
* Resets session state

---

## FR-012 Sample Commands

Provide quick command chips:

```text
Create VLAN 100
Configure NTP
Configure SNMP
Backup Router Configuration
Configure OSPF
Configure BGP Neighbor
```

Clicking a chip populates input.

---

## FR-013 Export Chat History

Provide:

```text
Export Chat
```

button.

Expected behavior:

Download chat history as:

```text
chat-history.txt
```

---

# 8. Supported Templates

The system shall support the following predefined playbooks.

## Template 1

Create VLAN 100

---

## Template 2

Configure NTP

---

## Template 3

Configure SNMP

---

## Template 4

Backup Router Configuration

---

## Template 5

Configure OSPF

---

## Template 6

Configure BGP Neighbor

---

# 9. User Flow

```text
User Opens Application
          │
          ▼
Enter Network Request
          │
          ▼
Send Message
          │
          ▼
Command Match
          │
          ▼
Generate YAML
          │
          ▼
Display Playbook
          │
          ▼
Review Playbook
          │
          ▼
Check Approval
          │
          ▼
Download YAML
```

---

# 10. UI Requirements

## Layout

### Header

Contains:

* Application Name
* Clear Chat Button

### Left Panel

Sample Commands

### Main Panel

Chat Window

### Footer

Input Area

---

# 11. UI Components

Use PrimeNG:

* Card
* Button
* InputText
* Textarea
* ScrollPanel
* Dialog
* Checkbox
* Toast
* Chip

---

# 12. Data Model

## Chat Message

```typescript
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  type: 'text' | 'yaml';
}
```

---

## Playbook Template

```typescript
export interface PlaybookTemplate {
  command: string;
  description: string;
  yaml: string;
}
```

---

# 13. Non Functional Requirements

## Performance

* Initial load < 3 seconds
* Command matching < 100ms

## Reliability

* No page crashes
* Handle empty input

## Usability

* Responsive UI
* Simple workflow
* Minimal clicks

## Maintainability

* Feature-based architecture
* Reusable components
* Strong typing

---

# 14. Project Structure

```text
src/app/features/network-assistant

├── components
│   ├── chat-window
│   ├── message-item
│   ├── playbook-viewer
│   ├── sample-commands
│   └── review-panel
│
├── services
│   ├── chatbot.service.ts
│   └── export.service.ts
│
├── models
│   ├── chat-message.model.ts
│   └── playbook-template.model.ts
│
├── constants
│   └── playbook-templates.ts
│
├── pages
│   └── network-assistant.page.ts
│
└── network-assistant.routes.ts
```

---

# 15. Success Criteria

The MVP is considered successful when:

* User can enter a networking request.
* Matching playbook is displayed.
* User can review the playbook.
* User can download a YAML file.
* Human approval is required before download.
* No backend services are used.
* Entire solution runs locally in Angular.
