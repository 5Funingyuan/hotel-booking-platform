import Taro, { useLoad } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Input } from '@tarojs/components'
import { useState, useMemo, useEffect } from 'react'
import { AtButton, AtTag, AtIcon } from 'taro-ui'
import { useSearchStore } from '../../store/searchStore'
import { getTomorrow, getToday, addDays } from '../../utils/date'
import { hotCities, allCities, groupedCities, alphabetLetters, searchCities, getRecentCities, saveRecentCity, getCityByName } from '@hotel/shared-utils/china-regions'
import './style.less'

// Banner 数据（模拟）
const BANNERS = [
  { id: 1, image: 'https://picsum.photos/750/300?random=1', hotelId: '1' },
  { id: 2, image: 'https://picsum.photos/750/300?random=2', hotelId: '2' },
  { id: 3, image: 'https://picsum.photos/750/300?random=3', hotelId: '3' },
]

// 快捷标签
const QUICK_TAGS = [
  { value: 'FAMILY', label: '亲子', icon: 'heart' },
  { value: 'LUXURY', label: '豪华', icon: 'star' },
  { value: 'FREE_PARKING', label: '免费停车', icon: 'car' },
  { value: 'SEA_VIEW', label: '海景', icon: 'ocean' },
  { value: 'BREAKFAST', label: '含早餐', icon: 'food' },
  { value: 'FREE_CANCEL', label: '可取消', icon: 'check' },
]

// 星级选项
const STAR_OPTIONS = [
  { value: 'ECONOMY', label: '经济型' },
  { value: 'COMFORT', label: '舒适型' },
  { value: 'HIGH_END', label: '高档型' },
  { value: 'LUXURY', label: '豪华型' },
]

