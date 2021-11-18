---
id: install-with-docker
title: Install with Docker
sidebar_label: Install with Docker
---

Docker images for Vuls are built per commit and push to [DockerHub/Vuls](https://hub.docker.com/u/vuls/) automatically.

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

> New version Vuls 0.5.0 now possible to detect vulnerabilities that patches have not been published from distributors using new data source named [gost](https://github.com/vulsio/gost).

```console
$ docker pull vuls/gost
$ docker run  --rm  vuls/gost  -v

gost  v0.1.xxx xxxx
```

## install/update go-exploitdb

[go-exploitdb](https://github.com/vulsio/go-exploitdb)
> New version Vuls 0.6.0 now possible to display exploit codes have been published at [Exploit DB.com](https://www.exploit-db.com/). If you don't need to know about exploit code for detected CVEs, skip this section.

```console
$ docker pull vuls/go-exploitdb
$ docker run  --rm  vuls/go-exploitdb help

Go Exploit DB
[...]
```

## install/update go-msfdb

[go-msfdb](https://github.com/vulsio/go-msfdb)
> New version Vuls 0.11.0 now possible to display metasploit modules have been published at [Metasploit](https://github.com/rapid7/metasploit-framework). If you don't need to know about metasploit modules for detected CVEs, skip this section.

```console
$ docker pull vuls/go-msfdb
$ docker run  --rm  vuls/go-msfdb help

Go Metasploit DB
[...]
```

## install/update go-kev
> New version Vuls 0.xx.y now possible to display Known Exploited Vulnerabilities have been published at [Cybersecurity & Infrastructure Security Agency](https://www.cisa.gov/known-exploited-vulnerabilities-catalog). If you don't need to know about Known Exploited Vulnerabilities for detected CVEs, skip this section.

```console
$ docker pull vuls/go-kev
$ docker run --rm  vuls/go-kev help

Go Known Exploited Vulnerabilities
[...]
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
$ docker run  --rm  vuls/go-cve-dictionary version

go-cve-dictionary v0.0.xxx xxxx
```

- goval-dictionary

```console
$ docker run  --rm  vuls/goval-dictionary version

goval-dictionary v0.0.xxx xxxx
```

- gost

```console
$ docker run  --rm  vuls/gost version

gost v0.0.xxx xxxx
```

- go-exploitdb

```console
$ docker run  --rm  vuls/go-exploitdb version

go-exploitdb v0.0.xxx xxxx
```

- go-msfdb

```console
$ docker run  --rm  vuls/go-msfdb version

go-msfdb v0.0.xxx xxxx
```

- go-kev

```console
$ docker run  --rm  vuls/go-kev version

go-kev v0.0.xxx xxxx
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
- [vuls/go-exploitdb](https://hub.docker.com/r/vuls/go-exploitdb/)
- [vuls/go-msfdb](https://hub.docker.com/r/vuls/go-msfdb/)
- [vuls/go-kev](https://hub.docker.com/r/vuls/go-kev/)
- [vuls/vuls](https://hub.docker.com/r/vuls/vuls/)
- [vuls/vulsrepo](https://hub.docker.com/r/vuls/vulsrepo/)

This image version is same as the github repository version.
