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

Login with ssh id_rsa
Save the key in file id_rsa
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
> psexec.py domain.local/username:password@10.10.10.10
> psexec.py domain.local/username@10.10.10.10 -hashes :h1a2s3h4

> wmiexec.py domain.local/username:password@10.10.10.10
> wmiexec.py domain.local/username@10.10.10.10 -hashes :h1a2s3h4

> smbexec.py domain.local/username:password@10.10.10.10
> smbexec.py domain.local/username@10.10.10.10 -hashes :h1a2s3h4

> atexec.py domain.local/username:password@10.10.10.10 whoami
> atexec.py domain.local/username@10.10.10.10 -hashes :h1a2s3h4
```

###### ~
```

```

###### RDP 3389
```
rdesktop
> rdesktop -d domain -u username -p password 10.10.10.10:3389

XFreeRDP
> xfreerdp /u:MIMAS\neville /p:OvercookedCapeBrewing870 /v:192.168.47.122:3389
```


###### WinRM 5985 & 5986
```
EvilWinRM
> ./evil-winrm.rb -i 10.10.10.10 -u Username -H h1a2s3h4
> ./evil-winrm.rb -i 10.10.10.10 -u Username -p password
```

###### VNC
```

```
