---
id: usage-scan-port
title: Scan Port by External Port Scanner
sidebar_label: Scan Port
---

## Scan Port by External Port Scanner(nmap)

Starting with Vuls v0.13, port scanning is available to make related vulnerabilities more visible.

Unless you write the config `[servers.xxx-xxx-xxx-xxx.portscan]`, it will use the port scanning feature of the Vuls built-in.
The following config.toml will use an external scanner (currently only nmap is supported) in `scannerBinPath` to scan ports.

* config.toml
```toml
[servers]

[servers.127-0-0-1]
host                = "127.0.0.1"
port               = "22"
user               = "root"
scanMode           = ["fast-root"]
scanModules        = ["ospkg", "port"]

[servers.127-0-0-1.portscan]
scannerBinPath = "/usr/bin/nmap"
hasPrivileged = true
scanTechniques = ["sS"]
sourcePort = "65535"
```

- `scannerBinPath`: PATH to the external scanner to be executed for port scanning in Vuls. Currently only nmap is supported.

- `hasPrivileged`: Allows you to specify whether you have enough privileges to perform operations that require root privileges on UNIX systems (`--privileged`). The following options affect `scanTechniques`, `sourcePort`. If you want to use this function as a non-root user, you need to set the capability appropriately. Try running the following command, and if the capability is set as well, it should work well. See also [this document](https://github.com/future-architect/vuls/pull/1207#issuecomment-827036315).

```terminal
$ getcap /usr/bin/nmap
/usr/bin/nmap = cap_net_bind_service,cap_net_admin,cap_net_raw+eip
```

- `scanTechniques`: Allows you to specify the method of port scanning. Currently, the following are supported. Note that you need to set `hasPrivileged` to true if you want to use a scanning method other than `-sT`.

```
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sN/sF/sX: TCP Null, FIN, and Xmas scans.
```

- `sourcePort`: packets will be sent from the specified single port number, if possible(`-g`). The port number can be from 0 to 65535, but if 0 is specified, it may not work on all systems, so a validation error is raised. `sourcePort(-g)` is incompatible with the default TCPConnect scan (`-sT`). If you want to set the source port, use a raw scan such as `-sS`.

### Refs
- Nmap: https://nmap.org/