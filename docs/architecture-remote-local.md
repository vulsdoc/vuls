---
id: architecture-remote-local
title: Remote, Local, One-liner scan
sidebar_label: Remote, Local, One-liner scan
---

Vuls has three modes of scan methods: [remote scan mode](architecture-remote-scan.md) and [local scan mode](architecture-local-scan.md) and [One-liner scan mode](usage-server.md).

# Remote scan mode 
Remote scan mode connect to the scan target server via SSH and scan by issuing some commands. 

# Local scan mode 
Local scan mode does not via SSH, but it runs commands directly on the local host for scanning.
 
# One-liner scan mode

Start vuls in server mode beforehand. Execute package manager command such as rpm, deb etc on the scan target server and then send the result to the vuls server with curl. The scan result is returned with json.


