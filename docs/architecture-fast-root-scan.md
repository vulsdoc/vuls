---
id: architecture-fast-root-scan
title: Fast-Root Scan
sidebar_label: Fast-Root Scan
---

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-fast-root.png)

| Distribution|                             Scan Speed | Need Root Privilege |       OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:----------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |  Supported |                                    Need |
| CentOS      |                                   Fast |　                No |  Supported |                                      Need |
| RHEL        |                                   Fast |　                No |  Supported |                                      Need |
| Oracle      |                                   Fast |　                No |  Supported |                                      Need |
| Ubuntu      |                                   Fast |　                No |  Supported |                                      Need |
| Debian      |                                   Fast |　                No |  Supported |                                      Need |
| Raspbian    |    1st time: Slow, From 2nd time: Fast |                Need |         No |                                    Need |
| FreeBSD     |                                   Fast |　                No |         No |                                    Need |
| Amazon      |                                   Fast |　                No |         No |                                    Need |
| SUSE Enterprise |                               Fast |　                No |  Supported |                                      No |

## With -offline option

Scan with -offline option, vuls scans with no internet access.

| Distribution|                             Scan Speed | Need Root Privilege |       OVAL | Need Internet Access|
|:------------|:--------------------------------------:|:-------------------:|:----------:|:---------------------------------------:|
| Alpine      |                                   Fast |　                No |  Supported |                                    No |
| CentOS      |                                   Fast |　                No |  Supported |                                      No |
| RHEL        |                                   Fast |　                No |  Supported |                                      No |
| Oracle      |                                   Fast |　                No |  Supported |                                      No |
| Ubuntu      |                                   Fast |　                No |  Supported |                                      No |
| Debian      |                                   Fast |　                No |  Supported |                                      No |
| SUSE Enterprise |                               Fast |　                No |  Supported |                                      No |

Offline scan mode is not supported for Amazon Linux, FreeBSD, Raspbian.

## Runtime Inspection

### Detect processes affected by next pacakge update

It is possible to know processes affecting software update in advance using yum-ps on RedHat, CentOS, OracleLinux and Amazon Linux

### Detect not-restarted-processes

Detect processes which updated before but not restarting yet using checkrestart of debian-goodies on Debian and Ubuntu
