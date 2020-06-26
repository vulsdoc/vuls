---
id: go-msfdb
title: go-msfdb
sidebar_label: go-msfdb
---

For detail of go-msfdb, see [takuzoo3868/go-msfdb](https://github.com/takuzoo3868/go-msfdb)

## Usage: go-msfdb on different server

```
$ go-msfdb server -bind=192.168.10.1 -port=1326
```

Sepcify URL of the go-msfdb in config.toml

```
[metasploit]
url = "http://192.168.0.1:1326"
```

```
$ vuls report 
```

## Usage: Update metasploit module db

see [Usage: Fetch and Insert Module](https://github.com/takuzoo3868/go-msfdb#usage-fetch-and-insert-modules-info)
