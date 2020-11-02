---
id: vulsrepo
title: VulsRepo
sidebar_label: VulsRepo
---

**Caution**
[usiusi360/vulsrepo](https://github.com/usiusi360/vulsrepo) is NOT maintained anymore.  
You should use maintained repository: [ishiDACo/vulsrepo](https://github.com/ishiDACo/vulsrepo)

[VulsRepo](https://github.com/usiusi360/vulsrepo) is awesome OSS Web UI for Vuls.
With VulsRepo you can analyze the scan results like Excel pivot table.

![vulsrepo](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/demo.gif)

## Online Demo

[demo page](https://monocosel.jp/vulsrepo/)

## Requirements

- [future-architect/Vuls](https://github.com/future-architect/vuls) >= v0.9.0
- Web Browser : Google Chrome or Firefox

## Installation

*A home folder of vuls is explained as /opt/vuls.*

### Step1. Create a json report of vuls

```bash

$ cd /opt/vuls
$ vuls scan
$ vuls report -format-json

```

Output to a JSON files (/opt/vuls/results/)

### Step2. Installation

From now on, executed by a user running the vuls scan.

- Git clone

```bash
$ cd $HOME
$ git clone https://github.com/usiusi360/vulsrepo.git
```

### Step3. Change the setting of vulsrepo-server

Set Path according to your own environment.

```bash
$ cd $HOME/vulsrepo/server
$ cp vulsrepo-config.toml.sample vulsrepo-config.toml
$ vi vulsrepo-config.toml
[Server]
rootPath = "/home/vuls-user/vulsrepo"
resultsPath  = "/opt/vuls/results"
serverPort  = "5111"

```

- Do not use the path of the symbolic link for resultsPath

### Step4. Start vulsrepo-server

```bash
$ pwd
$HOME/vulsrepo/server

$ ./vulsrepo-server
2017/08/28 11:04:00 main.go:90: INFO: RootPath Load:  /root/work/vulsrepo
2017/08/28 11:04:00 main.go:97: INFO: ResultsPath Load:  /opt/vuls/results
2017/08/28 11:04:00 main.go:66: Start: Listening port: 5111

```

- It is necessary to build by yourself except for Linux 64bit. Please look at the build section.

### Step5. Always activate vulsrepo-server

#### Case: SystemV (/etc/init.d)

- Copy startup file. Change the contents according to the environment.

```bash
$ sudo cp $HOME/vulsrepo/server/scripts/vulsrepo.init /etc/init.d/vulsrepo
$ sudo chmod 755 /etc/init.d/vulsrepo
$ sudo vi /etc/init.d/vulsrepo
```

- Set to start automatically

```bash
$ sudo chkconfig vulsrepo on
```

- Start vulsrepo-server

```bash
$ sudo /etc/init.d/vulsrepo start
```

##### Case: systemd (systemctl)

- Copy startup file. Change the contents according to the environment.

```bash
$ sudo cp $HOME/vulsrepo/server/scripts/vulsrepo.service /lib/systemd/system/vulsrepo.service
$ sudo vi /lib/systemd/system/vulsrepo.service
```

- Set to start automatically

```bash
$ sudo systemctl enable vulsrepo
```

- Check settings

```bash
$ sudo systemctl list-unit-files --type=service | grep vulsrepo
vulsrepo.service                           enabled
```

- Start vulsrepo-server

```bash
$ sudo systemctl start vulsrepo
```

## DigestAuth

### To perform digest authentication, create an authentication file

```bash
$ ./vulsrepo-server -h
Usage of ./vulsrepo-server:
  -c string
        AuthFile Path (default "/home/vuls-user/.htdigest")
  -m    make AuthFile
  -r string
        realm (default "vulsrepo_local")
  -u string
        login user (default "vuls")

ex)
$ ./vulsrepo-server -m
Password: ****
AuthFile Path   :  /home/vuls-user/.htdigest
realm           :  vulsrepo_local
login user      :  vuls
2017/08/28 19:11:59 main.go:96: Create Success
```

### Edit vulsrepo-config.toml

```bash
$ vi vulsrepo-config.toml
[Auth]
authFilePath = "/home/vuls-user/.htdigest"
realm = "vulsrepo_local"

```

### Start vulsrepo-server

## Use SSL

### Create a self-signed certificate

```bash
$ openssl genrsa -out key.pem 2048
$ openssl req -new -x509 -sha256 -key key.pem -out cert.pem -days 3650
```

### Edit vulsrepo-config.toml

```bash
$ vi vulsrepo-config.toml
[Server]

serverSSL = "yes"
serverCert = "cert.pem"
serverKey = "key.pem"
```

### Start vulsrepo-server

## Build vulsrepo-server

- It is necessary to build by yourself except for Linux 64bit
- Install golang beforehand.

```bash
$ mkdir -p $GOPATH/src/github.com/ishiDACo/
$ cd $GOPATH/src/github.com/ishiDACo/
$ git clone https://github.com/ishiDACo/vulsrepo.git
$ cd vulsrepo/server
$ go get -u github.com/golang/dep/...
$ dep ensure
$ go build -o vulsrepo-server
```

## Usage

### Displaying VulsRepo

Please access the following URL in your browser.
If you have JavaScript disabled in your browser, please enable it.

```bash
http://<server-address>:5111
```

### How to select the data to be displayed

Select the data you want to display in the file selection tree. You can select multiple files.
Click `Select All` to select them all together, or `Select None` to clear them.

Click the `Submit` button after selecting them.

![select-file](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/select-file-2.png)

When the data is loaded, the `pivot table` is shown as follows.

![filter-off](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-off.png)

#### Troubleshooting: No file selection tree

- Make sure that the directory `/opt/vuls/results/` is the correct one to refer to as the output of Vuls.
- If the directory referenced by the output of Vuls contains a large number of files, it will fail to generate a file selection tree. In that case, move the unnecessary `*.json` files to a separate directory, or delete them before displaying VulsRepo.

#### Troubleshooting: No pivot table

If you try to load a large amount of data, it may fail. Please use the following methods.

- Reduce the selection of the data to be displayed and load it again.
- Setting `Summary` and `Cvss Metrics` to `OFF` in the `Setting` may solve this problem (see [Display setting - Show / Hide the Item](#show--hide-the-item)).

### Pivot table

#### Unfiltered initial state

The number of vulnerabilities found by date/time and server/container scanned is shown as a heat map by severity.

The `healty` indicates that no vulnerabilities were found.

![filter-off](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-off.png)

#### Filter Operation

##### Applying an existing filter

When you change a filter in the pull-down menu, you can apply a pre-defined filter to display a `pivot table`.

![select-filter](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/select-filter.png)

###### Preset filters

There are five available.

- [01. Graph: CVSS-Severity => ServerName](#01-graph-cvss-severity--servername)
- [02. Graph: CVSS-Severity => CVSS-Score](#02-graph-cvss-severity--cvss-score)
- [03. Pivot: Package/CVSS-Severity/CveID/Summary => ServerName](#03-pivot-packagecvss-severitycveidsummary--servername)
- [04. Pivot: Package/CveID => ScanTime](#04-pivot-packagecveid--scantime)
- [05. Pivot: CveID/PackageInfo => NotFixedYet](#05-pivot-cveidpackageinfo--notfixedyet)

###### 01. Graph: CVSS-Severity => ServerName

A bar chart stacking the total number of vulnerabilities detected per server and container.

The most recent data is selected for a side-by-side comparison of the status of each server and container.

![filter-01](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-01.png)

###### 02. Graph: CVSS-Severity => CVSS-Score

This bar graph shows the total number of vulnerability detections for each CVSS base score.

It is recommended that the most recent data be selected for display.

![filter-02](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-02.png)

###### 03. Pivot: Package/CVSS-Severity/CveID/Summary => ServerName

A heat map of the packages where the vulnerability was found, the severity, the corresponding CVE IDs, a summary of the vulnerability, and the total number of detections by server and container.

It is suitable for comparing the status of each server and container side by side by selecting the most recent data.

![filter-03](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-03.png)

###### 04. Pivot: Package/CveID => ScanTime

Good for checking whether each CVE ID vulnerability is resolved or newly detected.

Suitable for comparing a single server or container over time.

![filter-04](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-04.png)

###### 05. Pivot: CveID/PackageInfo => NotFixedYet

This is a good time to check if a fixed version is provided in the package that contains each CVE ID vulnerability.

You can choose the most recent single server or container to check.

![filter-05](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-05.png)

##### Adding, deleting, and reordering of display items

You can change the display items by dragging and dropping them.

![pivot-item-add-remove-move](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/pivot-item-add-remove-move.gif)

##### Save and overwrite a new filter

You can save the filtered items and reorder them. Press the `Save` button to open the `Save Filter Panel`.

- To save a new filter, select `Save new filter` and enter the name of the filter you want.
- If you want to overwrite an existing filter, choose `Update filter` and select the filter you want to overwrite from the pull-down menu.
- Press the `OK` button to save, or the `Cancel`, `x` or ESC key to cancel.

You can't overwrite [Preset filters](#preset-filters).

![save-filter](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/save-filter.png)

##### Delete filter

Press the `Delete` button to delete the current filter.

The `Are you sure to delete?` confirmation dialog is displayed.
Press the `OK` button to delete the filter, or the `Cancel` button to cancel.

You can't delete [Preset filters](#preset-filters).

![delete-filter](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/delete-filter.png)

##### Clearing filter

Pressing the `Clear` button clears the filter and returns the `pivot table` display to [Unfiltered initial state](#unfiltered-initial-state).

![clear-filter](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/clear-filter.png)

#### Explanation of each item

| Item            | Description                                                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ScanTime        | Scan date                                                                                                                                                                                                                                                         |
| ServerName      | Scanned server                                                                                                                                                                                                                                                    |
| Container       | Scanned container                                                                                                                                                                                                                                                 |
| CVSS Score      | CVSS Base score of vulnerability calculated by NVD, JVN, or RedHat, with a maximum of `10.0`.                                                                                                                                                                     |
| CVSS Severity   | Vulnerability severity as calculated by NVD, JVN, or RedHat. Red is more severe.                                                                                                                                                                                  |
| CVSS Score Type | The source of `CVSS Score`, `CVSS Severity` and `CVSS Vector`                                                                                                                                                                                                     |
| Platform        | Running platform                                                                                                                                                                                                                                                  |
| Family          | OS                                                                                                                                                                                                                                                                |
| Release         | OS release version                                                                                                                                                                                                                                                |
| CveID           | The CVE ID assigned to the vulnerability. Click to view [Detail panel](#detail-panel).                                                                                                                                                                            |
| Packages        | The name of the package containing the vulnerability                                                                                                                                                                                                              |
| FixedIn         | The version of the package that fixed the vulnerability                                                                                                                                                                                                           |
| FixState        | Status of packages against vulnerabilities                                                                                                                                                                                                                        |
| NotFixedYet     | Whether a version of the package that fixes the vulnerability is available.                                                                                                                                                                                       |
| PackageVer      | Installed package version                                                                                                                                                                                                                                         |
| NewPackageVer   | Latest Package Version                                                                                                                                                                                                                                            |
| Repository      | Package provider's repositories                                                                                                                                                                                                                                   |
| CweID           | Its CVE's [CWE - Common Weakness Enumeration](https://nvd.nist.gov/vuln/categories). Click on [MITRE](https://cwe.mitre.org/data/index.html) or [JVN](https://www.ipa.go.jp/security/vuln/CWE.html) to view the appropriate CWE description page in a new window. |
| Summary         | Vulnerability Overview                                                                                                                                                                                                                                            |
| Mitigation      | Whether or not information on mitigation measures is available.                                                                                                                                                                                                   |
| CVSSv3(*)       | CVSS 3.0 Vector                                                                                                                                                                                                                                                   |
| CVSS(*)         | CVSS 2 Vector                                                                                                                                                                                                                                                     |
| AdvisoryID      | (Amazon Linux 2 only) Advisory IDs for supported distributions. Click to open the advisory page in a new window.                                                                                                                                                  |
| CERT            | Whether there is a [USCERT Alert](https://us-cert.cisa.gov/ncas/alerts) or [JPCERT Alert](https://www.jpcert.or.jp/at/). Click to view the relevant information in a new window.                                                                                  |
| PoC             | Whether the exploit code exists. If so, the number of them.                                                                                                                                                                                                       |
| Changelog       | Whether or not there is a Changelog. Click to view [Changelog panel](#changelog-panel).                                                                                                                                                                           |
| DetectionMethod | Vulnerability Detection Methodology                                                                                                                                                                                                                               |
| ConfidenceScore | Reliability of detection. `100` means high reliability.                                                                                                                                                                                                           |
| Published       | Date the information was released.                                                                                                                                                                                                                                |
| Last Modified   | Date the information was last updated.                                                                                                                                                                                                                            |

#### Filtering by item

Press the `▼` part of the item.

Select the items to be displayed by checking or unchecking the checkboxes.
Click `Select All` to select them all together, or `Select None` to clear them.

If you have a lot of candidates, you can refine your selection. The following example shows how to filter by `python` and select some packages.

![item-filter](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/item-filter.png)

Press the `Apply` button to apply it. Filtered items are shown in *italics*.
To close it without applying it, press the `Cancel` button.

![item-filtered](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/item-filtered.png)

#### Sorting

The leftmost row is the highest priority for sorting.

| Item          | Ascending/descending order                                               |
| ------------- | ------------------------------------------------------------------------ |
| CVSS Score    | descending order                                                         |
| CVSS Severity | `Unknown`, `Critical`, `High`, `Important`, `Medium`, `Important`, `Low` |
| CVSSv3(*)     | descending order                                                         |
| CVSS(*)       | descending order                                                         |
| CERT          | descending order                                                         |
| PoC           | descending order                                                         |
| Published     | descending order                                                         |
| Last Modified | descending order                                                         |
| Other         | ascending order                                                          |

The order of ascending and descending is fixed and cannot be switched.

#### Other pivot table operations

You can change the renderer, the unit of aggregation, and the sort order of rows and columns of aggregate values.

See [pivottable wiki](https://github.com/nicolaskruchten/pivottable/wiki) and [PivotTable.js Examples](https://pivottable.js.org/examples/).

![pivot-table-misc](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/pivot-table-misc.png)

### Header buttons

#### Re-selecting the data to be displayed

Press `☰` button at the top left of the screen to display the file selection tree. Press again to close the tree.

Press this button to select the data to be displayed.

![hamburger](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/hamburger.png)

#### Display setting

Press the `wrench` button in the upper right corner of the screen to open the `Display Settings Panel`.

The settings are applied by pressing `x` or clicking outside the panel frame or pressing the ESC key to close the panel.

![pivot-table-setting](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/pivot-table-setting.png)

##### Show / Hide the Item

Set the items to be displayed in the `Pivot table`. Because the data of `Summary` and `CVSS Metrics` is very large, an error may occur if the number of vulnerabilities is large. In this case, setting `OFF` may improve the situation.

###### Attention CweId

If any of the following is applicable to the `CweId` of the `pivot table`, the CWE ID will be marked with a caution symbol by setting it to `ON`.

- [2019 CWE Top 25 Most Dangerous Software Errors](https://cwe.mitre.org/top25/archive/2019/2019_cwe_top25.html)
- [OWASP Top 10 - 2017](https://github.com/OWASP/Top10/blob/master/2017/)
- [SANS Top 25 Software Errors](https://www.sans.org/top25-software-errors/)

![cweid](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/cweid.png)

##### Priority

Set the data to be displayed with priority in the `pivot table`.The default is NVD data.

You can swap priorities by dragging and dropping blocks.
In the following example, the priority of `JVN` and `Ubuntu` is raised so that Japanese and Ubuntu information is shown first.

![priority](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/priority.gif)

#### Share filter and display settings

Filters and display settings are stored in the Local Storage of each browser, not on the server side. Therefore, if more than one person needs the same filter and display settings, you will need to share them with others.

##### Sender's Operation

1. Click the `🔗` button at the top right of the screen to open the `Settings Sharing Panel`.
2. Press the copy button to copy the URL including the settings to the clipboard.
3. Pass the copied URL to someone else by some way.
4. Close the panel by pressing `x` or clicking outside the panel frame.

![share-setting](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/share-setting.png)

##### Recipient's Operation

1. Access the URL you copied in your browser.
2. Bookmark the URL if necessary. You can open VulsRepo from the bookmark so that you can view it in the future with the same settings.
3. Once you have selected the data to be displayed, the `pivot table` can be displayed with the same settings.
4. If necessary, [Save and overwrite a new filter](#save-and-overwrite-a-new-filter).

### Detail panel

Detailed information is divided into [Main tab](#main-tab) and [Package tab](#package-tab). The initial view is [Main tab](#main-tab). Click on the tabs to switch the display to suit your needs.

To close the panel, press `x` on the top right corner of the panel, or click outside the panel frame, or press ESC key.

![detail-tab](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/detail-tab.png)

#### Main tab

![detail-main](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/detail-main.png)

##### CVSS Detail section

This section shows the basic score and severity, summary of the vulnerability, and the date the information was last updated, as provided by each organization and distributor.

Clicking each type opens the page provided by the organization or distributor in a new window.

See the tooltip of `?` tooltips for basic score and severity categories.

##### CVSS Vector radar chart

It shows the value of each evaluation item calculated by NVD, JVN, and RedHat in a radar chart.
You can switch between the `CVSS v2` and `CVSS v3` charts by clicking the `CvssV2 tab` or the `CvssV3 tab`.
The initial display is `CVSS v3`.

You can control to show or hide the chart by clicking the `NVD v3`, `JVN v3`, or `RehHatV3`.
In the following example, the chart of `NVD v3` and `RehHatV3` is hidden.

![cvss-chart](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/cvss-chart.png)

##### Mitigation section

This section will appear if information on mitigation measures is available.
Click on the header to open and close the section.

![mitigation](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/mitigation.png)

##### CweID section

By clicking on [MITRE](https://cwe.mitre.org/data/index.html) and [JVN](https://www.ipa.go.jp/security/vuln/CWE.html), a new window will open with the appropriate CWE details Display the description page.

If CweID is ranked in one of the following categories, the rank will be displayed as a badge. Clicking on a badge will take you to a new window for each piece of information.

- [2019 CWE Top 25 Most Dangerous Software Errors](https://cwe.mitre.org/top25/archive/2019/2019_cwe_top25.html)
- [OWASP Top 10 - 2017](https://github.com/OWASP/Top10/blob/master/2017/)
- [SANS Top 25 Software Errors](https://www.sans.org/top25-software-errors/)

##### Links section

Open the following page in a new window.

| Item                     | Link                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| MITRE                    | The corresponding CVE page provided by [MITRE](https://cve.mitre.org)                                                                       |
| CveDetails               | The corresponding CVE page provided by [CVE Details](https://www.cvedetails.com/)                                                           |
| CVSS Calculator V2       | `Common Vulnerability Scoring System Calculator Version 2` page from [NIST](https://www.nist.gov/)                                          |
| CVSS Calculator V3       | `Common Vulnerability Scoring System Calculator Version 3.0` page from [NIST](https://www.nist.gov/)                                        |
| CVSS Calculator V3 (JVN) | [Common Vulnerability Scoring System Version 3.0 Calculator](https://jvndb.jvn.jp/cvss/ja/v3.html) page provided by [JVN](https://jvn.jp/). |
| Amazon                   | (Amazon Linux 2 only) [Amazon Linux Security Center](https://alas.aws.amazon.com/alas2.html)                                                |
| RedHat Network           | (RedHat only) [Red Hat Product Errata](https://access.redhat.com/errata/)                                                                   |

CVSS Calculator is useful for calculating severity, including `Environmental Metrics`.

##### USCERT / JPCERT Alert section

If there is [USCERT Alert](https://us-cert.cisa.gov/ncas/alerts) or [JPCERT Alert](https://www.jpcert.or.jp/at/), `USCERT / JPCERT Alert` section appears.
Click on the header to open and close the section.
Shows links to [USCERT Alert](https://us-cert.cisa.gov/ncas/alerts) and [JPCERT Alert](https://www.jpcert.or.jp/at/). Clicking on them will open the page in a new window.

![cert-alert](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/cert-alert.png)

##### Exploits section

`Exploits` section is displayed if there is information on `Exploit Codes` or `Metasploit Modules`.
Click on the header to open and close the section.
Displays links for each `Exploit Codes` and `Metasploit Modules`. Clicking on them will open the page in a new window.

![exploits](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/exploits.png)

##### References section

Click on the header to open and close the section.
Displays the reference information provided by each information organization and distributor. Clicking on them will open the page in a new window.

![references](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/references.png)

#### Package tab

Here is a list of packages that contain vulnerabilities.
Click each `PackageName` to open the [Changelog panel](#changelog-panel).

![package](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/detail-package.png)

### Changelog panel

View the package changelog.

The changelog description is highlighted in orange if the corresponding CVE ID is present. Any other CVE IDs are highlighted in light blue.

To close the panel, click outside the panel frame or press the ESC key.

![changelog](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/changelog.png)

### FAQ

- Why does not Total of Vuls and VulsRepo result match ?

Vuls aggregates the number of CveIDs included in the host.
However, VulsRepo counts Packages related to CveID as one case.
If more than one package is associated with one CveID, Total will increase more than Vuls.

![count](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/image008.png)

## Gallery

![image](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/image001.png)
![image](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/image002.png)
![image](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/filter-03.png)
![image](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/detail-main.png)
![image](https://raw.githubusercontent.com/ishiDACo/vulsrepo/master/gallery/changelog.png)
