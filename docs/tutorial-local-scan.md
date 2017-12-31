---
id: tutorial-local-scan
title: Tutorial: Local Scan Mode
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
1. Web UI ([VulsRepo](https://github.com/usiusi360/vulsrepo))

## Step1. Launch CentOS7

- We are using the old AMI for this example
- Add the following to the cloud-init, to avoid auto-update at the first launch.

    ```
    #cloud-config
    repo_upgrade: none
    ```

    - [Q: How do I disable the automatic installation of critical and important security updates on initial launch?](https://aws.amazon.com/amazon-linux-ami/faqs/?nc1=h_ls)

## Step2. Deploy Vuls

Then [Deploy go-cve-dictionary, goval-dictionary and Vuls](install-manually.md).
If the installation process stops halfway, try increasing the instance type of EC2. An out of memory error may have occurred.

## Step3. Configuration

Create a config file(TOML format).  
```
$ cd $HOME
$ cat config.toml
[servers]

[servers.localhost]
host = "localhost"
port = "local"
```


## Step4. Check config.toml and settings on the server before scanning

```
$ vuls configtest
```

see [Usage: configtest](#usage-configtest)

## Step5. Start Scanning

```
$ vuls scan

... snip ...

One Line Summary
================
localhost       centos7.3.1611  31 updatable packages

```

## Step6. Reporting

View one-line summary

```
$ vuls report -format-one-line-text -cvedb-path=$PWD/cve.sqlite3 -ovaldb-path=$PWD/oval.sqlite3

One Line Summary
================
localhost       Total: 109 (High:35 Medium:55 Low:16 ?:3)       31 updatable packages

```

View short summary

```
$ vuls report -format-short-text

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
````

View full report.

```
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

## Step7. TUI

Vuls has Terminal-Based User Interface to display the scan result.

```
$ vuls tui
```

![Vuls-TUI](/vuls/img/docs/hello-vuls-tui.png)

## Step8. Web UI

[VulsRepo](https://github.com/usiusi360/vulsrepo) is a awesome Web UI for Vuls.  
Check it out the [Online Demo](http://usiusi360.github.io/vulsrepo/).

TODO chagne link


