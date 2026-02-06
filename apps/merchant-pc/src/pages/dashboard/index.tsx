import { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, List, Tag, Button, Space } from 'antd'
import {
  HomeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { hotelApi } from '@/api'
import { useAuthStore } from '@/store/authStore'

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })
  const [recentHotels, setRecentHotels] = useState([])
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const res: any = await hotelApi.getList({ limit: '100' })
      if (res.code === 200) {
        const hotels = res.data.list
        setStats({
          total: hotels.length,
          pending: hotels.filter((h: any) => h.status === 'PENDING').length,
          approved: hotels.filter((h: any) => h.status === 'APPROVED').length,
          rejected: hotels.filter((h: any) => h.status === 'REJECTED').length,
        })
        setRecentHotels(hotels.slice(0, 5))
      }
    } catch (error) {
      console.error('Load stats error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'gold',
      APPROVED: 'green',
      REJECTED: 'red',
      OFFLINE: 'default',
    }
    return map[status] || 'default'
  }

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      PENDING: '审核中',
      APPROVED: '已通过',
      REJECTED: '不通过',
      OFFLINE: '已下线',
    }
    return map[status] || status
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0 }}>
          欢迎回来，{user?.username} ({isAdmin ? '管理员' : '商户'})
        </h1>
        <Button 
          type="primary" 
          danger 
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="酒店总数"
              value={stats.total}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="审核中"
              value={stats.pending}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已通过"
              value={stats.approved}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="不通过"
              value={stats.rejected}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={isAdmin ? 24 : 12}>
          <Card
            title="最近更新"
            extra={
              <Button type="link" onClick={() => navigate('/hotels')}>
                查看全部
              </Button>
            }
          >
            <List
              dataSource={recentHotels}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <Tag color={getStatusColor(item.status)}>
                      {getStatusLabel(item.status)}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={item.address}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {!isAdmin && (
          <Col span={12}>
            <Card title="快捷操作">
              <Button
                type="primary"
                block
                size="large"
                style={{ marginBottom: '16px' }}
                onClick={() => navigate('/hotels/create')}
              >
                创建新酒店
              </Button>
              <Button block size="large" onClick={() => navigate('/hotels')}>
                管理我的酒店
              </Button>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}