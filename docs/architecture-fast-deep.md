---
id: architecture-fast-deep
title: Fast and Deep scan
sidebar_label: Fast and Deep scan
---

## [fast-scan](architecture-fast-scan.md)

Fast scan mode scans without root privilege, no dependencies, almost no load on the scan target server.

## [fast-root scan mode](architecture-fast-root-scan.md)

Fast scan mode scans with root privilege, almost no load on the scan target server.

## [Deep scan mode](architecture-fast-scan.md)

Deep scan mode scans with root privilege. Certain commands can lead to high load such as fetch chagnelogs of many updatable packages.

## [Offline scan mode](architecture-fast-scan.md)

`-fast` and `-fast-root` have `-offline` scan mode. Vuls scans with no internet access with `-offline`.
For details, see [-fast -offline](usage-scan.md#fast-scan-without-internet-access) and [-fast-root -offline](usage-scan.md#fast-root-scan-without-internet-access)

