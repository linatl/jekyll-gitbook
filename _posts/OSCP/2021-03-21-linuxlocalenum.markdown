---
title: Linux Local Enumeration
author: linatl
date: "2021-03-21 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### PrivEsc Checklists
```
Hacktricks XYZ
https://book.hacktricks.xyz/linux-unix/linux-privilege-escalation-checklist

g0tmi1k
https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/

Sushant757
https://sushant747.gitbooks.io/total-oscp-guide/content/privilege_escalation_-_linux.html
```

###### System
```
> cat /etc/*-release
? uname -m
> uname -a
> lsb_release -a   (Debian based OSs)
> arch

List installed packages
> dpkg -l  (Debian based OSs)
> rpm -qa  (CentOS / openSUSE )

Running processes
> ps -faux
```

###### Users
```
> whoami
> id

> cat /etc/passwd
    or:
> awk -F: '{ print }' /etc/passwd
> grep -vE "nologin|false" /etc/passwd

Which files can we write as a certain group?
> find / -type f -group groupname 2>/dev/null
```

###### Network
```
All connections
> netstat -ano (all)
> ss -a

Active connections
> netstat -lntup
> netstat -antup
> ss -ut

Network interfaces
> ifconfig
> ip addr
```

###### Password Hunting
```
> cat /etc/shadow

Search for stored passwords
> locate file.txt
> find /etc | grep *.Conf

phpmyadmin
> cat /etc/phpmyadmin/config-db.php
> cat /etc/mysql/my.cnf

Testing validity of found mysql credentials
> mysql -username -password -e 'show databases;'
```

###### AV and Firewall
```
> iptables -L
```

###### Automated Tools
```
LinPEAS

https://github.com/carlospolop/PEASS-ng
> cp /opt/PEASS-ng/linPEAS/linpeas.sh ./

LinEnum
https://github.com/rebootuser/LinEnum

unix-privesc-check
> cp /usr/share/unix-privesc-check/unix-privesc-check ./
After uploading:
> unix-privesc-check standard
> unix-privesc-check detailed

Metasploit Local Exploit Suggester
https://blog.rapid7.com/2015/08/11/metasploit-local-exploit-suggester-do-less-get-more/
```
