# 本地预览Wiki

## 方法一：使用Python HTTP Server

```bash
cd docs
python -m http.server 3000
# 或
python3 -m http.server 3000
```

然后访问：http://localhost:3000

## 方法二：使用Node.js http-server

```bash
npm install -g http-server
cd docs
http-server -p 3000
```

然后访问：http://localhost:3000

## 方法三：使用docsify-cli

```bash
npm install -g docsify-cli
docsify serve docs
```

然后访问：http://localhost:3000

## 方法四：使用VS Code Live Server

1. 安装"Live Server"扩展
2. 右键点击`docs/index.html`
3. 选择"Open with Live Server"

## 注意事项

- 确保在`docs`目录下启动服务器
- Docsify需要通过HTTP服务器访问，不能直接打开HTML文件
- 修改文件后刷新浏览器即可看到更新
