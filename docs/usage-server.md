---
id: usage-server
title: Server
sidebar_label: Server
---

```bash
$ vuls server -h
Server:
	Server
		[-lang=en|ja]
		[-config=/path/to/config.toml]
		[-log-to-file]
		[-log-dir=/path/to/log]
		[-confidence-over=80]
		[-cvss-over=7]
		[-ignore-unscored-cves]
		[-ignore-unfixed]
		[-to-localfile]
		[-http-proxy=http://192.168.0.1:8080]
		[-debug]
		[-debug-sql]
		[-listen=localhost:5515]

		[RFC3339 datetime format under results dir]
  -config string
    	/path/to/toml (default "/Users/kanbe/go/src/github.com/future-architect/vuls/config.toml")
  -confidence-over int
      -confidence-over=40 means reporting Confidence Score 40 and over (default: 80) (default 80)
  -cvss-over float
    	-cvss-over=6.5 means Servering CVSS Score 6.5 and over (default: 0 (means Server all))
  -debug
    	debug mode
  -debug-sql
    	SQL debug mode
  -http-proxy string
    	http://proxy-url:port (default: empty)
  -ignore-unfixed
    	Don't show the unfixed CVEs
  -ignore-unscored-cves
    	Don't Server the unscored CVEs
  -lang string
    	[en|ja] (default "en")
  -listen string
    	host:port (default: localhost:5515) (default "localhost:5515")
  -log-dir string
    	/path/to/log (default "/var/log/vuls")
  -log-to-file
    	Output log to file
  -results-dir string
    	/path/to/results (default "/Users/kanbe/go/src/github.com/future-architect/vuls/results")
  -to-localfile
    	Write report to localfile

```

## Endpoint

- `/vuls`
  - For vulnerability detection
- `/health`
  - For health check

## Content-Types

- `application/json`
- `text/plain`

### text/plain

#### Headers

- X-Vuls-OS-Family (required)
  - OS Family of your target server (rhel, fedora, centos, alma, rocky, amazon, ubuntu and debian, raspbian)
- X-Vuls-OS-Release (required)
  - OS Family of your target server  (e.g. 6.9, 16.04, etc.)
- X-Vuls-Kernel-Release (required)
  - Kernel release of your target server  (e.g. 2.6.32-696.6.3.el6.x86_64)
  - Collect by a command such as `uname -r`
- X-Vuls-Kernel-Version (optional)
  - Required when Debian (e.g. 3.16.51-2)
  - Collect by a command such as `uname -a | awk '{print $7}'`
- X-Vuls-Server-Name (optional)
  - Required when using `-to-localfile` option)
  - Server name of your target server (e.g. web01)

```bash
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: centos" -H "X-Vuls-OS-Release: 6.9" -H "X-Vuls-Kernel-Release: 2.6.32-696.30.1.el6.x86_64" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://localhost:5515/vuls
```

Set the above setting to cron.

### application/json

Send JSON to your Vuls server.
This is supposed to be used from programs etc.

Like the following JSON.

```json
$ cat centos6.json
{
  "family": "centos",
  "release": "6.9",
  "runningKernel": {
    "release": "2.6.32-696.6.3.el6.x86_64",
    "version": "",
    "rebootRequired": false
  },
  "packages": {
    "ntp": {
      "name": "ntp",
      "version": "4.2.6p5",
      "release": "10.el6.centos.2",
      "arch": "x86_64"
    },
    "openssh": {
      "name": "openssh",
      "version": "5.3p1",
      "release": "122.el6",
      "arch": "x86_64"
    }
  }
}
```

```bash
$ curl -X POST -H "Content-Type: application/json" -d @centos6.json http://localhost:5515/vuls
```

## Supported OS

- RHEL
- Fedora
- CentOS
- Alma Linux
- Rocky Linux
- Amazon Linux
- Debian
- Raspbian(Raspberry Pi OS)
- Ubuntu
- SLES

## Example: One liner scan

Change `[Your Vuls Server]` to your host name or IP address of the Vuls server.

### Prepare Vuls server

Vuls server responds the scan result.

