---
id: usage-tui
title: TUI(Terminal Based Viewer)
sidebar_label: TUI
---

## Display the latest scan results

```
$ vuls tui -h
tui:
        tui
                [-refresh-cve]
                [-config=/path/to/config.toml]
                [-cvss-over=7]
                [-diff]
                [-ignore-unscored-cves]
                [-ignore-unfixed]
                [-results-dir=/path/to/results]
                [-log-dir=/path/to/log]
                [-debug]
                [-debug-sql]
                [-pipe]
                [-cvedb-type=sqlite3|mysql|postgres|redis]
                [-cvedb-path=/path/to/cve.sqlite3]
                [-cvedb-url=http://127.0.0.1:1323 or DB connection string]
                [-ovaldb-type=sqlite3|mysql|redis]
                [-ovaldb-path=/path/to/oval.sqlite3]
                [-ovaldb-url=http://127.0.0.1:1324 or DB connection string]
                [-gostdb-type=sqlite3|mysql|redis]
                [-gostdb-path=/path/to/gost.sqlite3]
                [-gostdb-url=http://127.0.0.1:1325 or DB connection string]
                [-exploitdb-type=sqlite3|mysql|redis]
                [-exploitdb-path=/path/to/exploitdb.sqlite3]
                [-exploitdb-url=http://127.0.0.1:1325 or DB connection string]
                [-http="http://vuls-report-server"]

  -config string
        /path/to/toml (default "/Users/kanbe/go/src/github.com/future-architect/vuls/config.toml")
  -cvss-over float
        -cvss-over=6.5 means reporting CVSS Score 6.5 and over (default: 0 (means report all))
  -debug
        debug mode
  -debug-sql
        debug SQL
  -diff
        Difference between previous result and current result
  -ignore-unfixed
        Don't report the unfixed CVEs
  -ignore-unscored-cves
        Don't report the unscored CVEs
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -pipe
        Use stdin via PIPE
  -refresh-cve
        Refresh CVE information in JSON file under results dir
  -results-dir string
        /path/to/results (default "/Users/kanbe/go/src/github.com/future-architect/vuls/results")
  -cvedb-sqlite3-path string
        /path/to/sqlite3
  -cvedb-type string
        DB type of go-cve-dictionary (sqlite3, mysql, postgres or redis) (default "sqlite3")
  -cvedb-url string
        http://go-cve-dictionary.com:1323 or DB connection string
  -gostdb-sqlite3-path string
        /path/to/sqlite3
  -gostdb-type string
        DB type of gost (sqlite3, mysql, postgres or redis)
  -gostdb-url string
        http://gost.com:1325 or DB connection string
  -ovaldb-sqlite3-path string
        /path/to/sqlite3
  -ovaldb-type string
        DB type of goval-dictionary (sqlite3, mysql, postgres or redis)
  -ovaldb-url string
        http://goval-dictionary.com:1324 or DB connection string
  -exploitdb-sqlite3-path string
        /path/to/sqlite3
  -exploitdb-type string
        DB type of go-exploitdb (sqlite3, mysql, postgres or redis)
  -exploitdb-url string
        http://go-exploitdb.com:1326 or DB connection string
  -http string
        -to-http http://vuls-report

```

![report-list](/img/docs/hello-vuls-tui.png)

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

