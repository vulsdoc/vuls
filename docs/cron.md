---
id: cron
title: Cron
sidebar_label: Cron
---

- crontab
- shell script

## cron

If you use local scan mode for cron jobs, don't forget to add below line to `/etc/sudoers` on RHEL/Fedora/CentOS/AlmaLinux/Rocky Linux. (username: vuls)

```bash
Defaults:vuls !requiretty
```
