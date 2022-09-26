---
title: Website Enumeration
author: sKyW1per
category: "OSCP"
date: "2021-03-03 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Downloading files/pages
```
$ curl http://192.168.1.1/robots.txt -o robots.txt
$ wget http://192.168.1.1/robots.txt

HTTP request showing headers
$ curl -i http://192.168.1.1/
Headers only
$ curl -I http://192.168.1.1/

Upload a file
$ curl -T file.txt http://192.168.1.1/
```

###### nikto
```
nikto on http
$ nikto -host 192.168.1.1 > nikto10.txt
nikto on https
$ nikto -host 192.168.1.1 -port 443 -ssl > nikto10.txt
```

###### dirb
```
non-recursive
$ dirb http://192.168.1.1 -r -o dirb10.txt
recursive
$ dirb http://192.168.1.1 -o dirb10.txt
```

###### gobuster
```
Directories and files
$ gobuster dir -u 192.168.1.1 -w /usr/share/seclists/Discovery/Web-Content/common.txt
$ gobuster dir -u 192.168.1.1/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -o gobuster10.txt

Also search for specific filetypes, weed out more error codes and dont check certificate validity.
$ gobuster dir -u 192.168.1.1/ -x php,asp,aspx -w /usr/share/seclists/Discovery/Web-Content/common.txt -o gobuster10-2.txt -b 400,404,500 -k

Subdomains
$ gobuster dns -d test.com -w /usr/share/seclists/Discovery/DNS/namelist.txt -i
```

###### FFUF
```
$ ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -u https://192.168.1.1/FUZZ -recursion
```

###### Web Directory Dictionaries
```
dirb's default dictionary:
4614 /usr/share/wordlists/dirb/common.txt

seclists dictionaries:
4713    /usr/share/seclists/Discovery/Web-Content/common.txt
141708  /usr/share/seclists/Discovery/Web-Content/directory-list-1.0.txt
1273833 /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-big.txt
220560  /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
87664   /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

###### Make a wordlist by scraping a website with CEWL
```
$ cewl http://192.168.1.1/
$ cewl http://192.168.1.1/directory/index.html -w cewl-wordlist.txt
```

###### wp-scan
```
$ wpscan --url 192.168.1.1 --enumerate ap,at,cb,dbe -o wpscan10.txt
```

###### Finding the webroot in Linux
```
Go to config dir (example: /etc/apache2/). Then:
$ grep -Ri DocumentRoot .
```
