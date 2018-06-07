---
id: usage-scan-non-os-packages
title: Scan vulnerabilites of non-OS packages
sidebar_label: Scan non-OS packages
---

It is possible to detect vulnerabilities in non-OS packages, such as something you compiled by yourself, language libraries and frameworks, that have been registered in the [CPE](https://nvd.nist.gov/cpe.cfm).

##  How to search CPE name by software name

[NVD: Search Common Platform Enumerations (CPE)](https://web.nvd.nist.gov/view/cpe/search)  
You need **Check CPE Naming Format: 2.2**

[go-cpe-dictionary](https://github.com/kotakanbe/go-cpe-dictionary) is a good choice for geeks.
[![asciicast](https://asciinema.org/a/asvc87lbpad5999shqk0xvtc0.png)](https://asciinema.org/a/asvc87lbpad5999shqk0xvtc0)

You can search a CPE name by the application name incrementally.

## Configuration

### Host OS

To detect the vulnerability of Ruby on Rails v4.2.1, cpeURIs needs to be set in the servers section.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
cpeURIs = [
    "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
]
```

### Container

To detect the vulnerability of Ruby on Rails v4.2.1 on specific container, cpeURIs needs to be set in the servers>containers section.
The following is an example of running Ruby on Rails v4.2.1 on dockerA.

```bash
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
user        = "ec2-user"
keyPath     = "/home/username/.ssh/id_rsa"
containerType = "docker"
containersIncluded = ["${running}"]

[servers.172-31-4-82.containers.dockerA]
cpeURIs = [
    "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
]

```

### type="pseudo"

Specify this when you want to detect vulnerability by specifying cpename without SSH connection.
The pseudo type does not do anything when scanning.
Search for NVD at report time and detect vulnerability of software specified as cpenamae.

```bash
[servers]

[servers.172-31-4-82]
type = "pseudo"
cpeURIs = [
    "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
]
```

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