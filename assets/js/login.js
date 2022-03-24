$(function() {
    // 点击去注册账号
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, ' 密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })

    // 注册提交事件
    $('#layui_reg').on('submit', function(e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.post('/api/reguser', { usernamr: $('#layui_reg [name=username]').val(), password: $('#layui_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(' 注册成功，请登录！');
            $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);

            }
        })
    })
})