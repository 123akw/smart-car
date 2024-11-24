# 数据库建库建表

### 默认情况初始化

***注意：强烈推荐只使用node命令运行工具进行初始化（除非你会改路径doge）。***

文件结构中有个initDatabase文件夹，node命令运行该文件下的index.js

```javascript
node .\initDB\index.js
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

```shell
A dbConfig.json file is detected under the root file,
and the interrogation phase is skipped
Executing (default): CREATE DATABASE IF NOT EXISTS `parking_system_db`;
Database parking_system_db created successfully
database is connected
users model is syncing successful
vehicles model is syncing successful
orders model is syncing successful
```

表明ORM已经根据你的配置文件进行数据库初始化成功。

### 可能会发生的错误

在自动化建库建表过程中可能会出现一些可能发生的错误，可以归为几类：**数据库创建错误，数据库连接错误，模型同步错误，配置文件读写错误，和无法找到配置文件**（在已经有的基础上）

- 着重讲讲**无法找到配置文件这一个错误**

​	在webstrom环境下选择当前文件下启动的话，是以当前最顶层文件为启动路径前缀，举个例子：当前我们有一个根目录，根目录下有两个文件夹，我们要运行的js文件在这两个文件夹中一个文件夹里，且在这个文件夹中的文件夹，那么启动的时候就会自动以我们这个js文件所处的文件夹作为当前启动的根目录，而不是那个顶层的根目录文件，然而我们用控制台node命令调用时，则是会控制台所处的文件夹为根目录进行执行，这两个的区别就是启动路径前缀的添加与否，webstrom会自动添加上这些前缀（也就是以所运行文件的文件夹作为根目录），当出现这些错误时，请手动执行node命令。



# 手动建立单独的表



此外还提供了一个能够单独初始化某个表的功能（主要是为了写服务端时方便写新表）

***如果你要使用请阅读此部分***

也是一样，强烈推荐只用node命令执行。





