---
id: usage-configtest
title: configtest
sidebar_label: configtest
---

```
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

  ## Fast Scan Mode

| Distribution |            Release | Requirements |
|:-------------|-------------------:|:-------------|
| Alpine       |      3.2 and later | - |
| Ubuntu       |          12, 14, 16| - |
| Debian       |             7, 8, 9| reboot-notifier|
| CentOS       |                6, 7| yum-utils |
| Amazon       |                All | yum-utils |
| RHEL         |            5, 6, 7 | yum-utils | 
| Oracle Linux |            5, 6, 7 | yum-utils |
| SUSE Enterprise|            11, 12 | - |
| FreeBSD      |             10, 11 | - |
| Raspbian     |    Jessie, Stretch | - |

## Deep Scan Mode

Some dependent packages are needed in Deep Scan Mode.
The configtest subcommand with --deep flag checks whether the packages are installed on the scan target server and also check /etc/sudoers

### Dependencies and /etc/sudoers on Target Servers

In order to scan with deep scan mode, the following dependencies are required, so you need to install them manually or with tools such as Ansible.

| Distribution |            Release | Requirements |
|:-------------|-------------------:|:-------------|
| Alpine       |      3.2 and later | - |
| Ubuntu       |          12, 14, 16| -            |
| Debian       |             7, 8, 9| aptitude, reboot-notifier     |
| CentOS       |                6, 7| yum-utils, yum-plugin-changelog |
| Amazon       |                All | yum-utils, yum-plugin-changelog |
| RHEL         |                  5 | yum-utils, yum-changelog, yum-security |
| RHEL         |               6, 7 | yum-utils, yum-plugin-changelog |
| Oracle Linux |                  5 | yum-utils, yum-changelog, yum-security |
| Oracle Linux |               6, 7 | yum-utils, yum-plugin-changelog |
| SUSE Enterprise|            11, 12 | - |
| FreeBSD      |                 10 | -            |
| Raspbian     |     Wheezy, Jessie | -            |

The configtest subcommand also checks sudo settings on target servers whether Vuls is able to SUDO with nopassword via SSH. And if you run Vuls without -ssh-native-insecure option, requiretty must be defined in /etc/sudoers.
```
Defaults:vuls !requiretty
```
For details, see [-ssh-native-insecure option](usage-scan.md#ssh-native-insecure-option)

Example of /etc/sudoers on target servers

- RHEL 5 / Oracle Linux 5
```
vuls ALL=(ALL) NOPASSWD:/usr/bin/yum --color=never repolist, /usr/bin/yum --color=never list-security --security, /usr/bin/yum --color=never info-security, /usr/bin/repoquery, /usr/bin/yum --color=never changelog all *
Defaults:vuls env_keep="http_proxy https_proxy HTTP_PROXY HTTPS_PROXY"
```

- RHEL 6, 7 / Oracle Linux 6, 7
```
vuls ALL=(ALL) NOPASSWD:/usr/bin/yum --color=never repolist, /usr/bin/yum --color=never --security updateinfo list updates, /usr/bin/yum --color=never --security updateinfo updates, /usr/bin/repoquery, /usr/bin/yum --color=never changelog all *
Defaults:vuls env_keep="http_proxy https_proxy HTTP_PROXY HTTPS_PROXY"
```

- Debian/Ubuntu/Raspbian
```
vuls ALL=(ALL) NOPASSWD: /usr/bin/apt-get update
Defaults:vuls env_keep="http_proxy https_proxy HTTP_PROXY HTTPS_PROXY"
```

- On CentOS, Amazon Linux, SUSE Enterprise, FreeBSD, it is possible to scan without root privilege for now.
