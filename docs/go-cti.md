---
id: go-cti
title: go-cti
sidebar_label: go-cti
---

For detail of go-cti, see [vulsio/go-cti](https://github.com/vulsio/go-cti)

## Usage: go-cti on different server

```bash
$ go-cti server -bind=192.168.10.1 -port=1329
```

Specify URL of the go-cti in config.toml

```toml
[cti]
url = "http://192.168.0.1:1329"
```

```bash
$ vuls report
```

## Usage: Update MITRE ATT&CK and CAPEC

see [Usage: Fetch and Insert MITRE ATT&CK, CAPEC](https://github.com/vulsio/go-cti#fetch-mitre-attck-and-capec)
