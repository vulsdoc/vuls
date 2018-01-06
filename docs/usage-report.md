---
id: usage-report
title: Report
sidebar_label: Report
---

```
report:
        report
                [-lang=en|ja]
                [-config=/path/to/config.toml]
                [-results-dir=/path/to/results]
                [-log-dir=/path/to/log]
                [-refresh-cve]
                [-cvedb-type=sqlite3|mysql|postgres]
                [-cvedb-path=/path/to/cve.sqlite3]
                [-cvedb-url=http://127.0.0.1:1323 DB connection string]
                [-ovaldb-type=sqlite3|mysql]
                [-ovaldb-path=/path/to/oval.sqlite3]
                [-ovaldb-url=http://127.0.0.1:1324 or DB connection string]
                [-cvss-over=7]
                [-diff]
                [-ignore-unscored-cves]
                [-ignore-unfixed]
                [-to-email]
                [-to-slack]
                [-to-localfile]
                [-to-s3]
                [-to-azure-blob]
                [-format-json]
                [-format-xml]
                [-format-one-email]
                [-format-one-line-text]
                [-format-short-text]
                [-format-full-text]
                [-gzip]
                [-aws-profile=default]
                [-aws-region=us-west-2]
                [-aws-s3-bucket=bucket_name]
                [-aws-s3-results-dir=/bucket/path/to/results]
                [-azure-account=accout]
                [-azure-key=key]
                [-azure-container=container]
                [-http-proxy=http://192.168.0.1:8080]
                [-debug]
                [-debug-sql]
                [-pipe]

		[RFC3339 datetime format under results dir]

  -aws-profile string
        AWS profile to use (default "default")
  -aws-region string
        AWS region to use (default "us-east-1")
  -aws-s3-bucket string
        S3 bucket name
  -aws-s3-results-dir string
        /bucket/path/to/results (option)
  -azure-account string
        Azure account name to use. AZURE_STORAGE_ACCOUNT environment variable is used if not specified
  -azure-container string
        Azure storage container name
  -azure-key string
        Azure account key to use. AZURE_STORAGE_ACCESS_KEY environment variable is used if not specified
  -config string
        /path/to/toml
  -cvedb-path string
        /path/to/sqlite3 (For get cve detail from cve.sqlite3)
  -cvedb-type string
        DB type for fetching CVE dictionary (sqlite3, mysql or postgres) (default "sqlite3")
  -cvedb-url string
        http://cve-dictionary.com:8080 DB connection string
  -cvss-over float
        -cvss-over=6.5 means reporting CVSS Score 6.5 and over (default: 0 (means report all))
  -diff
        Difference between previous result and current result
  -debug
        debug mode
  -debug-sql
        SQL debug mode
  -format-full-text
        Detail report in plain text
  -format-json
        JSON format
  -format-one-email
        Send all the host report via only one EMail (Specify with -to-email)
  -format-one-line-text
        One line summary in plain text
  -format-short-text
        Summary in plain text
  -format-xml
        XML format
  -gzip
        gzip compression
  -http-proxy string
        http://proxy-url:port (default: empty)
  -ignore-unscored-cves
        Don't report the unscored CVEs
  -ignore-unfixed
        Don't report the unfixed CVEs
  -lang string
        [en|ja] (default "en")
  -log-dir string
        /path/to/log (default "/var/log/vuls")
  -ovaldb-path string
        /path/to/sqlite3 (For get oval detail from oval.sqlite3) (default "/Users/kotakanbe/go/src/github.com/future-architect/vuls/oval.sqlite3")
  -ovaldb-type string
        DB type for fetching OVAL dictionary (sqlite3 or mysql) (default "sqlite3")
  -ovaldb-url string
        http://goval-dictionary.com:1324 or mysql connection string
  -pipe
        Use stdin via PIPE
  -refresh-cve
        Refresh CVE information in JSON file under results dir
  -results-dir string
        /path/to/results
  -to-azure-blob
        Write report to Azure Storage blob (container/yyyyMMdd_HHmm/servername.json/xml/txt)
  -to-email
        Send report via Email
  -to-localfile
        Write report to localfile
  -to-s3
        Write report to S3 (bucket/dir/yyyyMMdd_HHmm/servername.json/xml/txt)
  -to-slack
        Send report via Slack
```

## How to read a report

### Example

