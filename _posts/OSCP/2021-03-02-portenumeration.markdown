---
title: Port Enumeration and Logins
author: sKyW1per
category: "OSCP"
date: "2021-03-02 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### hacktricks.xyz
```
https://book.hacktricks.xyz/
```


###### FTP 21
```
$ ftp 192.168.1.1
switch active/passive mode
$ passive
switch binary/ASCII transfer
$ binary

Download all ftp files:
$ wget --mirror 'ftp://username:password@192.168.1.1'
```

###### SSH 22
```
$ ssh username@192.168.1.1
$ ssh -oKexAlgorithms=+diffie-hellman-group1-sha1 username@192.168.1.1

Login with ssh id_rsa
Save the key in (for example) file id_rsa; then:
$ chmod 600 id_rsa
$ ssh -i id_rsa username@192.168.1.1
```

###### Telnet 23
```
$ nc 192.168.1.1 23
$ telnet 192.168.1.1 23
```

###### 25 SMTP
```
Enumerate usernames with VRFY, RCPT TO, EXPN:
$ VRFY root
$ VRFY idontexist
Existing users = 252 response, non-existing = 550 response

send email:
https://www.shellhacks.com/send-email-smtp-server-command-line/
```

###### 53 DNS
```
DNS zone Transfer
$ dnsrecon -d domain.local -n 192.168.1.1 -t axfr


```

###### 111 RPCbind
```
$ rpcinfo -s 192.168.1.1 > rpcinfo.txt
$ rpcclient -U '' 192.168.1.1
$ enumdomusers

Text edit to put the usernames in a file:
$ cat output.txt | awk -F\[ '{print $2}' | awk -F \] '{print $1}' > users.lst

More rpc enumeration:
https://www.hackingarticles.in/active-directory-enumeration-rpcclient/

Mounting a share
$ mount -t cifs -o user=username //192.168.1.1/sharename /mnt/sharename
The prompt asks for a password.
```

###### 161 SNMP (UDP)
```
$ snmpwalk -c public -v 1 192.168.1.1
$ snmpwalk -c public -v2c 192.168.1.1
$ snmp-check 192.168.1.1
```

###### 389 LDAP query's
```
$ ldapsearch -LLL -x -H ldap://192.168.1.1 -b '' -s base '(objectclass=*)'
$ ldapsearch -LLL -x -H ldap://192.168.1.1 -b 'DC=DOMAIN,DC=LOCAL'

filter out anomalies:
$ cat output.txt | awk '{print $1}' | sort | uniq -c | sort -nr
```

###### 445 SMB / Samba
```
Enumerate shares
$ smbclient -L //192.168.1.1
$ smbclient -L //192.168.1.1/
$ smbclient -L ////192.168.1.1//
$ smbclient -U username -L ////192.168.1.1//

SMBClient
$ smbclient -U username ////192.168.1.1//Share$

Download all files from a directory recursively
$ smbclient //192.168.1.1/Share$ -U username -c "prompt OFF;recurse ON;mget *"

Impacket tools
$ impacket-psexec domain/username:password@192.168.1.1
$ impacket-psexec domain/username@192.168.1.1 -hashes h1a2s3h4:h1a2s3h4

$ impacket-wmiexec domain/username:password@192.168.1.1
$ impacket-wmiexec domain/username@192.168.1.1 -hashes h1a2s3h4:h1a2s3h4

$ impacket-smbexec domain/username:password@192.168.1.1
$ impacket-smbexec domain/username@192.168.1.1 -hashes h1a2s3h4:h1a2s3h4

$ impacket-atexec domain/username:password@192.168.1.1 whoami
$ impacket-atexec domain/username@192.168.1.1 -hashes h1a2s3h4:h1a2s3h4

Crackmapexec
$ crackmapexec smb 192.168.1.1
$ crackmapexec smb 192.168.1.1 -u username -p password
$ crackmapexec smb 192.168.1.1 -u username -p password --shares
$ crackmapexec smb 192.168.1.1 -u username -H h1a2s3h4:h1a2s3h4

Other protocols with crackmapexec: ssh,ldap,mssql,winrm

Index all files from a fileshare and put the results in json output
$ crackmapexec smb 192.168.1.1 -u username -p password -M spider_plus
$ cat /tmp/cme_spider_plus/192.168.1.1.json | jq '. | keys'

Password policy  
$ crackmapexec smb 192.168.1.1 --pass-pol


Finding Samba versions
Run enum4linux, capture the data with Wireshark:
https://richardkok.wordpress.com/2011/02/03/wireshark-determining-a-smb-and-ntlm-version-in-a-windows-environment/
```

