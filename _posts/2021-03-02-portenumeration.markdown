---
title: Port Enumeration
author: linatl
date: "2021-03-02 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### hacktricks.xyz
```
https://book.hacktricks.xyz/
```

###### Scripts
```
> enum4linux 10.10.10.10 > enum4linux10.txt
```

###### 25 SMTP
```
Enumerate usernames:
> VRFY root
> VRFY idontexist
Existing users = 252 response, non-existing = 550 response

Pentesting SMTP(s)
https://book.hacktricks.xyz/pentesting/pentesting-smtp
```

###### 53 DNS
```

```

###### 88 Kerberos
```

```

###### 110 POP3
```
POP3
https://book.hacktricks.xyz/pentesting/pentesting-pop

```

###### 111 RPCbind
```
rpcinfo -s 10.10.10.10 > rpcinfo.txt
```

###### 389 LDAP
```
ldapsearch -LLL -x -H ldap://10.10.10.10 -b '' -s base '(objectclass=*)' >> ldapsearch10.txt
ldapsearch -LLL -x -H ldap://10.10.10.10 -b 'DC=DOMAIN,DC=LOCAL' >> ldapsearch10.txt
```

###### 445 SMB
```
Enumerate shares
> smbclient -L //10.10.10.10
> smbclient -L //10.10.10.10/
> smbclient -L ////10.10.10.10//
> smbclient -U TestUser -L ////10.10.10.10//

Download all files from a directory recursively
> smbclient //10.10.10.10/Share$ -U username -c "prompt OFF;recurse ON;mget *"

SMB login
> smbclient -U TestUser ////10.10.10.10//Share$

Crackmapexec
> crackmapexec smb 10.10.10.10
> crackmapexec smb 10.10.10.10 -u username -p password
> crackmapexec smb 10.10.10.10 -u username -p password --shares
Other protocols with crackmapexec: ssh,ldap,mssql,winrm
```

###### NFS 2049
```
> showmount -e 10.10.10.10
> nmap --script=nfs-showmount -oN mountable_shares 10.10.10.10
```

###### 3306 MYSQL
```

```

###### VNC 5800 & 5801 & 5900 & 5901
```

```
