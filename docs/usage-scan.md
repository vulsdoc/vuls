---
id: usage-scan
title: Scan
sidebar_label: Scan
---

```bash
$ vuls scan -help
scan:
        scan
                [-config=/path/to/config.toml]
                [-results-dir=/path/to/results]
                [-log-dir=/path/to/log]
                [-cachedb-path=/path/to/cache.db]
                [-ssh-native-insecure]
                [-ssh-config]
                [-containers-only]
                [-skip-broken]
                [-http-proxy=http://192.168.0.1:8080]
                [-ask-key-password]
                [-timeout=300]
                [-timeout-scan=7200]
                [-debug]
                [-pipe]

                [SERVER]...
  -ask-key-password
        Ask ssh privatekey password before scanning
  -cachedb-path string
        /path/to/cache.db (local cache of changelog for Ubuntu/Debian)
  -config string
        /path/to/toml
  -containers-only
        Scan containers only. Default: Scan both of hosts and containers
  -debug
        debug mode
  -http-proxy string
        http://proxy-url:port (default: empty)
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -pipe
        Use stdin via PIPE
  -results-dir string
        /path/to/results
  -skip-broken
        [For CentOS] yum update changelog with --skip-broken option
  -ssh-config
        [Deprecated] Use SSH options specified in ssh_config preferentially
  -ssh-native-insecure
        Use Native Go implementation of SSH. Default: Use the external command
  -timeout int
        Number of seconds for processing other than scan (default 300)
  -timeout-scan int
        Number of second for scanning vulnerabilities for all servers (default 7200)
```

## fast scan

fast scan mode scans with no root-privilege, no deps on scan target server.
fast For details about fast scan mode, see below.
You need to execute `vuls configtest` to check the configuration of the target server before scanning.
For details about fast scan mode, see below.

* [Architecture/fast](architecture-fast-scan.md)
* [Configtest/fast scan](usage-configtest.md#fast-scan-mode)

### fast scan with internet access

* config.toml

```bash
[servers]

[servers.localhost]
host         = "192.168.100.111" # or "127.0.0.1"
port         = "22"
scanMode     = ["fast"]
```

### fast scan without internet access

* config.toml

```bash
[servers]

[servers.localhost]
host         = "192.168.100.111" # or "127.0.0.1"
port         = "22"
scanMode     = ["fast", "offline"]
```

## fast-root scan

fast-root scan mode scans with root-privilege.
You need to execute `vuls configtest` to check the configuration of the target server before scanning.
For details about fast-root scan mode, see below.

* [Architecture/fast-root](architecture-fast-root-scan.md)
* [Configtest/fast-root scan](usage-configtest.md#fast-root-scan-mode)

### fast-root scan with internet access

* config.toml

```bash
[servers]

[servers.localhost]
host         = "192.168.100.111" # or "127.0.0.1"
port         = "22"
scanMode     = ["fast-root"]
```

### fast-root scan without internet access

* config.toml

```bash
[servers]

[servers.localhost]
host         = "192.168.100.111" # or "127.0.0.1"
port         = "22"
scanMode     = ["fast-root", "offline"]
```

## deep scan

* same as fast-root scan mode for now.

## -ssh-native-insecure option

Vuls supports different types of SSH.

By Default, external SSH command will be used.
This is useful If you want to use ProxyCommand or cipher algorithm of SSH that is not supported by native go implementation.  
Don't forget to add below line to /etc/sudoers on the target servers. (username: vuls)

```bash
Defaults:vuls !requiretty
```

To use native Go implementation from crypto/ssh, specify this option.  
This is useful in situations where you may not have access to traditional UNIX tools.
But it is important to note that this mode does not check the host key.

## -ask-key-password option

| SSH key password |  -ask-key-password | |
|:-----------------|:-------------------|:----|
| empty password   |                 -  | |
| with password    |           required | or use ssh-agent |

## Example: Scan all servers defined in config file

```bash
$ vuls scan -ask-key-password
```

With this sample command, it will ..

* Ask SSH key password before scanning
* Scan all servers defined in config file

## Example: Scan specific servers

```bash
$ vuls scan server1 server2
```

With this sample command, it will ..

* Use SSH Key-Based authentication with empty password (without -ask-key-password option)
* Scan only 2 servers (server1, server2)

## Example: Scan via shell instead of SSH

Vuls scans localhost instead of SSH if the host address is `localhost or 127.0.0.1` and the port is `local` in config.
For more details, see [Architecture section](architecture-local-scan.md)

* config.toml

  ```bash
  [servers]

  [servers.localhost]
  host         = "localhost" # or "127.0.0.1"
  port         = "local"
  ```

## Example: Scan `Running` containers (Docker/LXD/LXC)

It is common that keep containers running without SSHd daemon.
see [Docker Blog:Why you don't need to run SSHd in your Docker containers](https://blog.docker.com/2014/06/why-you-dont-need-to-run-sshd-in-docker/)

### Docker

Vuls scans `running` Docker containers via `docker exec` instead of SSH.
For more details, see [Architecture section](architecture-remote-scan.html)

If you don’t want to use root, create a Unix group called docker and add users to it
For details, see [docker manual](https://docs.docker.com/install/linux/linux-postinstall/)

#### To scan all of running containers

  `"${running}"` needs to be set in the containers item.

  ```toml
  [servers]

  [servers.172-31-4-82]
  host         = "172.31.4.82"
  user        = "ec2-user"
  keyPath     = "/home/username/.ssh/id_rsa"
  containerType = "docker"
  containersIncluded = ["${running}"]
  ```

#### To scan specific running containers

  The container ID or container name needs to be set in the containers item.  
  In the following example, only `container_name_a` and `4aa37a8b63b9` will be scanned.  
  Be sure to check these containers are running state before scanning.  
  If specified containers are not running, Vuls gives up scanning with printing error message.

  ```toml
  [servers]

  [servers.172-31-4-82]
  host         = "172.31.4.82"
  user        = "ec2-user"
  keyPath     = "/home/username/.ssh/id_rsa"
  containerType = "docker"
  containersIncluded = ["container_name_a", "4aa37a8b63b9"]
  ```

#### To scan except specific running containers

```toml
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containerType = "docker"
containersIncluded = ["${running}"]
containersExcluded = ["container_name_a", "4aa37a8b63b9"]
```

#### To scan containers only (Docker Host will not be scanned)

  --containers-only option is available.

### LXD

Vuls scans lxd via `lxc exec` instead of SSH.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containertype = "lxd"
containersIncluded = ["${running}"]
containersExcluded = ["container_name_a", "4aa37a8b63b9"]
```

### LXC

Vuls scans lxc via `lxc-attach` instead of SSH.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containertype = "lxc"
containersIncluded = ["${running}"]
containersExcluded = ["container_name_a", "4aa37a8b63b9"]

```

LXC required root privilege.

Example of /etc/sudoers on target servers

```bash
vuls ALL=(ALL) NOPASSWD:SETENV: /usr/bin/lxc-attach -n *, /usr/bin/lxc-ls *
```

## Example: scan WordPress (core, plugin, theme)

For Details, see [usage-scan-wordpress](usage-scan-wordpress.md)
