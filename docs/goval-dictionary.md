---
id: goval-dictionary
title: goval-dictionary
sidebar_label: goval-dictionary
---

For detail of goval-dictionary, see [vulsio/goval-dictionary](https://github.com/vulsio/goval-dictionary)

## Usage: goval-dictionary on different server

```bash
$ goval-dictionary server -bind=192.168.10.1 -port=1324
```

Specify URL of the goval-dict in config.toml

```toml
[ovalDict]
type = "http"
url = "http://192.168.0.1:1324"
```

```bash
$ vuls report
```

## Usage: Update OVAL Data

- [Ubuntu](https://github.com/vulsio/goval-dictionary#usage-fetch-oval-data-from-ubuntu)
- [Debian](https://github.com/vulsio/goval-dictionary#usage-fetch-oval-data-from-debian)
- [Oracle](https://github.com/vulsio/goval-dictionary#usage-fetch-oval-data-from-oracle)
- [SUSE](https://github.com/vulsio/goval-dictionary#usage-fetch-oval-data-from-suse)
- [Alpine](https://github.com/vulsio/goval-dictionary#usage-fetch-alpine-secdb-as-oval-data-type)
