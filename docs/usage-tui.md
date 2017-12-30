---
id: usage-tui
title: TUI(Terminal Based Viewer)
sidebar_label: TUI
---

## Display the latest scan results

```
tui:
        tui
                [-refresh-cve]
                [-cvedb-type=sqlite3|mysql|postgres]
                [-cvedb-path=/path/to/cve.sqlite3]
                [-cvedb-url=http://127.0.0.1:1323 DB connection string]
                [-ovaldb-type=sqlite3|mysql]
                [-ovaldb-path=/path/to/oval.sqlite3]
                [-ovaldb-url=http://127.0.0.1:1324 or DB connection string]
                [-cvss-over=7]
                [-ignore-unscored-cves]
                [-ignore-unfixed]
                [-refresh-cve]
                [-results-dir=/path/to/results]
                [-log-dir=/path/to/log]
                [-debug]
                [-debug-sql]
                [-pipe]

  -cvedb-path string
        /path/to/sqlite3 (For get cve detail from cve.sqlite3) 
  -cvedb-type string
        DB type for fetching CVE dictionary (sqlite3, mysql or postgres) (default "sqlite3")
  -cvedb-url string
        http://cve-dictionary.com:8080 DB connection string
  -ovaldb-path string
        /path/to/sqlite3 (For get oval detail from oval.sqlite3) (default "/Users/kotakanbe/go/src/github.com/future-architect/vuls/oval.sqlite3")
  -ovaldb-type string
        DB type for fetching OVAL dictionary (sqlite3 or mysql) (default "sqlite3")
  -ovaldb-url string
        http://goval-dictionary.com:1324 or mysql connection string
  -cvss-over float
        -cvss-over=6.5 means reporting CVSS Score 6.5 and over (default: 0 (means report all))
  -ignore-unfixed
        Don't report the unfixed CVEs
  -ignore-unscored-cves
        Don't report the unscored CVEs
  -debug
        debug mode
  -debug-sql
        debug SQL
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -pipe
        Use stdin via PIPE
  -refresh-cve
        Refresh CVE information in JSON file under results dir
  -results-dir string
        /path/to/results 
```

Key binding is below.

| key | |
|:-----------------|:-------|
| TAB | move cursor among the panes |
| Arrow up/down | move cursor to up/down |
| Ctrl+j, Ctrl+k | move cursor to up/down |
| Ctrl+u, Ctrl+d | page up/down |

For details, see https://github.com/future-architect/vuls/blob/master/report/tui.go

## Display the previous scan results

- Display the list of scan results.
```
$ vuls history
2016-12-30T10:34:38+09:00 1 servers: u16
2016-12-28T19:15:19+09:00 1 servers: ama
2016-12-28T19:10:03+09:00 1 servers: cent6
```

- Display the result of scan 2016-12-30T10:34:38+09:00
```
$ vuls tui 2016-12-30T10:34:38+09:00
```

# Display the previous scan results using peco

```
$ vuls history | peco | vuls tui -pipe
```

[![asciicast](https://asciinema.org/a/emi7y7docxr60bq080z10t7v8.png)](https://asciinema.org/a/emi7y7docxr60bq080z10t7v8)

