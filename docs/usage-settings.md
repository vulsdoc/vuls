---
id: usage-settings
title: Settings
sidebar_label: Settings
---

- Slack section
    ```
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

      - hookURL : Incoming webhook's URL (hookURL is ignored when legacyToken is set.)  
      ![Vuls-slack](/vuls/img/docs/vuls-slack-en.png)

      - legacyToken : slack legacy token (https://api.slack.com/custom-integrations/legacy-tokens)  
      ![Vuls-slack-thread](https://user-images.githubusercontent.com/8997330/31842418-02b703f2-b629-11e7-8ec3-beda5d3a397e.png)

    - channel : channel name. 
    If you set `${servername}` to channel, the report will be sent to each channel.  
    In the following example, the report will be sent to the `#server1` and `#server2`.  
    Be sure to create these channels before scanning.
      ```
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

- EMail section
    ```
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

- Default section
    ```
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

- servers section
    ```
    [servers]

    [servers.172-31-4-82]
    host         = "172.31.4.82"
    #port        = "22"
    #user        = "root"
    #keyPath     = "/home/username/.ssh/id_rsa"
    #type 		 = "pseudo"
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
    - port: SSH Port number
    - user: SSH username
    - keyPath: SSH private key path
    - type: "pseudo" for non-ssh scanning. see [#531](https://github.com/future-architect/vuls/pull/531)
    - cpeNames: see [Usage: Scan vulnerability of non-OS package](usage-scan-non-os-packages.md)
    - ignoreCves: CVE IDs that will not be reported. But output to JSON file.
    - optional: Add additional information to JSON report.
    - containers: see [Example: Scan containers (Docker/LXD)(usage-scan.md#example-scan-containers-docker-lxd-lxc)

    Vuls supports two types of SSH. One is external command. The other is native go implementation. For details, see [-ssh-native-insecure option](usage-scan.md#ssh-native-insecure-option)

    Multiple SSH authentication methods are supported.  
    - SSH agent
    - SSH public key authentication (with password and empty password)
    Password authentication is not supported.

