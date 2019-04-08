---
id: architecture-remote-local
title: Remote, Local, One-liner scan
sidebar_label: Remote, Local, One-liner scan
---

Vuls has three modes of scan methods: [Remote scan mode](architecture-remote-scan.md) and [Local scan mode](architecture-local-scan.md) and [Server mode](usage-server.md).

## [Remote scan Mode](architecture-remote-scan.md)

Remote scan mode connect to the scan target server via SSH and scan by issuing some commands.

## [Local scan mode](architecture-local-scan.md)

Local scan mode does not via SSH, but it runs commands directly on the local host for scanning.

## [Server mode](https://vuls.io/docs/en/usage-server.html)

- No SSH needed, No Scanner needed. Only issuing Linux commands directory on the scan tareget serve.
- First, start Vuls in server mode and listen as an HTTP server.
- Start Vuls in server mode and listen as an HTTP server.
- Next, issue a command on the scan target server to collect software information. Then send the result to Vuls Server via HTTP. You receive the scan results as JSON format.