```
$ vuls report -format-full-text

172-31-4-82 (amazon 2015.09)
============================
Total: 94 (High:19 Medium:54 Low:7 ?:14)        103 updatable packages

CVE-2016-5636
-------------
Score           10.0 (High)
Vector          (AV:N/AC:L/Au:N/C:C/I:C/A:C)
Summary         Integer overflow in the get_data function in zipimport.c in CPython (aka Python)
                before 2.7.12, 3.x before 3.4.5, and 3.5.x before 3.5.2 allows remote attackers
                to have unspecified impact via a negative data size value, which triggers a
                heap-based buffer overflow.
CWE             https://cwe.mitre.org/data/definitions/190.html
NVD             https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2016-5636
MITRE           https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-5636
CVE Details     http://www.cvedetails.com/cve/CVE-2016-5636
CVSS Calculator https://nvd.nist.gov/cvss/v2-calculator?name=CVE-2016-5636&vector=(AV:N/AC:L/...
RHEL-CVE        https://access.redhat.com/security/cve/CVE-2016-5636
ALAS-2016-724   https://alas.aws.amazon.com/ALAS-2016-724.html
Package         python27-2.7.10-4.119.amzn1 -> python27-2.7.12-2.120.amzn1
                python27-devel-2.7.10-4.119.amzn1 -> python27-devel-2.7.12-2.120.amzn1
                python27-libs-2.7.10-4.119.amzn1 -> python27-libs-2.7.12-2.120.amzn1
Confidence      100 / YumUpdateSecurityMatch

... snip ...
```

### Summary part

```
cent6 (centos6.6)
=================
Total: 145 (High:23 Medium:101 Low:21 ?:0)      83 updatable packages
```

- `cent6` means that it is a scan report of `servers.cent6` defined in cocnfig.toml.
- `(centos6.6)` means that the version of the OS is CentOS6.6.
- `Total: 145 (High:23 Medium:101 Low:21 ?:0)` means that a total of 145 vulnerabilities exist, and the distribution of CVSS Severity is displayed.
- `83 updatable packages` means that there are 83 updateable packages on the target server.

### Detailed Part

```
CVE-2016-0702
----------------
Max Score               2.6 IMPORTANT (redhat)
nvd                     1.9/AV:L/AC:M/Au:N/C:P/I:N/A:N
redhat                  2.6/AV:L/AC:H/Au:N/C:P/I:P/A:N
jvn                     1.9/AV:L/AC:M/Au:N/C:P/I:N/A:N
CVSSv2 Calc             https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator?name=CVE-2016-0702
Summary                 The MOD_EXP_CTIME_COPY_FROM_PREBUF function in crypto/bn/bn_exp.c in OpenSSL
                        1.0.1 before 1.0.1s and 1.0.2 before 1.0.2g does not properly consider
                        cache-bank access times during modular exponentiation, which makes it easier for
                        local users to discover RSA keys by running a crafted application on the same
                        Intel Sandy Bridge CPU core as a victim and leveraging cache-bank conflicts, aka
                        a "CacheBleed" attack.
Source                  https://nvd.nist.gov/vuln/detail/CVE-2016-0702
RHEL-CVE                https://access.redhat.com/security/cve/CVE-2016-0702
CWE-200 (nvd)           https://cwe.mitre.org/data/definitions/200.html
Package/CPE             openssl-1.0.1e-30.el6 - 1.0.1e-57.el6
Confidence              100 / OvalMatch
```

