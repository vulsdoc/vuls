---
id: usage-configtest
title: configtest
sidebar_label: configtest
---

```bash
$ vuls configtest --help
configtest:
        configtest
                        [-config=/path/to/config.toml]
                        [-log-dir=/path/to/log]
                        [-timeout=300]
                        [-debug]

                        [SERVER]...
  -config string
        /path/to/toml (default "/Users/kotakanbe/go/src/github.com/future-architect/vuls/config.toml")
  -debug
        debug mode
  -http-proxy string
        http://proxy-url:port (default: empty)
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -timeout int
        Timeout(Sec) (default 300)

```

The configtest subcommand checks whether vuls is able to connect via SSH to servers/containers defined in the config.toml

## Dependencies

### fast scan mode

| Distribution    |                    Release | Requirements |
|:----------------|---------------------------:|:-------------|
| Alpine          |              3.2 and later | - |
| Ubuntu          |     14, 16, 18, 20, 21, 22 | - |
| Debian          |            7, 8, 9, 10, 11 | (reboot-notifier) |
| CentOS          |                    6, 7, 8 | - |
| AlmaLinux       |                    6, 7, 8 | - |
| Rocky Linux     |                    6, 7, 8 | - |
| Amazon          |                        All | - |
| RHEL            |                 5, 6, 7, 8 | - |
| Fedora          |             32, 33, 34, 35 | - |
| Oracle Linux    |                    5, 6, 7 | - |
| openSUSE        |                 tumbleweed | - |
| openSUSE Leap   |                 15.2, 15.3 | - |
| SUSE Enterprise |                 11, 12, 15 | - |
| FreeBSD         |                     10, 11 | - |
| Raspbian        |    Jessie, Stretch, Buster | - |

### fast-root scan mode

The configtest subcommand with `fast-root` mode checks whether the packages are installed on the scan target server and also check `/etc/sudoers`

| Distribution    |                    Release | Requirements |
|:----------------|---------------------------:|:-------------|
| Alpine          |              3.2 and later | - |
| Ubuntu          |     14, 16, 18, 20, 21, 22 | debian-goodies |
| Debian          |               8, 9, 10, 11 | debian-goodies, reboot-notifier |
| CentOS          |                    6, 7, 8 | - |
| AlmaLinux       |                          8 | - |
| Rocky Linux     |                          8 | - |
| Amazon          |                        All | - |
| RHEL            |                          6 | - |
| RHEL            |                          7 | - |
| RHEL            |                          8 | lsof |
| Fedora          |             32, 33, 34, 35 | - |
| Oracle Linux    |                    5, 6, 7 | - |
| openSUSE        |                 tumbleweed | - |
| openSUSE Leap   |                 15.2, 15.3 | - |
| SUSE Enterprise |                 11, 12, 15 | - |
| FreeBSD         |                     10, 11 | - |
| Raspbian        |    Jessie, Stretch, Buster | debian-goodies |

### deep scan mode

same as `fast-root` scan mode

## /etc/sudoers on Target Servers

The configtest subcommand also checks sudo settings on target servers whether Vuls is able to SUDO with nopassword via SSH.

if you got the below error, `requiretty` should be defined in /etc/sudoers.

```bash
stderr: sudo: sorry, you must have a tty to run sudo
```


```bash
Defaults:vuls !requiretty
```

### /etc/sudoers

| Distribution | fast | fast-root           | deep         |
|:------------------|:-------------|:-------------|:-------------|
| Ubuntu 14, 16, 18, 20, 21, 22| - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/bin/lsof -i -P -n` | same as `fast-root` |
| Debian 8, 9, 10, 11| - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/bin/lsof -i -P -n`  | same as `fast-root`|
| CentOS 6, 7, 8  | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`  |same as `fast-root` |
| AlmaLinux 8    | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`  |same as `fast-root` |
| Rocky Linux 8  | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`  |same as `fast-root` |
| Amazon Linux | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`     |same as `fast-root` |
| Amazon Linux 2| - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`     |same as `fast-root` |
| Amazon Linux 2022| - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/sbin/lsof -i -P -n`     |same as `fast-root` |
| RHEL 6, 7, 8 | - |  `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/repoquery, /usr/bin/yum makecache --assumeyes, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/bin/lsof -i -P -n, /usr/sbin/lsof -i -P -n`     |same as `fast-root` |
| Oracle Linux 6, 7 | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/stat, /usr/bin/needs-restarting, /usr/bin/which, /usr/bin/repoquery, /usr/bin/yum makecache --assumeyes` |same as `fast-root` |
| SUSE Enterprise 11, 12, 15 | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/which, /usr/bin/zypper ps, /usr/bin/which, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/bin/lsof -i -P -n, /usr/sbin/lsof -i -P -n` | same as `fast-root` |
| FreeBSD 10 | -  | -            | - |
| Raspbian | - | `vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/apt-get update, /usr/bin/stat *, /usr/sbin/checkrestart, /bin/ls -l /proc/*/exe, /bin/cat /proc/*/maps, /usr/bin/lsof -i -P -n`   | same as `fast-root`|

If your server is behind a proxy, also add the following.

```bash
Defaults:vuls env_keep="http_proxy https_proxy HTTP_PROXY HTTPS_PROXY"
```
