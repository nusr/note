import itchat               # 登陆微信，获取朋友信息的库
import collections           # 计数用的库
import json
import matplotlib.pyplot as plt  # 画饼图用的库
from matplotlib.font_manager import FontProperties  # 解决图片中文乱码
from pyecharts import Map       # 画地图用的库
from pyecharts import Geo       # 画地图二
itchat.login()          # 登陆微信网页版
friends = itchat.get_friends(update=True)[0:]  # 获取当前微信好友信息
print(friends)
print(type(friends))
json_str = json.dumps(friends)
new_dict = json.loads(json_str)
with open("friends.json", "w") as f:
    json.dump(new_dict, f)
    print("加载入文件完成...")
