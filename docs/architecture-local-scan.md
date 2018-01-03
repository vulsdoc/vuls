---
id: architecture-local-scan
title: Local Scan Mode(Scan without SSH)
sidebar_label: - Local Scan Mode
---

If you don't want the central Vuls server to connect to each server by SSH, you can use Vuls in the Local Scan mode. Deploy Vuls to the scan target server. Vuls issues a command to the local host (not via SSH). Aggregate the JSON of the scan result into another server. Since it is necessary to access the CVE database in order to refine the scan result, start go-cve-dictionary in server mode beforehand.
On the aggregation server, you can refer to the scanning result of each scan target server using WebUI or TUI.

![Vuls-Architecture Local Scan Mode](/vuls/img/docs/vuls-architecture-localscan.png)

[Tutorial: local scan mode](tutorial-local-scan.md)

