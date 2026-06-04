import { PlaybookTemplate } from '../models/playbook-template.model';

export const PLAYBOOK_TEMPLATES: PlaybookTemplate[] = [
  {
    command: 'Create VLAN 100',
    description: 'Create a VLAN 100 on network switches.',
    yaml: `---
- name: Create VLAN
  hosts: switches

  tasks:
    - name: Create VLAN 100
      ios_vlan:
        vlan_id: 100
        name: VLAN100
        state: present
`
  },
  {
    command: 'Configure NTP',
    description: 'Configure NTP servers on network devices.',
    yaml: `---
- name: Configure NTP
  hosts: network_devices

  tasks:
    - name: Configure NTP servers
      ios_ntp:
        config:
          - address: 192.0.2.1
          - address: 192.0.2.2
          - prefer: yes
`
  },
  {
    command: 'Configure SNMP',
    description: 'Configure SNMP community and traps.',
    yaml: `---
- name: Configure SNMP
  hosts: network_devices

  tasks:
    - name: Configure SNMP community
      ios_snmp:
        community: public
        state: present
`
  },
  {
    command: 'Backup Router Configuration',
    description: 'Backup the router running configuration.',
    yaml: `---
- name: Backup Router Configuration
  hosts: routers

  tasks:
    - name: Backup running config
      ios_config:
        backup: yes
        filename: router_backup.cfg
`
  },
  {
    command: 'Configure OSPF',
    description: 'Configure OSPF routing on device interfaces.',
    yaml: `---
- name: Configure OSPF
  hosts: routers

  tasks:
    - name: Configure OSPF process
      ios_ospf:
        process_id: 1
        networks:
          - network: 10.0.0.0/24
            area: 0
`
  },
  {
    command: 'Configure BGP Neighbor',
    description: 'Configure a BGP neighbor relationship.',
    yaml: `---
- name: Configure BGP Neighbor
  hosts: routers

  tasks:
    - name: Configure BGP neighbor
      ios_bgp:
        asn: 65001
        neighbor:
          ip: 192.0.2.10
          remote_as: 65002
`
  }
];
