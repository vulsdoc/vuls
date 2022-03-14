---
id: usage-report
title: Report
sidebar_label: Report
---

```bash
report:
	report
		[-lang=en|ja]
		[-config=/path/to/config.toml]
		[-results-dir=/path/to/results]
		[-log-dir=/path/to/log]
		[-refresh-cve]
		[-confidence-over=80]
		[-cvss-over=7]
		[-diff]
		[-diff-minus]
		[-diff-plus]
		[-ignore-unscored-cves]
		[-ignore-unfixed]
		[-to-email]
		[-to-http]
		[-to-slack]
		[-to-chatwork]
		[-to-telegram]
		[-to-localfile]
		[-to-s3]
		[-to-azure-blob]
		[-to-saas]
		[-format-json]
		[-format-one-email]
		[-format-one-line-text]
		[-format-list]
		[-format-full-text]
		[-gzip]
		[-http-proxy=http://192.168.0.1:8080]
		[-debug]
		[-debug-sql]
		[-quiet]
		[-no-progress]
		[-pipe]
		[-http="http://vuls-report-server"]
		[-trivy-cachedb-dir=/path/to/dir]

		[RFC3339 datetime format under results dir]
  -config string
    	/path/to/toml (default "/Users/kanbe/go/src/github.com/future-architect/vuls/config.toml")
  -confidence-over int
      -confidence-over=40 means reporting Confidence Score 40 and over (default: 80) (default 80)
  -cvss-over float
    	-cvss-over=6.5 means reporting CVSS Score 6.5 and over (default: 0 (means report all))
  -debug
    	debug mode
  -debug-sql
    	SQL debug mode
  -diff
    	Plus & Minus Difference between previous result and current result
  -diff-minus
    	Minus Difference between previous result and current result
  -diff-plus
    	Plus Difference between previous result and current result
  -format-full-text
    	Detail report in plain text
  -format-json
    	JSON format
  -format-list
    	Display as list format
  -format-one-email
    	Send all the host report via only one EMail (Specify with -to-email)
  -format-one-line-text
    	One line summary in plain text
  -gzip
    	gzip compression
  -http-proxy string
    	http://proxy-url:port (default: empty)
  -ignore-unfixed
    	Don't report the unfixed CVEs
  -ignore-unscored-cves
    	Don't report the unscored CVEs
  -lang string
    	[en|ja] (default "en")
  -log-dir string
    	/path/to/log (default "/var/log/vuls")
  -pipe
    	Use args passed via PIPE
  -quiet
    	Quiet mode. No output on stdout
  -refresh-cve
    	Refresh CVE information in JSON file under results dir
  -results-dir string
    	/path/to/results (default "/Users/kanbe/go/src/github.com/future-architect/vuls/results")
  -to-azure-blob
    	Write report to Azure Storage blob (container/yyyyMMdd_HHmm/servername.json/xml/txt)
  -to-chatwork
    	Send report via chatwork
  -to-email
    	Send report via Email
  -to-http
    	Send report via HTTP POST
  -to-localfile
    	Write report to localfile
  -to-s3
    	Write report to S3 (bucket/yyyyMMdd_HHmm/servername.json/xml/txt)
  -to-saas
    	Upload report to Future Vuls(https://vuls.biz/) before report
  -to-slack
    	Send report via Slack
  -to-syslog
    	Send report via Syslog
  -to-telegram
    	Send report via Telegram
  -trivy-cachedb-dir string
    	/path/to/dir (default "/Users/hoge/Library/Caches/trivy")

```

## How to detect CVE in Vuls?

Vuls detects CVEs, gets the information of CVEs and filters.

