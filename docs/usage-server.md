---
id: usage-server
title: Server
sidebar_label: Server
---

```
$ vuls server -h
Server:
	Server
		[-lang=en|ja]
		[-config=/path/to/config.toml]
		[-log-dir=/path/to/log]
		[-cvss-over=7]
		[-ignore-unscored-cves]
		[-ignore-unfixed]
		[-to-localfile]
		[-format-json]
		[-http-proxy=http://192.168.0.1:8080]
		[-debug]
		[-debug-sql]
		[-listen=localhost:5515]
		[-cvedb-type=sqlite3|mysql|postgres|redis|http]
		[-cvedb-sqlite3-path=/path/to/cve.sqlite3]
		[-cvedb-url=http://127.0.0.1:1323 or DB connection string]
		[-ovaldb-type=sqlite3|mysql|redis|http]
		[-ovaldb-sqlite3-path=/path/to/oval.sqlite3]
		[-ovaldb-url=http://127.0.0.1:1324 or DB connection string]
		[-gostdb-type=sqlite3|mysql|redis|http]
		[-gostdb-sqlite3-path=/path/to/gost.sqlite3]
		[-gostdb-url=http://127.0.0.1:1325 or DB connection string]
		[-exploitdb-type=sqlite3|mysql|redis|http]
		[-exploitdb-sqlite3-path=/path/to/exploitdb.sqlite3]
		[-exploitdb-url=http://127.0.0.1:1326 or DB connection string]
		[-msfdb-type=sqlite3|mysql|redis|http]
		[-msfdb-sqlite3-path=/path/to/msfdb.sqlite3]
		[-msfdb-url=http://127.0.0.1:1327 or DB connection string]

		[RFC3339 datetime format under results dir]
  -config string
    	/path/to/toml (default "/Users/kanbe/go/src/github.com/future-architect/vuls/config.toml")
  -cvedb-sqlite3-path string
    	/path/to/sqlite3
  -cvedb-type string
    	DB type of go-cve-dictionary (sqlite3, mysql, postgres, redis or http)
  -cvedb-url string
    	http://go-cve-dictionary.com:1323 or DB connection string
  -cvss-over float
    	-cvss-over=6.5 means Servering CVSS Score 6.5 and over (default: 0 (means Server all))
  -debug
    	debug mode
  -debug-sql
    	SQL debug mode
  -exploitdb-sqlite3-path string
    	/path/to/sqlite3
  -exploitdb-type string
    	DB type of exploit (sqlite3, mysql, postgres, redis or http)
  -exploitdb-url string
    	http://exploit.com:1326 or DB connection string
  -format-json
    	JSON format
  -gostdb-sqlite3-path string
    	/path/to/sqlite3
  -gostdb-type string
    	DB type of gost (sqlite3, mysql, postgres, redis or http)
  -gostdb-url string
    	http://gost.com:1325 or DB connection string
  -http-proxy string
    	http://proxy-url:port (default: empty)
  -ignore-unfixed
    	Don't Server the unfixed CVEs
  -ignore-unscored-cves
    	Don't Server the unscored CVEs
  -lang string
    	[en|ja] (default "en")
  -listen string
    	host:port (default: localhost:5515) (default "localhost:5515")
  -log-dir string
    	/path/to/log (default "/var/log/vuls")
  -msfdb-sqlite3-path string
    	/path/to/sqlite3
  -msfdb-type string
    	DB type of msf (sqlite3, mysql, postgres, redis or http)
  -msfdb-url string
    	http://metasploit.com:1327 or DB connection string
  -ovaldb-sqlite3-path string
    	/path/to/sqlite3
  -ovaldb-type string
    	DB type of goval-dictionary (sqlite3, mysql, postgres, redis or http)
  -ovaldb-url string
    	http://goval-dictionary.com:1324 or DB connection string
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

## Support Content-Type
- `application/json`
- `text/plain`

### text/plain

#### Headers
- X-Vuls-OS-Family (required)
  - OS Family of your target server (rhel, centos, amazon, ubuntu and debian)
- X-Vuls-OS-Release (required)
  - OS Family of your target server  (e.g. 6.9, 16.04, etc.)
- X-Vuls-Kernel-Release (required)
  - Kernel release of your target server  (e.g. 2.6.32-696.6.3.el6.x86_64)
  - Collect by a command such as `uname -r`
- X-Vuls-Kernel-Version (optional)
  - Required when Debian (e.g. 3.16.51-2)
  - Collect by a command sushch as `uname -a | awk '{print $7}'`
- X-Vuls-Server-Name (optional)
  - Required when using `-to-localfile` option)
  - Server name of your target server (e.g. web01)


```
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: centos" -H "X-Vuls-OS-Release: 6.9" -H "X-Vuls-Kernel-Release: 2.6.32-696.30.1.el6.x86_64" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://localhost:5515/vuls
```

Set the above setting to cron.


### application/json
Send JSON to your Vuls server.  
This is supposed to be used from programs etc.

Like the following JSON.
```
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

```
$ curl -X POST -H "Content-Type: application/json" -d @centos6.json http://localhost:5515/vuls
```


