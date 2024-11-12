

# API接口文档

#### **全局路由：/api**

## 登录接口

- **API名称：登录API**
- **描述：用于用户注册，登录功能**



### 认证

- **认证方式：采用哈希加密返回的token标识符**

### 用户注册

- **HTTP方法：POST**

- **URL：/user/register**

- **请求参数(参数校验前端负责)：**

  | 参数名    | 类型   | 是否必填 | 描述     |
  | --------- | ------ | -------- | -------- |
  | username  | string | 是       | 用户名   |
  | telephone | string | 是       | 电话号码 |
  | password  | string | 是       | 密码     |

- **请求体：**

  ```json
  {
      "username":"pp_acile",
      "telephone":"123456789099",
      "password":"nihao123"
  }
  ```

- **响应格式：**

  - **状态码**
    - 201：表示用户注册成功
    - 409：表明此用户已存在，不可重复注册
    - 500：表明服务器发生错误，注册操作已取消

- **响应体**

  - **注册成功时**

    ```json
    {
        "code":1,
        "message":"success",
        "username":"xxxxxxx"
    }
    ```

  - **已有注册账号时**

    ```json
    {
    	"code":0,
    	"message":"failed"
    }
    ```

  - **发生内部错误，注册操作取消时**

    ```json
    {
        "code":-1,
        "massage":"error:Register operation failed"
    }
    ```



### 用户登录

- **HTTP方法：POST**
- **URL：/user/login**
- **请求参数(参数校验前端负责)：**

| 参数名    | 类型   | 是否必填                    | 描述     |
| --------- | ------ | --------------------------- | -------- |
| username  | string | username和telephone必填一个 | 用户名   |
| telephone | string | username和telephone必填一个 | 电话号码 |
| password  | string | 是                          | 密码     |

**请求体：**

```json
{
    "username":"xxxxx",
    "password":"fffff"
}
```

或者

```json
{
    "telephone":"xxxxxxx",
    "password":"ddffffsdd"
}
```

**响应格式：**

- **状态码**
  - 200：表示用户登录成功
  - 404：表明此用户不存在，需注册
  - 500：表明服务器发生错误，登录操作已取消

**响应体**

- **登录成功时**

  ```json
  {
      "code":1,
      "message": "success",
  	"token":"哈希加密后的字符串"
  }
  ```

- **登录失败时**

  ```json
  {
      "code":0,
      "message": "failed"
  }
  ```

- **内部发生错误，登录操作取消时**

  ```json
  {
      "code":-1,
     	"message": "error:Login operation failed"
  }
  ```




## 个人页面

- API名称
- **描述：使用token进行身份标识，对个人数据进行请求查询**



### 认证

- **请求头**

```json
Authorization  xxxxxxxxxxxxxxx
```

请在请求头中设置***Authorization***字段作为键值，***token***设置为键值对的值(**并不是在请求体中设置，是请求头**)



### 添加车辆信息

- **HTTP方法：POST请求**
- **URL：/personalPage/addVehicle**
- **请求参数：**

| 参数名         | 类型   | 是否必填 | 描述     |
| -------------- | ------ | -------- | -------- |
| vehicle_type   | string | 是       | 车的类型 |
| vehicle_number | string | 是       | 车牌号码 |

- **请求体**

```json
{
    "vehicle_type": "别克G8L",
    "vehicle_number": "89101112"
}
```

**响应格式**

- 状态码
  - 500：表明服务器发生错误，添加车辆信息操作已取消
  - 201：表明车辆信息已经添加成功

**响应体**

- 添加成功时

```json
{
    "code": 1,
    "message": "success"
}
```

- 内部发生错误取消添加操作时

```json
{
    ”code“: -1,
    ”message“: "Internal Server Error"
}
```



### 删除车辆信息

- **HTTP方法：POST请求**

- **URL：/personalPage/deletVehicle**

- **请求参数：**

  | 参数名    | 类型   | 是否必填 | 描述                     |
  | --------- | ------ | -------- | ------------------------ |
  | vehicleId | BIGINT | 是       | 表明你想要删除的汽车消息 |

- **请求体**

```json
{
    "vehicleId": 1
}
```

- **响应格式**

  - 状态码
    - 500：表明服务器发生错误，删除车辆信息操作已取消
    - 200：表明车辆信息已经删除成功

