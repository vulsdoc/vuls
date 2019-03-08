---
id: architecture-deep-scan
title: Deep Scan
sidebar_label: Deep Scan
---

Deep scan mode scans with root privilege. Certain commands can lead to high load such as fetch chagnelogs of many updatable packages.

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow-deep.png)

| Distribution|                        Scan Speed |  Need Root Privilege |      OVAL | Need Internet Access |
|:------------|:---------------------------------:|:--------------------:|:---------:|:--------------------:|
| Alpine      |                              Fast |　                 No | Supported |                 Need |
| CentOS      |                              Slow |　                 No | Supported |                 Need |
| RHEL        |                              Slow |　               Need | Supported |                 Need |
| Oracle      |                              Slow |　               Need | Supported |                 Need |
| Ubuntu      |1st time: Slow, From 2nd time: Fast|                 Need | Supported |                 Need |
| Debian      |1st time: Slow, From 2nd time: Fast|                 Need | Supported |                 Need |
| Raspbian    |1st time: Slow, From 2nd time: Fast|                 Need |        No |                 Need |
| FreeBSD     |                              Fast |　                 No |        No |                 Need |
| Amazon      |                              Slow |　                 No |        No |                 Need |
| SUSE Enterprise |                          Fast |　                 No |  Supported |                  No |

## Ubuntu, Debian and Raspbian

Vuls issues `apt-get changelog` for each upgradable packages and parse the changelog.
`apt-get changelog` is slow and resource usage is heavy when there are many updatable packages on target server.
Vuls stores these changelogs to KVS([boltdb](https://github.com/boltdb/bolt)).
From the second time on, the scan speed is fast by using the local cache.

## CentOS

Vuls issues `yum changelog` to get changelogs of upgradable packages at once and parse the changelog.

## RHEL, Oracle, Amazon and FreeBSD

Detect CVE IDs by using package manager.

## SUSE Enterprise Linux and Alpine Linux

Same as fast scan mode for now.

## Dependencies and /etc/sudoers

For details, see

- Dependencies: [usage-configtest](usage-configtest.md#deep-scan-mode)
- /etc/sudoers: [/etc/sudoers](usage-configtest.md#etc-sudoers)

# Runtime Inspection

## Detect processes affected by next package update

It is possible to know processes affecting software update in advance using yum-ps on RedHat, CentOS, OracleLinux and Amazon Linux

## Detect not-restarted-processes

Detect processes which updated before but not restarting yet using checkrestart of debian-goodies on Debian and Ubuntu
