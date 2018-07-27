---
id: usage-automatic-discovery
title: Automatic Discovery
sidebar_label: Automatic Discovery
---

Discovery subcommand discovers active servers specified in CIDR range, then display the template of config file(TOML format) to terminal.  
```
$ vuls discover -help
discover:
        discover 192.168.0.0/24
```

## Example

```
$ vuls discover 192.168.11.0/24
# Create config.toml using below and then ./vuls --config=/path/to/config.toml

[slack]
hookURL      = "https://hooks.slack.com/services/abc123/defghijklmnopqrstuvwxyz"
#legacyToken  = "xoxp-11111111111-222222222222-3333333333"
channel      = "#channel-name"
#channel      = "${servername}"
iconEmoji    = ":ghost:"
authUser     = "username"
notifyUsers  = ["@username"]

[email]
smtpAddr      = "smtp.gmail.com"
smtpPort      = "587"
user          = "username"
password      = "password"
from          = "from@address.com"
to            = ["to@address.com"]
cc            = ["cc@address.com"]
subjectPrefix = "[vuls]"

[aws]
profile = "default"
region = "ap-northeast-1"
s3Bucket = "vuls"
s3ResultsDir = "/path/to/result"
s3ServerSideEncryption = "AES256"

[azure]
accountName = "default"
AccountKey = "xxxxxxxxxxxxxx"
ContainerName = "vuls"

[cveDict]
type = "sqlite3"
path = "/path/to/cve.sqlite3"
# url = ""

[ovalDict]
type = "sqlite3"
path = "/path/to/oval.sqlite3"
# url = ""

[gost]
type = "sqlite3"
path = "/path/to/gost.sqlite3"
# url = ""

[default]
#port        = "22"
#user        = "username"
#keyPath     = "/home/username/.ssh/id_rsa"
#scanMode        = ["fast", "fast-root", "deep", "offline"]
#cpeURIs = [
#  "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
#]
#owaspDCXMLPath = "/tmp/dependency-check-report.xml"
#ignoreCves = ["CVE-2014-6271"]
#containerType = "docker" #or "lxd" or "lxc" default: docker
#containersIncluded = ["${running}"]
#ContainersExcluded= ["container_name_a"]

[servers]

[servers.192-168-11-6]
host         = "192.168.11.6"
#port        = "22"
#user        = "root"
#keyPath     = "/home/username/.ssh/id_rsa"
#scanMode        = ["fast", "fast-root", "deep", "offline"]
#type            = "pseudo"
#memo        = "DB Server"
#cpeURIs = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath = "/path/to/dependency-check-report.xml"
#ignoreCves = ["CVE-2014-0160"]
#containerType = "docker" #or "lxd" or "lxc" default: docker
#containersIncluded = ["${running}"]
#ContainersExcluded= ["container_name_a"]

#[servers.192-168-11-6.containers.container_name_a]
#cpeURIs = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath = "/path/to/dependency-check-report.xml"

#[servers.192-168-11-6.optional]
#key = "value1"
```

You can customize your configuration using this template.
