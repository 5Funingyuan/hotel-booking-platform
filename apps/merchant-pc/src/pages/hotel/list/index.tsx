import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Table,
  Button,
  Tag,
  Space,
  Input,
  Select,
  Card,
  message,
  Popconfirm,
  Modal,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { hotelApi } from '@/api'
import { useAuthStore } from '@/store/authStore'
import type { ColumnsType } from 'antd/es/table'

interface Hotel {
  id: string
  name: string
  starLevel: string
  address: string
  status: string
  minPrice: number
  createdAt: string
  updatedAt: string
  auditReason?: string
}

const statusMap: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'gold', label: '审核中' },
  APPROVED: { color: 'green', label: '已通过' },
  REJECTED: { color: 'red', label: '不通过' },
  OFFLINE: { color: 'default', label: '已下线' },
}

const starMap: Record<string, string> = {
  ECONOMY: '经济型',
  COMFORT: '舒适型',
  HIGH_END: '高档型',
  LUXURY: '豪华型',
}

export default function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [filters, setFilters] = useState({
    status: undefined,
    keyword: '',
  })
  const [auditModal, setAuditModal] = useState<{
    visible: boolean
    hotelId: string
    action: 'approve' | 'reject'
    reason: string
  }>({ visible: false, hotelId: '', action: 'approve', reason: '' })

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    loadHotels()
  }, [pagination.current, pagination.pageSize, filters])

  // 当从其他页面返回时刷新列表
  useEffect(() => {
    if (location.state?.refresh) {
      loadHotels()
      // 清除state避免重复刷新
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location])

  const loadHotels = async () => {
    setLoading(true)
    try {
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        status: filters.status,
        keyword: filters.keyword || undefined,
      }
      
      const res: any = await hotelApi.getList(params)
      if (res.code === 200) {
        setHotels(res.data.list)
        setPagination({
          ...pagination,
          total: res.data.pagination.total,
        })
      }
    } catch (error) {
      message.error('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res: any = await hotelApi.delete(id)
      if (res.code === 200) {
        message.success('删除成功')
        loadHotels()
      }
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleSubmitAudit = async (id: string) => {
    try {
      const res: any = await hotelApi.submitForAudit(id)
      if (res.code === 200) {
        message.success('提交审核成功')
        loadHotels()
      }
    } catch (error) {
      message.error('提交审核失败')
    }
  }

  const handleAudit = async () => {
    try {
      const res: any = await hotelApi.audit(
        auditModal.hotelId,
        auditModal.action === 'approve' ? 'APPROVED' : 'REJECTED',
        auditModal.reason
      )
      if (res.code === 200) {
        message.success(auditModal.action === 'approve' ? '审核通过' : '已拒绝')
        setAuditModal({ ...auditModal, visible: false, reason: '' })
        loadHotels()
      }
    } catch (error) {
      message.error('审核失败')
    }
  }

  const handleOffline = async (id: string) => {
    try {
      const res: any = await hotelApi.offline(id)
      if (res.code === 200) {
        message.success('下线成功')
        loadHotels()
      }
    } catch (error) {
      message.error('下线失败')
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const res: any = await hotelApi.restore(id)
      if (res.code === 200) {
        message.success('恢复成功')
        loadHotels()
      }
    } catch (error) {
      message.error('恢复失败')
    }
  }

  const columns: ColumnsType<Hotel> = [
    {
      title: '酒店名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '星级',
      dataIndex: 'starLevel',
      key: 'starLevel',
      render: (level) => starMap[level] || level,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '最低价',
      dataIndex: 'minPrice',
      key: 'minPrice',
      render: (price) => `¥${price}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space direction="vertical" size="small">
          <Tag color={statusMap[status]?.color}>
            {statusMap[status]?.label}
          </Tag>
          {status === 'REJECTED' && record.auditReason && (
            <span style={{ fontSize: '12px', color: '#999' }}>
              原因: {record.auditReason}
            </span>
          )}
        </Space>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        const actions = []

        // Merchant actions
        if (!isAdmin) {
          if (record.status === 'PENDING' || record.status === 'REJECTED') {
            actions.push(
              <Button
                key="edit"
                type="link"
                icon={<EditOutlined />}
                onClick={() => navigate(`/hotels/edit/${record.id}`)}
              >
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                title="确定删除吗？"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
            )
          }
          
          if (record.status === 'REJECTED') {
            actions.push(
              <Button
                key="submit"
                type="link"
                icon={<UploadOutlined />}
                onClick={() => handleSubmitAudit(record.id)}
              >
                提交审核
              </Button>
            )
          }
        }

        // Admin actions
        if (isAdmin) {
          if (record.status === 'PENDING') {
            actions.push(
              <Button
                key="approve"
                type="link"
                style={{ color: '#52c41a' }}
                icon={<CheckCircleOutlined />}
                onClick={() =>
                  setAuditModal({
                    visible: true,
                    hotelId: record.id,
                    action: 'approve',
                    reason: '',
                  })
                }
              >
                通过
              </Button>,
              <Button
                key="reject"
                type="link"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() =>
                  setAuditModal({
                    visible: true,
                    hotelId: record.id,
                    action: 'reject',
                    reason: '',
                  })
                }
              >
                拒绝
              </Button>
            )
          }

          if (record.status === 'APPROVED') {
            actions.push(
              <Popconfirm
                key="offline"
                title="确定下线该酒店吗？"
                onConfirm={() => handleOffline(record.id)}
              >
                <Button type="link" icon={<CloseCircleOutlined />}>
                  下线
                </Button>
              </Popconfirm>
            )
          }

          if (record.status === 'OFFLINE') {
            actions.push(
              <Button
                key="restore"
                type="link"
                icon={<ReloadOutlined />}
                onClick={() => handleRestore(record.id)}
              >
                恢复
              </Button>
            )
          }
        }

        return <Space>{actions}</Space>
      },
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={isAdmin ? '酒店管理' : '我的酒店'}
        extra={
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/')}
            >
              返回
            </Button>
            {!isAdmin && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/hotels/create')}
              >
                创建酒店
              </Button>
            )}
          </Space>
        }
      >
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索酒店名称"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            onSearch={loadHotels}
            style={{ width: 300 }}
          />
          <Select
            placeholder="筛选状态"
            allowClear
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            style={{ width: 150 }}
            options={[
              { value: 'PENDING', label: '审核中' },
              { value: 'APPROVED', label: '已通过' },
              { value: 'REJECTED', label: '不通过' },
              { value: 'OFFLINE', label: '已下线' },
            ]}
          />
          <Button onClick={loadHotels}>刷新</Button>
        </Space>

        <Table
          columns={columns}
          dataSource={hotels}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize })
            },
          }}
        />
      </Card>

      {/* Audit Modal */}
      <Modal
        title={auditModal.action === 'approve' ? '审核通过' : '审核拒绝'}
        open={auditModal.visible}
        onOk={handleAudit}
        onCancel={() => setAuditModal({ ...auditModal, visible: false })}
      >
        {auditModal.action === 'reject' && (
          <Input.TextArea
            placeholder="请输入拒绝原因"
            value={auditModal.reason}
            onChange={(e) =>
              setAuditModal({ ...auditModal, reason: e.target.value })
            }
            rows={4}
          />
        )}
        {auditModal.action === 'approve' && <p>确认通过该酒店的审核吗？</p>}
      </Modal>
    </div>
  )
}