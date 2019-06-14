---
id: architecture-fast-root-scan
title: Fast-Root Scan
sidebar_label: Fast-Root Scan
---

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-fast-root.png)

| Distribution|                             Scan Speed | Need Root Privilege |       OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:----------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |  Supported |                                    Need |
| CentOS      |                                   Fast |　              Need |  Supported |                                    Need |
| RHEL        |                                   Fast |　              Need |  Supported |                                    Need |
| Oracle      |                                   Fast |　              Need |  Supported |                                    Need |
| Ubuntu      |                                   Fast |　              Need |  Supported |                                    Need |
| Debian      |                                   Fast |　              Need |  Supported |                                    Need |
| Raspbian    |    1st time: Slow, From 2nd time: Fast |                Need |         No |                                    Need |
| FreeBSD     |                                   Fast |　                No |         No |                                    Need |
| Amazon      |                                   Fast |　              Need |  Supported |                                    Need |
| SUSE Enterprise |                               Fast |　                No |  Supported |                                    Need |

## With -offline option

Scan with -offline option, vuls scans with no internet access.

| Distribution|                             Scan Speed | Need Root Privilege |       OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:----------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |  Supported |                                    No |
| CentOS      |                                   Fast |　              Need |  Supported |                                    No |
| RHEL        |                                   Fast |　              Need |  Supported |                                    No |
| Oracle      |                                   Fast |　              Need |  Supported |                                    No |
| Ubuntu      |                                   Fast |　              Need |  Supported |                                    No |
| Debian      |                                   Fast |　              Need |  Supported |                                    No |
| Amazon      |                                   Fast |　              Need |  Supported |                                    No |
| SUSE Enterprise |                               Fast |　                No |  Supported |                                    No |

Offline scan mode is not supported FreeBSD, Raspbian.

## Dependencies and /etc/sudoers

For details, see

- Dependencies: [usage-configtest](usage-configtest.md#fast-root-scan-mode)
- /etc/sudoers: [/etc/sudoers](usage-configtest.md#etc-sudoers)

## Runtime Inspection

### Detect processes affected by next package update

It is possible to know processes affecting software update in advance using yum-ps on RedHat, CentOS, OracleLinux and Amazon Linux

### Detect not-restarted-processes

Detect processes which updated before but not restarting yet using checkrestart of debian-goodies on Debian and Ubuntu
