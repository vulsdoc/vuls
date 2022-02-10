---
id: tutorial-remote-scan
title: Tutorial - Remote Scan Mode
sidebar_label: Remote Scan Mode
---

This tutorial will let you scan the vulnerabilities on the remote host via SSH with Vuls.
This can be done in the following steps.  

1. Launch new Ubuntu Linux
1. Enable to SSH from localhost
1. Configuration
1. Check config.toml and settings on the server before scanning
1. Scan
1. Reporting

We will use the Vuls server (called localhost) created in the previous tutorial.

## Step1. Launch new Ubuntu Linux

Same like as [Tutorial: Local Scan Mode#Step1. Launch CentOS7](tutorial-local-scan.md#step1-launch-centos7)  
Launch a new terminal and SSH to the Remote host.  
To add the remote host's Host Key to `$HOME/.ssh/known_hosts`, you need to log in to the remote host through SSH before scanning.

## Step2. Enable to SSH from localhost

Vuls doesn't support SSH password authentication. So you have to use SSH key-based authentication.  
Create a keypair on the localhost then append the public key to authorized_keys on the remote host.  
If you need to use a key with password, see the tips of [How to scan with SSH key with passphrase](tips.md#How-to-scan-with-SSH-key-with-passphrase)

### localhost

```bash
$ ssh-keygen -t rsa
```

Copy `~/.ssh/id_rsa.pub` to the clipboard.

### Remote Host

```bash
$ mkdir ~/.ssh
$ chmod 700 ~/.ssh
$ touch ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/authorized_keys
$ vim ~/.ssh/authorized_keys
```

Paste from the clipboard to `~/.ssh/authorized_keys`

And also, confirm that the host keys of scan target servers has been registered in the known_hosts of the localhost.
To add the remote host's Host Key to `$HOME/.ssh/known_hosts`, you need to log in to the remote host through SSH before scanning.

### localhost

```bash
$ ssh ubuntu@172.31.4.82 -i ~/.ssh/id_rsa
```

## Step3. Configure (config.toml)

### localhost

```bash
$ cd $HOME
$ cat config.toml
[servers]

[servers.ubuntu]
host         = "172.31.4.82"
port        = "22"
user        = "ubuntu"
keyPath     = "/home/centos/.ssh/id_rsa"
```

## Step4. Check config.toml and settings on the server before scanning

```bash
$ vuls configtest ubuntu
```

see [Usage: configtest](usage-configtest.md)

## Step5. Start Scanning

```bash
$ vuls scan ubuntu
... snip ...

One Line Summary
================
ubuntu  ubuntu16.04     30 updatable packages
```

## Step6. Reporting

- See [Tutorial: Local Scan#Step6. Reporting](tutorial-local-scan.md#step6-reporting)
- See [Tutorial: Local Scan#Step7. TUI](tutorial-local-scan.md#step7-tui)
- See [Tutorial: Local Scan#Step8. Web UI](tutorial-local-scan.md#step8-web-ui)
