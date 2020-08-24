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
$ cd $GOPATH/src/github.com/kotakanbe/go-cve-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update goval-dictionary  

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/kotakanbe/goval-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update gost

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/knqyf263/gost
$ git pull
$ rm -r vendor
$ make install
```

- Update go-exploitdb

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/mozqnet/go-exploitdb
$ git pull
$ rm -r vendor
$ make install
```

- Update go-exploitdb

If the DB schema was changed, use a new database.
Vuls doesn't migrate old schema to new schema.

```bash
$ cd $GOPATH/src/github.com/takuzoo3868/go-msfdb
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