###### 1443 MSSQL
```
Impacket
$ impacket-mssqlclient -windows-auth domain/sa:password@192.168.1.1
$ impacket-mssqlclient sa:password@192.168.1.1

sqsh
$ sqsh -S 192.168.1.1 -U sa -P "password"

Turning on xp_cmdshell in mssql:
1$ xp_cmdshell 'whoami'
2$ go

If the xp_cmdshell option needs to be turned on first:
1$ EXEC SP_CONFIGURE 'xp_cmdshell', 1
2$ reconfigure
3$ go

If advanced options are turned of, do this before turning xp_cmdshell on:
1$ EXEC SP_CONFIGURE 'show advanced options', 1
2$ reconfigure
3$ go
```

###### 1521 Oracle TNS listener
```
odat.py
$ cd /opt/
$ git clone https://github.com/quentinhardy/odat.git
$ pip3 install python-libnmap cx_Oracle pycrypto
$ python3 odat.py sidguesser -s 192.168.1.1
$ python3 odat.py passwordguesser -s 192.168.1.1 -d SID
$ python3 odat.py passwordguesser -s 192.168.1.1 -d SID

sqlplus
$ sudo apt install oracle-instantclient-sqlplus
$ sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > /etc/ld.so.conf.d/oracle-instantclient.conf";sudo ldconfig
$ sqlplus username/password@192.168.1.1/SID

sysbda
See sysbda for oracle as being kind of similar as sudo for linux, you can do more cause you have more privileges.
$ sqlplus username/password@192.168.1.1:1521/SID as sysdba

File upload using odat:
This will put the test.aspx local file in the c:\inetpub\wwwroot\ folder like file.aspx on the 192.168.1.1 server
$ python3 odat.py utlfile -s 192.168.1.1 -d SID -U username -P password --sysdba --putFile 'c:\inetpub\wwwroot\' file.aspx test.aspx
```


###### 2049 NFS
```
$ showmount -e 192.168.1.1
$ nmap --script=nfs-showmount -oN mountable_shares 192.168.1.1

Mounting a share
$ mount -t cifs -o username=username //192.168.1.1/sharename /mnt/attackersharename
Prompt asks for password.
```

###### 3306 MYSQL
```
Check if its running:
$ telnet 192.168.1.1 3306

Remote
$ mysql -h 192.168.1.1 -u username
$ mysql -h 192.168.1.1 -u username -p password
$ mysql -h 192.168.1.1 -u username -p password

Local on target machine
$ mysql -u username
$ mysql -u username -p password -P 3306 namedatabase
```

###### RDP 3389
```
rdesktop
$ rdesktop -d domain -u username -p password 192.168.1.1:3389

XFreeRDP
$ xfreerdp /u:domain\username /p:password /v:192.168.1.1:3389
$ xfreerdp /u:username /d:DOMAINNAME /pth:h1a2s3h4:h1a2s3h4 /v:192.168.1.1
```

###### WinRM 5985 & 5986
```
EvilWinRM
$ evil-winrm -i 192.168.1.1 -u username -H h1a2s3h4
$ evil-winrm -i 192.168.1.1 -u username -p password
```

###### VNC 5800 & 5900
```
$ vncviewer 192.168.1.1:5900
```

###### 27017 MongoDB
```
https://docs.mongodb.com/manual/mongo/

Unauthenticated connection
$ mongo --host 192.168.1.1

Authenticated connection
$ mongo -u username -p password --host 192.168.1.1
```
