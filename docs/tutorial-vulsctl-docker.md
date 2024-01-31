---
id: tutorial-vulsctl-docker
title: Tutorial - Vulsctl
sidebar_label: Scan with Vulsctl
---

## Vulsctl Tutorial

[Vuls](https://github.com/future-architect/vuls) is an agent-less vulnerability scanner for Linux, FreeBSD, Container, WordPress, Programming language libraries, Network devices.

This tutorial explains how to perform a vulnerability scan using [Vulsctl](https://github.com/vulsio/vulsctl), an easy setup tool for Vuls.

- Scan Host OS (CentOS) vulnerabilities
- Scan Ubuntu via SSH
- Application-dependent library vulnerability scan
- CPE Scanning of Network Device OS

Vuls provides a Docker image on DockerHub. This tutorial is a tutorial on scanning with the official Vuls image; the official Docker Hub repository is [here](https://hub.docker.com/orgs/vuls/repositories).

---

## Environmental Settings

Prepare one Linux machine for the Vuls setup.
Any major Linux will work.

The following spec is recommended.

- Disk: About 15 GB is enough.
- ~~4GB or more of memory is recommended.~~
  - ~~Vulnerability DB (NVD) fetch consumes about 2.5 GB of memory.~~
  - ~~If it's not enough, it will be out of memory.~~
  - ~~t3.medium is fine (AWS EC2).~~
  - Since [go-cve-dictionary-v0.8.1](https://github.com/vulsio/go-cve-dictionary/releases/tag/v0.8.1), memory consumption has been reduced, You can use a smaller instance.

In this tutorial, we will use CentOS 7 as an example.

Install git by connecting to it via SSH.

```bash
$ sudo yum install git
```

Next, install Docker and configure it so that you can run the docker command without root privileges.

  - https://docs.docker.com/install/linux/docker-ce/centos/
  - https://docs.docker.com/install/linux/linux-postinstall/

Clone [vulsio/vulsctl](https://github.com/vulsio/vulsctl), which is full of useful scripts. You can clone it anywhere, but this time you will clone it to `$HOME/vulsctl`

```bash
$ cd
$ git clone https://github.com/vulsio/vulsctl.git
Cloning into 'vuls-vulsctl'...
remote: Enumerating objects: 14, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 14 (delta 4), reused 12 (delta 2), pack-reused 0
Unpacking objects: 100% (14/14), done.
```

If you have previously set up vulsctl, update it to the latest version.

```bash
$ cd vulsctl
$ git pull
```

The rest of the operations are done in the **vulsctl/docker**.

```bash
$ cd docker
$ pwd
/home/vuls/vulsctl/docker
```

---

## Scan Host OS (CentOS) vulnerabilities

---

### Configuring SSH Public Key Authentication.

To scan from the Vuls Docker container via SSH to the host OS, you need to configure SSH.

Vuls `remote scan mode` only supports SSH public key authentication.
Create a key pair and SSH to the server to be scanned beforehand. To register the fingerprint of the server to be scanned in `$HOME/.ssh/known_hosts`.
This time, create a key with no password. Make sure you can SSH without a password prompt.
If you see the password prompt, you can't scan, so you need to review your SSH settings and configure your SSH to use public key authentication with no password.
If you need to use a key with password, see the tips of [Scan in Docker container](tips.md#scan-in-docker-container)

```bash
$ ssh-keygen -q -f ~/.ssh/id_rsa -N ""
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/*
$ ssh vuls@192.168.56.3
$ exit
```

---

### Creating config.toml

Next, you need to prepare a configuration file.

Vuls uses the TOML configuration file, `config.toml`, to configure the server to be scanned, and so on. A template for remote scanning can be found in [here](https://github.com/vulsio/vulsctl/blob/master/config.toml.remotescan). 
You can define multiple servers to scan in config.toml. In this case, only one server is defined.
In config.toml, you can set up the information needed to SSH to the server you want to scan.

- IP address
- SSH port number
- User Name
- Private Key for SSH

For details of config.toml, please refer to [Manual](https://vuls.io/docs/en/config.toml.html).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ cat config.toml 
[servers]
[servers.host]
host        = "192.168.56.3"
port        = "22"
user        = "vuls"
keyPath     = "/root/.ssh/id_rsa"
```

Note that this tutorial is a Docker-based setup, so be careful with the keyPath in config.toml.
The keyPath is not the path in Host OS, but the path in the Docker container.
In [vulsctl/scan.sh](https://github.com/vulsio/vulsctl/blob/master/docker/scan.sh#L19), we have mounted it as `-v $HOME/.ssh:/root/.ssh:ro`, so the The path in the container, /root/.ssh/ir_rsa.

---

### Scan

Now, let's run the scan using the configuration file we prepared earlier.

[vulsctl/scan.sh](https://github.com/vulsio/vulsctl/blob/master/docker/scan.sh) is a script to scan based on the information set in config.toml. The scan results will be stored in JSON format under `$PWD/results` and will be used when reporting. You can specify the server to be scanned by the command line arguments. Since `host` is specified as command-line args, the server [servers.host] defined in config.toml will be scanned.

Vuls uses the SSH information defined in config.toml to SSH to the server to be scanned and issue commands on it.
There are several scanning modes, but in this case, the default [fast scan mode](https://vuls.io/docs/en/architecture-fast-scan.html) will be used as we haven't specified anything in config.toml.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh host
[Sep 12 07:08:38]  INFO [localhost] Validating config...
[Sep 12 07:08:38]  INFO [localhost] Detecting Server/Container OS... 
[Sep 12 07:08:38]  INFO [localhost] Detecting OS of servers... 
[Sep 12 07:08:39]  INFO [localhost] (1/1) Detected: hostos: centos 7.6.1810
[Sep 12 07:08:39]  INFO [localhost] Detecting OS of static containers... 
[Sep 12 07:08:39]  INFO [localhost] Detecting OS of containers... 
[Sep 12 07:08:39]  INFO [localhost] Checking Scan Modes...
[Sep 12 07:08:39]  INFO [localhost] Checking dependencies...
[Sep 12 07:08:39]  INFO [hostos] Dependencies ... Pass
[Sep 12 07:08:39]  INFO [localhost] Checking sudo settings...
[Sep 12 07:08:39]  INFO [hostos] Sudo... Pass
[Sep 12 07:08:39]  INFO [localhost] It can be scanned with fast scan mode even if warn or err messages are displayed due to lack of dependent packages or sudo settings in fast-root or deep scan mode
[Sep 12 07:08:39]  INFO [localhost] Scannable servers are below...
host
[Sep 12 07:08:39]  INFO [localhost] Start scanning
[Sep 12 07:08:39]  INFO [localhost] config: /vuls/config.toml
[Sep 12 07:08:39]  INFO [localhost] Validating config...
[Sep 12 07:08:39]  INFO [localhost] Detecting Server/Container OS... 
[Sep 12 07:08:39]  INFO [localhost] Detecting OS of servers... 
[Sep 12 07:08:40]  INFO [localhost] (1/1) Detected: host: centos 7.6.1810
[Sep 12 07:08:40]  INFO [localhost] Detecting OS of static containers... 
[Sep 12 07:08:40]  INFO [localhost] Detecting OS of containers... 
[Sep 12 07:08:40]  INFO [localhost] Checking Scan Modes... 
[Sep 12 07:08:40]  INFO [localhost] Detecting Platforms... 
[Sep 12 07:08:40]  INFO [localhost] (1/1) host is running on aws
[Sep 12 07:08:40]  INFO [localhost] Detecting IPS identifiers... 
[Sep 12 07:08:40]  INFO [localhost] (1/1) host has 0 IPS integration
[Sep 12 07:08:40]  INFO [localhost] Scanning vulnerabilities... 
[Sep 12 07:08:40]  INFO [localhost] Scanning vulnerable OS packages...
[Sep 12 07:08:40]  INFO [host] Scanning in fast mode


One Line Summary
================
host centos7.6.1810  359 installed, 63 updatable
```

---

### Fetch OVAL DB

Next, fetch the vulnerability DB in the OVAL format provided by Linux distributors.

As we have scanned CentOS this time, we will fetch it with ``--redhat``; for other distributions such as Ubuntu, you can fetch it with the corresponding option. For more information about options, please refer to the following page.

> For reference: If you target a Debian based distribution, OVAL will be skipped when generating a report. <br/>
> You can use the command ``$ ./gost.sh --debian`` instead to have a working DB for the report.sh script. 

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./oval.sh --redhat
INFO[09-12|06:28:12] Fetching...                              URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL6.xml.bz2
INFO[09-12|06:28:12] Fetching...                              URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL7.xml.bz2
INFO[09-12|06:28:12] Fetching...                              URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL8.xml.bz2
INFO[09-12|06:28:13] Fetched...                               URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL8.xml.bz2
INFO[09-12|06:28:13] Fetched...                               URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL6.xml.bz2
INFO[09-12|06:28:13] Fetched...                               URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL7.xml.bz2
INFO[09-12|06:28:13] Finished fetching OVAL definitions 
INFO[09-12|06:28:13] Fetched                                  URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL8.xml.bz2 OVAL definitions=60
INFO[09-12|06:28:13] Refreshing...                            Family=redhat Version=8
INFO[09-12|06:28:14] Fetched                                  URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL6.xml.bz2 OVAL definitions=1130
INFO[09-12|06:28:14] Refreshing...                            Family=redhat Version=6
INFO[09-12|06:28:16] Fetched                                  URL=https://www.redhat.com/security/data/oval/com.redhat.rhsa-RHEL7.xml.bz2 OVAL definitions=887
INFO[09-12|06:28:16] Refreshing...                            Family=redhat Version=7
$ ls oval.sqlite3
oval.sqlite3
$ ls -alh oval.sqlite3
-rw-r--r--. 1 root root 11M Sep 12 06:28 oval.sqlite3
```

---

### report

Now that the vulnerability DB is ready. Run the report.

Use [vulsctl/report.sh](https://github.com/vulsio/vulsctl/blob/master/docker/report.sh) to display the results.
Identify potential CVE-IDs in the server to be scanned using the information in the JSON created by scan.sh and the OVAL provided by Red Hat, which we fetched earlier.
See [documentation](https://vuls.io/docs/en/usage-report.html) for details.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./report.sh
[Sep 12 07:12:10]  INFO [localhost] Validating config...
[Sep 12 07:12:10]  INFO [localhost] Loaded: /vuls/results/2019-09-12T07:08:40Z
[Sep 12 07:12:10]  INFO [localhost] Validating db config...
INFO[0000] -cvedb-type: sqlite3, -cvedb-url: , -cvedb-path: /vuls/cve.sqlite3 
INFO[0000] -ovaldb-type: sqlite3, -ovaldb-url: , -ovaldb-path: /vuls/oval.sqlite3 
INFO[0000] -gostdb-type: sqlite3, -gostdb-url: , -gostdb-path: /vuls/gost.sqlite3 
INFO[0000] -exploitdb-type: sqlite3, -exploitdb-url: , -exploitdb-path: /vuls/go-exploitdb.sqlite3 
[Sep 12 07:12:10]  WARN [localhost] --cvedb-path=/vuls/cve.sqlite3 file not found. [CPE-scan](https://vuls.io/docs/en/usage-scan-non-os-packages.html#cpe-scan) needs cve-dictionary. if you specify cpe in config.toml, fetch cve-dictionary before reporting. For details, see `https://github.com/vulsio/go-cve-dictionary#deploy-go-cve-dictionary`
[Sep 12 07:12:10]  WARN [localhost] --gostdb-path=/vuls/gost.sqlite3 file not found. Vuls can detect `patch-not-released-CVE-ID` using gost if the scan target server is Debian, RHEL or CentOS, For details, see `https://github.com/vulsio/gost#fetch- f`
[Sep 12 07:12:10]  WARN [localhost] --exploitdb-path=/vuls/go-exploitdb.sqlite3 file not found. Fetch go-exploit-db before reporting if you want to display exploit codes of detected CVE-IDs. For details, see `https://github.com/vulsio/go-exploitdb`
[Sep 12 07:12:10]  INFO [localhost] host: 0 CVEs are detected with Library
[Sep 12 07:12:10]  INFO [localhost] OVAL is fresh: redhat 7.6.1810 
[Sep 12 07:12:12]  INFO [localhost] host: 111 CVEs are detected with OVAL
[Sep 12 07:12:12]  INFO [localhost] host: 0 CVEs are detected with CPE
[Sep 12 07:12:12]  INFO [localhost] host: 0 CVEs are detected with GitHub Security Alerts
[Sep 12 07:12:12]  INFO [localhost] host: 0 unfixed CVEs are detected with gost
[Sep 12 07:12:12]  INFO [localhost] Fill CVE detailed information with CVE-DB
[Sep 12 07:12:12]  INFO [localhost] Fill exploit information with Exploit-DB
[Sep 12 07:12:12]  INFO [localhost] host: 0 exploits are detected
host (centos7.6.1810)
=======================
Total: 111 (High:57 Medium:39 Low:15 ?:0), 35/111 Fixed, 359 installed, 63 updatable, 0 exploits, en: 0, ja: 0 alerts

+------------------+------+--------+-----+------+---------+---------------------------------------------------+
|      CVE-ID      | CVSS | ATTACK | POC | CERT |  FIXED  |                        NVD                        |
+------------------+------+--------+-----+------+---------+---------------------------------------------------+
| CVE-2019-10160   |  9.8 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-10160   |
| CVE-2019-9636    |  9.8 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-9636    |
| CVE-2016-10745   |  9.0 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2016-10745   |
| CVE-2019-11085   |  8.8 |  AV:L  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-11085   |
| CVE-2018-5743    |  8.6 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2018-5743    |
| CVE-2018-1000876 |  7.8 |  AV:L  |     |      | unfixed | https://nvd.nist.gov/vuln/detail/CVE-2018-1000876 |
| CVE-2018-18281   |  7.8 |  AV:L  |     |      | unfixed | https://nvd.nist.gov/vuln/detail/CVE-2018-18281   |
| CVE-2019-11811   |  7.8 |  AV:L  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-11811   |
| CVE-2019-6974    |  7.8 |  AV:L  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-6974    |
| CVE-2018-14618   |  7.5 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2018-14618   |
| CVE-2018-16871   |  7.5 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2018-16871   |
| CVE-2019-11477   |  7.5 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-11477   |
| CVE-2019-3855    |  7.5 |  AV:N  |     |      |   fixed | https://nvd.nist.gov/vuln/detail/CVE-2019-3855    |
...snip
```

---

### TUI

Vuls has a terminal-based viewer that allows you to view the results in the terminal. Let's try it out here.

Use [vulsctl/tui.sh](https://github.com/vulsio/vulsctl/blob/master/docker/tui.sh) to view the results in the console. Tab to move the pane, arrow or jk to move it, and Ctrl-C to exit.

See [documentation](https://vuls.io/docs/en/usage-tui.html) for details.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./tui.sh --cvss-over=7
```

![tui](https://user-images.githubusercontent.com/16035056/89534161-7965d200-d82f-11ea-959c-f01f4cc2cd23.png)

---

## Overview

![overview](https://user-images.githubusercontent.com/534611/66093182-20535f00-e5ca-11e9-8060-8c9247abcefa.jpg)

---

## Scan Ubuntu

Vuls can easily scan for vulnerabilities on any SSH-enabled  remote Linux/FreeBSD.

Prepare a Ubuntu server and set up an SSH public key authentication and run SSH once before the scan.

Next, add the SSH information of the Ubuntu server to the configuration file for the scan.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ cat config.toml
[servers]
[servers.ubuntu]
host        = "192.168.56.4"
port        = "22"
user        = "vuls"
keyPath     = "/root/.ssh/id_rsa"
```

Perform a scan.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh ubuntu
```

The report requires an additional Vulnerability DB for Ubuntu (OVAL).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./oval.sh --ubuntu
$ ./report.sh
$ ./tui.sh
```

If you scan other Linux distributions, please prepare a corresponding OVAL in advance as well. Please refer to the documentation for details.

- [vulsctl/docker/oval.sh](https://github.com/vulsio/vulsctl/blob/master/docker/oval.sh)
- [vulsio/goval-dictionary](https://github.com/vulsio/goval-dictionary)

---

## Show not-fixed-yet vulnerabilities

There are a number of vulnerabilities for which CVE-IDs have been issued, but no update package is available(henceforth referred to as `not-fixed-yet vulnerability`), and Vuls can also detect `not-fixed-yet vulnerability`.

To detect these vulnerabilities, you need an additional vulnerability database.
Use the following command to obtain the vulnerability DB using [vulsio/gost](https://github.com/vulsio/gost).

gost only supports Red Hat, CentOS, and Debian. For other OS, fetching gost's DB does not affect the detection accuracy.
However, it is recommended to fetch gost to add CVSS and Summary information, because Red Hat CVE information is rich and useful.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./gost.sh --redhat
Using default tag: latest
latest: Pulling from vuls/gost
5d20c808ce19: Already exists
c0f752a1fc26: Pull complete
919f8990415c: Pull complete
Digest: sha256:679a4306d67e0b0992fd43b46c4a2fe4d27a51a1e2d9394e19471c5df02c399c
Status: Downloaded newer image for vuls/gost:latest
docker.io/vuls/gost:latest
INFO[09-12|15:00:33] Initialize Database
2019-09-12T15:00:33.903Z        DEBUG   db path: db/trivy.db
2019-09-12T15:00:33.929Z        DEBUG   remove an existed directory
INFO[09-12|15:02:13] Opening DB.                              db=sqlite3
INFO[09-12|15:02:13] Migrating DB.                            db=sqlite3
INFO[09-12|15:02:13] Insert RedHat into DB                    db=sqlite3
 0 / 20000 [------------------------------------------------------------------------------------------------------------------------------------------------------------------------]   0.00%INFO[09-12|15:02:13] Insert 20000 CVEs
 20000 / 20000 [===============================================================================================================================================================] 100.00% 2m2s
```

In my environment, it took about 10 minutes.

- report

The number of vulnerability detections has increased.
Vulnerabilities that `not-fixed-yet vulnerability` is shown as "Unfixed".

---

## Show PoC/Exploit (Metasploit Framework)

Reports can show whether Exploit for detected CVE-IDs is in [Metasploit Framework](https://www.metasploit.com/). A CVE with an attack module is considered to be easily attackable by the tool, so the risk is higher than a CVE without an attack module.

Fetch [go-msfdb](https://github.com/vulsio/go-msfdb).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./msfdb.sh
Using default tag: latest
latest: Pulling from vuls/go-msfdb
cbdbe7a5bc2a: Pull complete
936c30013c05: Pull complete
dabcf4a113d0: Pull complete
Digest: sha256:124027eec3f5157447102dafaaae638037d3587936ed5f68055c822e8acc8f02
Status: Downloaded newer image for vuls/go-msfdb:latest
docker.io/vuls/go-msfdb:latest
INFO[08-29|08:03:48] Opening DB                               db=sqlite3
INFO[08-29|08:03:48] Init DB                                  db=sqlite3
INFO[08-29|08:03:48] Migrating DB                             db=sqlite3
INFO[08-29|08:03:48] Fetching vulsio/msfdb-list
INFO[08-29|08:03:48] git clone                                repo=/root/.cache/go-msfdb/msfdb-list
Cloning into '/root/.cache/go-msfdb/msfdb-list'...
remote: Enumerating objects: 1835, done.
remote: Counting objects: 100% (1835/1835), done.
remote: Compressing objects: 100% (1834/1834), done.
remote: Total 1835 (delta 26), reused 128 (delta 0), pack-reused 0
Receiving objects: 100% (1835/1835), 945.52 KiB | 1.17 MiB/s, done.
Resolving deltas: 100% (26/26), done.
INFO[08-29|08:03:51] Updated files                            count=1978
INFO[08-29|08:03:51] Metasploit-Framework modules             count=2216
INFO[08-29|08:03:51] Insert info into go-msfdb.             db=sqlite3
INFO[08-29|08:03:51] Inserting Modules having CVEs...
2216 / 2216 [-----------------------------------------------------------------------------------------------------------------------------] 100.00% 1979 p/s
INFO[08-29|08:03:53] CveID Metasploit Count                   count=2216
```

It took about 5 seconds in my environment.

Scan again, and the report will show you the information for the Metasploit module.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh
$ ./tui.sh
```

![metasploit](https://user-images.githubusercontent.com/18602067/86435971-34381700-bd3c-11ea-94fb-11230c7f1373.png)

---

## Show PoC/Exploit (Exploit Database)

The [Exploit Database](https://github.com/offensive-security/exploitdb/) has collected over 43,000 PoCs. 

Vuls can show if a PoC exists for each CVE-ID detected by Vuls, which means that vulnerabilities with a PoC are riskier than those without. However, it is unclear whether the PoC detected is a works fine or not, so it needs to be verified by the user.

Fetch [go-exploitdb](https://github.com/vulsio/go-exploitdb).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./exploitdb.sh
Using default tag: latest
latest: Pulling from vuls/go-exploitdb
36ccefbf3d8a: Already exists 
84ce22b2ba2c: Pull complete 
b1b2d52f4b6e: Pull complete 
4f4fb700ef54: Pull complete 
Digest: sha256:90c7d3a7c5fc6636a024c1eb33bb23f856e1d170d6c4f6ed11e6d619f1ea6f7e
Status: Downloaded newer image for vuls/go-exploitdb:latest
docker.io/vuls/go-exploitdb:latest
go-exploitdb  
INFO[03-24|23:31:07] Fetching Offensive Security Exploit 
INFO[03-24|23:31:07] Fetching                                 URL=https://cve.mitre.org/data/downloads/allitems-cvrf.xml
INFO[03-24|23:32:07] Fetching                                 URL=https://raw.githubusercontent.com/offensive-security/exploitdb/master/files_shellcodes.csv
INFO[03-24|23:32:07] Fetching                                 URL=https://raw.githubusercontent.com/offensive-security/exploitdb/master/files_exploits.csv
INFO[03-24|23:32:08] Fetching                                 URL=https://raw.githubusercontent.com/offensive-security/exploitdb-papers/master/files_papers.csv
INFO[03-24|23:32:08] Offensive Security Exploit               count=49153
INFO[03-24|23:32:08] Insert Exploit into go-exploitdb.        db=sqlite3
INFO[03-24|23:32:08] Inserting 49153 Exploits 
INFO[03-24|23:32:08] Inserting new Exploits 
49153 / 49153 [---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00% 41581 p/s
INFO[03-24|23:32:10] No CveID Exploit Count                   count=36406
INFO[03-24|23:32:10] CveID Exploit Count                      count=12747
INFO[03-24|23:32:10] Fetching Awesome Poc Exploit 
INFO[03-24|23:32:11] Awesome Poc Exploit                      count=823
INFO[03-24|23:32:11] Insert Exploit into go-exploitdb.        db=sqlite3
INFO[03-24|23:32:11] Inserting 823 Exploits 
INFO[03-24|23:32:11] Inserting new Exploits 
823 / 823 [-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00% ? p/s
INFO[03-24|23:32:11] No CveID Exploit Count                   count=0
INFO[03-24|23:32:11] CveID Exploit Count                      count=823
INFO[03-24|23:32:11] Fetching GitHub Repos Exploit 
WARN[03-24|23:32:11] Recommend installing git (if not, DB update is very slow) 
INFO[03-24|23:32:37] GitHub Repos Exploit                     count=2808
INFO[03-24|23:32:37] Insert Exploit into go-exploitdb.        db=sqlite3
INFO[03-24|23:32:37] Inserting 2808 Exploits 
INFO[03-24|23:32:37] Inserting new Exploits 
2808 / 2808 [---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00% ? p/s
INFO[03-24|23:32:37] No CveID Exploit Count                   count=0
INFO[03-24|23:32:37] CveID Exploit Count                      count=2808
INFO[03-24|23:32:38] Fetching inTheWild Poc Exploit 
INFO[03-24|23:32:48] inTheWild Poc Exploit                    count=71653
INFO[03-24|23:32:48] Insert Exploit into go-exploitdb.        db=sqlite3
INFO[03-24|23:32:48] Inserting 71653 Exploits 
INFO[03-24|23:32:48] Inserting new Exploits 
71653 / 71653 [---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------] 100.00% 52870 p/s
INFO[03-24|23:32:49] No CveID Exploit Count                   count=0
INFO[03-24|23:32:49] CveID Exploit Count                      count=71653
```

Scan again and view the report to see the PoC information in the Exploit Database.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh
$ ./tui.sh
```

![exploitdb](https://user-images.githubusercontent.com/534611/47980916-24060980-e10d-11e8-954a-14ab148017f0.png)

---

## Show CISA Known Exploited Vulnerabilities Alert

The [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) has a list of CVE-IDs that have actually been exploited in attacks.

Vuls can show whether a detected CVE-ID is a CVE-ID in the CISA Known Exploited Vulnerabilities Catalog.

Fetch [go-kev](https://github.com/vulsio/go-kev).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./kev.sh
Using default tag: latest
latest: Pulling from vuls/go-kev
97518928ae5f: Pull complete 
62b85d17d49f: Pull complete 
dc5e1f7a485e: Pull complete 
Digest: sha256:f0f0fc109d6de6b160b82c72ba6a70df65ff5ca28bf727be0d122b9d918508e5
Status: Downloaded newer image for vuls/go-kev:latest
docker.io/vuls/go-kev:latest
go-kev  
INFO[04-15|17:13:38] Fetching Known Exploited Vulnerabilities 
INFO[04-15|17:13:38] Fetching                                 URL=https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
INFO[04-15|17:13:39] Insert Known Exploited Vulnerabilities into go-kev. db=sqlite3
INFO[04-15|17:13:39] Inserting Known Exploited Vulnerabilities... 
644 / 644 [-------------------------------------------------------------------------------] 100.00% ? p/s
INFO[04-15|17:13:39] CveID Count                              count=644
```

Scan again and view the report to see the CISA Known Exploited Vulnerabilities Alert.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh
$ ./tui.sh
```

![cisa-kev](https://user-images.githubusercontent.com/16035056/143046990-ba3f1345-5396-466f-a98a-58cc871801e8.png)

---

## Show Cyber Threat Intelligence(MITER ATT&CK and CAPEC)

The [Cyber Threat Intelligence(MITRE ATT&CK and CAPEC)](https://github.com/mitre/cti) has information on attack techniques, etc.

Vuls displays the Cyber Threat Intelligence associated with the detected CVE-ID.

Fetch [go-cti](https://github.com/vulsio/go-cti).

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./cti.sh
Using default tag: latest
latest: Pulling from vuls/go-cti
97518928ae5f: Pull complete 
62b85d17d49f: Pull complete 
dc5e1f7a485e: Pull complete 
Digest: sha256:f0f0fc109d6de6b160b82c72ba6a70df65ff5ca28bf727be0d122b9d918508e5
Status: Downloaded newer image for vuls/go-cti:latest
docker.io/vuls/go-cti:latest
go-cti
INFO[04-20|03:27:56] Fetching Cyber Threat Intelligence and CVE-ID to CTI-ID Mappings 
INFO[04-20|03:27:56] Fetching MITRE ATT&CK... 
INFO[04-20|03:27:57] Fetching CAPEC... 
INFO[04-20|03:27:57] Fetching CWE... 
INFO[04-20|03:28:01] Fetching NVD CVE...                      year=recent
INFO[04-20|03:28:03] Fetching NVD CVE...                      year=modified
INFO[04-20|03:28:05] Fetching NVD CVE...                      year=2002
INFO[04-20|03:28:07] Fetching NVD CVE...                      year=2003
INFO[04-20|03:28:09] Fetching NVD CVE...                      year=2004
INFO[04-20|03:28:12] Fetching NVD CVE...                      year=2005
INFO[04-20|03:28:14] Fetching NVD CVE...                      year=2006
INFO[04-20|03:28:17] Fetching NVD CVE...                      year=2007
INFO[04-20|03:28:19] Fetching NVD CVE...                      year=2008
INFO[04-20|03:28:23] Fetching NVD CVE...                      year=2009
INFO[04-20|03:28:25] Fetching NVD CVE...                      year=2010
INFO[04-20|03:28:28] Fetching NVD CVE...                      year=2011
INFO[04-20|03:28:31] Fetching NVD CVE...                      year=2012
INFO[04-20|03:28:33] Fetching NVD CVE...                      year=2013
INFO[04-20|03:28:36] Fetching NVD CVE...                      year=2014
INFO[04-20|03:28:39] Fetching NVD CVE...                      year=2015
INFO[04-20|03:28:42] Fetching NVD CVE...                      year=2016
INFO[04-20|03:28:45] Fetching NVD CVE...                      year=2017
INFO[04-20|03:28:48] Fetching NVD CVE...                      year=2018
INFO[04-20|03:28:52] Fetching NVD CVE...                      year=2019
INFO[04-20|03:28:56] Fetching NVD CVE...                      year=2020
INFO[04-20|03:29:00] Fetching NVD CVE...                      year=2021
INFO[04-20|03:29:05] Fetching NVD CVE...                      year=2022
INFO[04-20|03:29:07] Fetched Cyber Threat Intelligence and CVE-ID to CTI-ID Mappings techniques=1112 mappings=98011 attackers=672
INFO[04-20|03:29:07] Insert Cyber Threat Intelligences and CVE-ID to CTI-ID Mappings into go-cti. db=sqlite3
INFO[04-20|03:29:07] Inserting Cyber Threat Intelligences... 
INFO[04-20|03:29:07] Inserting Techniques... 
1112 / 1112 [------------------------------------------------] 100.00% 2475 p/s
INFO[04-20|03:29:08] Inserting CVE-ID to CTI-ID CveToTechniques... 
98011 / 98011 [----------------------------------------------] 100.00% 7459 p/s
INFO[04-20|03:29:21] Inserting Attackers... 
672 / 672 [-----------------------------------------------------] 100.00% ? p/s
```

Scan again and view the report to see the Cyber Threat Intelligence.

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ./scan.sh
$ ./tui.sh
```

![cti](https://user-images.githubusercontent.com/16035056/163449537-e2e5464a-37ff-49fc-b516-97b96e42074f.png)

---

## JPCERT/CC and USCERT alert information.

It is possible to obtain JPCERT/CC and US-CERT alerts and display whether the detected vulnerability corresponds to the alert information.

- [JPCERT/CC Alert](https://www.jpcert.or.jp/at/2020.html)
- [USCERT Alert](https://www.kb.cert.org/vuls/bypublished/desc/)

- [vulsio/go-cve-dictionary](https://github.com/vulsio/go-cve-dictionary) fetch.

---

## CISA Known Exploited Vulnerabilities alert information.

It is possible to obtain CISA Known Exploited Vulnerabilities alerts and display whether the detected vulnerability corresponds to the alert information.

- [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

- [vulsio/go-kev](https://github.com/vulsio/go-kev) fetch.

---

## Cyber Threat Intelligence(MITRE ATT&CK and CAPEC) information.

It is possible to obtain Cyber Threat Information(MITRE ATT&CK and CAPEC) and display whether the detected vulnerability corresponds to the Cyber Threat Information.

- [mitre/cti](https://github.com/mitre/cti)

- [vulsio/go-cti](https://github.com/vulsio/go-cti) fetch.

---

## Scan in fast-root mode

The [fast-root](https://vuls.io/docs/en/architecture-fast-root-scan.html) scan mode issues commands that require root privileges. This allows you to display process information, and network port listen information, and other information useful in making triage decisions.

```bash
[vuls@host vulsctl]$ sudo su -
[sudo] vuls password:
[root@host ~]# mkdir .ssh
[root@host ~]# chmod 700 .ssh
[root@host ~]# cat /home/vuls/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
[root@host ~]# chmod 600 /root/.ssh/*
[root@host ~]# exit
```

Check if you can connect to SSH as a root user without a password.

```bash
[vuls@host vulsctl]$ ssh root@192.168.56.3
Last login: Mon Jan 27 13:15:06 2020
[root@host ~]# exit
```

The root user can connect to SSH without a password.

Next, add the following to config.toml.
The following is added to config.toml: `scanMode = ["fast-root"]` to specify the fast-root mode.

```bash
[servers]
[servers.hostroot]
host         = "192.168.56.3"
port        = "22"
user        = "root"
keyPath     = "/root/.ssh/id_rsa"
scanMode     = ["fast-root"]
```

Scan and report.

```bash
$ ./scan.sh hostroot
$ ./report.sh
$ ./tui.sh
```

The TUI now displays process, and network port listen information.
You can now see if a process is running from a vulnerable package, including CVE, and if the process is listening to a network port. You can now make a decision to investigate if a process that is vulnerable to a network-based attack is listening to the network.

![port](https://user-images.githubusercontent.com/534611/60597057-36902a00-9de5-11e9-9d9c-3187176755a3.png)

In fast-root scan mode, additional OS packages may need to be installed in advance. Also, if you use sudo instead of root user, you need to set up /etc/sudoers on the server to be scanned.
Please refer to [documentation](https://vuls.io/docs/en/architecture-fast-scan.html#dependencies-and-etcsudoers) for details.

---

## Offline scan mode

There is also an [offline](https://vuls.io/docs/en/usage-configtest.html#fast-root-scan-mode) mode that allows you to scan even if the server you want to scan cannot connect to the Internet. Configure toml as follows.

```bash
[servers]
[servers.hostroot]
host         = "192.168.56.3"
port        = "22"
user        = "root"
keyPath     = "/root/.ssh/id_rsa"
scanMode     = ["fast", "offline"]
```

---

## Application library vulnerability detection

Vuls supports scanning for application dependency libraries.

There are several ways to do this, and it's better to try them out as they may not be suitable for your needs.

- [LockFile Scan](https://vuls.io/docs/en/usage-scan-non-os-packages.html#library-vulns-scan)
- [GitHub Integration](https://vuls.io/docs/en/usage-scan-non-os-packages.html#usage-integrate-with-github-security-alerts)
- [OWASP Dependency check](https://vuls.io/docs/en/usage-scan-non-os-packages.html#usage-integrate-with-owasp-dependency-check-to-automatic-update-when-the-libraries-are-updated-experimental)

See [Document](https://vuls.io/docs/en/usage-scan-non-os-packages.html) for details.

The next section explains how to scan with a lock file.

---

## Application library vulnerability detection (lock file specification)

It is possible to parse the lock files of package managers for programming languages such as Gem and pip and detect potential vulnerabilities in the dependent libraries defined in them. (Vuls uses [aquasecurity/trivy](https://github.com/aquasecurity/trivy) internally.)

[Documentation](https://vuls.io/docs/en/usage-scan-non-os-packages.html#library-vulns-scan).

The following lock files are supported for now.

- Gemfile.lock
- Pipfile.lock
- poetry.lock
- composer.lock
- package-lock.json
- yarn.lock
- Cargo.lock

So let's try scanning [old Redmine Gemfile.lock](https://github.com/41studio/redmine/blob/master/Gemfile.lock) on GitHub.

First, we'll use wget to get the old Gemfile.lock on the scan target server.

```bash
$ # Execute on the scan target server
$ pwd
/home/vuls/vulsctl/docker
$ wget https://raw.githubusercontent.com/41studio/redmine/master/Gemfile.lock
```

Specify the path of the lockfiles in config.toml.

```bash
[servers]
[servers.host]
host         = "192.168.56.3"
port        = "22"
user        = "vuls"
keyPath     = "/root/.ssh/id_rsa"
lockfiles = [ "/home/vuls/vulsctl/docker/Gemfile.lock" ]
```

Scan and report.

```bash
$ ./scan.sh hostroot
$ ./report.sh
$ ./tui.sh
```

![library](https://user-images.githubusercontent.com/534611/85486162-11538780-b605-11ea-80af-f93222262bf7.png)

---

## CPE Scan.

Vuls can detect vulnerabilities in network devices and commercial middleware by defining [CPE](https://nvd.nist.gov/products/cpe) in config.toml. The OS package scan is done by actually SSH into the server and issuing the command. However, the CPE scan is detected by comparing the versions of the NVD and JVN databases. It does not issue commands on the device and does not access the device via a network.

Here's a sample config.toml: `type="pseudo"`.
If `type="pseudo"` is specified, you can change the mode to not connect to SSH.

```bash
[servers.forti]
type = "pseudo"
cpeNames = [
    "cpe:/o:fortinet:fortios:4.3.0",
]
```

Vuls need the NVD and JVN data sources for CPE scan, so use `cve.sh` to get them if they are not already fetched.

```bash
$ ./scan.sh forti
$ ./cve.sh
$ ./report.sh
$ ./tui.sh
```

![image](https://user-images.githubusercontent.com/534611/91656683-a5eed000-eaf5-11ea-92ed-3acb51688deb.png)

See [documentation](https://vuls.io/docs/en/usage-scan-non-os-packages.html#cpe-scan) for more information.

---

### Commonly used options in reports.

[vuls.io/usage-report](https://vuls.io/docs/en/usage-report.html)

Options|Description|
|:-|:-|
| -debug | Debug flags. The flag to identify the command being issued.|
| -cvss-over | Filter by CVSS score|
| -ignore-unfixed | Hide `not-fixed-yet` vulnerabilities |
| -diff | Difference from last time only (new detection only)|

---

## Fetch all vulnerable DB

Fetch all Vulnerability DB using [update-all.sh](https://github.com/vulsio/vulsctl/blob/master/docker/update-all.sh).
This will take some time ...

This will take over an hour in my environment.

```bash
$ ./update-all.sh
```

## Misc

- [WordPress](https://vuls.io/docs/usage-scan-wordpress.html#scan-wordpress-core-plugin-theme)

- [Slack Notification](https://vuls.io/docs/config.toml.html#slack-section)

- [Scan running containers](https://vuls.io/docs/usage-scan.html#example-scan-running-containers-docker-lxd-lxc)
