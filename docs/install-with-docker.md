---
id: install-with-docker
title: Install with Docker
sidebar_label: Install with Docker
---

Vuls's Docker images are built per commit and push to [DockerHub/Vuls](https://hub.docker.com/u/vuls/) automatically.

## install/update go-cve-dictionary

```console
$ docker pull vuls/go-cve-dictionary
$ docker run  --rm  vuls/go-cve-dictionary -v

go-cve-dictionary v0.1.xxx xxxx
```
## install/update goval-dictionary

```console
$ docker pull vuls/goval-dictionary
$ docker run  --rm  vuls/goval-dictionary -v

goval-dictionary v0.1.xxx xxxx
```

## install/update gost

```console
$ docker pull vuls/gost
$ docker run  --rm  vuls/gost  -v

gost  v0.1.xxx xxxx
```

## install/update Vuls

```console
$ docker pull vuls/vuls
$ docker run  --rm  vuls/vuls -v

vuls v0.1.xxx xxxx
```

## Scan

See [Tutorial:Docker](tutorial-docker.md)

## How to confirm version and Git revision

- go-cve-dictionary

```console
$ docker run  --rm  vuls/go-cve-dictionary -v

go-cve-dictionary v0.0.xxx xxxx
```

- goval-dictionary

```console
$ docker run  --rm  vuls/goval-dictionary -v

goval-dictionary v0.0.xxx xxxx
```

- gost

```console
$ docker run  --rm  vuls/gost -v

gost v0.0.xxx xxxx
```

- vuls

```console
$ docker run  --rm  vuls/vuls -v

vuls v0.0.xxx xxxx
```

## DockerHub

- [vuls/go-cve-dictionary](https://hub.docker.com/r/vuls/go-cve-dictionary/)
- [vuls/goval-dictionary](https://hub.docker.com/r/vuls/goval-dictionary/)
- [vuls/gost](https://hub.docker.com/r/vuls/gost/)
- [vuls/vuls](https://hub.docker.com/r/vuls/vuls/)
- [vuls/vulsrepo](https://hub.docker.com/r/vuls/vulsrepo/) 

This image version is same as the github repository version.

