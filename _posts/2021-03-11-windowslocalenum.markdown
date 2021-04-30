---
title: Windows Local Enumeration
author: linatl
date: "2021-03-11 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### System
```
> systeminfo
> systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"
> wmic qfe
> wmic qfe get Caption,Description,HotFixID,InstalledOn
> wmic logicaldisk
> wmic logicaldisk get caption,description,providername
> dir /R
```

###### Users
```
> whoami
> whoami /groups
> whoami /priv
> net user
> net user Administrator
> net user /domain
> net group
> net localgroup

the ‘> net localgroup’ command only works when you are an actual user, not webroot, www-data or another system account.
But looking for an existing group, like ‘> net localgroup administrators’ does work.
```

###### Network
```
> ipconfig /all
> arp -a
> route print
> netstat -ano
```

###### Password Hunting
```
Looking for strings “password”
> findstr /si password *.txt *.config *.ini
> findstr /si password *.ini
> findstr /si password *.config
> findstr /si password *.txt

Find these strings in config files
> dir /s *pass* == *cred* == *vnc* == *.config*

Find passwords in all files
> findstr /spin “password” *.*

Wifi passwords
> netsh wlan show profile
> netsh wlan show profile SSID key=clear

Search a specific file
> dir “\local.txt” /s

Search for the string 'Password' in the registry
reg query HKLM /f Password /t Reg_SZ /s
```


###### AV and Firewall
```
> sc query windefend
> sc queryex type= service
> netsh firewall show config
> netsh advfirewall firewall dump

(for older machines):
> netsh firewall show state
```

###### PrivEsc Checklist
```
https://book.hacktricks.xyz/windows/checklist-windows-privilege-escalation
```

###### Automated tools ~ PowerShell
```
PowerUp (from PowerSploit)
https://github.com/PowerShellMafia/PowerSploit/tree/master/Privesc

Sherlock
https://github.com/rasta-mouse/Sherlock

Watson
https://github.com/rasta-mouse/Watson

JAWS (just another windows (enum) script)
https://github.com/411Hall/JAWS
```

###### Automated tools ~ Other
```
Windows Exploit Suggester - Next Generation
https://github.com/bitsadmin/wesng
Can be updated from command line

Metasploit Local Exploit Suggester
https://blog.rapid7.com/2015/08/11/metasploit-local-exploit-suggester-do-less-get-more/
```