- 响应体

  - 删除成功时

  ```json
  {
      "code": 1,
      "message": "success"
  }
  ```

  - 内部发生错误取消操作时

  ```json
  {
      ”code“: -1,
      ”message“: "Internal Server Error"
  }
  ```



### 获取个人信息

- **HTTP方法：GET请求**

- **URL：/personalPage/getProfile**

- **请求参数：**无

- **请求体：**无

- **响应格式**

  - 状态码
    - 500：表明服务器发生错误，获取个人信息操作已取消
    - 404：表明服务器并没有找到该用户的个人信息
    - 200：完成个人信息的查询

- **响应体**

  - 当成功查询个人信息时：

  ```json
  {
      "code": 1,
      "data": {
          "username": "pp_acile",
          "name": "野兽先辈",
          "telephone": "1145141919810",
          "email": "114514@homo.com",
          "updatedAt": "2024-11-11T12:09:42.000Z"
      }
  }
  ```

  - 未找到对应的个人数据时

  ```json
  {
      "code": 0,
      "message":"Not Found"
  }
  ```

  - 服务器内部查询失败时

  ```json
  {
      ”code“: -1,
      ”message“: "Internal Server Error"
  }
  ```

  

### 获取车辆信息

- **HTTP方法：GET请求**

- **URL：/personalPage/getVehicles**

- **请求参数：**无

- **请求体：**无

- **响应格式get**

  - 状态码
    - 500：表明服务器发生错误，获取车辆信息操作已取消
    - 404：表明服务器并没有找到该用户的车辆信息
    - 200：完成车辆信息的查询

- **响应体**

  - 当成功查询个人信息时：

  ```json
  {
      "code": 1,
      "data": [
          {
              "vehicle_id": 2,
              "vehicle_type": "小米SU7",
              "vehicle_number": "114514",
              "updatedAt": "2024-11-11T12:13:08.000Z"
          },
          {
              "vehicle_id": 3,
              "vehicle_type": "迈腾",
              "vehicle_number": "1234567",
              "updatedAt": "2024-11-11T12:14:18.000Z"
          },
          {
              "vehicle_id": 4,
              "vehicle_type": "别克G8L",
              "vehicle_number": "89101112",
              "updatedAt": "2024-11-11T12:15:22.000Z"
          }
      ]
  }
  ```

  - 未找到对应的车辆数据时

  ```json
  {
      "code": 0,
      "message":"Not Found"
  }
  ```

  - 服务器内部查询失败时

  ```json
  {
      ”code“: -1,
      ”message“: "Internal Server Error"
  }
  ```



### 更新个人信息

- **HTTP方法：GET请求**

- **URL：/personalPage/updataProfile**

- **请求参数：**

  | 参数       | 类型   | 是否必填 | 描述         |
  | ---------- | ------ | -------- | ------------ |
  | updataData | Object | 是       | 要更新的数据 |

  ***根据User库表进行对象属性填充***

  | 键名      | 类型   | 基本属性                                       | 描述         |
  | --------- | ------ | ---------------------------------------------- | ------------ |
  | user_id   | 大整数 | 不允许为空，且唯一，主键自增（不允许手动修改） | user表的主键 |
  | username  | 字符串 | 不允许为空，且唯一                             | 用户名       |
  | password  | 字符串 | 不允许为空，不唯一                             | 用户密码     |
  | name      | 字符串 | 允许为空，不唯一                               | 用户真实名称 |
  | telephone | 字符串 | 不允许为空，不唯一                             | 手机号码     |
  | email     | 字符串 | 允许为空，不唯一                               | 邮箱         |

- **请求体**

```json
{
    "updataData":{
        "name":"食雪汉" ,
        "email":"114514@homo.com",
        "username":"我修院(食雪版)"
    }
}
```

- **响应格式**

  - 500：表明服务器发生错误，更新个人信息操作已取消
  - 200：完成个人信息的更新

- **响应体**

  - 完成个人信息的更新时

  ```json
  {
      "code": 1,
      "message": "success"
  }
  ```

  - 服务器内部更新失败时

  ```json
  {
      ”code“: -1,
      ”message“: "Internal Server Error"
  }
  ```

  