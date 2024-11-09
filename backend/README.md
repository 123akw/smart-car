

# API接口文档

- **API名称：登录API**
- **版本0.0.1**
- **描述：用于用户注册，登录功能**



### 认证

- **认证方式：采用哈希加密返回的token标识符**

### 用户注册

- **HTTP方法：POST**

- **URL：/register**

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

- **URL：/login**

- **请求参数(参数校验前端负责)：**

  | 参数名    | 类型   | 是否必填                    | 描述     |
  | --------- | ------ | --------------------------- | -------- |
  | username  | string | username和telephone必填一个 | 用户名   |
  | telephone | string | username和telephone必填一个 | 电话号码 |
  | password  | string | 是                          | 密码     |

- **请求体：**

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

- **响应格式：**

  - **状态码**
    - 200：表示用户登录成功
    - 404：表明此用户不存在，需注册
    - 500：表明服务器发生错误，登录操作已取消

- **响应体**

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

    

  

  

  

