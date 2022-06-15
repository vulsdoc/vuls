---
id: install-with-vulsctl-host
title: Install with vulsctl on host
sidebar_label: Vulsctl - Install on HostOS
---

## Vulsctl

[Vulsctl](https://github.com/vulsio/vulsctl) was created to ease setup.

## Deploy `vuls` on the host

You can deploy `vuls` on your host easily while using the [install.sh](https://github.com/vulsio/vulsctl/blob/master/install-host/install.sh) script.
To know what the script doing, it's quicker to look at the script.

### install

```bash
$ sudo bash install.sh
```

### Fetch all databases

Fetch the vulnerability databases used by Vuls to the current directory using [update-all.sh](https://github.com/vulsio/vulsctl/blob/master/install-host/update-all.sh).
Fetching all databases is time consuming. Look at the script before executing update-all.sh and make sure you fetch only what you need.

```bash
$ update-all.sh
```

### Update Modules

Update Vuls-related modules to the latest version using [upgrade.sh](https://github.com/vulsio/vulsctl/blob/master/install-host/upgrade.sh).

```bash
$ sudo bash upgrade.sh
```

### Scan and Report

You can find the Vuls command in /usr/local/bin/vuls, and the config.toml sample is [here](https://github.com/vulsio/vulsctl). If you don't define the SQLite3 databases path in config.toml, Vuls uses the ones in the same directory as the Vuls binaries.
Scanning and reporting command is the following.

```bash
$ which vuls
/usr/loca/bin/vuls
$ ls config.toml
config.toml
$ ls *.sqlite3
oval.sqlite3 go-cti.sqlite3 go-exploitdb.sqlite3 go-kev.sqlite3 go-msfdb.sqlite3 gost.sqlite3 cve.sqlite3
$ vuls scan
$ vuls report
$ vuls tui
```
