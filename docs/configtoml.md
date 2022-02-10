---
id: config.toml
title: config.toml
sidebar_label: config.toml
---

Generate a template of the `config.toml` settings file

```bash
$ vuls discover 127.0.0.1/32
```

```toml
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

[servers.127-0-0-1]
host                = "127.0.0.1"
#port               = "22"
#user               = "root"
#sshConfigPath          = "/home/username/.ssh/config"
#keyPath            = "/home/username/.ssh/id_rsa"
#scanMode           = ["fast", "fast-root", "deep", "offline"]
#scanModules        = ["ospkg", "wordpress", "lockfile", "port"]
#type               = "pseudo"
#memo               = "DB Server"
#cpeNames           = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath     = "/path/to/dependency-check-report.xml"
#ignoreCves         = ["CVE-2014-0160"]
#containersOnly     = false
#containerType      = "docker" #or "lxd" or "lxc" default: docker
#containersIncluded = ["${running}"]
#containersExcluded = ["container_name_a"]

#[servers.127-0-0-1.containers.container_name_a]
#cpeNames       = [ "cpe:/a:rubyonrails:ruby_on_rails:4.2.1" ]
#owaspDCXMLPath = "/path/to/dependency-check-report.xml"
#ignoreCves     = ["CVE-2014-0160"]

#[servers.127-0-0-1.githubs."owner/repo"]
#token   = "yourToken"
#IgnoreGithubDismissed = true


#[servers.127-0-0-1.wordpress]
#cmdPath = "/usr/local/bin/wp"
#osUser = "wordpress"
#docRoot = "/path/to/DocumentRoot/"

#[servers.192-168-11-6.portscan]
#scannerBinPath = "/usr/bin/nmap"
#hasPrivileged = true
#scanTechniques = ["sS"]
#sourcePort = "65535"

#[servers.127-0-0-1.optional]
#key = "value1"
```

## Database Section

```toml
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
```

- type : the method of access for the database. (Default: "sqlite3")
- SQLite3Path : Should only be set when using "sqlite" otherwise unused. (Default: SQLite3 in current directory)
- url : specifies the url to access the database.

These can also be specified by an environment variable.
Refer to the source code for the environment variable names.

