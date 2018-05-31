---
id: usage-configtest
title: configtest
sidebar_label: configtest
---

```bash
$ vuls configtest --help
configtest:
        configtest
                        [-deep]
                        [-config=/path/to/config.toml]
                        [-log-dir=/path/to/log]
                        [-ask-key-password]
                        [-ssh-native-insecure]
                        [-containers-only]
                        [-timeout=300]
                        [-debug]

                        [SERVER]...
  -ask-key-password
        Ask ssh privatekey password before scanning
  -config string
        /path/to/toml (default "/Users/kotakanbe/go/src/github.com/future-architect/vuls/config.toml")
  -containers-only
        Test containers only. Default: Test both of hosts and containers
  -debug
        debug mode
  -deep
        Config test for deep scan mode
  -http-proxy string
        http://proxy-url:port (default: empty)
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -ssh-native-insecure
        Use Native Go implementation of SSH. Default: Use the external command
  -timeout int
        Timeout(Sec) (default 300)

```

The configtest subcommand checks whether vuls is able to connect via SSH to servers/containers defined in the config.toml

# Dependencies

## fast scan mode

| Distribution |            Release | Requirements |
|:-------------|-------------------:|:-------------|
| Alpine       |      3.2 and later | - |
| Ubuntu       |          14, 16, 18| - |
| Debian       |             7, 8, 9| (reboot-notifier) |
| CentOS       |                6, 7| - |
| Amazon       |                All | - |
| RHEL         |            5, 6, 7 | - |
| Oracle Linux |            5, 6, 7 | - |
| SUSE Enterprise|            11, 12| - |
| FreeBSD      |             10, 11 | - |
| Raspbian     |    Jessie, Stretch | - |

## fast-root scan mode

The configtest subcommand with --fast-root checks whether the packages are installed on the scan target server and also check /etc/sudoers

| Distribution |            Release | Requirements |
|:-------------|-------------------:|:-------------|
| Alpine       |      3.2 and later | - |
| Ubuntu       |          14, 16, 18| - |
| Debian       |                8, 9| (reboot-notifier) |
| CentOS       |                6, 7| - |
| Amazon       |                All | - |
| RHEL         |            5, 6, 7 | - |
| Oracle Linux |            5, 6, 7 | - |
| SUSE Enterprise|           11, 12 | - |
| FreeBSD      |             10, 11 | - |
| Raspbian     |    Jessie, Stretch | - |

## deep scan mode

The configtest subcommand with --deep flag checks whether the packages are installed on the scan target server and also check /etc/sudoers
In order to scan with deep scan mode, the following dependencies are required, so you need to install them manually or with tools such as Ansible.

| Distribution |            Release | Requirements |
|:-------------|-------------------:|:-------------|
| Alpine       |      3.2 and later | -            |
| Ubuntu       |          14, 16, 18| debian-goodies |
| Debian       |             7, 8, 9| aptitude, reboot-notifier, debian-goodies |
| CentOS       |                6, 7| yum-plugin-changelog, yum-plugin-ps |
| Amazon       |                All | yum-plugin-changelog, yum-plugin-ps |
| RHEL         |                  5 | yum-changelog, yum-security, yum-plugin-ps |
| RHEL         |               6, 7 | yum-plugin-changelog, yum-plugin-ps |
| Oracle Linux |                  5 | yum-changelog, yum-security, yum-plugin-ps |
| Oracle Linux |               6, 7 | yum-plugin-changelog, yum-plugin-ps |
| SUSE Enterprise|           11, 12 | -            |
| FreeBSD      |                 10 | -            |
| Raspbian     |     Wheezy, Jessie | -            |

# /etc/sudoers on Target Servers

The configtest subcommand also checks sudo settings on target servers whether Vuls is able to SUDO with nopassword via SSH.

if you run Vuls with -ssh-native-insecure option, requiretty must be defined in /etc/sudoers.

```bash
Defaults:vuls !requiretty
```

For details, see [-ssh-native-insecure option](usage-scan.md#ssh-native-insecure-option)

## /etc/sudoers

| Distibution | fast |fast-root(offline) |fast-root           | deep         |
|:------------------|:-------------------|:-------------|:-------------|:-------------|
| Ubuntu 14, 16, 18| - |vuls ALL=(ALL) NOPASSWD: /usr/bin/stat *, /usr/sbin/checkrestart| vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart | vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart |
| Debian 8, 9 | - | vuls ALL=(ALL) NOPASSWD: /usr/bin/stat *, /usr/sbin/checkrestart| vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart | vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart |
| CentOS 6, 7  | - | vuls ALL=(ALL) NOPASSWD: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which | vuls ALL=(ALL) NOPASSWD: /usr/bin/yum -q ps all --color=never, /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which | vuls ALL=(ALL) NOPASSWD: /usr/bin/yum -q ps all --color=never, /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which |
| Amazon Linux | - | n/a | vuls ALL=(ALL) NOPASSWD: /usr/bin/yum -q ps all --color=never, /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which | vuls ALL=(ALL) NOPASSWD: /usr/bin/yum -q ps all --color=never, /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which |
| RHEL 6, 7    | - |                - |  vuls ALL=(ALL) NOPASSWD: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/yum repolist --color=never, /usr/bin/yum updateinfo list updates --security --color=never, /usr/bin/yum updateinfo updates --security --color=never, /usr/bin/repoquery | vuls ALL=(ALL) NOPASSWD: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/yum repolist --color=never, /usr/bin/yum updateinfo list updates --security --color=never, /usr/bin/yum updateinfo updates --security --color=never, /usr/bin/repoquery, /usr/bin/yum changelog all updates* |
| Oracle Linux 6, 7 | - | - | vuls ALL=(ALL) NOPASSWD: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/yum repolist --color=never, /usr/bin/yum updateinfo list updates --security --color=never, /usr/bin/yum updateinfo updates --security --color=never, /usr/bin/repoquery | vuls ALL=(ALL) NOPASSWD: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/yum repolist --color=never, /usr/bin/yum updateinfo list updates --security --color=never, /usr/bin/yum updateinfo updates --security --color=never, /usr/bin/yum changelog all updates*, /usr/bin/repoquery |
| SUSE Enterprise 11, 12 | - | - | -            | - |
| FreeBSD 10 | - | - | -            | - |
| Raspbian | - | n/a | vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart | vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart |

If your server is behind a proxy, also add the following.

```bash
Defaults:vuls env_keep="http_proxy https_proxy HTTP_PROXY HTTPS_PROXY"
```