```bash
$ vuls server -listen 0.0.0.0:5515
[Aug 25 18:10:49]  INFO [localhost] Validating config...
[Aug 25 18:10:49]  INFO [localhost] cve-dictionary: /Users/teppei/src/github.com/future-architect/vuls/cve.sqlite3
[Aug 25 18:10:49]  INFO [localhost] oval-dictionary: /Users/teppei/src/github.com/future-architect/vuls/oval.sqlite3
INFO[08-25|18:10:49] Opening DB.                              db=sqlite3
INFO[08-25|18:10:49] Migrating DB.                            db=sqlite3
[Aug 25 18:10:49]  INFO [localhost] Listening on 0.0.0.0:5515
```

### RHEL/CentOS

Log in your target server and execute only one command.

RHEL

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $7}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

Fedora

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/fedora-release`" -H "X-Vuls-OS-Release: `awk '{print $3}' /etc/fedora-release`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

CentOS 6

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $3}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

CentOS 7

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $4}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

### Oracle Linux

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/oracle-release`" -H "X-Vuls-OS-Release: `awk '{print $5}' /etc/oracle-release`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

### Amazon Linux

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ export AMAZON_LINUX_RELEASE=$(awk '{if ($0 ~ /Amazon\ Linux\ release\ 2/) printf("%s %s",$4, $5); else if ($0 ~ /Amazon\ Linux\ 2/) for (i=3; i<=NF; i++) printf("%s ", $i); else if (NF==5) print $5}' /etc/system-release)
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/system-release`" -H "X-Vuls-OS-Release: $AMAZON_LINUX_RELEASE" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

### Debian

`X-Vuls-Kernel-Version` header is also required.

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ export KERNEL_RELEASE=$(uname -r)
$ export KERNEL_VERSION=$(uname -a | awk '{print $7}')
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: debian" -H "X-Vuls-OS-Release: `cat /etc/debian_version`" -H "X-Vuls-Kernel-Release: ${KERNEL_RELEASE}" -H "X-Vuls-Kernel-Version: ${KERNEL_VERSION}" -H "X-Vuls-Server-Name: `hostname`" --data-binary "$(dpkg-query -W -f="\${binary:Package},\${db:Status-Abbrev},\${Version},\${Source},\${source:Version}\n")" http://${VULS_SERVER}:5515/vuls
```

### Ubuntu

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `lsb_release -si | awk '{print tolower($1)}'`" -H "X-Vuls-OS-Release: `lsb_release -sr | awk '{print $1}'`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "$(dpkg-query -W -f="\${binary:Package},\${db:Status-Abbrev},\${Version},\${Source},\${source:Version}\n")" http://${VULS_SERVER}:5515/vuls > $LOCAL_REPORT
```

## Example: Save scan results to Vuls server

Change `[Your Vuls Server]` to your host name or IP address of the Vuls server.

### Vuls server

Vuls server saves the sent scan results to local.

```bash
$ vuls server -listen 0.0.0.0:5515 -to-localfile
```

### Client

Log in your target server and execute only one command.
`X-Vuls-Server-Name` header is also required.

```bash
$ export VULS_SERVER=[Your Vuls Server]
$ export SERVER_NAME=$(hostname)

# For RHEL
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-Server-Name: ${SERVER_NAME}" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $7}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls

# For RedHat/CentOS 6
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-Server-Name: ${SERVER_NAME}" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $3}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls

# For RedHat/CentOS 7
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-Server-Name: ${SERVER_NAME}" -H "X-Vuls-OS-Family: `awk -F: '{print $3}' /etc/system-release-cpe`" -H "X-Vuls-OS-Release: `awk -F: '{print $5}' /etc/system-release-cpe`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

## Example: Collect the scan results from Vuls agent

Vuls agent scans the target servers and sent the scan results to Vuls server.

### Vuls server

Vuls server saves the sent scan results to local.

```bash
$ vuls server -listen 0.0.0.0:5515 -to-localfile
```

### Client

Install Vuls to the target server.
Scan normally and sent the scan results to Vuls server by `-to-http` option.

```bash
$ vuls scan
$ export VULS_SERVER=[Your Vuls Server]
$ export VULS_HTTP_URL=http://${VULS_SERVER}:5515/vuls
$ vuls report -to-http
```

