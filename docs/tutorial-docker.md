---
id: tutorial-docker
title: Tutorial: Scan using Docker
sidebar_label: Scan using Docker
---

Before doing this tutorial, you have to [setup vuls with Docker](install-with-docker.md).

1. fetch nvd (vuls/go-cve-dictionary)
1. fetch oval (vuls/goval-dictionary)
1. configuration (vuls/vuls)
1. configtest (vuls/vuls)
1. scan (vuls/vuls)
1. vulsrepo (vuls/vulsrepo)

## Step1. Fetch NVD

- [kotakanbe/go-cve-dictioanry:README](https://github.com/kotakanbe/go-cve-dictionary#usage-fetch-nvd-data)
```console
$ for i in `seq 2002 $(date +"%Y")`; do \
    docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/go-cve-dictionary-log:/var/log/vuls \
    vuls/go-cve-dictionary fetchnvd -years $i; \
  done
```

- To fetch JVN(Japanese), See [README](https://github.com/kotakanbe/go-cve-dictionary#usage-fetch-jvn-data)

## Step2. Fetch OVAL (e.g. redhat)

```console
$ docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/goval-dictionary-log:/var/log/vuls \
    vuls/goval-dictionary fetch-redhat 5 6 7
```

- To fetch other OVAL, See [README](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)

## Step2. Configuration

Create config.toml referring to [this](usage-settings.md).

```toml
[servers]

[servers.amazon]
host         = "54.249.93.16"
port        = "22"
user        = "vuls-user"
keyPath     = "/root/.ssh/id_rsa" # path to ssh private key in docker
```


## Step3. Configtest

```console
$ docker run --rm -it\
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    vuls/vuls configtest \
    -config=./config.toml # path to config.toml in docker
```

[Usage: configtest](usage-configtest.md)

## Step4. Scan

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

[Usage: Scan](usage-scan.md)

## Step5. Report

```console
$ docker run --rm -it \
    -v ~/.ssh:/root/.ssh:ro \
    -v $PWD:/vuls \
    -v $PWD/vuls-log:/var/log/vuls \
    -v /etc/localtime:/etc/localtime:ro \
    vuls/vuls report \
    -cvedb-path=/vuls/cve.sqlite3 \
    -ovaldb-path=/vuls/oval.sqlite3 \
    -format-short-text \
    -config=./config.toml # path to config.toml in docker
```

[Usage: Report](usage-report.md)

## Step6. vulsrepo

```console
$docker run -dt \
    -v $PWD:/vuls \
    -p 5111:5111 \
    vuls/vulsrepo
```

[VulsRepo](vulsrepo.md)

## Tips

Run containers as below if you want to use go-cve-dictionary or goval-dictionary as a server mode.

```console
$ docker run -dt \
    --name go-cve-dictionary \
    -v $PWD:/vuls \
    -v $PWD/go-cve-dictionary-log:/var/log/vuls \
    --expose 1323 \
    -p 1323:1323 \
    vuls/go-cve-dictionary server --bind=0.0.0.0
```

```console
$ docker run -dt \
    --name goval-dictionary \
    -v $PWD:/vuls \
    -v $PWD/goval-dictionary-log:/var/log/vuls \
    --expose 1324 \
    -p 1324:1324 \
    vuls/goval-dictionary server --bind=0.0.0.0
```

