---
id: architecture-deep-scan
title: Deep Scan
sidebar_label: Deep Scan
---

![Vuls-Scan-Flow](/img/docs/vuls-scan-flow.png)

TODOaaa


| Distribution|                        Scan Speed |       Need Root Privilege |      OVAL | Need Internet Access <br>on scan tareget|
|:------------|:---------------------------------:|:-------------------------:|:---------:|:---------------------------------------:|
| Alpine      |                              Fast |　                      No | Supported |                                    Need |
| CentOS      |                              Slow |　                      No | Supported |                                    Need |
| RHEL        |                              Slow |　                    Need | Supported |                                    Need |
| Oracle      |                              Slow |　                    Need | Supported |                                    Need |
| Ubuntu      |1st time: Slow, From 2nd time: Fast|                      Need | Supported |                                    Need |
| Debian      |1st time: Slow, From 2nd time: Fast|                      Need | Supported |                                    Need |
| Raspbian    |1st time: Slow, From 2nd time: Fast|                      Need |        No |                                    Need |
| FreeBSD     |                              Fast |　                      No |        No |                                    Need |
| Amazon      |                              Slow |　                      No |        No |                                    Need |
| SUSE Enterprise |                          Fast |　                      No |  Supported |                                     No |


TODOaaa

- On Ubuntu, Debian and Raspbian
Vuls issues `apt-get changelog` for each upgradable packages and parse the changelog.  
`apt-get changelog` is slow and resource usage is heavy when there are many updatable packages on target server.   
Vuls stores these changelogs to KVS([boltdb](https://github.com/boltdb/bolt)).  
From the second time on, the scan speed is fast by using the local cache.

- On CentOS
Vuls issues `yum changelog` to get changelogs of upgradable packages at once and parse the changelog.  

- On RHEL, Oracle, Amazon and FreeBSD
Detect CVE IDs by using package manager.

- On SUSE Enterprise Linux and Alpine Linux
Same as fast scan mode for now.
