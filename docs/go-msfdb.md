---
id: go-msfdb
title: go-msfdb
sidebar_label: go-msfdb
---

For detail of go-msfdb, see [vulsio/go-msfdb](https://github.com/vulsio/go-msfdb)

## Usage: go-msfdb on different server

```bash
$ go-msfdb server -bind=192.168.10.1 -port=1327
```

Specify URL of the go-msfdb in config.toml

```toml
[metasploit]
url = "http://192.168.0.1:1327"
```

```bash
$ vuls report
```

## Usage: Update metasploit module db

see [Usage: Fetch and Insert Module](https://github.com/vulsio/go-msfdb#usage-fetch-and-insert-modules-info)
