---
title: Port Scanning
author: linatl
category: "OSCP"
date: "2021-03-01 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Nmap TCP port scan
```
Top1000
> nmap -A 10.10.10.10

Regular
> nmap -A -p- -oN nmap10.txt 10.10.10.10

non-ping scan: gebruik -Pn
```

###### Nmap UDP port scan
```
UDP

> nmap -sU -O -p- -oN nmapudp10.txt 10.10.10.10


udp scan on all ports often doesnt show the right results. Script scans are more likely to get a good read at whats open or not:
> nmap -sU -sC --top-ports 20 -oN nmapudp-top20-scripts 10.10.10.10

```

###### Nmap script scan
```
Search in the nmap script database
> cat /usr/share/nmap/scripts/script.db | grep smb

scan 1 script
> nmap --script=http-iis-webdav-vuln 10.10.10.10

scan all smb-vuln-* scripts
> nmap --script=smb-vuln* 10.10.10.10 -oN nmapsmb10.txt

scan all scripts in the vuln category
> sudo nmap --script vuln 10.10.10.10
```


###### Bash port scan
```sh
#!/bin/bash
host=10.10.10.10
for port in {1..65535}; do
timeout .1 bash -c "echo >/dev/tcp/$host/$port" &&
echo "port $port is open"
done
echo "Done"  
```

###### Autorecon
```
> git clone https://github.com/Tib3rius/AutoRecon.git
> python3 autorecon.py 10.10.10.10
```
