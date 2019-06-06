---
id: usage-scan-wordpress
title: Scan vulnerabilites of WordPress
sidebar_label: Scan WordPress
---

## Scan WordPress (core, plugin, theme)

For non-commercial use, you can use this WordPress integration for free.
But for commercial use, You have to send a E-Mail to the WPVulnDB team.
For Details, see the [NOTE](https://wpvulndb.com/api):
```
If you are under any doubt if your software is classed as non-commercial and/or would like to inquire about commercial usage of our databases get in touch.
```

First, you need to register a user and get the API token from your profile page on [wpvulndb.com](https://wpvulndb.com/).
And then, check whether the [wp command](https://wp-cli.org/)  is insatalled on the scan target server.
A sample configuration is below.

* config.toml

```toml
  [servers.kusanagi]
    user = "root"
    host = "10.10.10.10"
    port = "22"

  [servers.kusanagi.wordpress]
    cmdPath = "/usr/local/bin/wp"
    osUser = "wordpress"
    docRoot = "/home/kusanagi/wp/DocumentRoot/"
    wpVulnDBToken = "xxxxTokenxxxx"
    ignoreInactive = false
```

- cmdPath :  A 0ath of `` on the wordpress server
- osUser : A OS user of `` on the wordpress server
- docRoot : A path of document root onthe wordpress server
- wpVulnDBToken :  A token of [WPVULNDB API](https://wpvulndb.com/api)
- ignoreInactive : Ignore plugins or themes which are inactive state 

## Scan

To scan WordPress, execute as below.

```
$ vuls scan kusanagi
```

Vuls collects WordPrss Core version, plugins and themes via `wp-cli`.


## Reporting

```
$ vuls report
```

Vuls detects vulnerabilities via accessing [WPVulnDB.com](https://wpvulndb.com/api) via HTTP.

- Slack

![](https://user-images.githubusercontent.com/534611/55537047-402ac880-56f6-11e9-998d-f270a746f90f.png)

![](https://user-images.githubusercontent.com/534611/55537042-3c974180-56f6-11e9-9daa-2b1d56bd84bd.png)

- TUI

![](https://user-images.githubusercontent.com/534611/55537295-d5c65800-56f6-11e9-9458-23128fbbf996.png)

- Full-Text

![](https://user-images.githubusercontent.com/534611/55536870-da3e4100-56f5-11e9-9874-863ba7346966.png)

## Tips	

- If you have some virtual WordPres sites in a server.
- If you want a report of only WordPress without OS packages.

Let's use `ignorePkgsRegexp = [".*"]`. This is not *ECO*, but works fine :-)

    - The point of config.toml

```toml
# for server administrator
[servers.wordpress]
host = "wordpress"

# for WordPress site FOO
[servers.foo]
host = "wordpress"
ignorePkgsRegexp = [".*"]
[servers.foo.wordpress]
docRoot = "/home/foo/wordpress/"

# for WordPress site BAR
[servers.bar]
host = "wordpress"
ignorePkgsRegexp = [".*"]
[servers.bar.wordpress]
docRoot = "/home/bar/wordpress/"
```
