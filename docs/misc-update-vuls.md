---
id: misc-update-vuls
title: Update Vuls to the latest version
sidebar_label: Update Vuls to the latest version
---

- Update go-cve-dictionary  
If the DB schema was changed, please specify new SQLite3, MySQL, PostgreSQL or Redis DB file.
```
$ cd $GOPATH/src/github.com/kotakanbe/go-cve-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update goval-dictionary  
If the DB schema was changed, please specify new SQLite3, MySQL, PostgreSQL or Redis DB file.
```
$ cd $GOPATH/src/github.com/kotakanbe/goval-dictionary
$ git pull
$ rm -r vendor
$ make install
```

- Update vuls
```
$ cd $GOPATH/src/github.com/future-architect/vuls
$ git pull
$ rm -r vendor
$ make install
```

- Binary file was built under $GOPATH/bin
- If an error occurs, delete `$GOPATH/pkg` before executing it


#TODO 

Docker setup
package setup
