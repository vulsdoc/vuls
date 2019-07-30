---
id: abstract
title: Abstract
sidebar_label: Abstract
---

For a system administrator, having to perform security vulnerability analysis and software updates on a daily basis can be a burden.
To avoid downtime in production environment, it is common for system administrators to choose not to use the automatic update option provided by their package manager and instead perform updates manually.
This leads to the following problems.

- System administrators need to constantly monitor NVD (National Vulnerability Database) or similar databases for new vulnerabilities.
- It might be impossible for the system administrator to monitor all software if there is a large number of installed packages on the server.
- It is expensive to perform analysis to determine the servers affected by new vulnerabilities. The possibility of overlooking a server or two during analysis is there.


Vuls is a tool created to solve the problems listed above. It has the following characteristics.

- Informs users of the vulnerabilities that are related to the system.
- Informs users of the servers that are affected.
- Vulnerability detection is done automatically to prevent any oversight.
- Report is generated on regular basis using CRON or other methods to manage vulnerability.

![Vuls-Motivation](/img/docs/vuls-motivation.png)
