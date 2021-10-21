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
```

###### 53 DNS
```
DNS zone Transfer
> dnsrecon -d domain.local -n 10.10.10.10 -t axfr
```

###### 111 RPCbind
```
> rpcinfo -s 10.10.10.10 > rpcinfo.txt
```

###### 389 LDAP
```
> ldapsearch -LLL -x -H ldap://10.10.10.10 -b '' -s base '(objectclass=*)' >> ldapsearch10.txt
> ldapsearch -LLL -x -H ldap://10.10.10.10 -b 'DC=DOMAIN,DC=LOCAL' >> ldapsearch10.txt
```

###### 445 SMB / Samba
```
Enumerate shares
> smbclient -L //10.10.10.10
> smbclient -L //10.10.10.10/
> smbclient -L ////10.10.10.10//
> smbclient -U username -L ////10.10.10.10//

SMB login
> smbclient -U username ////10.10.10.10//Share$

Download all files from a directory recursively
> smbclient //10.10.10.10/Share$ -U username -c "prompt OFF;recurse ON;mget *"

Crackmapexec
> crackmapexec smb 10.10.10.10
> crackmapexec smb 10.10.10.10 -u username -p password
> crackmapexec smb 10.10.10.10 -u username -p password --shares
Other protocols with crackmapexec: ssh,ldap,mssql,winrm

Finding Samba versions
Run enum4linux, capture the data with Wireshark:
https://richardkok.wordpress.com/2011/02/03/wireshark-determining-a-smb-and-ntlm-version-in-a-windows-environment/
```

###### 2049 NFS
```
> showmount -e 10.10.10.10
> nmap --script=nfs-showmount -oN mountable_shares 10.10.10.10
```
