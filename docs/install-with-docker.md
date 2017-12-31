---
id: install-with-docker
title: Install with Docker
sidebar_label: Install with Docker
---

Vuls's Docker images are built per commit.
If you want to use the latest Docker image, you should remove the existing images, and pull it once again.

## How to confirm your versions

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

- vuls

```console
$ docker run  --rm  vuls/vuls -v

vuls v0.0.xxx xxxx
```

## Remove your old Docker images

- go-cve-dictionary

```
$ docker rmi vuls/go-cve-dictionary
```

- goval-dictionary

```
$ docker rmi vuls/goval-dictionary
```

- vuls

```
$ docker rmi vuls/vuls
```

## Deploy go-cve-dictionary

```
$ docker pull vuls/go-cve-dictionary
```

```console
$ docker run  --rm  vuls/go-cve-dictionary -v

go-cve-dictionary v0.1.xxx xxxx
```
Then Fetch NVD

```console
$ for i in `seq 2002 $(date +"%Y")`; do \
    docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/go-cve-dictionary-log:/var/log/vuls \
    vuls/go-cve-dictionary fetchnvd -years $i; \
  done
```

To fetch JVN(Japanese), See [README](https://github.com/kotakanbe/go-cve-dictionary#usage-fetch-jvn-data)
change URL

## Deploy goval-dictionary

```
$ docker pull vuls/goval-dictionary
```

```console
$ docker run  --rm  vuls/goval-dictionary -v

goval-dictionary v0.1.xxx xxxx
```

Then Fetch OVAL (e.g. redhat)

```console
$ docker run --rm -it \
    -v $PWD:/vuls \
    -v $PWD/goval-dictionary-log:/var/log/vuls \
    vuls/goval-dictionary fetch-redhat 5 6 7
```

To fetch other OVAL, See [README](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)

## Deploy Vuls

```
$ docker pull vuls/vuls
```

```console
$ docker run  --rm  vuls/vuls -v

vuls v0.1.xxx xxxx
```

## Scan

See [Tutorial:Docker](tutorial-docker.md)

## DockerHub

- [go-cve-dictionary](https://hub.docker.com/r/vuls/go-cve-dictionary/)
- [goval-dictionary](https://hub.docker.com/r/vuls/goval-dictionary/)
- [vuls](https://hub.docker.com/r/vuls/vuls/)
- [vulsrepo](https://hub.docker.com/r/vuls/vulsrepo/) 

This image version is same as the github repository version.

