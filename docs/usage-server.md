---
id: usage-server
title: Server
sidebar_label: Server
---

## 

```
Server:
        Server
                [-lang=en|ja]
                [-config=/path/to/config.toml]
                [-log-dir=/path/to/log]
                [-cvss-over=7]
                [-diff]
                [-ignore-unscored-cves]
                [-ignore-unfixed]
                [-to-email]
                [-to-slack]
                [-to-stride]
                [-to-hipchat]
                [-to-chatwork]
                [-to-localfile]
                [-to-s3]
                [-to-azure-blob]
                [-format-json]
                [-format-xml]
                [-format-one-email]
                [-format-one-line-text]
                [-format-list]
                [-format-full-text]
                [-http-proxy=http://192.168.0.1:8080]
                [-debug]
                [-debug-sql]
                [-listen=localhost:5515]
                [-cvedb-type=sqlite3|mysql|postgres|redis]
                [-cvedb-path=/path/to/cve.sqlite3]
                [-cvedb-url=http://127.0.0.1:1323 or DB connection string]
                [-ovaldb-type=sqlite3|mysql|redis]
                [-ovaldb-path=/path/to/oval.sqlite3]
                [-ovaldb-url=http://127.0.0.1:1324 or DB connection string]
                [-gostdb-type=sqlite3|mysql|redis]
                [-gostdb-path=/path/to/gost.sqlite3]
                [-gostdb-url=http://127.0.0.1:1325 or DB connection string]

                [RFC3339 datetime format under results dir]
  -config string
        /path/to/toml (default "/Users/kanbe/go/src/github.com/future-architect/vuls/config.toml")
  -cvedb-path string
        /path/to/sqlite3
  -cvedb-type string
        DB type of go-cve-dictionary (sqlite3, mysql, postgres or redis) (default "sqlite3")
  -cvedb-url string
        http://go-cve-dictionary.com:1323 or DB connection string
  -cvss-over float
        -cvss-over=6.5 means Servering CVSS Score 6.5 and over (default: 0 (means Server all))
  -debug
        debug mode
  -debug-sql
        SQL debug mode
  -format-json
        JSON format
  -gostdb-path string
        /path/to/sqlite3
  -gostdb-type string
        DB type of gost (sqlite3, mysql, postgres or redis)
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
  -ovaldb-path string
        /path/to/sqlite3
  -ovaldb-type string
        DB type of goval-dictionary (sqlite3, mysql, postgres or redis)
  -ovaldb-url string
        http://goval-dictionary.com:1324 or DB connection string
  -results-dir string
        /path/to/results (default "/Users/kanbe/go/src/github.com/future-architect/vuls/results")
  -to-localfile
        Write report to localfile
```

