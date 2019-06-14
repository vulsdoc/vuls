---
id: architecture-fast-deep
title: architecture
sidebar_label: architecture
---

## [fast-scan](architecture-fast-scan.md)

Fast scan mode scans without root privilege, no dependencies, almost no load on the scan target server.

## [fast-root scan mode](architecture-fast-root-scan.md)

Fast scan mode scans with root privilege, almost no load on the scan target server.

## [Offline scan mode](architecture-fast-scan.md)

`-fast` and `-fast-root` have `-offline` scan mode. Vuls scans with no internet access with `-offline`.
For details, see [-fast -offline](usage-scan.md#fast-scan-without-internet-access) and [-fast-root -offline](usage-scan.md#fast-root-scan-without-internet-access)
