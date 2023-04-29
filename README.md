# P4MonitorFrontEnd

这是P4Monitor对应的前端项目，基于vue-admin-template的后台管理系统进行二次开发，仅作为学习用途。

## 环境部署

```bash
# 克隆目录
git clone https://github.com/Barabama/P4MonitorFrontEnd.git

# 进入项目目录
cd P4MonitorFrontEnd

# 安装依赖
npm install 

# --legacy-peer-deps 命令可能解决依赖冲突
npm install --legacy-peer-deps

# 如下操作可能解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 添加环境变量
$env:NODE_OPTIONS='--openssl-legacy-provider'

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)