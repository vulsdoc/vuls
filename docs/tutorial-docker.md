---
id: tutorial-docker
title: Tutorial - Scan using Docker
sidebar_label: Scan using Docker
---

It's easier to use [vulsctl](https://vuls.io/docs/en/tutorial-vulsctl-docker.html) than to use docker directly.

This tutorial will let you scan the vulnerabilities on the remote host via SSH with [Docker-Vuls](https://hub.docker.com/u/vuls/).

Before doing this tutorial, you have to [setup vuls with Docker](install-with-docker.md).

This can be done in the following steps.

1. fetch nvd (vuls/go-cve-dictionary)
1. fetch oval (vuls/goval-dictionary)
1. fetch gost (vuls/gost)
1. fetch go-exploitdb(vuls/go-exploitdb)
1. fetch go-msfdb(vuls/go-msfdb)
1. fetch go-kev(vuls/go-kev)
1. fetch go-cti(vuls/go-cti)
1. configuration (vuls/vuls)
1. configtest (vuls/vuls)
1. scan (vuls/vuls)
1. vulsrepo (ishidaco/vulsrepo)

## Step0. Prepare Log Dir

```console
$ cd /path/to/working/dir
$ mkdir go-cve-dictionary-log goval-dictionary-log gost-log go-exploitdb-log go-msfdb-log
```

## Step1. Fetch NVD

[go-cve-dictionary](https://github.com/vulsio/go-cve-dictionary)

[vulsio/go-cve-dictionary:README](https://github.com/vulsio/go-cve-dictionary#usage-fetch-nvd-data)

```console
$ docker run --rm -it \
    -v $PWD:/go-cve-dictionary \
    -v $PWD/go-cve-dictionary-log:/var/log/go-cve-dictionary \
    vuls/go-cve-dictionary fetch nvd
```

To fetch JVN(Japanese), See [README](https://github.com/vulsio/go-cve-dictionary#usage-fetch-jvn-data)

## Step2. Fetch OVAL (e.g. redhat)

[goval-dictionary](https://github.com/vulsio/goval-dictionary)

```console
$ docker run --rm -it \
    -v $PWD:/goval-dictionary \
    -v $PWD/goval-dictionary-log:/var/log/goval-dictionary \
    vuls/goval-dictionary fetch redhat 5 6 7 8 9
```

To fetch other OVAL, See [README](https://github.com/vulsio/goval-dictionary#usage-fetch-oval-data-from-redhat)

## Step3. Fetch gost(Go Security Tracker) (for RedHat/CentOS/AlmaLinux/Rocky Linux, Debian and Ubuntu)

[gost (go-security-tracker)](https://github.com/vulsio/gost)

```console
$ docker run --rm -i \
	-v $PWD:/gost \
	-v $PWD/gost-log:/var/log/gost \
	vuls/gost fetch redhat
```

To fetch Debian security tracker, See [Gost README](https://github.com/vulsio/gost#fetch-debian)

## Step3.5. Fetch go-exploitdb

[go-exploitdb](https://github.com/vulsio/go-exploitdb)

```console
$ docker run --rm -i \
    -v $PWD:/go-exploitdb \
    -v $PWD/go-exploitdb-log:/var/log/go-exploitdb \
    vuls/go-exploitdb fetch exploitdb
$ docker run --rm -i \
    -v $PWD:/go-exploitdb \
    -v $PWD/go-exploitdb-log:/var/log/go-exploitdb \
    vuls/go-exploitdb fetch awesomepoc
$ docker run --rm -i \
    -v $PWD:/go-exploitdb \
    -v $PWD/go-exploitdb-log:/var/log/go-exploitdb \
    vuls/go-exploitdb fetch githubrepos
$ docker run --rm -i \
    -v $PWD:/go-exploitdb \
    -v $PWD/go-exploitdb-log:/var/log/go-exploitdb \
    vuls/go-exploitdb fetch inthewild
```

## Step3.6. Fetch go-msfdb

[go-msfdb](https://github.com/vulsio/go-msfdb)

```console
$ docker run --rm -i \
    -v $PWD:/go-msfdb \
    -v $PWD/go-msfdb-log:/var/log/go-msfdb \
    vuls/go-msfdb fetch msfdb
```

## Step3.7. Fetch go-kev

[go-kev](https://github.com/vulsio/go-kev)

```console
$ docker run --rm -i \
    -v $PWD:/go-kev \
    -v $PWD/go-kev-log:/var/log/go-kev \
    vuls/go-kev fetch kevuln
```

## Step3.8. Fetch go-cti

[go-cti](https://github.com/vulsio/go-cti)

```console
$ docker run --rm -i \
    -v $PWD:/go-cti \
    -v $PWD/go-cti-log:/var/log/go-cti \
    vuls/go-cti fetch threat
```

## Step4. Configuration

Create config.toml referring to [this](configtoml.md).

```toml
[servers]

[servers.c74]
host            = "54.249.93.16"
port            = "22"
user            = "vuls-user"
# if ssh config file exists in .ssh, path to ssh config file in docker
sshConfigPath   = "/root/.ssh/config"
# path to ssh private key in docker
keyPath         = "/root/.ssh/id_rsa"
```

## Step5. Configtest

```console
$ docker run --rm -it\
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    vuls/vuls configtest \
    -config=./config.toml # path to config.toml in docker
```

[Usage: configtest](usage-configtest.md)

## Step6. Scan

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    -e "TZ=Asia/Tokyo" \
    vuls/vuls scan \
    -config=./config.toml # path to config.toml in docker
```

If Docker Host is Debian or Ubuntu

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    -v /etc/timezone:/etc/timezone:ro \
    vuls/vuls scan \
    -config=./config.toml # path to config.toml in docker
```

[Usage: Scan](usage-scan.md)

## Step7. Report

config.toml

```toml
[cveDict]
type = "sqlite3"
SQLite3Path = "/path/to/cve.sqlite3"

[ovalDict]
type = "sqlite3"
SQLite3Path = "/path/to/oval.sqlite3"

[gost]
type = "sqlite3"
SQLite3Path = "/path/to/gost.sqlite3"

[exploit]
type = "sqlite3"
SQLite3Path = "/path/to/go-exploitdb.sqlite3"

[metasploit]
type = "sqlite3"
SQLite3Path = "/path/to/db/go-msfdb.sqlite3"

[kevuln]
type = "sqlite3"
SQLite3Path = "/path/to/db/go-kev.sqlite3"

[cti]
type = "sqlite3"
SQLite3Path = "/path/to/db/go-cti.sqlite3"
```

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    vuls/vuls report \
    -format-list \
    -config=./config.toml # path to config.toml in docker
```

[Usage: Report](usage-report.md)

Use TUI(Terminal-Based User Interface) to display the scan result.

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    vuls/vuls tui \
    -config=./config.toml # path to config.toml in docker
```

![Vuls-TUI](https://vuls.io/img/docs/hello-vuls-tui.png)

## Step8. vulsrepo

```console
$docker run -dt \
    -v $PWD:/vuls \
    -p 5111:5111 \
    ishidaco/vulsrepo
```

[VulsRepo](vulsrepo.md)

## HTTP-Server mode

Run containers as below if you want to use go-cve-dictionary, goval-dictionary and gost as a server mode.

### go-cve-dictionary

```console
$ docker run -dt \
    --name go-cve-dictionary \
    -v $PWD:/go-cve-dictionary \
    -v $PWD/go-cve-dictionary-log:/var/log/go-cve-dictionary \
    --expose 1323 \
    -p 1323:1323 \
    vuls/go-cve-dictionary server --bind=0.0.0.0
```

### goval-dictionary

```console
$ docker run -dt \
    --name goval-dictionary \
    -v $PWD:/goval-dictionary \
    -v $PWD/goval-dictionary-log:/var/log/goval-dictionary \
    --expose 1324 \
    -p 1324:1324 \
    vuls/goval-dictionary server --bind=0.0.0.0
```

### gost

```console
$ docker run -dt \
    --name gost \
    -v $PWD:/gost \
    -v $PWD/gost-log:/var/log/gost \
    --expose 1325 \
    -p 1325:1325 \
    vuls/gost server --bind=0.0.0.0
```

### go-exploitdb

```console
$ docker run -dt \
    --name go-exploitdb \
    -v $PWD:/go-exploitdb \
    -v $PWD/go-exploitdb-log:/var/log/go-exploitdb \
    --expose 1326 \
    -p 1326:1326 \
    vuls/go-exploitdb server --bind=0.0.0.0
```

### go-msfdb

```console
$ docker run -dt \
    --name go-msfdb \
    -v $PWD:/go-msfdb \
    -v $PWD/go-msfdb-log:/var/log/go-msfdb \
    --expose 1327 \
    -p 1327:1327 \
    vuls/go-msfdb server --bind=0.0.0.0
```

### go-kev

```console
$ docker run -dt \
    --name go-kev \
    -v $PWD:/go-kev \
    -v $PWD/go-kev-log:/var/log/go-kev \
    --expose 1328 \
    -p 1328:1328 \
    vuls/go-kev server --bind=0.0.0.0
```

### go-cti

```console
$ docker run -dt \
    --name go-cti \
    -v $PWD:/go-cti \
    -v $PWD/go-cti-log:/var/log/go-cti \
    --expose 1329 \
    -p 1329:1329 \
    vuls/go-cti server --bind=0.0.0.0
```

### Report

```toml
[cveDict]
type = "http"
url = "http://hostname:1323"

[ovalDict]
type = "http"
url = "http://hostname:1324"

[gost]
type = "http"
url = "http://hostname:1325"

[exploit]
type = "http"
url = "http://hostname:1326"

[metasploit]
type = "http"
url = "http://hostname:1327"

[kevuln]
type = "http"
url = "http://hostname:1328"
```

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    vuls/vuls report  \
    -config=./config.toml
```

## Use MySQL 5.7 or later

If you get below error message while fetching, define `sql_mode`.

```bash
Error 1292: Incorrect datetime value: '0000-00-00' for column 'issued' at row 1
```

see the [issue](https://github.com/vulsio/goval-dictionary/issues/45)

```bash
$ docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=chHUIDCUAUaidfhasuadasuda  -d mysql:8 --sql-mode="" --default-authentication-plugin=mysql_native_password
4e4440bbbcb556cf949c2ffcda15afe6ee7139752c08de8b1e4def47adde24ea

$ docker exec -it mysql bash
root@4e4440bbbcb5:/# mysql -uroot -h127.0.0.1 -pchHUIDCUAUaidfhasuadasuda
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.12 MySQL Community Server - GPL

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> select @@GLOBAL.sql_mode;
+-------------------+
| @@GLOBAL.sql_mode |
+-------------------+
|                   |
+-------------------+
1 row in set (0.00 sec)

mysql> create database oval;
Query OK, 1 row affected (0.08 sec)

mysql> exit
Bye
root@4e4440bbbcb5:/# exit
exit

bash-3.2$ go build && ./goval-dictionary fetch ubuntu -dbtype mysql -dbpath "root:chHUIDCUAUaidfhasuadasuda@(127.0.0.1:3306)/oval?parseTime=true" 18
INFO[08-21|21:41:58] Fetching...                              URL=https://people.canonical.com/~ubuntu-security/oval/com.ubuntu.bionic.cve.oval.xml


INFO[08-21|21:47:56] Fetched...                               URL=https://people.canonical.com/~ubuntu-security/oval/com.ubuntu.bionic.cve.oval.xml
INFO[08-21|21:47:56] Finished fetching OVAL definitions
INFO[08-21|21:47:56] Fetched                                  URL=https://people.canonical.com/~ubuntu-security/oval/com.ubuntu.bionic.cve.oval.xml OVAL definitions=6319
INFO[08-21|21:47:56] Refreshing...                            Family=ubuntu Version=18


bash-3.2$ go build && ./goval-dictionary fetch debian -dbtype mysql -dbpath "root:chHUIDCUAUaidfhasuadasuda@(127.0.0.1:3306)/oval?parseTime=true" 9
INFO[08-21|21:49:43] Fetching...                              URL=https://www.debian.org/security/oval/oval-definitions-stretch.xml
INFO[08-21|21:50:14] Fetched...                               URL=https://www.debian.org/security/oval/oval-definitions-stretch.xml
INFO[08-21|21:50:14] Finished fetching OVAL definitions
INFO[08-21|21:50:16] Fetched                                  URL=https://www.debian.org/security/oval/oval-definitions-stretch.xml OVAL definitions=17946
INFO[08-21|21:50:16] Refreshing...                            Family=debian Version=9
```
