---
title: Port Enumeration
author: linatl
category: "OSCP"
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
> rpcclient -U '' 10.10.10.10
> enumdomusers

Text edit to put the usernames in a file:
> cat output.txt | awk -F\[ '{print $2}' | awk -F \] '{print $1}' > users.lst

More rpc enumeration:
https://www.hackingarticles.in/active-directory-enumeration-rpcclient/

Mounting a share
> mount -t cifs -o user=username //10.10.10.10/sharename /mnt/sharename
The prompt asks for a password.
```

###### 161 SNMP (UDP)
```
> snmpwalk -c public -v 1 10.10.10.10
```


###### 389 LDAP query's
```
> ldapsearch -LLL -x -H ldap://10.10.10.10 -b '' -s base '(objectclass=*)'
> ldapsearch -LLL -x -H ldap://10.10.10.10 -b 'DC=DOMAIN,DC=LOCAL'

filter out anomalies:
> cat output.txt | awk '{print $1}' | sort | uniq -c | sort -nr
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

Index all files from a fileshare and put the results in json output
> crackmapexec smb 10.10.10.10 -u username -p password -M spider_plus
> cat /tmp/cme_spider_plus/10.10.10.10.json | jq '. | keys'

Password policy  
> crackmapexec smb 10.10.10.10 --pass-pol

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

Mounting a share
mount -t cifs -o username=username //10.10.10.10/sharename /mnt/sharename
Prompt asks for password.
