import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Steps,
  Card,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  message,
  Row,
  Col,
  Space,
  Table,
  Popconfirm,
  Modal,
  Tag,
} from 'antd'
import {
  PlusOutlined,
  UploadOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { hotelApi, roomApi } from '@/api'
import { useHotelFormStore } from '@/store/hotelFormStore'
import { provinces, getCities } from '@hotel/shared-utils/china-regions-full'
import './style.css'

const { Step } = Steps
const { TextArea } = Input
const { Option } = Select

// Types
interface Room {
  id?: string
  name: string
  area: number
  bedType: string
  windowType: string
  hasBreakfast: boolean
  cancelPolicy: string
  priceWeekday: number
  priceHoliday: number
  stock: number
}

interface HotelFormData {
  name: string
  starLevel: string
  address: string
  contactPhone: string
  description: string
  tags: string[]
  images: string[]
  mainImage: string
  latitude?: number
  longitude?: number
}

const STAR_OPTIONS = [
  { value: 'ECONOMY', label: '经济型' },
  { value: 'COMFORT', label: '舒适型' },
  { value: 'HIGH_END', label: '高档型' },
  { value: 'LUXURY', label: '豪华型' },
]

const TAG_OPTIONS = [
  { value: 'FAMILY', label: '亲子' },
  { value: 'LUXURY', label: '豪华' },
  { value: 'FREE_PARKING', label: '免费停车' },
  { value: 'SEA_VIEW', label: '海景' },
  { value: 'BREAKFAST', label: '含早餐' },
  { value: 'FREE_CANCEL', label: '可取消' },
]

const BED_TYPE_OPTIONS = [
  { value: 'SINGLE', label: '单人床' },
  { value: 'DOUBLE', label: '大床' },
  { value: 'TWIN', label: '双床' },
  { value: 'QUEEN', label: 'Queen' },
  { value: 'KING', label: 'King' },
]

const WINDOW_TYPE_OPTIONS = [
  { value: 'YES', label: '有窗' },
  { value: 'NO', label: '无窗' },
  { value: 'INNER', label: '内窗' },
]

export default function HotelEdit() {
  // Zustand store
  const { 
    currentStep, 
    setCurrentStep, 
    stepData, 
    setStepData, 
    fileList, 
    setFileList, 
    setRooms,
    resetForm,
    getAllData 
  } = useHotelFormStore()
  
  // Local state
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [roomModal, setRoomModal] = useState<{
    visible: boolean
    editing: Room | null
  }>({ visible: false, editing: null })
  const [roomForm] = Form.useForm()

  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  
  // Get rooms from store
  const rooms = stepData[2].rooms || []

  useEffect(() => {
    if (isEdit) {
      loadHotelDetail()
    } else {
      // Reset form for new hotel
      resetForm()
    }
  }, [id])
  
  // Load step data when step changes
  useEffect(() => {
    form.setFieldsValue(stepData[currentStep])
  }, [currentStep, form])

  const loadHotelDetail = async () => {
    try {
      setLoading(true)
      const res: any = await hotelApi.getDetail(id!)
      if (res.code === 200) {
        const hotel = res.data
        
        // 存储基本信息到步骤0
        setStepData(0, {
          name: hotel.name,
          starLevel: hotel.starLevel,
          province: hotel.province,
          city: hotel.city,
          district: hotel.district,
          address: hotel.address,
          contactPhone: hotel.contactPhone,
          description: hotel.description,
          tags: hotel.tags,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
        })
        
        // 存储房型到步骤2
        setRooms(hotel.rooms || [])
        
        // Set images
        if (hotel.images?.length > 0) {
          const newFileList = hotel.images.map((url: string, index: number) => ({
            uid: `-${index}`,
            name: `image-${index}`,
            status: 'done',
            url,
          }))
          setFileList(newFileList)
          // 存储图片信息到步骤1
          setStepData(1, {
            images: hotel.images,
            mainImage: hotel.images[0] || '',
          })
        }
        
        // 设置当前表单值
        form.setFieldsValue(stepData[currentStep])
      }
    } catch (error) {
      message.error('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // 使用getAllData()获取所有步骤数据
      const data = getAllData()

      // 验证必填字段
      if (!data.name || !data.starLevel || !data.province || !data.city || !data.address) {
        message.error('请填写完整的基本信息（酒店名称、星级、省市区、详细地址）')
        setCurrentStep(0)
        return
      }

      if (data.images.length === 0) {
        message.error('请至少上传一张图片')
        setCurrentStep(1)
        return
      }

      setLoading(true)
      let res: any
      if (isEdit) {
        res = await hotelApi.update(id!, data)
      } else {
        res = await hotelApi.create(data)
      }

      if (res.code === 200 || res.code === 201) {
        message.success(isEdit ? '更新成功' : '创建成功')
        resetForm()
        // 强制刷新酒店列表页面
        navigate('/hotels', { state: { refresh: true } })
      }
    } catch (error: any) {
      console.error('Save error:', error)
      message.error(error.message || '保存失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    Modal.confirm({
      title: '确认取消',
      content: '确定要取消吗？未保存的内容将会丢失。',
      onOk: () => {
        resetForm()
        navigate('/hotels')
      },
    })
  }

  const handleNext = async () => {
    try {
      // 验证当前步骤的表单
      const values = await form.validateFields()
      
      // 保存当前步骤数据到store
      setStepData(currentStep, values)
      
      // 进入下一步
      setCurrentStep(currentStep + 1)
    } catch (error) {
      message.error('请填写完整信息')
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleAddRoom = () => {
    setRoomModal({ visible: true, editing: null })
    roomForm.resetFields()
  }

  const handleEditRoom = (room: Room) => {
    setRoomModal({ visible: true, editing: room })
    roomForm.setFieldsValue(room)
  }

  const handleSaveRoom = async () => {
    try {
      const values = await roomForm.validateFields()
      
      if (roomModal.editing?.id) {
        // Update existing room - 使用函数式更新
        setRooms((prevRooms) =>
          prevRooms.map((r) =>
            r.id === roomModal.editing?.id ? { ...r, ...values } : r
          )
        )
      } else {
        // Add new room - 使用函数式更新
        setRooms((prevRooms) => [
          ...prevRooms,
          { ...values, id: `temp-${Date.now()}` }
        ])
      }
      
      setRoomModal({ visible: false, editing: null })
      message.success('房型保存成功')
    } catch (error) {
      message.error('请填写完整信息')
    }
  }

  const handleDeleteRoom = (roomId: string) => {
    // 使用函数式更新
    setRooms((prevRooms) => prevRooms.filter((r) => r.id !== roomId))
    message.success('房型删除成功')
  }

  const steps = [
    {
      title: '基本信息',
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="酒店名称"
                rules={[{ required: true, message: '请输入酒店名称' }]}
              >
                <Input placeholder="请输入酒店名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="starLevel"
                label="酒店星级"
                rules={[{ required: true, message: '请选择酒店星级' }]}
              >
                <Select placeholder="请选择">
                  {STAR_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 省市区级联选择 */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="province"
                label="省/直辖市"
                rules={[{ required: true, message: '请选择省份' }]}
              >
                <Select 
                  placeholder="选择省份"
                  onChange={() => {
                    form.setFieldsValue({ city: undefined })
                  }}
                >
                  {provinces.map((p) => (
                    <Option key={p.code} value={p.name}>
                      {p.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                  const provinceName = getFieldValue('province')
                  const provinceCode =
                    provinces.find((p) => p.name === provinceName)?.code || ''
                  const cities = getCities(provinceCode)

                  return (
                    <Form.Item
                      name="city"
                      label="市"
                      rules={[{ required: true, message: '请选择城市' }]}
                    >
                      <Select
                        placeholder="选择城市"
                        disabled={!provinceName}
                      >
                        {cities.map((c) => (
                          <Option key={c.code} value={c.name}>
                            {c.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )
                }}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="详细地址"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input.TextArea placeholder="请输入街道、门牌号等详细地址" rows={2} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="contactPhone" label="联系电话">
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tags" label="特色标签">
                <Select mode="multiple" placeholder="请选择">
                  {TAG_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="酒店简介">
            <TextArea placeholder="请输入酒店简介" rows={4} />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="latitude" label="纬度">
                <InputNumber style={{ width: '100%' }} placeholder="纬度" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="longitude" label="经度">
                <InputNumber style={{ width: '100%' }} placeholder="经度" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: '图片上传',
      content: (
        <div>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => {
              setFileList(newFileList)
              // 同时更新stepData[1]中的图片信息
              const images = newFileList
                .filter((file) => file.status === 'done')
                .map((file) => file.url || file.response?.url)
                .filter(Boolean)
              setStepData(1, {
                images,
                mainImage: images[0] || '',
              })
            }}
            customRequest={async ({ file, onSuccess, onError }) => {
              // Simulate upload - in real app, upload to server
              setTimeout(() => {
                onSuccess?.({ url: URL.createObjectURL(file as Blob) })
              }, 1000)
            }}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            )}
          </Upload>
          <p style={{ color: '#999', marginTop: 16 }}>
            最多上传8张图片，第一张将作为主图
          </p>
        </div>
      ),
    },
    {
      title: '房型管理',
      content: (
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddRoom}
            style={{ marginBottom: 16 }}
          >
            添加房型
          </Button>

          <Table
            dataSource={rooms}
            rowKey="id"
            pagination={false}
            columns={[
              { title: '房型名称', dataIndex: 'name', key: 'name' },
              { title: '面积', dataIndex: 'area', key: 'area', render: (v) => `${v}㎡` },
              { title: '床型', dataIndex: 'bedType', key: 'bedType', render: (v) => BED_TYPE_OPTIONS.find(o => o.value === v)?.label },
              { title: '窗户', dataIndex: 'windowType', key: 'windowType', render: (v) => WINDOW_TYPE_OPTIONS.find(o => o.value === v)?.label },
              { title: '早餐', dataIndex: 'hasBreakfast', key: 'hasBreakfast', render: (v) => v ? '含早' : '不含' },
              { 
                title: '平日价', 
                dataIndex: 'priceWeekday', 
                key: 'priceWeekday', 
                render: (v) => `¥${v}` 
              },
              { 
                title: '假日价', 
                dataIndex: 'priceHoliday', 
                key: 'priceHoliday', 
                render: (v) => `¥${v}` 
              },
              { title: '库存', dataIndex: 'stock', key: 'stock' },
              {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                  <Space>
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => handleEditRoom(record)}
                    >
                      编辑
                    </Button>
                    <Popconfirm
                      title="确定删除吗？"
                      onConfirm={() => handleDeleteRoom(record.id!)}
                    >
                      <Button type="link" danger icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={isEdit ? '编辑酒店' : '创建酒店'}
        extra={
          <Button onClick={() => navigate('/hotels')}>返回列表</Button>
        }
      >
        <Steps current={currentStep} style={{ marginBottom: 32 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[currentStep].content}</div>

        <div className="steps-action" style={{ marginTop: 32, textAlign: 'center' }}>
          <Button style={{ marginRight: 8 }} onClick={handleCancel}>
            取消
          </Button>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              <LeftOutlined /> 上一步
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              下一步 <RightOutlined />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" loading={loading} onClick={handleSave}>
              <CheckOutlined /> 保存
            </Button>
          )}
        </div>
      </Card>

      {/* Room Modal */}
      <Modal
        title={roomModal.editing ? '编辑房型' : '添加房型'}
        open={roomModal.visible}
        forceRender
        onOk={handleSaveRoom}
        onCancel={() => setRoomModal({ visible: false, editing: null })}
        width={600}
      >
        <Form form={roomForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="房型名称"
                rules={[{ required: true }]}
              >
                <Input placeholder="如：标准大床房" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="area" label="面积（㎡）">
                <InputNumber style={{ width: '100%' }} placeholder="25" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bedType"
                label="床型"
                rules={[{ required: true }]}
              >
                <Select placeholder="请选择">
                  {BED_TYPE_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="windowType" label="窗户类型">
                <Select placeholder="请选择">
                  {WINDOW_TYPE_OPTIONS.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priceWeekday"
                label="平日价格"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  prefix="¥"
                  placeholder="299"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priceHoliday"
                label="节假日价格"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  prefix="¥"
                  placeholder="399"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="stock" label="库存数量">
                <InputNumber style={{ width: '100%' }} placeholder="10" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hasBreakfast" label="含早餐">
                <Select>
                  <Option value={true}>含早餐</Option>
                  <Option value={false}>不含早餐</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="cancelPolicy" label="取消政策">
            <Input placeholder="如：入住前24小时可免费取消" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
