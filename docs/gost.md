---
id: gost
title: gost
sidebar_label: gost
---

For detail of gost, see [knqyf263/gost](https://github.com/knqyf263/gost)

## Usage: gost  on different server

```
$ gost server -bind=192.168.10.1 -port=1325
```

Sepcify URL of the gost in config.toml

```
[gost]
type = "http"
url = "http://192.168.0.1:1325"
```

```
$ vuls report 
```

## Usage: Update security tracker data

see https://github.com/knqyf263/gost#fetch-redhat
