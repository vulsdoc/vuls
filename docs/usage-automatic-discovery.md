---
id: usage-automatic-discovery
title: Automatic Discovery
sidebar_label: Automatic Discovery
---

Discovery subcommand discovers active servers specified in CIDR range, then display the template of config file (TOML format) to terminal.  

```bash
$ vuls discover -help
discover:
        discover 192.168.0.0/24
```

## Example

```bash
$ vuls discover 192.168.11.0/24
# Create config.toml using below and then ./vuls -config=/path/to/config.toml


# https://vuls.io/docs/en/config.toml.html#database-section
[cveDict]
#type = ["sqlite3", "mysql", "postgres", "redis", "http" ]
#sqlite3Path = "/path/to/cve.sqlite3"
#url        = ""

[ovalDict]
#type = ["sqlite3", "mysql", "postgres", "redis", "http" ]
#sqlite3Path = "/path/to/oval.sqlite3"
#url        = ""

[gost]
#type = ["sqlite3", "mysql", "postgres", "redis", "http" ]
#sqlite3Path = "/path/to/gost.sqlite3"
#url        = ""

[exploit]
#type = ["sqlite3", "mysql", "postgres", "redis", "http" ]
#sqlite3Path = "/path/to/go-exploitdb.sqlite3"
#url        = ""

[metasploit]
#type = ["sqlite3", "mysql", "postgres", "redis", "http" ]
#sqlite3Path = "/path/to/go-msfdb.sqlite3"
#url        = ""

# https://vuls.io/docs/en/config.toml.html#slack-section
#[slack]
#hookURL      = "https://hooks.slack.com/services/abc123/defghijklmnopqrstuvwxyz"
##legacyToken = "xoxp-11111111111-222222222222-3333333333"
#channel      = "#channel-name"
##channel     = "${servername}"
#iconEmoji    = ":ghost:"
#authUser     = "username"
#notifyUsers  = ["@username"]

# https://vuls.io/docs/en/config.toml.html#email-section
#[email]
#smtpAddr      = "smtp.example.com"
#smtpPort      = "587"
#user          = "username"
#password      = "password"
#from          = "from@example.com"
#to            = ["to@example.com"]
#cc            = ["cc@example.com"]
#subjectPrefix = "[vuls]"

# https://vuls.io/docs/en/config.toml.html#http-section
#[http]
#url = "http://localhost:11234"

# https://vuls.io/docs/en/config.toml.html#syslog-section
#[syslog]
#protocol    = "tcp"
#host        = "localhost"
#port        = "514"
#tag         = "vuls"
#facility    = "local0"
#severity    = "alert"
#verbose     = false

# https://vuls.io/docs/en/usage-report.html#example-put-results-in-s3-bucket
#[aws]
#profile                = "default"
#region                 = "ap-northeast-1"
#s3Bucket               = "vuls"
#s3ResultsDir           = "/path/to/result"
#s3ServerSideEncryption = "AES256"

# https://vuls.io/docs/en/usage-report.html#example-put-results-in-azure-blob-storage<Paste>
#[azure]
#accountName   = "default"
#accountKey    = "xxxxxxxxxxxxxx"
#containerName = "vuls"

# https://vuls.io/docs/en/config.toml.html#chatwork-section
#[chatwork]
#room     = "xxxxxxxxxxx"
#apiToken = "xxxxxxxxxxxxxxxxxx"

# https://vuls.io/docs/en/config.toml.html#telegram-section
#[telegram]
#chatID     = "xxxxxxxxxxx"
#token = "xxxxxxxxxxxxxxxxxx"

#[wpscan]
#token = "xxxxxxxxxxx"
#detectInactive = false

# https://vuls.io/docs/en/config.toml.html#default-section
[default]
#port               = "22"
#user               = "username"
#keyPath            = "/home/username/.ssh/id_rsa"
#scanMode           = ["fast", "fast-root", "deep", "offline"]
#scanModules        = ["ospkg", "wordpress", "lockfile", "port"]
#lockfiles = ["/path/to/package-lock.json"]
#cpeNames = [
#  "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
#]
#owaspDCXMLPath     = "/tmp/dependency-check-report.xml"
#ignoreCves         = ["CVE-2014-6271"]
#containersOnly     = false
#containerType      = "docker" #or "lxd" or "lxc" default: docker
#containersIncluded = ["${running}"]
#containersExcluded = ["container_name_a"]

# https://vuls.io/docs/en/config.toml.html#servers-section
[servers]

[servers.192-168-11-6]
host                = "192.168.11.6"
#port               = "22"
#user               = "root"
#sshConfigPath		= "/home/username/.ssh/config"
#keyPath            = "/home/username/.ssh/id_rsa"
#scanMode           = ["fast", "fast-root", "deep", "offline"]
#scanModules        = ["ospkg", "wordpress", "lockfile", "port"]
#type               = "pseudo"
#memo               = "DB Server"
#findLock = true
#lockfiles = ["/path/to/package-lock.json"]
#cpeNames           = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath     = "/path/to/dependency-check-report.xml"
#ignoreCves         = ["CVE-2014-0160"]
#containersOnly     = false
#containerType      = "docker" #or "lxd" or "lxc" default: docker
#containersIncluded = ["${running}"]
#containersExcluded = ["container_name_a"]

#[servers.192-168-11-6.containers.container_name_a]
#cpeNames       = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath = "/path/to/dependency-check-report.xml"
#ignoreCves     = ["CVE-2014-0160"]

#[servers.192-168-11-6.githubs."owner/repo"]
#token   = "yourToken"

#[servers.192-168-11-6.wordpress]
#cmdPath = "/usr/local/bin/wp"
#osUser = "wordpress"
#docRoot = "/path/to/DocumentRoot/"

#[servers.192-168-11-6.portscan]
#scannerBinPath = "/usr/bin/nmap"
#hasPrivileged = true
#scanTechniques = ["sS"]
#sourcePort = "65535"

#[servers.192-168-11-6.optional]
#key = "value1"
```

You can customize your configuration using this template.
