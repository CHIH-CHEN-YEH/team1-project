import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import productRouter from './routes/products.js'
import rentsRouter from './routes/rents.js'
import authRouter from './routes/auth.js'
import couponRouter from './routes/coupons.js'
import productImagesRouter from './routes/productImages.js'
import cartRoutes from './routes/cart.js'
import favoritesRouter from './routes/favorites.js'
import newsletterRouter from './routes/newsletter.js'
import commentRouter from './routes/comment.js'
import orderRouter from './routes/orders.js'
import forumRouter from './routes/forum.js'
import uploadRouter from './routes/upload.js'
import recommendationsRouter from './routes/recommendations.js'
import googleAuthRouter from './routes/googleAuth.js'
import ecpayRouter from './routes/ecpay.js'
import shipmentRouter from './routes/shipment.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// CORS 設定
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 設定靜態檔案目錄
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

// API 路由
app.use('/api/products', productRouter)
app.use('/api/rents', rentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/coupons', couponRouter)
app.use('/api/product-images', productImagesRouter)
app.use('/api/cart', cartRoutes)
app.use('/api/favorites', favoritesRouter)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/comments', commentRouter)
app.use('/api/recommendations', recommendationsRouter)
app.use('/api/orders', orderRouter)
app.use('/api/google', googleAuthRouter)
app.use('/api/forum', forumRouter)
app.use('/api/upload', uploadRouter)  // 添加上傳路由
app.use('/api/ecpay', ecpayRouter)  // 添加綠界路由
app.use('/api/shipment', shipmentRouter)  // 添加7-11物流路由


// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    status: 'error',
    message: '伺服器錯誤',
  })
})

export default app