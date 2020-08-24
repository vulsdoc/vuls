---
id: architecture-fast-scan
title: Fast Scan
sidebar_label: Fast Scan
---

Fast scan mode scans without root privilege, no dependencies almost no load on the scan target server.

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-fast.png)

| Distribution|                             Scan Speed | Need Root Privilege |                 OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:--------------------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |            Supported |                                     Need |
| CentOS      |                                   Fast |　                No |            Supported |                                     Need |
| RHEL        |                                   Fast |　                No |            Supported |                                     Need |
| Oracle      |                                   Fast |　                No |            Supported |                                     Need |
| Ubuntu      |                                   Fast |　                No |            Supported |                                     Need |
| Debian      |                                   Fast |　                No |            Supported |                                     Need |
| Raspbian    |                                   Fast |　                No |  Partially Supported |                                     Need |
| FreeBSD     |                                   Fast |　                No |                   No |                                     Need |
| Amazon      |                                   Fast |　                No |            Supported |                                     Need |
| SUSE Enterprise |                               Fast |　                No |            Supported |                                       No |

## With -offline option

Scan with -offline option, vuls scans with no internet access.

| Distribution|                             Scan Speed | Need Root Privilege |                 OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:--------------------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |            Supported |                                    No |
| CentOS      |                                   Fast |　                No |            Supported |                                      No |
| RHEL        |                                   Fast |　                No |            Supported |                                      No |
| Oracle      |                                   Fast |　                No |            Supported |                                      No |
| Ubuntu      |                                   Fast |　                No |            Supported |                                      No |
| Debian      |                                   Fast |　                No |            Supported |                                      No |
| Raspbian    |                                   Fast |　                No |  Partially Supported |                                      No |
| Amazo       |                                   Fast |　                No |            Supported |                                      No |
| SUSE Enterprise |                               Fast |　                No |            Supported |                                      No |

Offline scan mode is not supported for FreeBSD.

## Dependencies and /etc/sudoers

For details, see

- Dependencies: [usage-configtest](usage-configtest.md#fast-scan-mode)
- /etc/sudoers: [/etc/sudoers](usage-configtest.md#etc-sudoers)
