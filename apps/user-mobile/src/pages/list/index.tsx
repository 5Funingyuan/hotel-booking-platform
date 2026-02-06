import Taro, { useLoad, useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { AtDrawer, AtLoadMore, AtTag, AtIcon, AtFilter, AtButton } from 'taro-ui'
import { hotelApi } from '../../utils/api'
import { useSearchStore } from '../../store/searchStore'
import './style.less'

interface Hotel {
  id: string
  name: string
  starLevel: string
  address: string
  mainImage: string
  minPrice: number
  tags: string[]
}

export default function List() {
  const searchParams = useSearchStore()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilter, setShowFilter] = useState(false)
  const [sortBy, setSortBy] = useState('default') // default, price_asc, price_desc, rating

  const safeDecode = (value?: string) => {
    if (!value) return ''
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }

  useLoad((options) => {
    // Parse URL params
    if (options.city) searchParams.setCity(safeDecode(options.city))
    if (options.keyword) searchParams.setKeyword(safeDecode(options.keyword))
    
    loadHotels(1, true)
  })

  useReachBottom(() => {
    if (hasMore && !loading) {
      loadHotels(page + 1)
    }
  })

  const loadHotels = async (pageNum: number, reset = false) => {
    if (loading) return
    
    setLoading(true)
    try {
      const params: any = {
        page: pageNum.toString(),
        limit: '10',
        city: searchParams.city,
        keyword: searchParams.keyword,
        starLevel: searchParams.starLevel.join(','),
        minPrice: searchParams.priceRange[0].toString(),
        maxPrice: searchParams.priceRange[1] < 1000 ? searchParams.priceRange[1].toString() : undefined,
        tags: searchParams.quickTags.join(','),
      }
      
      // 过滤掉 undefined 和空字符串
      Object.keys(params).forEach(key => {
        if (params[key] === undefined || params[key] === '') {
          delete params[key]
        }
      })
      
      const res = await hotelApi.getList(params)
      const newHotels = res.data.list
      
      if (reset) {
        setHotels(newHotels)
      } else {
        setHotels(prev => [...prev, ...newHotels])
      }
      
      setHasMore(newHotels.length === 10)
      setPage(pageNum)
    } catch (error) {
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleHotelClick = (id: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
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

  const handleSortChange = (value: string) => {
    setSortBy(value)
    // Re-sort current list
    const sorted = [...hotels]
    switch (value) {
      case 'price_asc':
        sorted.sort((a, b) => a.minPrice - b.minPrice)
        break
      case 'price_desc':
        sorted.sort((a, b) => b.minPrice - a.minPrice)
        break
      default:
        // Keep original order
        break
    }
    setHotels(sorted)
  }

  return (
    <View className='list-page'>
      {/* Header Filter */}
      <View className='header-filter'>
        <View className='location-date'>
          <Text className='city'>{searchParams.city || '全部城市'}</Text>
          <Text className='date'>
            {searchParams.checkIn.slice(5)} - {searchParams.checkOut.slice(5)} | {searchParams.nights}晚
          </Text>
        </View>
        <View className='filter-actions'>
          <View className='sort-section'>
            <Text 
              className={`sort-item ${sortBy === 'default' ? 'active' : ''}`}
              onClick={() => handleSortChange('default')}
            >
              综合
            </Text>
            <Text 
              className={`sort-item ${sortBy === 'price_asc' ? 'active' : ''}`}
              onClick={() => handleSortChange('price_asc')}
            >
              价格<AtIcon value={sortBy === 'price_asc' ? 'arrow-down' : 'arrow-up'} size='12' />
            </Text>
          </View>
          <View className='filter-btn' onClick={() => setShowFilter(true)}>
            <AtIcon value='filter' size='16' />
            <Text>筛选</Text>
          </View>
        </View>
      </View>

      {/* Hotel List */}
      <View className='hotel-list'>
        {hotels.map((hotel) => (
          <View
            key={hotel.id}
            className='hotel-item'
            onClick={() => handleHotelClick(hotel.id)}
          >
            <Image
              className='hotel-image'
              src={hotel.mainImage || 'https://picsum.photos/200/150'}
              mode='aspectFill'
              lazyLoad
            />
            <View className='hotel-info'>
              <Text className='hotel-name'>{hotel.name}</Text>
              <View className='hotel-tags'>
                <AtTag size='small' className='star-tag'>
                  {getStarLabel(hotel.starLevel)}
                </AtTag>
                {hotel.tags?.slice(0, 2).map((tag, idx) => (
                  <AtTag key={idx} size='small' className='feature-tag'>
                    {tag}
                  </AtTag>
                ))}
              </View>
              <Text className='hotel-address'>{hotel.address}</Text>
              <View className='hotel-price-row'>
                <Text className='price-prefix'>¥</Text>
                <Text className='price-value'>{hotel.minPrice}</Text>
                <Text className='price-suffix'>起</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Load More */}
      <AtLoadMore
        status={loading ? 'loading' : hasMore ? 'more' : 'noMore'}
        loadingText='加载中...'
        moreText='上拉加载更多'
        noMoreText='没有更多了'
      />

      {/* Filter Drawer */}
      <AtDrawer
        show={showFilter}
        right
        mask
        onClose={() => setShowFilter(false)}
      >
        <View className='filter-drawer'>
          <View className='filter-section'>
            <Text className='filter-title'>价格区间</Text>
            <View className='price-range'>
              <input
                type='range'
                min='0'
                max='1000'
                step='100'
                value={searchParams.priceRange[1]}
                onChange={(e) => searchParams.setPriceRange([0, parseInt(e.target.value)])}
              />
              <Text className='range-text'>
                ¥0 - ¥{searchParams.priceRange[1]}{searchParams.priceRange[1] === 1000 ? '+' : ''}
              </Text>
            </View>
          </View>
          
          <View className='filter-section'>
            <Text className='filter-title'>酒店星级</Text>
            <View className='filter-options'>
              {['ECONOMY', 'COMFORT', 'HIGH_END', 'LUXURY'].map((star) => (
                <AtTag
                  key={star}
                  active={searchParams.starLevel.includes(star as any)}
                  onClick={() => searchParams.toggleStarLevel(star as any)}
                >
                  {getStarLabel(star)}
                </AtTag>
              ))}
            </View>
          </View>
          
          <View className='filter-section'>
            <Text className='filter-title'>特色标签</Text>
            <View className='filter-options'>
              {['FAMILY', 'LUXURY', 'FREE_PARKING', 'SEA_VIEW', 'BREAKFAST', 'FREE_CANCEL'].map((tag) => (
                <AtTag
                  key={tag}
                  active={searchParams.quickTags.includes(tag as any)}
                  onClick={() => searchParams.toggleQuickTag(tag as any)}
                >
                  {tag}
                </AtTag>
              ))}
            </View>
          </View>
          
          <View className='filter-actions'>
            <AtButton onClick={() => {
              searchParams.resetFilters()
              setShowFilter(false)
              loadHotels(1, true)
            }}>
              重置
            </AtButton>
            <AtButton
              type='primary'
              onClick={() => {
                setShowFilter(false)
                loadHotels(1, true)
              }}
            >
              确定
            </AtButton>
          </View>
        </View>
      </AtDrawer>
    </View>
  )
}
