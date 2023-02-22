---
id: architecture-fast-scan
title: Fast Scan
sidebar_label: Fast Scan
---

Fast scan mode scans without root privilege, no dependencies almost no load on the scan target server.

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-fast.png)

| Distribution|                             Scan Speed | Need Root Privilege |                 OVAL | Need Internet Access|
|:----------------|:----------------------------------:|:-------------------:|:--------------------:|:----------------------------------------:|
| Alpine          |                               Fast |　                No |            Supported |                                     Need |
| CentOS          |                               Fast |　                No |            Supported |                                     Need |
| AlmaLinux       |                               Fast |　                No |            Supported |                                     Need |
| Rocky Linux     |                               Fast |　                No |            Supported |                                     Need |
| RHEL            |                               Fast |　                No |            Supported |                                     Need |
| Fedora          |                               Fast |　                No |            Supported |                                     Need |
| Oracle          |                               Fast |　                No |            Supported |                                     Need |
| Ubuntu          |                               Fast |　                No |            Supported |                                     Need |
| Debian          |                               Fast |　                No |            Supported |                                     Need |
| Raspbian        |                               Fast |　                No |  Partially Supported |                                     Need |
| FreeBSD         |                               Fast |　                No |                   No |                                     Need |
| Amazon          |                               Fast |　                No |            Supported |                                     Need |
| openSUSE        |                               Fast |　                No |            Supported |                                       No |
| openSUSE Leap   |                               Fast |　                No |            Supported |                                       No |
| SUSE Enterprise |                               Fast |　                No |            Supported |                                       No |
| Windows         |                               Fast |　         Partially |            Supported |                                Partially |

## With -offline option

Scan with -offline option, vuls scans with no internet access.

| Distribution|                             Scan Speed | Need Root Privilege |                 OVAL | Need Internet Access|
|:----------------|:----------------------------------:|:-------------------:|:--------------------:|:---------------------------------------:|
| Alpine          |                               Fast |　                No |            Supported |                                      No |
| CentOS          |                               Fast |　                No |            Supported |                                      No |
| AlmaLinux       |                               Fast |　                No |            Supported |                                      No |
| Rocky Linux     |                               Fast |　                No |            Supported |                                      No |
| RHEL            |                               Fast |　                No |            Supported |                                      No |
| Fedora          |                               Fast |　                No |            Supported |                                      No |
| Oracle          |                               Fast |　                No |            Supported |                                      No |
| Ubuntu          |                               Fast |　                No |            Supported |                                      No |
| Debian          |                               Fast |　                No |            Supported |                                      No |
| Raspbian        |                               Fast |　                No |  Partially Supported |                                      No |
| Amazon          |                               Fast |　                No |            Supported |                                      No |
| openSUSE        |                               Fast |　                No |            Supported |                                      No |
| openSUSE Leap   |                               Fast |　                No |            Supported |                                      No |
| SUSE Enterprise |                               Fast |　                No |            Supported |                                      No |
| Windows         |                               Fast |　         Partially |            Supported |                                      No |

The offline scan mode is not supported for FreeBSD.

## Dependencies and /etc/sudoers

For details, see

- Dependencies: [usage-configtest](usage-configtest.md#fast-scan-mode)
- /etc/sudoers: [/etc/sudoers](usage-configtest.md#etc-sudoers)
