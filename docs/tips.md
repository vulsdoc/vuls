---
id: tips
title: Tips
sidebar_label: Tips
---

- Unable to go get vuls  
Update git to the latest version. Old version of git can't get some repositories.  
see https://groups.google.com/forum/#!topic/mgo-users/rO1-gUDFo_g

- HTTP Proxy Support  
If your system is behind HTTP proxy, you have to specify --http-proxy option.

- How to Daemonize go-cve-dictionary  
Use Systemd, Upstart or supervisord, daemontools...

- How to Enable Automatic-Update of Vulnerability Data.  
Use job scheduler like Cron (with -last2y option).

- How to Enable Automatic-Scan.  
Use job scheduler like Cron.  
Set NOPASSWORD option in /etc/sudoers on target servers.  
Use SSH Key-Based Authentication with no passphrase or ssh-agent.

- How to cross compile
    ```bash
    $ cd /path/to/your/local-git-reporsitory/vuls
    $ GOOS=linux GOARCH=amd64 go build -o vuls.amd64
    ```

- Logging  
Log is under /var/log/vuls/

- Debug  
Run with --debug, --sql-debug option.

- Adjusting Open File Limit  
[Riak docs](http://docs.basho.com/riak/latest/ops/tuning/open-files-limit/) is awesome.

- Does Vuls accept SSH connections with fish-shell or old zsh as the login shell?  
~~No, Vuls needs a user on the server for bash login.~~  
Yes, fixed in [#545](https://github.com/future-architect/vuls/pull/545)

- Windows  
Use Microsoft Baseline Security Analyzer. [MBSA](https://technet.microsoft.com/en-us/security/cc184924.aspx)
