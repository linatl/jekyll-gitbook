---
title: Authenticated Logins and connections
author: linatl
category: "OSCP"
date: "2021-03-07 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### FTP 21
```
> ftp 10.10.10.10
Download all ftp files:
> wget --mirror 'ftp://username:password@10.10.10.10'
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

Crackmapexec
> crackmapexec smb 10.10.10.10
> crackmapexec smb 10.10.10.10 -u username -p password
> crackmapexec smb 10.10.10.10 -u username -p password --shares
Other protocols with crackmapexec: ssh,ldap,mssql,winrm
```

###### 1443 MSSQL
```
Impacket
> impacket-mssqlclient -windows-auth domain/sa:password@10.10.10.10
> impacket-mssqlclient sa:password@10.10.10.10

sqsh
> sqsh -S 10.10.10.10 -U sa -P "password"

Turning on xp_cmdshell in mssql:
1> xp_cmdshell 'whoami'
2> go

If the xp_cmdshell option needs to be turned on first:
1> EXEC SP_CONFIGURE 'xp_cmdshell', 1
2> reconfigure
3> go

If advanced options are turned of, do this before turning xp_cmdshell on:
1> EXEC SP_CONFIGURE 'show advanced options', 1
2> reconfigure
3> go
```

###### 1521 Oracle TNS listener
```
odat.py
> cd /opt/
> git clone https://github.com/quentinhardy/odat.git
> pip3 install python-libnmap cx_Oracle pycrypto
> python3 odat.py sidguesser -s 10.10.10.10
> python3 odat.py passwordguesser -s 10.10.10.10 -d SID
> python3 odat.py passwordguesser -s 10.10.10.10 -d SID

sqlplus
> sudo apt install oracle-instantclient-sqlplus
> sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf";sudo ldconfig
> sqlplus username/password@10.10.10.10/SID

sysbda
See sysbda for oracle as being kind of similar as sudo for linux, you can do more cause you have more privileges.
> sqlplus username/password@10.10.10.10:1521/SID as sysdba
```

###### 3306 MYSQL
```
Check if its running:
> telnet 10.10.10.10 3306

Remote
> mysql -h 10.10.10.10 -u username
> mysql -h 10.10.10.10 -u username -p password
> mysql -h 10.10.10.10 -u username -p password

Local on target machine
> mysql -u username
> mysql -u username -p password -P 3306 namedatabase
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
