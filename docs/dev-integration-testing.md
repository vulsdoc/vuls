---
id: testing
title: Integration Testing
sidebar_label: Integration Testing
---

## Diff

Prepare vulnerability databases

```bash
	$ git clone git@github.com:vulsio/vulsctl.git
	$ cd vulsctl/docker
	$ ./update-all.sh
	$ cd /path/to/future-architect/vuls
	$ vim integration/int-config.toml
```

build binaries

- working-tree
- HEAD
- HEAD^

```bash
    $ make build-integration
```

diff between HEAD and working-set

```bash
	$ ln -s vuls vuls.new
	$ ln -s vuls.xxxxx vuls.old
	$ make diff
```

diff between HEAD^ and HEAD

```bash
	$ ln -s vuls.xxxHEADxxx vuls.new
	$ ln -s vuls.yyyHEAD^yyy vuls.old
	$ make diff
```

## Diff on Redis-backend

```bash
	$ docker network create redis-nw
    $ docker run --name redis -d --network redis-nw -p 127.0.0.1:6379:6379 redis
	$ git clone git@github.com:vulsio/vulsctl.git
	$ cd vulsctl/docker
	$ ./update-all-redis.sh
	$ (or export DOCKER_NETWORK=redis-nw; cd /home/ubuntu/vulsctl/docker; ./update-all.sh --dbtype redis --dbpath "redis://redis/0")
	$ vim integration/int-redis-config.toml
```

```bash
	$ ln -s vuls vuls.new
	$ ln -s oldvuls vuls.old
	$ make diff-redis
```

## Diff between Redis-backend and SQLite3

```bash
	$ make diff-rdb-redis
```
