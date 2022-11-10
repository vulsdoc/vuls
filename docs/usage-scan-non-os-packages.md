---
id: usage-scan-non-os-packages
title: Scan vulnerabilities of non-OS packages
sidebar_label: Scan non OS packages
---

## Options

To scan vulnerabilities of `non-OS-packages`, there are some options.

- Specify lock files (Library)
- GitHub Integration (Library)
- Define a list of CPE in config.toml (NW Devices, Library)
- OWASP Dependency check (Library)

## Library Vulns Scan

Vuls over v0.8.0 can scan libraries using [aquasecurity/trivy](https://github.com/aquasecurity/trivy).
Trivy detects lock files listed [here](https://aquasecurity.github.io/trivy/v0.22.0/vulnerability/detection/language/)

A sample of config.toml is blow.  
specify the path of lockfiles, Vuls can detect vulns of libs without defining CPEs.

```bash
[servers]

[servers.ubuntu]
host         = "xxx.xxx.xxx"
port        = "22"
user        = "tamachi"
keyPath     = "/Users/amachi/.ssh/id_dsa"
lockfiles = [
  "/home/tamachi/lockfiles/package-lock.json",
  "/home/tamachi/lockfiles/yarn.lock",
  "/home/tamachi/lockfiles/struts.jar",
]
```

### Automatic lockfile detection

If `findLock=true` and `findLockDirs` are specified, libraries on the local file system can be automatically detected by the `find` command.

NOTE: When `findLock = true`, the target lockfile depends on the scan mode and scan user privilege.
When scan mode is fast, it depends on the privilege of the scan user. If the scan user does not have the root privilege, lockfiles that require the root privilege will not be detected.
When scan mode is fast-root, lockfiles are detected with root privileges.

```bash
[servers]

[servers.ubuntu]
host         = "xxx.xxx.xxx"
port        = "22"
user        = "tamachi"
keyPath     = "/Users/amachi/.ssh/id_dsa"
findLock = true # auto detect lockfile
findLockDirs = [
  "/path/to/prject/lib",
  "/path/to/prject2/lib",
]
```

## Usage: Integrate with GitHub Security Alerts

GitHub tracks reported vulnerabilities in certain dependencies and provides security alerts to affected repositories. [GitHub Security Alerts](https://help.github.com/articles/about-security-alerts-for-vulnerable-dependencies/).
It becomes possible to import vulnerabilities detected by GitHub via GitHub's API.

First, enable GitHub security alerts on your repo. [see](https://help.github.com/en/github/managing-security-vulnerabilities/managing-alerts-for-vulnerable-dependencies-in-your-organization)

Second, Issue a token. [see](https://github.com/settings/tokens)

3rd, config.toml

To ignore vulnerabilities dismissed on GitHub, set IgnoreGithubDismissed to true at githubs section. 

```toml
[servers.ghsa]
type = "pseudo"

[servers.ghsa.githubs."owner/repo"]
token   = "xxxxYourTokenxxx"
IgnoreGithubDismissed = true
```

## CPE Scan

Vuls scan detect vulnerabilities in non-OS packages, such as something you compiled by yourself, language libraries and frameworks that have been registered in the [CPE](https://nvd.nist.gov/cpe.cfm).

The CPE scan uses the NVD information to search for the specified CPE. It is necessary to set up go-cve-dictionary and fetch NVD data source in advance.
To setup go-cve-dictionary, see [here](https://vuls.io/docs/en/go-cve-dictionary.html#usage-go-cve-dictionary-on-different-server)

see also [Architecture/CPE Scan](architecture-cpe-scan.md)

## How to search CPE name by software name

[NVD: Search Common Platform Enumerations (CPE)](https://web.nvd.nist.gov/view/cpe/search)
You need **Check CPE Naming Format: 2.2**

[go-cpe-dictionary](https://github.com/vulsio/go-cpe-dictionary) is a good choice for geeks.
[![asciicast](https://asciinema.org/a/asvc87lbpad5999shqk0xvtc0.png)](https://asciinema.org/a/asvc87lbpad5999shqk0xvtc0)

You can search a CPE name by the application name incrementally.

## Configuration

### Host OS

To detect the vulnerability of Ruby on Rails v4.2.1 and PostgreSQL9.6.2, cpeNames needs to be set in the servers section.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
cpeNames = [
    "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
    "cpe:2.3:a:postgresql:postgresql:9.6.2:*:*:*:*:*:*:*",
]
```

### Container

To detect the vulnerability of Ruby on Rails v4.2.1 on specific container, cpeNames needs to be set in the servers>containers section.
The following is an example of running Ruby on Rails v4.2.1 and PostgreSQL9.6.2 on dockerA.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containerType = "docker"
containersIncluded = ["${running}"]

[servers.172-31-4-82.containers.dockerA]
cpeNames = [
    "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
    "cpe:2.3:a:postgresql:postgresql:9.6.2:*:*:*:*:*:*:*",
]

```

### type="pseudo"

Specify this when you want to detect vulnerability by specifying cpename without SSH connection.
The pseudo type does not do anything when scanning.
Search for NVD at report time and detect vulnerability of software specified as cpenamae.

```bash
[servers]

[servers.forti]
type = "pseudo"
cpeNames = [
    "cpe:/o:fortinet:fortios:4.3.0",
]
```

### Japanese Software

JVN can be used to detect vulnerabilities in Japanese software that are not defined in the NVD.

- Fetching JVN with go-cve-dictionary
- Define CPE for Japanese software.
- Report with `--confidence-over=0 `.

The Affected version is not defined in a parsable format in JVN. Therefore, all vulnerabilities with matching Part, Vendor, and Product are detected. Note that there are false positives.

## Usage: Integrate with OWASP Dependency Check to Automatic update when the libraries are updated (Experimental)

[OWASP Dependency check](https://www.owasp.org/index.php/OWASP_Dependency_Check) is a utility that identifies project dependencies and checks if there are any known, publicly disclosed, vulnerabilities.

Benefit of integrating Vuls And OWASP Dependency Check is below.

- Automatic Update of Vuls config when the libraries are updated.
- Reporting by Email or Slack by using Vuls.
- Reporting in Japanese
  - OWASP Dependency Check supports only English.

How to integrate Vuls with OWASP Dependency Check

- Execute OWASP Dependency Check with --format=XML option.
- Define the xml file path of dependency check in config.toml.

    ```bash
    [servers]

    [servers.172-31-4-82]
    host         = "172.31.4.82"
    user        = "ec2-user"
    keyPath     = "/home/username/.ssh/id_rsa"
    owaspDCXMLPath = "/tmp/dependency-check-report.xml"
    ```

The following is an example of how to specify a XML of OWASP DC to the specific container.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containerType = "docker"
containersIncluded = ["${running}"]

[servers.172-31-4-82.containers.dockerA]
owaspDCXMLPath = "/tmp/dependency-check-report.xml"

```