- Detector
  - [trivy](https://github.com/aquasecurity/trivy)
  - [OVAL](https://oval.mitre.org/)
  - [GOST](https://github.com/vulsio/gost)
  - [CPE](https://nvd.nist.gov/products/cpe)
  - [Github Security Alerts](https://docs.github.com/ja/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/about-alerts-for-vulnerable-dependencies)
  - [WPScan](https://wpscan.com/)

- Fill the information
  - [Metasploits](https://www.rapid7.com/ja/db/?type=metasploit)
  - [NVD](https://nvd.nist.gov/vuln)
  - [JVN](https://jvndb.jvn.jp/)
  - [CISA (Known Exploited Vulnerabilities Catalog)](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
  - [Exploit Database (exploit)](https://www.exploit-db.com/)


![Vuls-Detect](/img/docs/detect-abst.png)



## Example of three format options

Vuls has three format options.

- format-list(default)
- format-one-line-text
- format-full-text

### format-list

![report-list](/img/docs/report-format-list.png)

```bash
$ vuls report

c74 (centos7.4.1708)
====================
Total: 294 (High:65 Medium:198 Low:24 ?:7), 93/294 Fixed, 708 installed, 285 updatable

+------------------+------+----------+---------+---------------------------------------------------+
|      CVE-ID      | CVSS |  ATTACK  |  FIXED  |                        NVD                        |
+------------------+------+----------+---------+---------------------------------------------------+
| CVE-2017-11176   | 10.0 |  Network |   Fixed | https://nvd.nist.gov/vuln/detail/CVE-2017-11176   |
| CVE-2017-12762   | 10.0 |  Network | Unfixed | https://nvd.nist.gov/vuln/detail/CVE-2017-12762   |
| CVE-2017-18017   | 10.0 |  Network |   Fixed | https://nvd.nist.gov/vuln/detail/CVE-2017-18017   |
| CVE-2017-1000158 |  9.8 |  Network | Unfixed | https://nvd.nist.gov/vuln/detail/CVE-2017-1000158 |
| CVE-2017-10684   |  9.8 |  Network | Unfixed | https://nvd.nist.gov/vuln/detail/CVE-2017-10684   |
| CVE-2017-10685   |  9.8 |  Network | Unfixed | https://nvd.nist.gov/vuln/detail/CVE-2017-10685   |
... snip ...
```

### format-one-line-text

```bash
$ vuls report -format-one-line-text

One Line Summary
================
c74     Total: 294 (High:65 Medium:198 Low:24 ?:7)      93/294 Fixed    708 installed, 285 updatable
deb8    Total: 490 (High:62 Medium:158 Low:22 ?:248)    11/490 Fixed    512 installed
```

### format-full-text

![report-list](/img/docs/report-full-text.png)

```bash
$ vuls report -format-full-text

c74 (centos7.4.1708)
====================
Total: 23 (High:22 Medium:1 Low:0), 9/23 Fixed, 708 installed, 285 updatable

+---------------+----------------------------------------------------------------------------------+
| CVE-2017-9233 |                                                                                  |
+---------------+----------------------------------------------------------------------------------+
| Max Score     | 7.5 HIGH (nvd)                                                                   |
| nvd           | 7.5/CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H HIGH                            |
| redhat_api    | 6.5/CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H MODERATE                        |
| nvd           | 5.0/AV:N/AC:L/Au:N/C:N/I:N/A:P MEDIUM                                            |
| Summary       | XML External Entity vulnerability in libexpat 2.2.0 and earlier (Expat XML       |
|               | Parser Library) allows attackers to put the parser in an infinite loop using a   |
|               | malformed external entity definition from an external DTD.                       |
| Mitigation    |  Do not parse untrusted arbitrary XML data using the expat                       |
|               | package.                                                                         |
| CWE           | CWE-835: Loop with Unreachable Exit Condition ('Infinite Loop') (redhat_api)     |
| CWE           | [OWASP Top4] CWE-611: Improper Restriction of XML External Entity Reference      |
|               | ('XXE') (nvd)                                                                    |
| Affected PKG  | expat-2.1.0-10.el7_3 -> Will not fix                                             |
| Confidence    | 100 / RedHatAPIMatch                                                             |
| Source        | https://nvd.nist.gov/vuln/detail/CVE-2017-9233                                   |
| CVSSv2 Calc   | https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2017-9233          |
| CVSSv3 Calc   | https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2017-9233          |
| RHEL-CVE      | https://access.redhat.com/security/cve/CVE-2017-9233                             |
| CWE           | https://cwe.mitre.org/data/definitions/CWE-835.html                              |
| CWE           | https://cwe.mitre.org/data/definitions/CWE-611.html                              |
| OWASP Top10   | https://github.com/OWASP/Top10/blob/master/2017/en/0xa4-xxe.md                   |
+---------------+----------------------------------------------------------------------------------+

... snip ...
```

```bash
c74 (centos7.4.1708)
====================
Total: 23 (High:22 Medium:1 Low:0), 9/23 Fixed, 708 installed, 285 updatable
```

- `c74` means that it is a scan report of `servers.c74` defined in config.toml.
- `(centos7.4.1708)` means that the version of the OS is CentOS 7.4.
- `Total: 23 (High:22 Medium:1 Low:0)` means that a total of 23 vulnerabilities exist, and the distribution of CVSS Severity is displayed.
- `9/23 Fixed`means` that a total of 23 vulnerabilities exist, and 9 is fixed, 14 is not fixed yet.
- `285 updatable packages` means that there are 285 update-able packages on the target server.

```bash
+---------------+----------------------------------------------------------------------------------+
| CVE-2017-9233 |                                                                                  |
+---------------+----------------------------------------------------------------------------------+
| Max Score     | 7.5 HIGH (nvd)                                                                   |
| nvd           | 7.5/CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H HIGH                            |
| redhat_api    | 6.5/CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H MODERATE                        |
| nvd           | 5.0/AV:N/AC:L/Au:N/C:N/I:N/A:P MEDIUM                                            |
| Summary       | XML External Entity vulnerability in libexpat 2.2.0 and earlier (Expat XML       |
|               | Parser Library) allows attackers to put the parser in an infinite loop using a   |
|               | malformed external entity definition from an external DTD.                       |
| Mitigation    |  Do not parse untrusted arbitrary XML data using the expat                       |
|               | package.                                                                         |
| CWE           | CWE-835: Loop with Unreachable Exit Condition ('Infinite Loop') (redhat_api)     |
| CWE           | [OWASP Top4] CWE-611: Improper Restriction of XML External Entity Reference      |
|               | ('XXE') (nvd)                                                                    |
| Affected PKG  | expat-2.1.0-10.el7_3 -> Will not fix                                             |
| Confidence    | 100 / RedHatAPIMatch                                                             |
| Source        | https://nvd.nist.gov/vuln/detail/CVE-2017-9233                                   |
| CVSSv2 Calc   | https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2017-9233          |
| CVSSv3 Calc   | https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2017-9233          |
| RHEL-CVE      | https://access.redhat.com/security/cve/CVE-2017-9233                             |
| CWE           | https://cwe.mitre.org/data/definitions/CWE-835.html                              |
| CWE           | https://cwe.mitre.org/data/definitions/CWE-611.html                              |
| OWASP Top10   | https://github.com/OWASP/Top10/blob/master/2017/en/0xa4-xxe.md                   |
+---------------+----------------------------------------------------------------------------------+
```

- `Max Score` means Max CVSS Score.
- `nvd` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of  NVD
- `redhat` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of Red Hat OVAL
- `jvn` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of JVN
- `CWE` means [CWE - Common Weakness Enumeration](https://nvd.nist.gov/cwe.cfm) of the CVE.
- `[OWASP Top10]` means the CWE is included in [OWASP TOP 10]( https://github.com/OWASP/Top10/blob/master/2017/en/0x05-introduction.md)
- `Affected PKG` shows the package version information including this vulnerability.
- `Confidence` means the reliability of detection.
  - `100` is highly reliable
- Item list of `Confidence`

  | Detection Method       | Confidence |  type                            |Description|
  |:-----------------------|-----------:|:---------------------------------|:--|
  | OvalMatch              | 100        | CentOS, AlmaLinux, Rocky Linux, RHEL, Fedora, Oracle, Ubuntu, Debian, SUSE |OVAL |
  | RedHatAPIMatch         | 100        | CentOS, AlmaLinux, Rocky Linux, RHEL |Red Hat API |
  | UbuntuAPIMatch         | 100        | Ubuntu                           |Ubuntu API |
  | DebianSecurityTrackerMatch| 100     | Debian                           |Debian Security Tracker |
  | TrivyMatch             | 100        | Container image and Lockfile     |trivy |
  | PkgAuditMatch          | 100        |                          FreeBSD |pkg audit|
  | WPScanMatch            | 100        |                        WordPress |wpscan.com |
  | GitHubMatch            | 100        |  library                         |Detected by GitHub Security Alerts |
  | NvdExactVersionMatch   | 100        |                         CPE scan |Range match in semantic versioning format or an exact match.|
  | NvdRoughVersionMatch   |  80        |                         CPE scan |Rough version match for non-semantic versioning as defined in NVD.|
  | NvdVendorProductMatch  |  10        |                         CPE scan |If the version is not defined for the CPE specified in config.toml. There is a possibility of false positives.|
  | JvnVendorProductMatch  |  10        |                         CPE scan |Detected by Jvn. Affected Version in JVN is not a parsable format, so it is matched by Part,  Vendor and Product. There is a possibility of false positives.|
  | ChangelogExactMatch    |  95        | CentOS, Ubuntu, Debian, Raspbian |Exact version match between changelog and package version.|
  | ChangelogRoughMatch    |  50        |         Ubuntu, Debian, Raspbian |Rough version match between changelog and package version.|

## Example: Generate all client scan reports

```bash
# Show scan history
$ vuls history

# Generate reports for all scan history
$ for REPORT_DATE in $(vuls history | awk '{ print $1 }') ; do echo "$REPORT_DATE" | vuls report -format-one-line-text -pipe ; done

# Generate reports for a specific date
vuls history | grep "DATE" | vuls report -format-one-line-text -pipe
```
## Example: Difference between previous result and current result

The -diff-plus option detects new or updated vulnerabilities compared to the previous json.The one with _diff.json is output.
The -diff-minus option detects vulnerabilities that have already been patched compared to the previous json.The one with _diff.json is output.
-diff option turns on both options -diff-plus and -diff-minus

```bash
# After vuls scan, get minus difference.
$ vuls report -diff-minus -to-localfile -format-json
```

## Example: Specify the path of go-cve-dictionary, goval-dictionary and gost

config.toml

```toml
[cveDict]
type = "sqlite3"
SQLite3Path = "/path/to/cve.sqlite3"

[ovalDict]
type = "sqlite3"
SQLite3Path = "/path/to/oval.sqlite3"

[gost]
type = "sqlite3"
SQLite3Path = "/path/to/gost.sqlite3"

[exploit]
type = "sqlite3"
SQLite3Path = "/path/to/go-exploitdb.sqlite3"

[metasploit]
type = "sqlite3"
SQLite3Path = "/path/to/go-msfdb.sqlite3"
```

## Example: Send scan results to another endpoint

Define HTTP section in [config.toml](https://vuls.io/docs/en/config.toml.html#http-section)

```bash
$ vuls report \
      -to-http \
      -format-json
```

Sample `PHP` code on the endpoint side:

```php
<?php
$tmp_file = __DIR__ . '/vuls-'. uniqid() . '.json';
file_put_contents($tmp_file, file_get_contents("php://input"));
if (file_exists($tmp_file)) {
    $raw_json_data = file_get_contents($tmp_file);
    $json_data = json_decode($raw_json_data);
    $scanned_hostname = $json_data->{'serverName'};
    $new_file = __DIR__ . '/' . strtolower($scanned_hostname) . '.json';
    rename($tmp_file, $new_file);
}
?>
```

Source: `vuls.php`

> The following code will simply create a `JSON` file named with the hostname extracted that way `hostname.json`. It will be created in the same location of the `vuls.php` file.

## Example: Send scan results to email

Define EMail section in [config.toml](https://vuls.io/docs/ja/config.toml.html#email-section)

```bash
$ vuls report \
      -to-email \
      -cvss-over=7
```

With this sample command, it will ..

- Send scan results to Email
- Only Report CVEs that CVSS score is over 7

## Example: Send scan results to ChatWork

Define ChatWork section in [config.toml](https://vuls.io/docs/en/config.toml.html#chatwork-section)

```bash
$ vuls report \
      -to-chatwork \
      -cvss-over=7
```

With this sample command, it will ..

- Send scan results to ChatWork
- Only Report CVEs that CVSS score is over 7

## Example: Send scan results to Slack

Define Slack section in [config.toml](https://vuls.io/docs/en/config.toml.html#slack-section)

```bash
$ vuls report \
      -to-slack \
      -cvss-over=7
```

With this sample command, it will ..

- Send scan results to slack
- Only Report CVEs that CVSS score is over 7

## Example: Send scan results to Telegram

Define Telegram section in [config.toml](https://vuls.io/docs/en/config.toml.html#telegram-section)

```bash
$ vuls report \
      -to-telegram \
      -cvss-over=7
```

With this sample command, it will ..

- Send scan results to Telegram
- Only Report CVEs that CVSS score is over 7

## Example: Put results in S3 bucket

To put results in S3 bucket, configure following settings in AWS before reporting.

- Create S3 bucket. See [Creating a Bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/CreatingaBucket.html)
- Configure access to S3 resources. You can do this in several ways:
  - Configure the environment variables. See [Configuring the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
  - Configure the security credentials. See [Configuring the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
  - Create an IAM role for the service and attach it to the service (EC2, AWS Lambda). [Creating a Role to Delegate Permissions to an AWS Service](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html)
- To configure environment variables, security credentials, create an access key. See [Managing Access Keys for IAM Users](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

Example of IAM policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::vuls/*"
        }
    ]
}
```

config.toml

```bash
[aws]
profile = "default"
region = "ap-northeast-1"
s3Bucket = "vuls"
s3ServerSideEncryption = "AES256"
```

reporting

```bash
$ vuls report \
      -to-s3 \
      -format-json
```

With this sample command, it will ..

Put scan result(JSON) in S3 bucket

- with AES256
- bucket name is "vuls"
- ap-northeast-1
- profile is "default"
- The Server-side encryption algorithm (e.g., AES256, aws:kms).

## Example: Put results in Azure Blob storage

To put results in Azure Blob Storage, configure following settings in Azure before reporting.

- Create a Azure Blob container

config.toml

```bash
[azure]
accountName = "default"
accountKey = "xxxxxxxxxxxxxx"
containerName "vuls"
```

```bash
$ vuls report -to-azure-blob
...
```

With this sample command, it will ..

Put scan result(JSON) in Azure Blob Storage.

- container name is "vuls"
- storage account is "test"
- accesskey is "access-key-string"

account and access key can be defined in environment variables.

```bash
$ export AZURE_STORAGE_ACCOUNT=test
$ export AZURE_STORAGE_ACCESS_KEY=access-key-string
$ vuls report -to-azure-blob
```

## Example: Put results in Google Cloud Storage
`vuls report` doesn’t support Google Cloud Strorage option
If you want to put scan result(JSON) in Google Cloud Storage,
please use `gsutil`
```
$ gsutil cp ./results/yyyyMMdd_HHmm/servername.json gs://my-awesome-bucket
```
see [Quickstart: Using the gsutil tool](https://cloud.google.com/storage/docs/quickstart-gsutil)

## Example: IgnoreCves

Define ignoreCves in config if you don't want to report(Slack, EMail, Text...) specific CVE IDs.

- config.toml

```toml
[default]
ignoreCves = ["CVE-2016-6313"]

[servers.bsd]
host     = "192.168.11.11"
user     = "kanbe"
ignoreCves = ["CVE-2016-6314"]
```

## Example: IgnoreCves of a container

- config.toml

```toml
[default]
ignoreCves = ["CVE-2016-6313"]

[servers.cent7]
host     = "192.168.11.11"
user     = "kanbe"

[servers.cent7.containers.romantic_goldberg]
ignoreCves = ["CVE-2016-6314"]
```

## Example: IgnorePkgsRegexp

Define ignorePkgsRegexp in config if you don't want to report(Slack, EMail, Text...) match against the specific regexp [google/re2](https://github.com/google/re2/wiki/Syntax).

```bash
[servers.c74]
host     = "192.168.11.11"
user     = "kanbe"
ignorePkgsRegexp = ["^kernel", "^python"]

[servers.c74.containers.romantic_goldberg]
ignorePkgsRegexp = ["^vim"]
```

## Example: GitHub Security Alerts Integration

- [Usage: Integrate with GitHub Security Alerts](https://vuls.io/docs/en/usage-scan-non-os-packages.html#usage-integrate-with-github-security-alerts)

## Example: Add optional key-value pairs to JSON

Optional key-value can be outputted to JSON.
The key-value in the default section will be overwritten by servers section's key-value.
For instance, you can use this field for Azure ResourceGroup name, Azure VM Name and so on.

- config.toml

```toml
[default]
[default.optional]
key1 = "default_value"
key3 = val3


[servers.bsd]
host     = "192.168.11.11"
user     = "kanbe"
[servers.bsd.optional]
key1 = "val1"
key2 = "val2"
```

- bsd.json

```json
[
  {
    "ServerName": "bsd",
    "Family": "FreeBSD",
    "Release": "10.3-RELEASE",
    .... snip ...
    "Optional": {
        "key1": "val1" ,
        "key2": "val2" ,
        "key3": "val3"
    }
  }
]
```

## Example: Use MySQL as a DB storage back-end

config.toml

```toml
[cveDict]
type = "mysql"
url = "user:pass@tcp(localhost:3306)/dbname?parseTime=true"

[ovalDict]
type = "mysql"
url = "user:pass@tcp(localhost:3306)/dbname?parseTime=true"

[gost]
type = "mysql"
url = "user:pass@tcp(localhost:3306)/dbname?parseTime=true"

[exploit]
type = "mysql"
url = "user:pass@tcp(localhost:3306)/dbname?parseTime=true"

[metasploit]
type = "mysql"
url = "user:pass@tcp(localhost:3306)/dbname?parseTime=true"
```

```bash
$ vuls report
...
```

If you get below error message while fetching, define `sql_mode`.

```bash
Error 1292: Incorrect datetime value: '0000-00-00' for column 'issued' at row 1
```

For details, see TODO

## Example: Use PostgreSQL as a DB storage back-end

config.toml

```toml
[cveDict]
type = "postgres"
url = "host=myhost user=user dbname=dbname sslmode=disable password=password"

[ovalDict]
type = "postgres"
url = "host=myhost user=user dbname=dbname sslmode=disable password=password"

[gost]
type = "postgres"
url = "host=myhost user=user dbname=dbname sslmode=disable password=password"

[exploit]
type = "postgres"
url = "host=myhost user=user dbname=dbname sslmode=disable password=password"

[metasploit]
type = "postgres"
url = "host=myhost user=user dbname=dbname sslmode=disable password=password"
```

```bash
$ vuls report
...
```

## Example: Use Redis as a DB storage back-end

config.toml

```toml
[cveDict]
type = "redis"
url = "redis://localhost/1"

[ovalDict]
type = "redis"
url = "redis://localhost/1"

[gost]
type = "redis"
url = "redis://localhost/1"

[exploit]
type = "redis"
url = "redis://localhost/1"

[metasploit]
type = "redis"
url = "redis://localhost/1"
```

```bash
$ vuls report
...
```

## Example: Use HTTP to access to vulnerability dictionary

config.toml

```toml
[cveDict]
type = "http"
url = "http://localhost:1323"

[ovalDict]
type = "http"
url = "http://localhost:1324"

[gost]
type = "http"
url = "http://localhost:1325"

[exploit]
type = "http"
url = "http://localhost:1326"

[metasploit]
type = "http"
url = "http://localhost:1327"
```

```bash
$ vuls report
...
```
