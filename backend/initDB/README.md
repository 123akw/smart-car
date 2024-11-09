# 数据库建库建表

### 默认情况初始化

文件结构中有个initDatabase文件夹，node命令运行该文件下的index.js

```javascript
node .\initDataBase\index.js
```

默认情况下会进行如下操作：

**输入完命令后将会提示你输入一些所需的信息：**

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

运行完毕控制台应该会输出（颜色为青色）

```shell
The configuration has been written to a json file, please check the dbConfig.json file in the root directory
Executing (default): CREATE DATABASE IF NOT EXISTS `parking_system_db`;
Database parking_system_db created successfully
database is connected
model is syncing successful
```

**如输出以上内容说明已经成功创建好所需的基本数据库并写入 **。

### JSON文件初始化数据库

```json
{
  "databaseName": "parking_system_db",
  "connectionString": "mysql://xxxx:xxxxxxxx@localhost:3306",
  "username": "xxxx",
  "password": "xxxxxxxx",
  "host": "localhost",
  "port": "3306"
}
```

在根目录下创建dbConfig.js文件并写入如下内容，脚本会跳过询问流程并自动读入并配置数据库。

**输出一下内容时**

```
A dbConfig.json file is detected under the root file,
and the interrogation phase is skipped
Executing (default): CREATE DATABASE IF NOT EXISTS `parking_system_db`;
Database parking_system_db created successfully
database is connected
model is syncing successful  
```

表明ORM已经根据你的配置文件进行数据库初始化成功。

### 可能会发生的错误

