---
id: misc-update-vuls
title: Update Vuls to the latest version
sidebar_label: Update Vuls to the latest version
---

## Update manually

- Update go-cve-dictionary  

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/go-cve-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update goval-dictionary  

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/goval-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update gost

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/gost
$ git pull
$ rm -r vendor
$ make install
```

- Update go-exploitdb

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/go-exploitdb
$ git pull
$ rm -r vendor
$ make install
```

- Update go-msfdb

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/go-msfdb
$ git pull
$ make install
```

- Update go-kev

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/go-kev
$ git pull
$ make install
```

- Update go-cti

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/vulsio/go-cti
$ git pull
$ make install
```

- Update vuls

```bash
$ cd $GOPATH/src/github.com/future-architect/vuls
$ git pull
$ rm -r vendor
$ make install
```

- Binary file was built under $GOPATH/bin
- If an error occurs, delete `$GOPATH/pkg` before executing it

## Update using docker

If you set up on docker, see [Docker setup](install-with-docker.md)
