---
id: install-manually-centos
title: Install Manually on CentOS
sidebar_label: Install Manually on CentOS
---

## Install requirements

Vuls requires the following packages.

- SQLite3, MySQL, PostgreSQL, Redis
- git
- gcc
- GNU Make
- go v1.8.3 or later (The latest version is recommended)
    - https://golang.org/doc/install

```bash
$ ssh centos@52.100.100.100  -i ~/.ssh/private.pem
$ sudo yum -y install sqlite git gcc make wget
$ wget https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.8.3.linux-amd64.tar.gz
$ mkdir $HOME/go
```
Add these lines into /etc/profile.d/goenv.sh

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

Set the OS environment variable to current shell
```bash
$ source /etc/profile.d/goenv.sh
```
## Deploy go-cve-dictionary

[go-cve-dictionary](https://github.com/kotakanbe/go-cve-dictionary)

```bash
$ sudo mkdir /var/log/vuls
$ sudo chown centos /var/log/vuls
$ sudo chmod 700 /var/log/vuls
$
$ mkdir -p $GOPATH/src/github.com/kotakanbe
$ cd $GOPATH/src/github.com/kotakanbe
$ git clone https://github.com/kotakanbe/go-cve-dictionary.git
$ cd go-cve-dictionary
$ make install
```
The binary was built under `$GOPATH/bin`

Then Fetch vulnerability data from NVD.  
It takes about 10 minutes (on AWS).  

```bash
$ cd $HOME
$ for i in `seq 2002 $(date +"%Y")`; do go-cve-dictionary fetchnvd -years $i; done
... snip ...
$ ls -alh cve.sqlite3
-rw-r--r--. 1 centos centos  51M Aug  6 08:10 cve.sqlite3
-rw-r--r--. 1 centos centos  32K Aug  6 08:10 cve.sqlite3-shm
-rw-r--r--. 1 centos centos 5.1M Aug  6 08:10 cve.sqlite3-wal
```

## Deploy goval-dictionary

[goval-dictionary](https://github.com/kotakanbe/goval-dictionary)

```bash
$ mkdir -p $GOPATH/src/github.com/kotakanbe
$ cd $GOPATH/src/github.com/kotakanbe
$ git clone https://github.com/kotakanbe/goval-dictionary.git
$ cd goval-dictionary
$ make install
```
The binary was built under `$GOPATH/bin`

 Then fetch OVAL data of RedHat since the server to be scanned is CentOS. [README](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)

```bash
$ goval-dictionary fetch-redhat 7
```

If you want to scan other than CentOS 7, fetch OVAL data according to the OS type and version of scan target server in advance.

- [Alpine](https://github.com/kotakanbe/goval-dictionary#usage-fetch-alpine-secdb-as-oval-data-type)
- [RedHat, CentOS](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)
- [Debian](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-debian)
- [Ubuntu](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-ubuntu)
- [Oracle Linux](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-oracle)
- [SUSE](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-suse)

## Deploy Vuls

```
$ mkdir -p $GOPATH/src/github.com/future-architect
$ cd $GOPATH/src/github.com/future-architect
$ git clone https://github.com/future-architect/vuls.git
$ cd vuls
$ make install
```
If you have previously installed vuls and want to update, please do the following
```
$ rm -rf $GOPATH/pkg/linux_amd64/github.com/future-architect/vuls/
$ rm -rf $GOPATH/src/github.com/future-architect/vuls/
$ cd $GOPATH/src/github.com/future-architect
$ git clone https://github.com/future-architect/vuls.git
$ cd vuls
$ make install
```

The binary was built under `$GOPATH/bin`

