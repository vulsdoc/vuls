---
id: main-features
title: Main Features
sidebar_label: Main Features
---

## Scan for any vulnerabilities in Linux/FreeBSD Server

[Supports major Linux/FreeBSD](supported-os.md)

- Alpine, Ubuntu, Debian, CentOS, Amazon Linux, RHEL, Oracle Linux, SUSE Enterprise Linux and Raspbian, FreeBSD
- Cloud, on-premise, Docker

## High quality scan

Vuls uses Multiple vulnerability databases

- [NVD](https://nvd.nist.gov/)
- [JVN(Japanese)](http://jvndb.jvn.jp/apis/myjvn/)
- OVAL
  - [Red Hat](https://www.redhat.com/security/data/oval/)
  - [Debian](https://www.debian.org/security/oval/)
  - [Ubuntu](https://people.canonical.com/~ubuntu-security/oval/)
  - [SUSE](http://ftp.suse.com/pub/projects/security/oval/)
  - [Oracle Linux](https://linux.oracle.com/security/oval/)
- [Alpine-secdb](https://git.alpinelinux.org/cgit/alpine-secdb/)
- [Red Hat Security Advisories](https://access.redhat.com/security/security-updates/)
- [Debian Security Bug Tracker](https://security-tracker.debian.org/tracker/)
- Commands(yum, zypper, pkg-audit)
  - RHSA/ALAS/ELSA/FreeBSD-SA
- [Exploit Database](https://www.exploit-db.com/)
- [US-CERT](https://www.us-cert.gov/ncas/alerts)
- [JPCERT](http://www.jpcert.or.jp/at/2019.html)
- [WPVulnDB](https://wpvulndb.com/api)
- [Node.js Security Working Group](https://github.com/nodejs/security-wg)
- [Ruby Advisory Database](https://github.com/rubysec/ruby-advisory-db)
- [Safety DB(Python)](https://github.com/pyupio/safety-db)
- [PHP Security Advisories Database](https://github.com/FriendsOfPHP/security-advisories)
- [RustSec Advisory Database](https://github.com/RustSec/advisory-db)
- Changelog

## Fast scan and Deep scan

[Fast Scan](architecture-fast-scan.md)

- Scan without root privilege, no dependencies
- Almost no load on the scan target server
- Offline mode scan with no internet access. (Red Hat, CentOS, OracleLinux, Ubuntu, Debian)

[Fast Root Scan](architecture-fast-root-scan.md)

- Scan with root privilege
- Almost no load on the scan target server
- Detect processes affected by update using yum-ps (Red Hat, CentOS, Oracle Linux and Amazon Linux)
- Detect processes which updated before but not restarting yet using checkrestart of debian-goodies (Debian and Ubuntu)
- Offline mode scan with no internet access. (Red Hat, CentOS, OracleLinux, Ubuntu, Debian)

[Deep Scan](architecture-deep-scan.md)

- same as fast-root scan mode for now.

## [Remote scan mode, Local scan mode, Server mode](architecture-remote-local.md)

[Remote scan Mode](architecture-remote-scan.md)

- User is required to only setup one machine that is connected to other target servers via SSH

[Local scan mode](architecture-local-scan.md)

- If you don't want the central Vuls server to connect to each server by SSH, you can use Vuls in the Local Scan mode.

[Server mode](https://vuls.io/docs/en/usage-server.html)

- No SSH needed, No Scanner needed. Only issuing Linux commands directory on the scan tareget serve.
- First, start Vuls in server mode and listen as an HTTP server.
- Start Vuls in server mode and listen as an HTTP server.
- Next, issue a command on the scan target server to collect software information. Then send the result to Vuls Server via HTTP. You receive the scan results as JSON format.

## **Dynamic** Analysis

- It is possible to acquire the state of the server by connecting via SSH and executing the command
- Vuls warns not-restarting-processes which updated before but not restarting yet and detects processes affecting software update in advance.

## **Static** Container Analysis

- Vuls can scan container images such as Docker Image on ECR, GCR and local.
- TODO Link

## [Scan middleware that are not included in OS package management](usage-scan-non-os-packages.md)

- Scan middleware, programming language libraries and framework for vulnerability
- Support software registered in CPE

## Integration

- [GitHub Security Alerts](usage-scan-non-os-packages.html#usage-integrate-with-github-security-alerts.md)
- [OWASP Dependency Check](usage-scan-non-os-packages.html#usage-integrate-with-owasp-dependency-check-to-automatic-update-when-the-libraries-are-updated-experimental.md)
- [WordPress](usage-scan-wordpress.md)

## MISC

- Nondestructive testing
- Pre-authorization is *NOT* necessary before scanning on AWS
  - Vuls works well with Continuous Integration since tests can be run every day. This allows you to find vulnerabilities very quickly.
- [Auto generation of configuration file template](usage-automatic-discovery.md)
  - Auto detection of servers set using CIDR, generate configuration file template
- Email and Slack notification is possible (supports Japanese language)
- Scan result is viewable on accessory software, [TUI Viewer on terminal](usage-tui.md) or Web UI ([VulsRepo](https://github.com/usiusi360/vulsrepo)).
