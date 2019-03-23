Dim wsh
set wsh=createobject("Wscript.shell")

wscript.sleep 5000
wsh.run "C:\Users\admin\AppData\Local\Google\Chrome\Application\chrome.exe"

wscript.sleep 5000
wsh.run "C:\Users\admin\AppData\Local\Programs\Microsoft VS Code\Code.exe"

wscript.sleep 5000
wsh.run "C:\Program Files (x86)\Netease\CloudMusic\cloudmusic.exe"

wscript.sleep 5000
wsh.run "C:\Program Files\Everything\Everything.exe"

wscript.sleep 5000
wsh.run "C:\Program Files\Git\git-bash.exe" 

wscript.sleep 5000
wsh.run "C:\Program Files (x86)\Tencent\TIM\Bin\QQScLauncher.exe" 

wscript.sleep 5000
wsh.run "C:\Program Files\Sublime Text 3\sublime_text.exe"

wscript.sleep 5000
wsh.run "‪‪C:\lantern.exe"

wscript.quit
