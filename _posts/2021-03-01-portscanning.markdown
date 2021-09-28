---
title: Port Scanning
author: linatl
date: "2021-03-01 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---
 
###### Nmap port scan
```
Top1000
> nmap -A 10.10.10.10

Regular
> nmap -A -p- 10.10.10.10 > nmap10.txt

UDP
> nmap -sU -O -p- 10.10.10.10 > nmapudp10.txt

non-ping scan: gebruik -Pn
```

###### Nmap script scan
```
Search in the nmap script database
> cat /usr/share/nmap/scripts/script.db | grep smb

scan 1 script
> nmap --script=http-iis-webdav-vuln 10.10.10.10

scan all smb-vuln-* scripts
> nmap --script=smb-vuln* 10.10.10.10 > nmapsmb10.txt

scan all scripts in the vuln category
> sudo nmap --script vuln 10.10.10.10
```


###### Bash port scan
```
#!/bin/bash
host=10.10.10.10
for port in {1..65535}; do
timeout .1 bash -c "echo >/dev/tcp/$host/$port" &&
echo "port $port is open"
done
echo "Done"  
```
