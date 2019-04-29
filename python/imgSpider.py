# -*- coding:utf-8 -*-
import re
import requests

i = 0

headers = {
    'Referer': 'https://cn.bing.com/',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
}


def getUrls(site, word):
    if site == 'baidu':
        url = 'http://image.baidu.com/search/flip?tn=baiduimage&ie=utf-8&word={}&ct=201326592&v=flip'.format(
            word)
        html = requests.get(url, headers).text
        pic_url = re.findall('"objurl":"(.*?)",', html, re.S)
        print('百度总共有' + str(len(pic_url)) + '张图片')
    elif site == 'bing':
        url = 'https://cn.bing.com/images/search?q={}%E5%A3%81%E7%BA%B8&qs=IM&form=QBIR&sp=2&pq={}&sk=IM1&sc=8-4&cvid=D6943B4BE1624DA8AA0D1B8C857DC6E1'.format(
            word, word)
        html = requests.get(url, headers).text
        pic_url = re.findall('"murl":"(.*?)",', html, re.S)
        print('必应总共有' + str(len(pic_url)) + '张图片')
    elif site == 'sougou':
        url = 'http://pic.sogou.com/pics?query={}'.format(word)
        html = requests.get(url, headers).text
        pic_url = re.findall('src="(.*?)",', html, re.S)
        print('搜狗总共有' + str(len(pic_url)) + '张图片')
    # print(pic_url)
    for each in pic_url:
        print(each)
        try:
            pic = requests.get(each, timeout=10)
        except requests.exceptions.ConnectionError:
            print('[错误]当前图片无法下载')
            continue
        string = site + '//'+str(i) + '.jpg'
        fp = open(string, 'wb')
        fp.write(pic.content)
        fp.close()
        i += 1


# word = input("Input key word: ")
word = '新垣结衣'

# getUrls('baidu', word)
getUrls('bing', word)
# getUrls('sougou', word)
