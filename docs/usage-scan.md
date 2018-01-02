---
id: usage-scan
title: Scan
sidebar_label: Scan
---

```
$ vuls scan -help
scan:
        scan
                [-deep]
                [-config=/path/to/config.toml]
                [-results-dir=/path/to/results]
                [-log-dir=/path/to/log]
                [-cachedb-path=/path/to/cache.db]
                [-ssh-native-insecure]
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
  -deep
        Deep scan mode. Scan accuracy improves and information becomes richer. Since analysis of changelog, issue commands requiring sudo, but it may be slower and high load on the scan tareget server.
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
  -ssh-native-insecure
        Use Native Go implementation of SSH. Default: Use the external command
  -timeout int
        Number of seconds for processing other than scan (default 300)
  -timeout-scan int
        Number of second for scaning vulnerabilities for all servers (default 7200)
```

## -deep option

You need to execute `vuls configtest --deep` to check the configuration of the target server before scanning with -deep flag.

For details about deep scan mode, see below.  
* [Architecture/Deep Scan](architecture-deep-scan.md)
* [Configtest/Deep Scan Mode](usage-configtest.md#deep-scan-mode)

## -ssh-native-insecure option

Vuls supports different types of SSH.  

By Default, external SSH command will be used.
This is useful If you want to use ProxyCommand or cipher algorithm of SSH that is not supported by native go implementation.  
Don't forget to add below line to /etc/sudoers on the target servers. (username: vuls)
```
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
```
$ vuls scan -ask-key-password
```
With this sample command, it will ..
- Ask SSH key password before scanning
- Scan all servers defined in config file

## Example: Scan specific servers
```
$ vuls scan server1 server2
```
With this sample command, it will ..
- Use SSH Key-Based authentication with empty password (without -ask-key-password option)
- Scan only 2 servers (server1, server2)

## Example: Scan via shell instead of SSH.

Vuls scans localhost instead of SSH if the host address is `localhst or 127.0.0.1` and the port is `local` in config.
For more details, see [Architecture section](#architecture)

- config.toml
  ```
  [servers]

  [servers.localhost]
  host         = "localhost" # or "127.0.0.1"
  port         = "local"
  ```

## Example: Scan containers (Docker/LXD/LXC)

It is common that keep containers running without SSHd daemon.  
see [Docker Blog:Why you don't need to run SSHd in your Docker containers](https://blog.docker.com/2014/06/why-you-dont-need-to-run-sshd-in-docker/)

### Docker

Vuls scans Docker containers via `docker exec` instead of SSH.  
For more details, see [Architecture section](#architecture)

- To scan all of running containers  
  `"${running}"` needs to be set in the containers item.
    ```
    [servers]

    [servers.172-31-4-82]
    host         = "172.31.4.82"
    user        = "ec2-user"
    keyPath     = "/home/username/.ssh/id_rsa"

    [servers.172-31-4-82.containers]
    includes = ["${running}"]
    ```

- To scan specific containers  
  The container ID or container name needs to be set in the containers item.  
  In the following example, only `container_name_a` and `4aa37a8b63b9` will be scanned.  
  Be sure to check these containers are running state before scanning.  
  If specified containers are not running, Vuls gives up scanning with printing error message.
    ```
    [servers]

    [servers.172-31-4-82]
    host         = "172.31.4.82"
    user        = "ec2-user"
    keyPath     = "/home/username/.ssh/id_rsa"

    [servers.172-31-4-82.containers]
    includes = ["container_name_a", "4aa37a8b63b9"]
    ```

- To scan except specific containers  
    ```
    [servers]

    [servers.172-31-4-82]
    host         = "172.31.4.82"
    user        = "ec2-user"
    keyPath     = "/home/username/.ssh/id_rsa"

    [servers.172-31-4-82.containers]
    includes = ["${running}"]
    excludes = ["container_name_a", "4aa37a8b63b9"]
    ```

- To scan containers only
  - --containers-only option is available.

### LXD

Vuls scans lxd via `lxc exec` instead of SSH.  
```
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"

[servers.172-31-4-82.containers]
type = "lxd"
includes = ["${running}"]
```

### LXC

Vuls scans lxc via `lxc-attach` instead of SSH.  
```
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"

[servers.172-31-4-82.containers]
type = "lxc"
includes = ["${running}"]
```

LXC required root privilege.  

Example of /etc/sudoers on target servers

```
vuls ALL=(ALL) NOPASSWD:/usr/bin/lxc-attach -n *, /usr/bin/lxc-ls *
```
