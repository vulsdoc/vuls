---
id: usage-windows
title: Scan Windows
sidebar_label: Scan Windows
---

## Scan Windows

Vuls v0.23 supports Windows vulnerability detection.

Vuls detects vulnerabilities that are fixed by unapplied KBs or zero-day vulnerabilities for which no KBs have been released.  
Therefore, it is necessary to examine the KB application status of the machine to be detected.  
Vuls uses the Windows Update API and can be configured for Windows Update at `[servers.xxx-xxx-xxx-xxx.windows]`.


* config.toml
```toml
[servers]

[servers.127-0-0-1]
host                = "127.0.0.1"
port               = "22"
user               = "root"
scanMode           = ["fast"]
scanModules        = ["ospkg"]

[servers.127-0-0-1.windows]
serverSelection = 3
cabPath = "/path/to/wsusscn2.cab"
```

- `serverSelection`: set the server to search for updates. (0: Default, 1: Managed Server (e.g. WSUS), 2: Windows Update, 3: Others)

- `cabPath`: describes the path to the local cab file to be used when `serverSelection = 3`. The latest Wsusscn2.cab file is available for download at the following location: [Download Wsusscn2.cab](https://catalog.s.download.windowsupdate.com/microsoftupdate/v6/wsusscan/wsusscn2.cab)
