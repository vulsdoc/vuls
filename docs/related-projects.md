---
id: related-projects
title: Related Projects
sidebar_label: Related Projects
---

## [ohsawa0515/serverless-vuls](https://github.com/ohsawa0515/serverless-vuls)

'serverless-vuls' repository contains an AWS Lambda-backed Vuls architecture for AWS CloudFormation.

## [GEROMAX/vuls_to_updateinfo](https://github.com/GEROMAX/vuls_to_updateinfo)

`vuls_to_updateinfo` script creates 'updateinfo.xml' file from Vuls report file(xml) so that 'yum --security update' command can be executed on CentOS.

## [Jiab77/vuls-scripts](https://github.com/Jiab77/vuls-scripts)

* `vuls-client-scan.sh`: Copy this script on the client to be scanned and run it.
* `vuls-server.sh`: Start the `vuls` scanning server for using the client scan script.
  * (_can be done also with the `vuls-manage.sh` script_)
* `vuls-manage.sh`: Used to run most of the common actions with [Vuls](https://github.com/future-architect/vuls)
  * Start the scan server
  * Start the terminal interface
  * Start the web interface
  * Scan local host
  * Show scan history
  * Generate recent scan reports
  * Generate all scan reports
  * Generate and send recent scan reports and specify severity level
  * Generate and upload recent scan reports
  * Generate and upload all scan reports
  * Create / Reset Vuls configuration
  * Update all vulnerabilities databases

The scripts are based on [vulsctl](https://vuls.io/docs/en/install-with-vulsctl.html).
