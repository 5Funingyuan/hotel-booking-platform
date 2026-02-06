# 运行与接口参考

## 端口说明

- 服务端：`http://localhost:3001`
- 商户端：`http://localhost:5173`
- 移动端 H5：默认 `http://localhost:10086`（若被占用会自动换端口）

## 移动端 API Host 配置

**H5 开发环境**默认使用当前访问的主机名作为 API Host。

如果你用手机/真机访问，建议显式指定 API Host：

```bash
TARO_APP_API_HOST=你的局域网IP pnpm --filter @hotel/user-mobile dev:h5
```

## 接口文档

**Base URL**
- `http://localhost:3001/api`

**鉴权**
- 需要登录的接口请在 Header 添加：
  - `Authorization: Bearer <token>`

**Auth**
- `POST /auth/register` 注册（`username`, `password`, `role`）
- `POST /auth/login` 登录（返回 `token`）

**Hotels**
- `GET /hotels` 酒店列表（公开/角色过滤）
  - 常用查询参数：
    - `page`, `limit`
    - `status`（管理员/商户）
    - `keyword`
    - `starLevel`（支持多选，逗号分隔）
    - `minPrice`, `maxPrice`
    - `tags`（逗号分隔）
    - `province`, `city`, `district`
- `GET /hotels/:id` 酒店详情（公开）
- `POST /hotels` 创建酒店（商户）
- `PUT /hotels/:id` 更新酒店（商户）
- `DELETE /hotels/:id` 删除酒店（商户）
- `POST /hotels/:id/submit` 提交审核（商户）
- `POST /hotels/:id/audit` 审核通过/拒绝（管理员）
- `POST /hotels/:id/offline` 下线（管理员）
- `POST /hotels/:id/restore` 恢复（管理员）

**Rooms**
- `GET /hotels/:hotelId/rooms` 获取房型（公开）
- `POST /hotels/:hotelId/rooms` 新增房型（商户）
- `PUT /hotels/:hotelId/rooms/:roomId` 更新房型（商户）
- `DELETE /hotels/:hotelId/rooms/:roomId` 删除房型（商户）


## 数据库表结构

- **users**：用户表（商户 / 管理员）
- **hotels**：酒店表
- **rooms**：房型表
- **audits**：审核记录表
