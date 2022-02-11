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
                [-skip-broken]
                [-http-proxy=http://192.168.0.1:8080]
                [-timeout=300]
                [-timeout-scan=7200]
                [-debug]
                [-pipe]

                [SERVER]...
  -cachedb-path string
        /path/to/cache.db (local cache of changelog for Ubuntu/Debian)
  -config string
        /path/to/toml
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

removed in https://github.com/future-architect/vuls/issues/1181

## Example: Scan all servers defined in config file

```bash
$ vuls scan
```

With this sample command, it will ..

* Scan all servers defined in the config file
* Use SSH Key-Based authentication with an empty password (If you want to use a passphrase, see the tips of [How to scan with SSH key with passphrase](tips.md#how-to-scan-with-ssh-key-with-passphrase).)

## Example: Scan specific servers

```bash
$ vuls scan server1 server2
```

With this sample command, it will ..

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

#### To scan all of the running containers

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

  The container ID or container name needs to be set in the container item.  
  In the following example, only `container_name_a` and `4aa37a8b63b9` will be scanned.  
  Be sure to check these containers are running state before scanning.  
  If specified containers are not running, Vuls gives up scanning with the printing error message.

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

```
 [servers.localhost]
host = "localhost"
port = "local"
user = "vuls"
scanMode = ["fast-root"]
containersIncluded = ["${running}"]
containersOnly= true
```

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

## Example: scan a lockfile of libraries

For Details, see [Scan vulnerabilities of non-OS packages](https://vuls.io/docs/en/usage-scan-non-os-packages.html#typepseudo)

## Example: scan Port by External Port Scanner(nmap)

For Details, see [Scan Port by External Port Scanner](usage-scan-port.md)