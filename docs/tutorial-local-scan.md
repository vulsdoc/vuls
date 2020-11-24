---
id: tutorial-local-scan
title: Tutorial - Local Scan Mode
sidebar_label: Local Scan Mode
---

This tutorial will let you scan the vulnerabilities on the localhost with Vuls.
This can be done in the following steps.

1. Launch CentOS
1. Deploy Vuls
1. Configuration
1. Check config.toml and settings on the server before scanning
1. Scan
1. Reporting
1. TUI(Terminal-Based User Interface)
1. Web UI ([VulsRepo](vulsrepo.md))

## Step1. Launch CentOS7

- We are using the old AMI for this example
- Add the following to the cloud-init, to avoid auto-update at the first launch.
  - [Q: How do I disable the automatic installation of critical and important security updates on initial launch?](https://aws.amazon.com/amazon-linux-ami/faqs/?nc1=h_ls)

    ```bash
    #cloud-config
    repo_upgrade: none
    ```

## Step2. Deploy Vuls

There are several ways to set up Vuls.

An easy one is [vulsctl/install-host](https://vuls.io/docs/en/install-with-vulsctl-host.html).
It can be tedious, but you can also do [set up manually](https://vuls.io/docs/en/install-manually.html) instead of vulsctl.

## Step3. Configuration

Create a config file(TOML format).  

```bash
$ cd $HOME
$ cat config.toml
[servers]

[servers.localhost]
host = "localhost"
port = "local"
```

## Step4. Check config.toml and settings on the server before scanning

```bash
$ vuls configtest
```

see [Usage: configtest](#usage-configtest)

## Step5. Start Scanning

```bash
$ vuls scan

... snip ...

One Line Summary
================
localhost       centos7.3.1611  31 updatable packages

```

## Step6. Reporting

View one-line summary

```bash
$ vuls report -format-one-line-text

One Line Summary
================
localhost       Total: 109 (High:35 Medium:55 Low:16 ?:3)       31 updatable packages

```

View short summary

```bash
$ vuls report -format-list

localhost (centos7.3.1611)
==========================
Total: 109 (High:35 Medium:55 Low:16 ?:3)       31 updatable packages

CVE-2015-2806           10.0 HIGH (nvd)
                        Stack-based buffer overflow in asn1_der_decoding in libtasn1 before 4.4 allows
                        remote attackers to have unspecified impact via unknown vectors.
                        ---
                        https://nvd.nist.gov/vuln/detail/CVE-2015-2806
                        https://access.redhat.com/security/cve/CVE-2015-2806 (RHEL-CVE)
                        10.0/AV:N/AC:L/Au:N/C:C/I:C/A:C (nvd)
                        2.6/AV:N/AC:H/Au:N/C:N/I:N/A:P (redhat)
                        https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2015-2806
                        3.3/CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:L (redhat)
                        https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2015-2806
                        Confidence: 100 / OvalMatch

... snip ...
```

View full report.

```bash
$ vuls report -format-full-text | less
localhost (centos7.3.1611)
==========================
Total: 109 (High:35 Medium:55 Low:16 ?:3)       31 updatable packages

CVE-2015-2806
----------------
Max Score               10.0 HIGH (nvd)
nvd                     10.0/AV:N/AC:L/Au:N/C:C/I:C/A:C
redhat                  2.6/AV:N/AC:H/Au:N/C:N/I:N/A:P
redhat                  3.3/CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:L
CVSSv2 Calc             https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2015-2806
CVSSv3 Calc             https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2015-2806
Summary                 Stack-based buffer overflow in asn1_der_decoding in libtasn1 before 4.4 allows
                        remote attackers to have unspecified impact via unknown vectors.
Source                  https://nvd.nist.gov/vuln/detail/CVE-2015-2806
RHEL-CVE                https://access.redhat.com/security/cve/CVE-2015-2806
CWE-119 (nvd)           https://cwe.mitre.org/data/definitions/119.html
Package/CPE             libtasn1-3.8-3.el7 -
Confidence              100 / OvalMatch

... snip ...
```

View Japanese

```bash
$ vuls report -format-list -lang ja | less
localhost (centos7.3.1611)
==========================
Total: 109 (High:35 Medium:55 Low:16 ?:3)       31 updatable packages

CVE-2017-12188  7.6 IMPORTANT (redhat)
                Linux Kernel  におけるパストラバーサルの脆弱性
                Linux Kernel には、パストラバーサルの脆弱性が存在します。
                ---
                https://jvndb.jvn.jp/ja/contents/2017/JVNDB-2017-009311.html
                https://access.redhat.com/security/cve/CVE-2017-12188 (RHEL-CVE)
                6.9/AV:L/AC:M/Au:N/C:C/I:C/A:C (nvd)
                6.5/AV:A/AC:H/Au:S/C:C/I:C/A:C (redhat)
                6.9/AV:L/AC:M/Au:N/C:C/I:C/A:C (jvn)
                https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2017-12188
                7.6/CVSS:3.0/AV:A/AC:H/PR:H/UI:N/S:C/C:H/I:H/A:H (redhat)
                https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2017-12188
                Confidence: 100 / OvalMatch

... snip ...
```

## Step7. TUI

Vuls has Terminal-Based User Interface to display the scan result.

```bash
$ vuls tui
```

![Vuls-TUI](/img/docs/hello-vuls-tui.png)

## Step8. Web UI

![Vulsrepo](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/demo.gif)

Check it out the [Online Demo](https://monocosel.jp/vulsrepo/).

Installation refer to [VulsRepo](vulsrepo.md)