- [cveDict](https://github.com/future-architect/vuls/blob/master/config/gocvedictconf.go#L30-L32)
- [ovalDict](https://github.com/future-architect/vuls/blob/master/config/govaldictconf.go#L31-L33)
- [gost](https://github.com/future-architect/vuls/blob/master/config/gostconf.go#L30-L32)
- [exploit](https://github.com/future-architect/vuls/blob/master/config/exploitconf.go#L30-L32)
- [metasploit](https://github.com/future-architect/vuls/blob/master/config/metasploitconf.go#L30-L32)

## Slack section

```toml
[slack]
hookURL      = "https://hooks.slack.com/services/abc123/defghijklmnopqrstuvwxyz"
#legacyToken  = "xoxp-11111111111-222222222222-3333333333"
channel      = "#channel-name"
#channel      = "${servername}"
iconEmoji    = ":ghost:"
authUser     = "username"
notifyUsers  = ["@username"]
```

- hookURL or legacyToken.  
If there are a lot of vulnerabilities, it is better to use legacyToken since the Slack notification will be flooded.

- hookURL : Incoming web-hook's URL (hookURL is ignored when legacyToken is set.)  
![Vuls-slack](/img/docs/vuls-slack-en.png)

- legacyToken : slack [legacy token](https://api.slack.com/custom-integrations/legacy-tokens)  
![Vuls-slack-thread](https://user-images.githubusercontent.com/8997330/31842418-02b703f2-b629-11e7-8ec3-beda5d3a397e.png)

- channel : channel name.

If you set `${servername}` to channel, the report will be sent to each channel.  
In the following example, the report will be sent to the `#server1` and `#server2`.  
Be sure to create these channels before scanning.

```toml
[slack]
channel      = "${servername}"
...snip...

[servers]

[servers.server1]
host         = "172.31.4.82"
...snip...

[servers.server2]
host         = "172.31.4.83"
...snip...
```

- iconEmoji: emoji
- authUser: username of the slack team
- notifyUsers: a list of Slack usernames to send Slack notifications.
If you set `["@foo", "@bar"]` to notifyUsers, @foo @bar will be included in text.  
So @foo, @bar can receive mobile push notifications on their smartphone.

## HTTP section

```toml
[http]
url = "http://localhost:11234"
```

## EMail section

```toml
[email]
smtpAddr      = "smtp.gmail.com"
smtpPort      = "587"
user          = "username"
password      = "password"
from          = "from@address.com"
to            = ["to@address.com"]
cc            = ["cc@address.com"]
subjectPrefix = "[vuls]"
```

- If you use SMTPS when send email, please set config.toml as follows.

```toml
[email]
smtpAddr      = "smtp.gmail.com"
smtpPort      = "465"
user          = "username"
password      = "password"
from          = "from@address.com"
to            = ["to@address.com"]
cc            = ["cc@address.com"]
subjectPrefix = "[vuls]"
```

### Gmail account setting

If you can't send vuls report via Email, please check your Gmail account setting.

1. Access Manage your Google Account -> "Security" tab
2. Check Signing in to Google -> "Use your phone to sign in" and "2-Step Verification" is **OFF**
3. Check "Less secure app access" is **On**

## Syslog section

```toml
[syslog]
protocol    = "tcp"
host        = "localhost"
port        = "514"
tag         = "vuls"
facility    = "local0"
severity    = "alert"
verbose     = false
```

- protocol : transfer protocol (default: empty)
- `tcp` or `udp` or empty  
 If protocol is empty, vuls will connect to the local syslog server.
- host : syslog target host
- domain name or IP address
- port : syslog target port (default: 514)
- tag : syslog tag
- facility : syslog facility (default: `auth`)  
- kern, user, mail, daemon, etc.
- severity : syslog severity (default: `info`)
- emerg, alert, crit, etc.
- verbose : verbose mode  (default: false)
- CVE detail, etc.

## Default section

```toml
[default]
#port        = "22"
#user        = "username"
#keyPath     = "/home/username/.ssh/id_rsa"
#cpeNames = [
#  "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
#]
#ignoreCves = ["CVE-2016-6313"]
#optional = [
#    ["key", "value"],
#]
```

Items of the default section will be used if not specified.

## servers section

```toml
[servers]

[servers.172-31-4-82]
host         = "172.31.4.82"
#jumpServer  = ["test@test.com:22", "test@test1.com:2222"]
#port        = "22"
#user        = "root"
#sshConfigPath		= "/home/username/.ssh/config"
#keyPath     = "/home/username/.ssh/id_rsa"
#type 		   = "pseudo"
#cpeNames = [
#  "cpe:/a:rubyonrails:ruby_on_rails:4.2.1",
#]
#ignoreCves = ["CVE-2016-6314"]
#optional = [
#    ["key", "value"],
#]
#[servers.172-31-4-82.containers]
#type = "lxd" # or "docker" or "lxc"
#includes = ["${running}"]
#excludes = ["container_name", "container_id"]
```

You can overwrite the default value specified in default section.  

- host: IP address or hostname of target server
- jumpServer: IP address or hostname with port number of proxy
- port: SSH Port number
- user: SSH username
- sshConfigPath: SSH config file path. see [#1005](https://github.com/future-architect/vuls/pull/1005)
- keyPath: SSH private key path
- type: "pseudo" for non-ssh scanning. see [#531](https://github.com/future-architect/vuls/pull/531)
- cpeNames: see [Usage: Scan vulnerability of non-OS package](usage-scan-non-os-packages.md)
- ignoreCves: CVE IDs that will not be reported. But output to JSON file.
- optional: Add additional information to JSON report.
- containers: see [Example: Scan containers (Docker/LXD)](usage-scan.md#example-scan-containers-docker-lxd-lxc)

Multiple SSH authentication methods are supported.  

- SSH agent
- SSH public key authentication (with password and empty password)

If you need password authentication, see the tips of [How to scan with SSH key with passphrase](tips.md#How-to-scan-with-SSH-key-with-passphrase)

- [How to Log in With No Password While Using ssh-agent](https://docs.oracle.com/cd/E19683-01/806-4078/6jd6cjru9/index.html)

## ChatWork section

```toml
[chatwork]
room = "xxxxxxxxxxx"
apiToken = "xxxxxxxxxxxxxxx"
```

## GoogleChat section

```toml
[googlechat]
webHookURL = "https://chat.googleapis.com/v1/spaces/xxxxxxxxxx/messages?key=yyyyyyyyyy&token=zzzzzzzzzz%3D"
skipIfNoCve = false
serverNameRegexp = "(^(\\[Reboot Required\\] )?(?:(spam|ham)).*|.*(?:egg)$)"
```
- webHookURL  
Chat room pull down menu ▼  
Select web hook management ⚙  
Create web hook  
Copy and Paste from web hook url  
- skipIfNoCve  
Skip reporting if the server has not any CVEs.  
- serverNameRegexp  
ServerName filter by regexp. 
The bellow excludes spamonigiri, hamburger and boiledegg.  
`[Reboot Required]` is magic words for vuls inside. Please ignore 😀  

## Telegram section

Posting to a user: [here is how to find user's chatID](https://stackoverflow.com/questions/31078710/how-to-obtain-telegram-chat-id-for-a-specific-user)

```toml
[telegram]
chatID = "xxxxxxxxxxx"
token = "xxxxxxxxxxxxxxx"
```

Posting to a channel:

```toml
[telegram]
chatID = "@xxxxxxxxxx"
token = "xxxxxxxxxxxxxxx"
```
