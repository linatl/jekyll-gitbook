---
title: Website Enumeration
author: linatl
date: "2021-03-03 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Downloading files/pages
```
> curl http://10.10.10.10/robots.txt -o robots.txt
> wget http://10.10.10.10/robots.txt

Download including headers
> curl -i http://10.10.10.10/
Download headers only
> curl -I http://10.10.10.10/

Upload a file
> curl -T file.txt http://10.10.10.10/
```

###### nikto
```
nikto on http
> nikto -host 10.10.10.10 > nikto10.txt
nikto on https
> nikto -host 10.10.10.10 -port 443 -ssl > nikto10.txt
```

###### dirb
```
non-recursive
> dirb http://10.10.10.10 -r > dirb10.txt
recursive
> dirb http://10.10.10.10 > dirb10.txt
```

###### gobuster
```
Directories and files
> gobuster dir -u 10.10.10.10 -w /usr/share/seclists/Discovery/Web-Content/common.txt

Subdomains
> gobuster dns -d test.com -w /usr/share/seclists/Discovery/DNS/namelist.txt -i
```

###### Web Directory Dictionaries
```
dirb's default dictionary:
4615 /usr/share/wordlists/dirb/common.txt

seclists dictionaries:
4681    /usr/share/seclists/Discovery/Web-Content/common.txt
141708  /usr/share/seclists/Discovery/Web-Content/directory-list-1.0.txt
1273833 /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-big.txt
220560  /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
87664   /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

###### wp-scan
```
> wpscan --url 10.10.10.10 --enumerate ap,at,cb,dbe -o wpscan10.txt
```

###### Finding the webroot in Linux
```
Go to config dir (example: /etc/apache2/). Then:
> grep -Ri DocumentRoot .
```