## Support OS
- RHEL
- CentOS
- Amazon Linux
- Debian
- Ubuntu


## Example: One liner scan
Change `[Your Vuls Server]` to your host name or IP address of the Vuls server.

### Prepare Vuls server
Vuls server responds the scan result.

```
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

CentOS 6

```
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $3}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

CentOS 7

```
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $4}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

### Amazon Linux
```
$ export VULS_SERVER=[Your Vuls Server]
$ export AMAZON_LINUX_RELEASE=$(awk '{if ($0 ~ /Amazon\ Linux\ release\ 2/) printf("%s %s",$4, $5); else if ($0 ~ /Amazon\ Linux\ 2/) for (i=3; i<=NF; i++) printf("%s ", $i); else if (NF==5) print $5}' /etc/system-release)
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/system-release`" -H "X-Vuls-OS-Release: $AMAZON_LINUX_RELEASE" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

### Debian
`X-Vuls-Kernel-Version` header is also required.

```
$ export VULS_SERVER=[Your Vuls Server]
$ export KERNEL_RELEASE=$(uname -r)
$ export KERNEL_VERSION=$(uname -a | awk '{print $7}')
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: debian" -H "X-Vuls-OS-Release: 8.10" -H "X-Vuls-Kernel-Release: ${KERNEL_RELEASE}" -H "X-Vuls-Kernel-Version: ${KERNEL_VERSION}" --data-binary "$(dpkg-query -W -f="\${binary:Package},\${db:Status-Abbrev},\${Version},\${Source},\${source:Version}\n")" http://${VULS_SERVER}:5515/vuls
```

### Ubuntu

```
$ export VULS_SERVER=[Your Vuls Server]
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-OS-Family: `lsb_release -si | awk '{print tolower($1)}'`" -H "X-Vuls-OS-Release: `lsb_release -sr | awk '{print $1}'`" -H "X-Vuls-Kernel-Release: `uname -r`" -H "X-Vuls-Server-Name: `hostname`" --data-binary "$(dpkg-query -W -f="\${binary:Package},\${db:Status-Abbrev},\${Version},\${Source},\${source:Version}\n")" http://${VULS_SERVER}:5515/vuls > $LOCAL_REPORT
```

## Example: Save scan results to Vuls server
Change `[Your Vuls Server]` to your host name or IP address of the Vuls server.

### Vuls server
Vuls server saves the sent scan results to local.

```
$ vuls server -listen 0.0.0.0:5515 -to-localfile -format-json 
```

### Client
Log in your target server and execute only one command.  
`X-Vuls-Server-Name` header is also required.

```
$ export VULS_SERVER=[Your Vuls Server]
$ export SERVER_NAME=$(hostname)

# For RedHat/CentOS 6
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-Server-Name: ${SERVER_NAME}" -H "X-Vuls-OS-Family: `awk '{print tolower($1)}' /etc/redhat-release`" -H "X-Vuls-OS-Release: `awk '{print $3}' /etc/redhat-release`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls

# For RedHat/CentOS 7
$ curl -X POST -H "Content-Type: text/plain" -H "X-Vuls-Server-Name: ${SERVER_NAME}" -H "X-Vuls-OS-Family: `awk -F: '{print $3}' /etc/system-release-cpe`" -H "X-Vuls-OS-Release: `awk -F: '{print $5}' /etc/system-release-cpe`" -H "X-Vuls-Kernel-Release: `uname -r`" --data-binary "`rpm -qa --queryformat "%{NAME} %{EPOCHNUM} %{VERSION} %{RELEASE} %{ARCH}\n"`" http://${VULS_SERVER}:5515/vuls
```

## Example: Collect the scan results from Vuls agent
Vuls agent scans the target servers and sent the scan results to Vuls server.

### Vuls server
Vuls server saves the sent scan results to local.

```
$ vuls server -listen 0.0.0.0:5515 -to-localfile -format-json 
```

### Client
Install Vuls to the target server.  
Scan normally and sent the scan results to Vuls server by `-to-http` option.

```
$ vuls scan
$ export VULS_SERVER=[Your Vuls Server]
$ export VULS_HTTP_URL=http://${VULS_SERVER}:5515/vuls
$ vuls report -to-http
```

## Example: Send the server information to the server in the form of JSON
Vuls server responds the scan result.

### Vuls server
Vuls server saves the sent scan results to local.

```
$ vuls server -listen 0.0.0.0:5515 -to-localfile -format-json 
```

### RHEL/CentOS

```
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
```
# e.g. "2 (Karoo)"
RELEASE=$(awk '{if ($0 ~ /Amazon\ Linux\ release\ 2/) printf("%s %s",$4, $5); else if ($0 ~ /Amazon\ Linux\ 2/) for (i=3; i<=NF; i++) printf("%s ", $i); else if (NF==5) print $5}' /etc/system-release)
```

```
$ cat amazon2.json
{
  "family": "amazon",
  "release": "2 (Karoo)",
  "runningKernel": {
    "release": "4.9.125-linuxkit",
    "rersion": ""
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
```
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

```
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
