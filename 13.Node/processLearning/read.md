## 线上部署nodejs项目

1. pm2：访问量大
2. forever：管理多个站点，访问量不大
3. supervisor：开发环境使用

## 配置文件含义

```javascript
{
  "apps": [ // json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用
    {
      "name": "processLearning",  // 应用程序名称
      "cwd": "/frontEnder-Milly/13.Node",  // 应用程序所在目录
      "script": "bin/www",  // 应用程序的脚本路径
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "log/node-app.stderr.log",  // 自定义应用程序的错误日志文件
      "out_file": "log/node-app.stdout.log",  // 自定义应用程序日志文件
      "pid_file": "pids/node-geo-api.pid",  // 自定义应用程序pid文件
      "instances": 6,
      "min_uptime": "60s",  // 最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
      "max_restarts": 10,  // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）
      "max_memory_restart": "1M", 
      "cron_restart": "1 0 * * *",  // 定时启动，解决重启能解决的问题
      "watch": false,  // 是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件
      "merge_logs": true,
      "exec_interpreter": "node",  // 应用程序的脚本类型，默认是nodejs
      "exec_mode": "fork",  // 应用程序启动模式，可以设置cluster_mode（集群），默认是fork
      "autorestart": false,  // 启用/禁用应用程序崩溃或退出时自动重启
      "vizion": false  // 启用/禁用vizion特性(版本控制)
    }
  ]
}
```