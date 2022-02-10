---
id: tips
title: Tips
sidebar_label: Tips
---

## Unable to go get vuls  

Update git to the latest version. Old version of git can't get some repositories.  

## HTTP Proxy Support  

If your system is behind HTTP proxy, you have to specify --http-proxy option.

## How to Daemon-ize go-cve-dictionary  

Use Systemd, Upstart or supervisord, daemontools...

## How to Enable Automatic-Update of Vulnerability Data

Use job scheduler like Cron (with -last2y option).

## How to Enable Automatic-Scan

Use job scheduler like Cron.  
Set NOPASSWORD option in /etc/sudoers on target servers.  
Use SSH Key-Based Authentication with no passphrase or ssh-agent.

## How to scan without SSH host key check

Write `StrictHostKeyChecking no` to the config file used for SSH connection.
Then, describe the PATH to the config file used by ssh in `sshConfigPath` of config.toml.
see [setting server section](configtoml.md#servers-section), [#1005](https://github.com/future-architect/vuls/pull/1005)

## How to scan with SSH key with passphrase

Vuls calls ssh many times, so you will be asked to type password again and again when vuls scans.
If you need to scan a server with ssh-key with password, we recommend using ssh-agent.
Specifically you can use ssh-agent beforehand like below.

```bash
$ ssh-add ~/.ssh/authorized_keys
Enter passphrase for ~/.ssh/id_rsa:
Identity added: ~/.ssh/id_rsa (~/.ssh/id_rsa)
$ vuls scan ubuntu
... snip ...

One Line Summary
================
ubuntu  ubuntu16.04     30 updatable packages
```

If you run Vuls in Docker container, you can do below instead of above.

### Scan in Docker container

If you need to scan a server with ssh-key with password, you can do 1. or 2. below.

#### 1. Use ssh-agent in the container

```bash
$ pwd
/home/vuls/vulsctl/docker
$ docker run -it \
  -v $HOME/.ssh:/root/.ssh:ro \
  -v $PWD:/vuls \
  --entrypoint="/bin/ash" \
  vuls/vuls
/vuls # eval `ssh-agent`
/vuls # ssh-add /root/.ssh/id_rsa
Enter passphrase for /root/.ssh/id_rsa:
Identity added: /root/.ssh/id_rsa (/root/.ssh/id_rsa)
/vuls # vuls scan -log-dir=/vuls/log -config=/vuls/config.toml
```
Or you can do it with one-liner like this.

```bash
$ docker run -it \
  -v $HOME/.ssh:/root/.ssh:ro \
  -v $PWD:/vuls \
  --entrypoint="/bin/ash" \
  vuls/vuls \
  -c "eval \`ssh-agent\` && ssh-add /root/.ssh/id_rsa && vuls scan  -log-dir=/vuls/log -config=/vuls/config.toml"
```

#### 2. Use ssh-agent in host machine and share it with the container

```bash
$ pwd
/home/vuls/vulsctl/docker
$ ssh-add ~/.ssh/id_rsa
Enter passphrase for /Users/***/.ssh/id_rsa:
Identity added: /Users/***/.ssh/id_rsa (/Users/***/.ssh/id_rsa)
$ docker run -it \
  -v $HOME/.ssh:/root/.ssh:ro \
  -v $PWD:/vuls \
  -v $SSH_AUTH_SOCK:$SSH_AUTH_SOCK \
  -e SSH_AUTH_SOCK=$SSH_AUTH_SOCK \
  vuls/vuls scan \
  -log-dir=/vuls/log \
  -config=/vuls/config.toml \
```

If you use docker for mac, use it instead.

```bash
$ ssh-add ~/.ssh/id_rsa
Enter passphrase for /Users/***/.ssh/id_rsa:
Identity added: /Users/***/.ssh/id_rsa (/Users/***/.ssh/id_rsa)
$ docker run -it \
-v $HOME/.ssh:/root/.ssh:ro \
-v $PWD:/vuls \
-v /run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock \
-e SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock \
vuls/vuls scan \
-log-dir=/vuls/log \
-config=/vuls/config.toml \
```

## How to cross compile

```bash
$ cd /path/to/your/local-git-repository/vuls
$ GOOS=linux GOARCH=amd64 go build -o vuls.amd64 ./cmd/vuls
```

## Logging  

Log is under /var/log/vuls/

## Debug  

Run with --debug, --sql-debug option.

## Adjusting Open File Limit  

[Riak docs](https://github.com/basho/basho_docs/blob/master/content/riak/kv/2.0.6/using/performance/open-files-limit.md#changing-the-limit) is awesome.

## Does Vuls accept SSH connections with fish-shell or old zsh as the login shell

~~No, Vuls needs a user on the server for bash login.~~  
Yes, fixed in [#545](https://github.com/future-architect/vuls/pull/545)

## Windows  

Use Microsoft Baseline Security Analyzer. [MBSA](https://technet.microsoft.com/en-us/security/cc184924.aspx)