export default function Index() {
  const {
    city,
    checkIn,
    checkOut,
    nights,
    keyword,
    searchHistory,
    priceRange,
    starLevel,
    quickTags,
    setCity,
    setDates,
    setNights,
    setKeyword,
    addSearchHistory,
    clearSearchHistory,
    setPriceRange,
    toggleStarLevel,
    toggleQuickTag,
  } = useSearchStore()

  const [showCalendar, setShowCalendar] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [recentCities, setRecentCities] = useState<string[]>([])
  const [currentLocation, setCurrentLocation] = useState<string>('')

  useEffect(() => {
    // 加载最近访问的城市
    const recent = getRecentCities()
    setRecentCities(recent)
  }, [])

  useLoad(() => {
    // 获取定位
    getLocation()
  })

  const getLocation = () => {
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        // 这里应该调用逆地理编码API获取城市名
        console.log('Location:', res)
        setCurrentLocation('当前位置')
      },
      fail: () => {
        Taro.showToast({ title: '定位失败', icon: 'none' })
      }
    })
  }

  const handleSearch = () => {
    if (keyword) {
      addSearchHistory(keyword)
    }
    
    // 构建查询参数
    const params = new URLSearchParams()
    if (city) params.append('city', city)
    if (keyword) params.append('keyword', keyword)
    if (checkIn) params.append('checkIn', checkIn)
    if (checkOut) params.append('checkOut', checkOut)
    if (priceRange[1] < 1000) {
      params.append('minPrice', priceRange[0].toString())
      params.append('maxPrice', priceRange[1].toString())
    }
    if (starLevel.length > 0) {
      params.append('starLevel', starLevel.join(','))
    }
    if (quickTags.length > 0) {
      params.append('tags', quickTags.join(','))
    }
    
    Taro.navigateTo({
      url: `/pages/list/index?${params.toString()}`
    })
  }

  const handleDateChange = (type: 'checkIn' | 'checkOut', date: string) => {
    if (type === 'checkIn') {
      const newCheckOut = addDays(date, nights)
      setDates(date, newCheckOut)
    } else {
      const newNights = Math.ceil((new Date(date).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      if (newNights > 7) {
        Taro.showToast({ title: '先睡七天吧～', icon: 'none' })
        return
      }
      setDates(checkIn, date)
    }
  }

  const handleNightsChange = (delta: number) => {
    const newNights = nights + delta
    if (newNights < 1) return
    if (newNights > 7) {
      Taro.showToast({ title: '先睡七天吧～', icon: 'none' })
      return
    }
    setNights(newNights)
  }

  const handleBannerClick = (hotelId: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${hotelId}`
    })
  }

  // 选择城市
  const handleCitySelect = (cityName: string) => {
    setCity(cityName)
    saveRecentCity(cityName)
    setRecentCities(prev => [cityName, ...prev.filter(c => c !== cityName)].slice(0, 10))
    setShowCityPicker(false)
    setSearchKeyword('')
  }

  // 搜索结果
  const searchResults = useMemo(() => {
    return searchCities(searchKeyword)
  }, [searchKeyword])

  // 滚动到指定字母
  const scrollToLetter = (letter: string) => {
    Taro.createSelectorQuery()
      .select(`#letter-${letter}`)
      .boundingClientRect()
      .selectViewport()
      .scrollOffset()
      .exec((res) => {
        if (res[0] && res[1]) {
          Taro.pageScrollTo({
            scrollTop: res[1].scrollTop + res[0].top - 100,
            duration: 300
          })
        }
      })
  }

  return (
    <View className='search-page'>
      {/* Banner 轮播 */}
      <View className='banner-container'>
        <ScrollView
          scrollX
          className='banner-scroll'
          scrollWithAnimation
          onScroll={(e) => {
            const scrollLeft = e.detail.scrollLeft
            const index = Math.round(scrollLeft / 750)
            setCurrentBanner(index)
          }}
        >
          {BANNERS.map((banner) => (
            <Image
              key={banner.id}
              className='banner-image'
              src={banner.image}
              mode='aspectFill'
              onClick={() => handleBannerClick(banner.hotelId)}
            />
          ))}
        </ScrollView>
        <View className='banner-dots'>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              className={`dot ${index === currentBanner ? 'active' : ''}`}
            />
          ))}
        </View>
      </View>

      {/* 搜索表单 */}
      <View className='search-form'>
        {/* 地点选择 */}
        <View className='form-item' onClick={() => setShowCityPicker(true)}>
          <AtIcon value='map-pin' size='20' color='#6190E8' />
          <Text className='label'>目的地</Text>
          <Text className='value'>{city || '选择城市'}</Text>
          <AtIcon value='chevron-right' size='16' color='#999' />
        </View>

        {/* 城市选择弹窗 */}
        {showCityPicker && (
          <View className='city-picker-modal'>
            <View className='city-picker-header'>
              <Text className='title'>选择城市</Text>
              <Text className='close' onClick={() => {
                setShowCityPicker(false)
                setSearchKeyword('')
              }}>✕</Text>
            </View>
            
            {/* 搜索框 */}
            <View className='city-search-box'>
              <AtIcon value='search' size='16' color='#999' />
              <Input
                className='city-search-input'
                placeholder='输入城市名或拼音'
                value={searchKeyword}
                onInput={(e) => setSearchKeyword(e.detail.value)}
              />
              {searchKeyword && (
                <Text className='clear-search' onClick={() => setSearchKeyword('')}>
                  ✕
                </Text>
              )}
            </View>

            {/* 搜索结果 */}
            {searchKeyword && (
              <View className='city-search-results'>
                {searchResults.length > 0 ? (
                  searchResults.map((cityItem) => (
                    <View
                      key={cityItem.code}
                      className='city-search-item'
                      onClick={() => handleCitySelect(cityItem.name)}
                    >
                      <Text className='city-name'>{cityItem.name}</Text>
                      <Text className='city-pinyin'>{cityItem.pinyin}</Text>
                    </View>
                  ))
                ) : (
                  <View className='no-results'>
                    <Text>未找到相关城市</Text>
                  </View>
                )}
              </View>
            )}

            {/* 城市列表内容 */}
            {!searchKeyword && (
              <>
                {/* 当前定位和最近访问 */}
                <View className='city-section'>
                  <Text className='section-title'>当前定位</Text>
                  <View className='city-tags'>
                    <View 
                      className={`city-tag ${currentLocation === '当前位置' ? 'active' : ''}`}
                      onClick={() => currentLocation && handleCitySelect(currentLocation)}
                    >
                      <AtIcon value='map-pin' size='14' color={city === currentLocation ? '#fff' : '#6190E8'} />
                      <Text>{currentLocation || '定位中...'}</Text>
                    </View>
                  </View>
                </View>

                {recentCities.length > 0 && (
                  <View className='city-section'>
                    <Text className='section-title'>最近访问</Text>
                    <View className='city-tags'>
                      {recentCities.map((cityName) => (
                        <View
                          key={cityName}
                          className={`city-tag ${city === cityName ? 'active' : ''}`}
                          onClick={() => handleCitySelect(cityName)}
                        >
                          {cityName}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* 热门城市 */}
                <View className='city-section'>
                  <Text className='section-title'>热门城市</Text>
                  <View className='city-tags'>
                    {hotCities.map((cityItem) => (
                      <View
                        key={cityItem.code}
                        className={`city-tag ${city === cityItem.name ? 'active' : ''}`}
                        onClick={() => handleCitySelect(cityItem.name)}
                      >
                        {cityItem.name}
                      </View>
                    ))}
                  </View>
                </View>

                {/* 字母索引列表 */}
                <View className='city-list-container'>
                  <ScrollView
                    scrollY
                    className='city-scroll-list'
                    scrollIntoView={`letter-${alphabetLetters[0]}`}
                  >
                    {alphabetLetters.map((letter) => (
                      <View key={letter} id={`letter-${letter}`}>
                        <View className='letter-header'>{letter}</View>
                        {groupedCities[letter]?.map((cityItem) => (
                          <View
                            key={cityItem.code}
                            className={`city-list-item ${city === cityItem.name ? 'active' : ''}`}
                            onClick={() => handleCitySelect(cityItem.name)}
                          >
                            <Text>{cityItem.name}</Text>
                            {city === cityItem.name && (
                              <AtIcon value='check' size='16' color='#6190E8' />
                            )}
                          </View>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                  
                  {/* 右侧字母索引 */}
                  <View className='letter-index'>
                    <View className='letter-index-item hot' onClick={() => scrollToLetter('热')}>
                      热
                    </View>
                    {alphabetLetters.map((letter) => (
                      <View
                        key={letter}
                        className='letter-index-item'
                        onClick={() => scrollToLetter(letter)}
                      >
                        {letter}
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
        )}

        {/* 关键字搜索 */}
        <View className='form-item'>
          <AtIcon value='search' size='20' color='#6190E8' />
          <Text className='label'>关键词</Text>
          <Input
            className='search-input'
            placeholder='搜索酒店名或地标'
            value={keyword}
            onInput={(e) => setKeyword(e.detail.value)}
          />
        </View>

        {/* 日期选择 */}
        <View className='form-item date-picker'>
          <View className='date-section'>
            <Text className='date-label'>入住</Text>
            <Text className='date-value'>{checkIn.slice(5)}</Text>
          </View>
          <View className='nights-section'>
            <View className='nights-control'>
              <Text
                className='nights-btn'
                onClick={() => handleNightsChange(-1)}
              >
                -
              </Text>
              <Text className='nights-text'>{nights}晚</Text>
              <Text
                className='nights-btn'
                onClick={() => handleNightsChange(1)}
              >
                +
              </Text>
            </View>
          </View>
          <View className='date-section'>
            <Text className='date-label'>离店</Text>
            <Text className='date-value'>{checkOut.slice(5)}</Text>
          </View>
        </View>

        {/* 价格滑动条 */}
        <View className='form-item price-slider'>
          <Text className='label'>价格区间</Text>
          <View className='slider-container'>
            <input
              type='range'
              min='0'
              max='1000'
              step='100'
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className='range-input'
            />
            <Text className='price-text'>
              ¥0 - ¥{priceRange[1]}{priceRange[1] === 1000 ? '+' : ''}
            </Text>
          </View>
        </View>

        {/* 星级筛选 */}
        <View className='form-item'>
          <Text className='label'>酒店星级</Text>
          <View className='star-options'>
            {STAR_OPTIONS.map((star) => (
              <AtTag
                key={star.value}
                name={star.value}
                active={starLevel.includes(star.value as any)}
                onClick={() => toggleStarLevel(star.value as any)}
                className='star-tag'
              >
                {star.label}
              </AtTag>
            ))}
          </View>
        </View>

        {/* 快捷标签 */}
        <View className='form-item'>
          <Text className='label'>特色标签</Text>
          <View className='quick-tags'>
            {QUICK_TAGS.map((tag) => (
              <AtTag
                key={tag.value}
                name={tag.value}
                active={quickTags.includes(tag.value as any)}
                onClick={() => toggleQuickTag(tag.value as any)}
                className='quick-tag'
              >
                <AtIcon value={tag.icon} size='12' />
                {tag.label}
              </AtTag>
            ))}
          </View>
        </View>
      </View>

      {/* 查询按钮 */}
      <View className='search-button-container'>
        <AtButton
          type='primary'
          size='normal'
          className='search-btn'
          onClick={handleSearch}
        >
          查询酒店
        </AtButton>
      </View>

      {/* 搜索历史 */}
      {searchHistory.length > 0 && (
        <View className='search-history'>
          <View className='history-header'>
            <Text className='title'>搜索历史</Text>
            <Text className='clear' onClick={clearSearchHistory}>
              清空
            </Text>
          </View>
          <View className='history-tags'>
            {searchHistory.map((item, index) => (
              <AtTag
                key={index}
                onClick={() => setKeyword(item)}
                className='history-tag'
              >
                {item}
              </AtTag>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}
