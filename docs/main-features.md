---
id: main-features
title: Main Features
sidebar_label: Main Features
---

- Scan for any vulnerabilities in Linux/FreeBSD Server
    - Supports Alpine, Ubuntu, Debian, CentOS, Amazon Linux, RHEL, Oracle Linux, SUSE Enterprise Linux and Raspbian, FreeBSD
    - Cloud, on-premise, Docker
- High quality scan
    - Vuls uses Multiple vulnerability databases
        - OVAL
        - RHSA/ALAS/ELSA/FreeBSD-SA
        - Changelog
- Fast scan and Deep scan
    - Fast Scan
        - Scan without root privilege, no dependencies
        - Almost no load on the scan target server
        - Offline mode scan with no internet access. (RedHat, CentOS, OracleLinux, Ubuntu, Debian)
    - Fast Root Scan
        - Scan with root privilege
        - Almost no load on the scan target server
        - Detect processes affected by update using yum-ps (RedHat, CentOS, Oracle Linux and Amazon Linux)
        - Detect processes which updated before but not restarting yet using checkrestart of debian-goodies (Debian and Ubuntu)
        - Offline mode scan with no internet access. (RedHat, CentOS, OracleLinux, Ubuntu, Debian)
    - Deep Scan
        - Scan with root privilege
        - Parses the Changelog  
            Changelog has a history of version changes. When a security issue is fixed, the relevant CVE ID is listed.
            By parsing the changelog and analysing the updates between the installed version of software on the server and the newest version of that software
            it's possible to create a list of all vulnerabilities that need to be fixed.
        - Sometimes load on the scan target server
- Remote scan and Local scan
    - Remote Scan
        - User is required to only setup one machine that is connected to other target servers via SSH
    - Local Scan 
        - If you don't want the central Vuls server to connect to each server by SSH, you can use Vuls in the Local Scan mode.
- **Dynamic** Analysis
    - It is possible to acquire the state of the server by connecting via SSH and executing the command
    - Vuls warns not-restarting-processes which updated before but not restarting yet and detects processes affecting software update in advance.
- Scan middleware that are not included in OS package management
    - Scan middleware, programming language libraries and framework for vulnerability
    - Support software registered in CPE
- Nondestructive testing
- Pre-authorization is *NOT* necessary before scanning on AWS
    - Vuls works well with Continuous Integration since tests can be run every day. This allows you to find vulnerabilities very quickly.
- Auto generation of configuration file template
    - Auto detection of servers set using CIDR, generate configuration file template
- Email and Slack notification is possible (supports Japanese language)
- Scan result is viewable on accessory software, TUI Viewer on terminal or Web UI ([VulsRepo](https://github.com/usiusi360/vulsrepo)).