- `Max Score` means Max CVSS Score.
- `nvd` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of  NVD
- `redhat` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of RedHat OVAL
- `jvn` shows [CVSS Vector](https://nvd.nist.gov/CVSS/Vector-v2.aspx) of JVN 
- `Summary` means Summary of the CVE.
- `CWE` means [CWE - Common Weakness Enumeration](https://nvd.nist.gov/cwe.cfm) of the CVE.
- `Package` shows the package version information including this vulnerability.
- `Confidence` means the reliability of detection.
  - `100` is highly reliable
  - `YumUpdateSecurityMatch` is the method of detecting this vulnerability.
- Item list of `Confidence`

  | Detection Method       | Confidence         |  OS                              |Description|
  |:-----------------------|-------------------:|:---------------------------------|:--|
  | OvalMatch              | 100                | CentOS, RHEL, Oracle, Ubuntu, Debian, SUSE |Detection using OVAL |
  | YumUpdateSecurityMatch | 100                |               RHEL, Amazon, Oracle |Detection using yum-plugin-security|
  | ChangelogExactMatch    | 95                 | CentOS, Ubuntu, Debian, Raspbian |Exact version match between changelog and package version|
  | ChangelogLenientMatch  | 50                 |         Ubuntu, Debian, Raspbian |Lenient version match between changelog and package version| 
  | PkgAuditMatch          | 100                |                          FreeBSD |Detection using pkg audit|
  | CpeNameMatch           | 100                |                              All |Search for NVD information with CPE name specified in config.toml|


## Example: Send scan results to Slack
```
$ vuls report \
      -to-slack \
      -cvss-over=7 \
      -cvedb-path=$PWD/cve.sqlite3
```
With this sample command, it will ..

- Send scan results to slack
- Only Report CVEs that CVSS score is over 7


```
$ vuls report \
      -to-slack \
      -cvss-over=7 \
      -cvedb-path=$PWD/cve.sqlite3
```
With this sample command, it will ..

- Send scan results to slack
- Only Report CVEs that CVSS score is over 7


## Example: Put results in S3 bucket
To put results in S3 bucket, configure following settings in AWS before reporting.

- Create S3 bucket. see [Creating a Bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/CreatingaBucket.html)  
- Configure access to S3 resources. You can do this in several ways:
  - Configure the environment variables. see [Configuring the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
  - Configure the security credentials. see [Configuring the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
  - Create an IAM role for the service and attach it to the service(EC2, AWS Lambda). [Creating a Role to Delegate Permissions to an AWS Service](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html)
- To configure environment variables, security credentials, create an access key. see [Managing Access Keys for IAM Users](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)


Example of IAM policy:

```
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

```
$ vuls report \
      -cvedb-path=$PWD/cve.sqlite3 \
      -to-s3 \
      -format-json \
      -aws-region=ap-northeast-1 \
      -aws-s3-bucket=vuls \
      -aws-profile=default
```
With this sample command, it will ..
 
- Put scan result(JSON) in S3 bucket. The bucket name is "vuls" in ap-northeast-1 and profile is "default"

## Example: Put results in Azure Blob storage

To put results in Azure Blob Storage, configure following settings in Azure before reporting.
- Create a Azure Blob container

```
$ vuls scan \
      -cvedb-path=$PWD/cve.sqlite3 \
      -report-azure-blob \
      -azure-container=vuls \
      -azure-account=test \
      -azure-key=access-key-string
```
With this sample command, it will ..
- Put scan result(JSON) in Azure Blob Storage. The container name is "vuls", storage account is "test" and accesskey is "access-key-string"

account and access key can be defined in environment variables.
```
$ export AZURE_STORAGE_ACCOUNT=test
$ export AZURE_STORAGE_ACCESS_KEY=access-key-string
$ vuls scan \
      -cvedb-path=$PWD/cve.sqlite3 \
      -report-azure-blob \
      -azure-container=vuls
```

## Example: IgnoreCves

Define ignoreCves in config if you don't want to report(Slack, EMail, Text...) specific CVE IDs. But these ignoreCves will be output to JSON file like below.

- config.toml
```toml
[default]
ignoreCves = ["CVE-2016-6313"]

[servers.bsd]
host     = "192.168.11.11"
user     = "kanbe"
ignoreCves = ["CVE-2016-6314"]
```

- bsd.json
```json
[
  {
    "ServerName": "bsd",
    "Family": "FreeBSD",
    "Release": "10.3-RELEASE",
    "IgnoredCves" : [
      "CveDetail" : {
        "CVE-2016-6313",
        ...
      },
      "CveDetail" : {
        "CVE-2016-6314",
        ...
      }
    ]
  }
]
```


## Example: Add optional key-value pairs to JSON

Optional key-value can be outputted to JSON.  
The key-value in the default section will be overwritten by servers section's key-value.  
For instance, you can use this field for Azure ResourceGroup name, Azure VM Name and so on.

- config.toml
```toml
[default]
optional = [
	["key1", "default_value"],
	["key3", "val3"],
]

[servers.bsd]
host     = "192.168.11.11"
user     = "kanbe"
optional = [
	["key1", "val1"],
	["key2", "val2"],
]
```

- bsd.json
```json
[
  {
    "ServerName": "bsd",
    "Family": "FreeBSD",
    "Release": "10.3-RELEASE",
    .... snip ...
    "Optional": [
      [  "key1", "val1" ],
      [  "key2", "val2" ],
      [  "key3", "val3" ]
    ]
  }
]
```

## Example: Use MySQL as a DB storage back-end

```
$ vuls report \
      -cvedb-type=mysql \
      -cvedb-url="user:pass@tcp(localhost:3306)/dbname?parseTime=true"
```

## Example: Use PostgreSQL as a DB storage back-end

```
$ vuls report \
      -cvedb-type=postgres \
      -cvedb-url=""host=myhost user=user dbname=dbname sslmode=disable password=password""
```

## Example: Use Redis as a DB storage back-end

```
$ vuls report \
  -cvedb-type=redis -cvedb-url="redis://localhost/0" 
  -ovaldb-type=redis  -ovaldb-url="redis://localhost/1"
```

