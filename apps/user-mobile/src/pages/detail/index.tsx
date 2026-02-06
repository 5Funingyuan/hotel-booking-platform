import Taro, { useLoad } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { AtIcon, AtTag, AtButton, AtNavBar } from 'taro-ui'
import { hotelApi } from '../../utils/api'
import { useSearchStore } from '../../store/searchStore'
import { addDays } from '../../utils/date'
import './style.less'

interface Room {
  id: string
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

interface Hotel {
  id: string
  name: string
  starLevel: string
  address: string
  description: string
  images: string[]
  mainImage: string
  tags: string[]
  rooms: Room[]
}

const BED_TYPE_MAP: Record<string, string> = {
  'SINGLE': '单人床',
  'DOUBLE': '大床',
  'TWIN': '双床',
  'QUEEN': 'Queen',
  'KING': 'King'
}

const WINDOW_TYPE_MAP: Record<string, string> = {
  'YES': '有窗',
  'NO': '无窗',
  'INNER': '内窗'
}

export default function Detail() {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const searchStore = useSearchStore()
  const [localCheckIn, setLocalCheckIn] = useState(searchStore.checkIn)
  const [localCheckOut, setLocalCheckOut] = useState(searchStore.checkOut)
  const [localNights, setLocalNights] = useState(searchStore.nights)

  useLoad((options) => {
    if (options.id) {
      loadHotelDetail(options.id)
    }
  })

  const loadHotelDetail = async (id: string) => {
    try {
      Taro.showLoading({ title: '加载中...' })
      const res = await hotelApi.getDetail(id)
      setHotel(res.data)
      Taro.hideLoading()
    } catch (error) {
      Taro.hideLoading()
      Taro.showToast({ title: '加载失败', icon: 'none' })
    }
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleDateChange = (type: 'checkIn' | 'checkOut', value: string) => {
    if (type === 'checkIn') {
      setLocalCheckIn(value)
      const newNights = Math.ceil((new Date(localCheckOut).getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24))
      if (newNights > 0 && newNights <= 7) {
        setLocalNights(newNights)
      } else if (newNights > 7) {
        Taro.showToast({ title: '先睡七天吧～', icon: 'none' })
      }
    } else {
      setLocalCheckOut(value)
      const newNights = Math.ceil((new Date(value).getTime() - new Date(localCheckIn).getTime()) / (1000 * 60 * 60 * 24))
      if (newNights > 0 && newNights <= 7) {
        setLocalNights(newNights)
      } else if (newNights > 7) {
        Taro.showToast({ title: '先睡七天吧～', icon: 'none' })
      }
    }
  }

  const getPrice = (room: Room) => {
    // 简单判断是否为周末
    const checkInDate = new Date(localCheckIn)
    const day = checkInDate.getDay()
    const isWeekend = day === 0 || day === 6
    return isWeekend ? room.priceHoliday : room.priceWeekday
  }

  const getStarLabel = (level: string) => {
    const map: Record<string, string> = {
      'ECONOMY': '经济型',
      'COMFORT': '舒适型',
      'HIGH_END': '高档型',
      'LUXURY': '豪华型'
    }
    return map[level] || level
  }

  if (!hotel) {
    return (
      <View className='detail-page'>
        <AtNavBar
          title='酒店详情'
          leftIconType='chevron-left'
          onClickLeftIcon={handleBack}
        />
        <View className='loading-container'>
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='detail-page'>
      {/* Nav Header */}
      <AtNavBar
        title={hotel.name}
        leftIconType='chevron-left'
        onClickLeftIcon={handleBack}
        fixed
      />

      <ScrollView className='detail-content' scrollY>
        {/* Image Gallery */}
        <View className='image-gallery'>
          <ScrollView
            scrollX
            className='gallery-scroll'
            scrollWithAnimation
            onScroll={(e) => {
              const scrollLeft = e.detail.scrollLeft
              const index = Math.round(scrollLeft / 750)
              setCurrentImage(index)
            }}
          >
            {(hotel.images?.length > 0 ? hotel.images : [hotel.mainImage]).map((image, index) => (
              <Image
                key={index}
                className='gallery-image'
                src={image || 'https://picsum.photos/750/400'}
                mode='aspectFill'
              />
            ))}
          </ScrollView>
          <View className='gallery-dots'>
            {(hotel.images?.length > 0 ? hotel.images : [hotel.mainImage]).map((_, index) => (
              <View
                key={index}
                className={`dot ${index === currentImage ? 'active' : ''}`}
              />
            ))}
          </View>
        </View>

        {/* Hotel Info */}
        <View className='hotel-info-section'>
          <Text className='hotel-name'>{hotel.name}</Text>
          <View className='hotel-meta'>
            <AtTag className='star-badge'>{getStarLabel(hotel.starLevel)}</AtTag>
            <View className='hotel-tags'>
              {hotel.tags?.map((tag, idx) => (
                <Text key={idx} className='tag-item'>{tag}</Text>
              ))}
            </View>
          </View>
          <View className='address-row'>
            <AtIcon value='map-pin' size='16' color='#999' />
            <Text className='address-text'>{hotel.address}</Text>
          </View>
          {hotel.description && (
            <Text className='description'>{hotel.description}</Text>
          )}
        </View>

        {/* Date Banner */}
        <View className='date-banner'>
          <View className='date-section'>
            <Text className='date-label'>入住</Text>
            <Text className='date-value'>{localCheckIn.slice(5)}</Text>
          </View>
          <View className='nights-badge'>
            <Text>{localNights}晚</Text>
          </View>
          <View className='date-section'>
            <Text className='date-label'>离店</Text>
            <Text className='date-value'>{localCheckOut.slice(5)}</Text>
          </View>
        </View>

        {/* Room List */}
        <View className='room-list-section'>
          <Text className='section-title'>房型列表</Text>
          {hotel.rooms?.sort((a, b) => getPrice(a) - getPrice(b)).map((room) => (
            <View key={room.id} className='room-card'>
              <View className='room-header'>
                <Text className='room-name'>{room.name}</Text>
                {room.stock < 3 && room.stock > 0 && (
                  <AtTag size='small' className='stock-warning'>
                    仅剩{room.stock}间
                  </AtTag>
                )}
                {room.stock === 0 && (
                  <AtTag size='small' className='stock-empty'>
                    已售罄
                  </AtTag>
                )}
              </View>
              
              <View className='room-info'>
                <Text className='info-item'>{room.area}㎡</Text>
                <Text className='info-item'>{BED_TYPE_MAP[room.bedType]}</Text>
                <Text className='info-item'>{WINDOW_TYPE_MAP[room.windowType]}</Text>
                {room.hasBreakfast && (
                  <Text className='info-item highlight'>含早餐</Text>
                )}
              </View>
              
              {room.cancelPolicy && (
                <Text className='cancel-policy'>{room.cancelPolicy}</Text>
              )}
              
              <View className='room-footer'>
                <View className='price-section'>
                  <Text className='price-symbol'>¥</Text>
                  <Text className='price-value'>{getPrice(room)}</Text>
                  <Text className='price-unit'>起/晚</Text>
                </View>
                <AtButton
                  type='primary'
                  size='small'
                  disabled={room.stock === 0}
                  className='book-btn'
                  onClick={() => {
                    Taro.showToast({ title: '预订功能开发中', icon: 'none' })
                  }}
                >
                  {room.stock === 0 ? '已满房' : '预订'}
                </AtButton>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}