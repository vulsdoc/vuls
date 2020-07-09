---
id: install-manually
title: Install Manually
sidebar_label: Install Manually
---

## Install Requirements

### Linux Distributions
The following example should work on Fedora based Linux distributions,
which include: CentOS, RedHat, Amazon Linux etc (tested on CentOS and
Amazon Linux).

### Packages
Vuls requires the following packages.

- SQLite3, MySQL, PostgreSQL, Redis
- git
- gcc
- GNU Make
- Greater than or equal to Go v1.13 (The latest version is recommended)
    - https://golang.org/doc/install

```bash
$ ssh <user>@<IP> -i ~/.ssh/private.pem
$ export latest_version=1.14.2 # Latest Go release as of writing
$ sudo yum -y install sqlite git gcc make wget
$ wget https://dl.google.com/go/go$latest_version.linux-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go$latest_version.linux-amd64.tar.gz
$ mkdir $HOME/go
```
Add these lines into /etc/profile.d/goenv.sh
(you'll need sudo access)

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
$ sudo chown <user> /var/log/vuls
$ sudo chmod 700 /var/log/vuls
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


If you want results in Japanese, you also need to fetch the JVN data.
It takes about 10 minutes (on AWS).

```bash
$ cd $HOME
$ for i in `seq 1998 $(date +"%Y")`; do go-cve-dictionary fetchjvn -years $i; done
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
$ ln -s $GOPATH/src/github.com/kotakanbe/goval-dictionary/oval.sqlite3 $HOME/oval.sqlite3
```
The binary was built under `$GOPATH/bin`

 Then fetch OVAL data of Red Hat since the server to be scanned is CentOS. [README](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)

```bash
$ goval-dictionary fetch-redhat 7
```

If you would like to scan other Linux distributions then retrieve the OVAL data according to the OS type and version of scan target server in advance.

- [Alpine](https://github.com/kotakanbe/goval-dictionary#usage-fetch-alpine-secdb-as-oval-data-type)
- [Red Hat, CentOS](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-redhat)
- [Debian](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-debian)
- [Ubuntu](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-ubuntu)
- [Oracle Linux](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-oracle)
- [SUSE](https://github.com/kotakanbe/goval-dictionary#usage-fetch-oval-data-from-suse)


## Deploy gost

[gost (go-security-tracker)](https://github.com/knqyf263/gost)
> version Vuls 0.5.0 now possible to detect vulnerabilities that patches have not been published from distributors using new datasource named gost.


```bash
$ sudo mkdir /var/log/gost
$ sudo chown <user> /var/log/gost
$ sudo chmod 700 /var/log/gost
$ mkdir -p $GOPATH/src/github.com/knqyf263
$ cd $GOPATH/src/github.com/knqyf263
$ git clone https://github.com/knqyf263/gost.git
$ cd gost
$ make install
$ ln -s $GOPATH/src/github.com/knqyf263/gost/gost.sqlite3 $HOME/gost.sqlite3
```
The binary was built under `$GOPATH/bin`

 Then fetch security tracker for RedHat since the server to be scanned is CentOS. [README](https://github.com/knqyf263/gost#fetch-redhat)

```bash
$ gost fetch redhat
```

To fetch Debian security tracker, See [gost README](https://github.com/knqyf263/gost#fetch-debian)

## Deploy go-exploitdb

[go-exploitdb](https://github.com/mozqnet/go-exploitdb)
> New version Vuls 0.6.0 now possible to display exploit codes have been published at [Exploit DB.com](https://www.exploit-db.com/). If you don't need to know about exploit code for detected CVEs, skip this section.

```bash
$ sudo mkdir /var/log/go-exploitdb
$ sudo chown <user> /var/log/go-exploitdb
$ sudo chmod 700 /var/log/go-exploitdb
$ mkdir -p $GOPATH/src/github.com/mozqnet
$ cd $GOPATH/src/github.com/mozqnet
$ git clone https://github.com/mozqnet/go-exploitdb.git
$ cd go-exploitdb
$ make install
$ ln -s $GOPATH/src/github.com/mozqnet/go-exploitdb/go-exploitdb.sqlite3 $HOME/go-exploitdb.sqlite3
```
The binary was built under `$GOPATH/bin`

Then fetch exploit-db information. [README](https://github.com/mozqnet/go-exploitdb#usage-fetch-and-insert-exploit)

```bash
$ go-exploitdb fetch exploitdb
```

Fetch with --deep option, Many exploits information will be obtained. But fetch time is too long...

## Deploy go-msfdb

[go-msfdb](https://github.com/takuzoo3868/go-msfdb)
> New version Vuls 0.11.0 now possible to display metasploit modules have been published at [Metasploit](https://github.com/rapid7/metasploit-framework). If you don't need to know about metasploit modules for detected CVEs, skip this section.

```bash
$ sudo mkdir /var/log/go-msfdb
$ sudo chown <user> /var/log/go-msfdb
$ sudo chmod 700 /var/log/go-msfdb
$ mkdir -p $GOPATH/src/github.com/takuzoo3868
$ cd $GOPATH/src/github.com/takuzoo3868
$ git clone https://github.com/takuzoo3868/go-msfdb.git
$ cd go-msfdb
$ make install
$ ln -s $GOPATH/src/github.com/takuzoo3868/go-msfdb/go-msfdb.sqlite3 $HOME/go-msfdb.sqlite3
```
The binary was built under `$GOPATH/bin`

Then fetch msf-db information. [README](https://github.com/takuzoo3868/go-msfdb#usage-fetch-and-insert-modules-info)

```bash
$ go-msfdb fetch msfdb
```

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

## Test Installation

[Local Scan Mode: From Configuration to Reporting](https://github.com/vulsdoc/vuls/blob/master/docs/tutorial-local-scan.md#step3-configuration)
