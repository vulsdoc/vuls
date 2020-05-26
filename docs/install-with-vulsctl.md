---
id: install-with-vulsctl
title: Install wth vulsctl on CentOS
sidebar_label: Easiest way to setup Vuls - Vulsctl
---

## Vulsctl

[Vulsctl](https://github.com/vulsio/vulsctl) was created to ease setup. Each shell script is a wrapper for docker command.

## Setup Docker

- Install [Docker](https://docs.docker.com/install/linux/docker-ce/centos/)
- [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/)

```bash
$ sudo systemctl start docker
```

## Clone Vulsctl

```bash
$ git clone https://github.com/vulsio/vulsctl.git
$ cd vulsctl
```

## Fetch Vulnerability Database

```
$ ./update-all.sh
```

## Scan and Report

Prepare config.toml in the same directory.

```
$ cat $HOME/vulsctl/config.toml 
[servers]
[servers.hostos]
host        = "52.10.10.10"
port        = "22"
user        = "centos"
# keypath in the Vuls docker container
keyPath     = "/root/.ssh/id_rsa"
```

![](https://user-images.githubusercontent.com/534611/66093182-20535f00-e5ca-11e9-8060-8c9247abcefa.jpg)

SSH before scanning to add fingerprint to $HOME/.ssh/known_hosts on the Docker host.
```
$ ssh centos@52.100.100.100 -i ~/.ssh/id_rsa.pem
```

```
$ ./scan.sh 
$ ./report.sh
$ ./tui.sh
```

For details, see
- [scan.sh](https://github.com/vulsio/vulsctl/blob/master/scan.sh)
- [report.sh](https://github.com/vulsio/vulsctl/blob/master/report.sh)
- [tui.sh](https://github.com/vulsio/vulsctl/blob/master/tui.sh)

## Deploy `vuls` on the host

You can deploy `vuls` on your host easily while using the [install-host.sh](https://github.com/vulsio/vulsctl/blob/5efed5284bf97e9915563644d90411490bcf47ce/install-host.sh) script.

```bash
$ sudo bash install-host.sh
```

> The support for RHEL and CentOS 6.x / 7.x is in [pull requests](https://github.com/vulsio/vulsctl/pulls).

## Vulsrepo

```
$ ./vulsrepo.sh
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
39c8830dbeac        ishidaco/vulsrepo   "vulsrepo-server"   3 seconds ago       Up 1 second         0.0.0.0:5111->5111/tcp   focused_wu
```

Vulsrepo is running on http://host-ip:5111 .
