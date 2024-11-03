# 数据库建库建表

文件结构中有个initDatabase文件夹，node命令运行该文件下的index.js

```javascript
node .\initDataBase\index.js
```

输入完命令后将会提示你输入一些所需的信息：

```shell
Please enter a username:
```

**这个是提示你输入登录所需的用户名**

```
Please enter your password:
```

**这个是提示你输入登录所需的密码**

```
Please enter your database address (localhost by default):
```

**这个是提示你输入数据库地址(可以直接回车跳过，将设置默认值为localhost)**

```
Please enter your database port (default is 3306):
```

**这个是提示你输入数据库端口(可以直接回车跳过，将设置默认值为3306)**

运行完毕控制台应该会输出

```shell
Executing (default): CREATE DATABASE IF NOT EXISTS `parking_system_db`;
Database parking_system_db created successfully
model is syncing successful
```

**如输出以上内容说明已经成功创建好所需的基本数据库**。



**注意：如果报错了请认真阅读报错信息，一般来说是因为输入信息有误导致的，如出现其他错误请联系我调试**。

