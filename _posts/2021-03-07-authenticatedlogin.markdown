---
title: Authenticated Logins and connections
author: linatl
date: "2021-03-07 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### FTP 21
```
> ftp 10.10.10.10
```

###### SSH 22
```
> ssh username@10.10.10.10
> ssh -oKexAlgorithms=+diffie-hellman-group1-sha1 username@10.10.10.10

Login with ssh id_rsa
Save the key in file id_rsa; then:
> chmod 600 id_rsa
> ssh -i id_rsa username@10.10.10.10
```

###### Telnet 23
```
> telnet 10.10.10.10 23
```

###### SMB 445
```
Login with smbclient
> smbclient -U username \\\\10.10.10.10\\Share$

Download all files from a directory recursively
> smbclient //10.10.10.10/Share$ -U username -c "prompt OFF;recurse ON;mget *"

Impacket tools
> impacket-psexec domain/username:password@10.10.10.10
> impacket-psexec domain/username@10.10.10.10 -hashes h1a2s3h4:h1a2s3h4

> impacket-wmiexec domain/username:password@10.10.10.10
> impacket-wmiexec domain/username@10.10.10.10 -hashes h1a2s3h4:h1a2s3h4

> impacket-smbexec domain/username:password@10.10.10.10
> impacket-smbexec domain/username@10.10.10.10 -hashes h1a2s3h4:h1a2s3h4

> impacket-atexec domain/username:password@10.10.10.10 whoami
> impacket-atexec domain/username@10.10.10.10 -hashes h1a2s3h4:h1a2s3h4
```

###### 1443 MSSQL
```
impacket-mssqlclient -windows-auth domain/sa:password@10.10.10.10
impacket-mssqlclient sa:password@10.10.10.10

```

###### RDP 3389
```
rdesktop
> rdesktop -d domain -u username -p password 10.10.10.10:3389

XFreeRDP
> xfreerdp /u:domain\username /p:password /v:10.10.10.10:3389
```

###### WinRM 5985 & 5986
```
EvilWinRM
> ./evil-winrm.rb -i 10.10.10.10 -u username -H h1a2s3h4
> ./evil-winrm.rb -i 10.10.10.10 -u username -p password
```

###### VNC 5800 & 5900
```
> vncviewer 10.10.10.10:5900
```

###### 27017 MongoDB
```
https://docs.mongodb.com/manual/mongo/

Unauthenticated connection
> mongo --host 10.10.10.10

Authenticated connection
> mongo -u username -p password --host 10.10.10.10
```
