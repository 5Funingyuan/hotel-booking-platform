import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Tabs, Radio, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authApi } from '@/api'
import { useAuthStore } from '@/store/authStore'
import './style.css'

export default function Login() {
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleLogin = async (values: any) => {
    setLoading(true)
    try {
      const res: any = await authApi.login(values.username, values.password)
      if (res.code === 200) {
        login(res.data.user, res.data.token)
        message.success('登录成功')
        navigate('/')
      } else {
        message.error(res.message || '登录失败')
      }
    } catch (error: any) {
      message.error(error.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: any) => {
    setLoading(true)
    try {
      const res: any = await authApi.register(
        values.username,
        values.password,
        values.role
      )
      if (res.code === 200 || res.code === 201) {
        message.success('注册成功，请登录')
        setActiveTab('login')
      } else {
        message.error(res.message || '注册失败')
      }
    } catch (error: any) {
      message.error(error.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  const loginForm = (
    <Form name="login" onFinish={handleLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="用户名"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  const registerForm = (
    <Form name="register" onFinish={handleRegister}>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少3个字符' },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="用户名"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6个字符' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[{ required: true, message: '请选择角色' }]}
        initialValue="MERCHANT"
      >
        <Radio.Group size="large">
          <Radio.Button value="MERCHANT">商户</Radio.Button>
          <Radio.Button value="ADMIN">管理员</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <h1>智慧出行</h1>
            <p>商户管理平台</p>
          </div>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            items={[
              {
                key: 'login',
                label: '登录',
                children: loginForm,
              },
              {
                key: 'register',
                label: '注册',
                children: registerForm,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  )
}