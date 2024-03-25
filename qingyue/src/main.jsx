import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// 初始化样式
import 'reset-css'
// import 'antd/dist/reset.css'
// UI框架样式
// 全局样式
import './assets/global.scss'
// 组件样式
// import App from './App'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
