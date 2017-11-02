<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../static/css/login.css">
    <title>登录</title>
</head>
<body>
    <form action="checkuser.php" method="post"><!--表格发送的地址-->
        <div class="formGroup">
            <h3>欢迎登录</h3>
        </div>
        <div class="formGroup">
            <label for="">
                用户名
            </label>
            <input type="text" name="user" placeholder="请输入用户名">
        </div>
        <div class="formGroup">
            <label for="">
                密&nbsp;&nbsp;&nbsp;码
            </label>
            <input type="password" name="pass" placeholder="请输入密码">
        </div>
        <div class="formGroup">
            <input class="submit" type="submit" name="sub" value="登录">
        </div>
    </form>
</body>
</html>