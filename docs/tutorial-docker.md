---
id: tutorial-docker
title: Tutorial: Scan using Docker
sidebar_label: Scan using Docker
---

This tutorial will let you scan the vulnerabilities on the remote host via SSH with [Docker-Vuls](https://hub.docker.com/u/vuls/).   

Before doing this tutorial, you have to [setup vuls with Docker](install-with-docker.md).

This can be done in the following steps.  
1. fetch nvd (vuls/go-cve-dictionary)
1. fetch oval (vuls/goval-dictionary)
1. fetch gost (vuls/gost)
1. configuration (vuls/vuls)
1. configtest (vuls/vuls)
1. scan (vuls/vuls)
1. vulsrepo (vuls/vulsrepo)

## Step0. Prepare Log Dir

```console
$ cd /path/to/working/dir
$ mkdir go-cve-dictionary-log goval-dictionary-log gost-log
```

## Step1. Fetch NVD

[go-cve-dictionary](https://github.com/kotakanbe/go-cve-dictionary)

[kotakanbe/go-cve-dictioanry:README](https://github.com/kotakanbe/go-cve-dictionary#usage-fetch-nvd-data)
```console
$ for i in `seq 2002 $(date +"%Y")`; do \
    docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/go-cve-dictionary-log:/var/log/vuls \
    vuls/go-cve-dictionary fetchnvd -years $i; \
  done
```

To fetch JVN(Japanese), See [README](https://github.com/kotakanbe/go-cve-dictionary#usage-fetch-jvn-data)

## Step2. Fetch OVAL (e.g. redhat)

[goval-dictionary](https://github.com/kotakanbe/goval-dictionary)

```console
$ docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/goval-dictionary-log:/var/log/vuls \
    vuls/goval-dictionary fetch-redhat 5 6 7
```

To fetch other OVAL, See [README](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)

## Step3. Fetch gost(Go Security Tracker) (for RedHat/CentOS and Debian)

[gost (go-security-tracker)](https://github.com/knqyf263/gost)

```console
$ docker run --rm -i \
	-v $PWD:/vuls \
	-v $PWD/goval-log:/var/log/gost \
	vuls/gost fetch redhat --after=2016-01-01
```

To detect old vulnerabilities, change `--after=2016-01-01`.

To fetch Debian security tracker, See [Gost README](https://github.com/knqyf263/gost#fetch-debian)

## Step4. Configuration

Create config.toml referring to [this](usage-settings.md).

```toml
[servers]

[servers.c74]
host         = "54.249.93.16"
port        = "22"
user        = "vuls-user"
keyPath     = "/root/.ssh/id_rsa" # path to ssh private key in docker
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

```
[cveDict]
type = "sqlite3"
path = "/path/to/cve.sqlite3"

[ovalDict]
type = "sqlite3"
path = "/path/to/oval.sqlite3"

[gost]
type = "sqlite3"
path = "/path/to/gost.sqlite3"
```

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    vuls/vuls report \
    -format-short-text \
    -config=./config.toml # path to config.toml in docker
```

[Usage: Report](usage-report.md)

## Step8. vulsrepo

```console
$docker run -dt \
    -v $PWD:/vuls \
    -p 5111:5111 \
    vuls/vulsrepo
```

[VulsRepo](vulsrepo.md)

# HTTP-Server mode

Run containers as below if you want to use go-cve-dictionary, goval-dictionary and gost as a server mode.

## go-cve

```console
$ docker run -dt \
    --name go-cve-dictionary \
    -v $PWD:/vuls \
    -v $PWD/go-cve-dictionary-log:/var/log/vuls \
    --expose 1323 \
    -p 1323:1323 \
    vuls/go-cve-dictionary server --bind=0.0.0.0
```

## goval

```console
$ docker run -dt \
    --name goval-dictionary \
    -v $PWD:/vuls \
    -v $PWD/goval-dictionary-log:/var/log/vuls \
    --expose 1324 \
    -p 1324:1324 \
    vuls/goval-dictionary server --bind=0.0.0.0
```

## gost

```console
$ docker run -dt \
    --name gost \
    -v $PWD:/vuls \
    -v $PWD/gost-log:/var/log/gost \
    --expose 1325 \
    -p 1325:1325 \
    vuls/gost server --bind=0.0.0.0
```

## Report

```
[cveDict]
url = "http://hostname:1323"

[ovalDict]
url = "http://hostname:1324"

[gost]
url = "http://hostname:1325"
```

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    vuls/vuls report  \
    -config=./config.toml
```