## Example: Send the server information to the server in the form of JSON

Vuls server responds the scan result.

### Vuls server

Vuls server saves the sent scan results to local.

```bash
$ vuls server -listen 0.0.0.0:5515 -to-localfile
```

### RHEL/CentOS

```json
$ cat centos6.json
{
  "family": "centos",
  "release": "6.9",
  "runningKernel": {
    "release": "2.6.32-696.6.3.el6.x86_64",
    "version": "",
    "rebootRequired": false
  },
  "packages": {
    "ntp": {
      "name": "ntp",
      "version": "4.2.6p5",
      "release": "10.el6.centos.2",
      "arch": "x86_64"
    },
  }
}

$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: application/json" -d @centos6.json http://${VULS_SERVER}:5515/vuls
```

### Amazon Linux

You need release got by a command such as below.

```bash
# e.g. "2 (Karoo), 2022 (Amazon Linux)"
RELEASE=$(awk '{if ($0 ~ /Amazon\ Linux\ release\ 2022/) for (i=4; i<=NF; i++) printf("%s ", $i); else if ($0 ~ /Amazon\ Linux\ 2022/) for (i=3; i<=NF; i++) printf("%s ", $i); else if ($0 ~ /Amazon\ Linux\ release\ 2/) printf("%s %s",$4, $5); else if ($0 ~ /Amazon\ Linux\ 2/) for (i=3; i<=NF; i++) printf("%s ", $i); else if (NF==5) print $5}' /etc/system-release)
```

```json
$ cat amazon2.json
{
  "family": "amazon",
  "release": "2 (Karoo)",
  "runningKernel": {
    "release": "4.9.125-linuxkit",
    "version": ""
  },
  "packages": {
    "system-release": {
      "name": "system-release",
      "version": "1:2",
      "release": "10.amzn2",
      "arch": "x86_64"
    }
  }
}

$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: application/json" -d @amazon2.json http://${VULS_SERVER}:5515/vuls
```

### Debian

You need srcPackages collected by a command such as `dpkg-query -W -f="\${binary:Package},\${db:Status-Abbrev},\${Version},\${Source},\${source:Version}\n"`

```json
$ cat debian8.json
{
  "family": "debian",
  "release": "8.10",
  "runningKernel": {
    "release": "3.16.0-4-amd64",
    "version": "3.16.51-2",
    "rebootRequired": false
  },
  "packages": {
    "bind9-host": {
      "name": "bind9-host",
      "version": "1:9.9.5.dfsg-9+deb8u15"
    }
  },
  "srcPackages": {
    "bind9": {
      "name": "bind9",
      "version": "1:9.9.5.dfsg-9+deb8u15",
      "binaryNames": [
        "bind9-host"
      ]
    }
  }
}

$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: application/json" -d @debian8.json http://${VULS_SERVER}:5515/vuls
```

### Ubuntu

```json
vagrant@jessie:~$ cat ubuntu1604.json
{
  "family": "ubuntu",
  "release": "16.04",
  "runningKernel": {
    "release": "3.16.0-4-amd64",
    "rebootRequired": false
  },
  "packages": {
    "bind9-host": {
      "name": "bind9-host",
      "version": "1:9.9.5.dfsg-9+deb8u15"
    }
  },
  "srcPackages": {
    "bind9": {
      "name": "bind9",
      "version": "1:9.9.5.dfsg-9+deb8u15",
      "binaryNames": [
        "bind9-host"
      ]
    }
  }
}

$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: application/json" -d @ubuntu1604.json http://${VULS_SERVER}:5515/vuls
```


### SLES

You may need to apply the following patch to goval-dictionnary before to fix SLES OVAL fetching: https://github.com/vulsio/goval-dictionary/pull/108

```json
$ cat sles12.json
{
  "family": "suse.linux.enterprise.server",
  "release": "12.1",
  "packages": {
    "openssl": {
      "name": "openssl",
      "version": "1.0.1i-34.1",
      "arch" : "x86_64"
    }
  }
}

$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: application/json" -d @sles12.json http://${VULS_SERVER}:5515/vuls
```
