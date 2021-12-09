---
id: go-kev
title: go-kev
sidebar_label: go-kev
---

For detail of go-kev, see [vulsio/go-kev](https://github.com/vulsio/go-kev)

## Usage: go-kev on different server

```bash
$ go-kev server -bind=192.168.10.1 -port=1328
```

Specify URL of the go-kev in config.toml

```toml
[kevuln]
url = "http://192.168.0.1:1328"
```

```bash
$ vuls report
```

## Usage: Update Known Exploited Vulnerability

see [Usage: Fetch and Insert Known Exploited Vulnerability](https://github.com/vulsio/go-kev#fetch-known-exploited-vulnerabilities)
