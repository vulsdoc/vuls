---
id: architecture-fast-root-scan
title: Fast-Root Scan
sidebar_label: Fast-Root Scan
---

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-fast-root.png)

| Distribution    |                          Scan Speed | Need Root Privilege |                 OVAL | Need Internet Access|
|:----------------|:-----------------------------------:|:-------------------:|:--------------------:|:---------------------------------------:|
| Alpine          |                                Fast |　                No |            Supported |                                    Need |
| CentOS          |                                Fast |　              Need |            Supported |                                    Need |
| AlmaLinux       |                                Fast |　              Need |            Supported |                                    Need |
| Rocky Linux     |                                Fast |　              Need |            Supported |                                    Need |
| RHEL            |                                Fast |　              Need |            Supported |                                    Need |
| Fedora          |                                Fast |　              Need |            Supported |                                    Need |
| Oracle          |                                Fast |　              Need |            Supported |                                    Need |
| Ubuntu          |                                Fast |　              Need |            Supported |                                    Need |
| Debian          |                                Fast |　              Need |            Supported |                                    Need |
| Raspbian        | 1st time: Slow, From 2nd time: Fast |                Need |  Partially Supported |                                    Need |
| FreeBSD         |                                Fast |　                No |                   No |                                    Need |
| Amazon          |                                Fast |　              Need |            Supported |                                    Need |
| openSUSE        |                                Fast |　                No |            Supported |                                    Need |
| openSUSE Leap   |                                Fast |　                No |            Supported |                                    Need |
| SUSE Enterprise |                                Fast |　                No |            Supported |                                    Need |
| Windows         |                                Fast |　         Partially |            Supported |                               Partially |

Raspbian has been modified from its previous Changelog only scan to scan using Debian OVAL and Debian Security Tracker, Changelog.
The difference between Fast-Root scan and Deep scan is that the packages that use change logs are limited (because Debian OVAL and Debian Security Tracker cannot detect packages that only exist on the Raspberry Pi).
In summary, the behavior of each scan mode in Raspbian is shown in the table below.

|     Scan Mode    | fast |                 fast-root                |         deep         |
|:----------------:|:----|:----------------------------------------|:--------------------|
|      v0.11     |   (deep scan)  |                 (deep scan)                |       changelog      |
|    v0.12   | <ul><li>OVAL</li><li>Debian Security Tracker</li></ul> | <ul><li>OVAL</li><li>Debian Security Tracker</li><li>changelog(only raspberrypi package)</li></ul> | <ul><li>OVAL</li><li>Debian Security Tracker</li><li>changelog(all updatable package)</li></ul> |

For more information, see This Pull Request (https://github.com/future-architect/vuls/pull/1019).

## With -offline option

Scan with -offline option, vuls scans with no internet access.

| Distribution    |                         Scan Speed | Need Root Privilege |       OVAL | Need Internet Access|
|:----------------|:----------------------------------:|:-------------------:|:----------:|:-------------------------------------:|
| Alpine          |                               Fast |　                No |  Supported |                                    No |
| CentOS          |                               Fast |　              Need |  Supported |                                    No |
| AlmaLinux       |                               Fast |　              Need |  Supported |                                    No |
| Rocky Linux     |                               Fast |　              Need |  Supported |                                    No |
| RHEL            |                               Fast |　              Need |  Supported |                                    No |
| Fedora          |                               Fast |　              Need |  Supported |                                    No |
| Oracle          |                               Fast |　              Need |  Supported |                                    No |
| Ubuntu          |                               Fast |　              Need |  Supported |                                    No |
| Debian          |                               Fast |　              Need |  Supported |                                    No |
| Amazon          |                               Fast |　              Need |  Supported |                                    No |
| openSUSE        |                               Fast |　                No |  Supported |                                    No |
| openSUSE Leap   |                               Fast |　                No |  Supported |                                    No |
| SUSE Enterprise |                               Fast |　                No |  Supported |                                    No |
| Windows         |                               Fast |　         Partially |  Supported |                                    No |

Offline scan mode is not supported FreeBSD, Raspbian.

In Fast-Root Scan and Deep Scan, Raspbian scans a combination of Debian OVAL and Debian Security Tracker, Changelog, so Offline Scan mode cannot be provided completely.
If you execute Offline Scan, you can get the result of Debian OVAL and Debian Security Tracker only (same result as Fast Scan).

## Dependencies and /etc/sudoers

For details, see

- Dependencies: [usage-configtest](usage-configtest.md#fast-root-scan-mode)
- /etc/sudoers: [/etc/sudoers](usage-configtest.md#etc-sudoers)

## Runtime Inspection

### Detect processes affected by next package update

It is possible to know processes affecting software update in advance using yum-ps on RedHat, CentOS, AlmaLinux, Rocky Linux,OracleLinux and Amazon Linux

### Detect not-restarted-processes

Detect processes which updated before but not restarting yet using checkrestart of debian-goodies on Debian and Ubuntu
