import './Layout.scss'
import Zhuye from '../Zhuye/zhuye'
import React, { useState } from 'react'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	FolderOutlined,
	EyeOutlined,
	ClockCircleOutlined,
	OrderedListOutlined,
	ProfileOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const { Header, Content, Sider } = Layout

function getItem(label, key, icon, children) {
	return { key, icon, children, label }
}

function App() {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const navigateTo = useNavigate()

	const items = [
		getItem('文本可视化', '/layout/keshihua', <EyeOutlined />),
		getItem('阅读理解', '/layout/yuedulijie', <ProfileOutlined />),
		getItem('分级阅读', '/layout/fenjiyuedu', <OrderedListOutlined />),
		getItem('阅读记录', '/layout/readRecord', <ClockCircleOutlined />),
		getItem('文档空间', '/layout/fileSpace', <FolderOutlined />),
	]

	// 面包屑
	const location = useLocation()
	// const meta = location.state ? location.state.meta : null //获取自定义值
	const pathSnippets = location.pathname.split('/').filter((i) => i) //当前路径对应字符串数组
	const breadcrumbItems = pathSnippets.map((item, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
		switch (item) {
			case 'layout':
				item = `${collapsed ? '轻阅' : '轻阅AI'}`
				break
			case 'keshihua':
				item = '文本可视化'
				break
			case 'yuedulijie':
				item = '阅读理解'
				break
			case 'fenjiyuedu':
				item = '分级阅读'
				break
			case 'txt':
				item = '段落阅读'
				break
			case 'wp':
				item = '文档阅读'
				break
			case 'pic':
				item = '图片阅读'
				break
			case 'readRecord':
				item = '阅读记录'
				break
			case 'fileSpace':
				item = '文档空间'
				break
		}
		// 新版本用
		return { title: item, href: url }
		// 老版本用
		// return { title: item, link: url }
	})

	// 定义menu Click事件
	const menuClick = (e) => {
		// 点击跳转到对应的路由，编程时导航跳转，使用一个ahook
		navigateTo(e.key, {
			replace: true,
		})
	}

	return (
		<Layout className="layout" style={{ minHeight: '100vh' }}>
			<Sider
				className="sider"
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="logo">{collapsed ? '轻阅' : '轻阅AI'}</div>

				<Menu
					theme="dark"
					defaultSelectedKeys={['1']}
					mode="inline"
					items={items}
					onClick={menuClick}
				/>
			</Sider>
			<Layout style={{ background: 'rgb(238,243,255)' }}>
				<Header className="header">
					<Button
						className="text"
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
					/>
					{/* 新版本 有延迟 */}
					{breadcrumbItems.length > 0 && (
						<Breadcrumb
							className="bread"
							separator=">"
							items={breadcrumbItems}
						></Breadcrumb>
					)}
					{/* 老版本 没有延迟 */}
					{/* {breadcrumbItems.length > 0 && (
						<Breadcrumb className="bread">
							<>
								{breadcrumbItems.map((item) => (
									<Breadcrumb.Item key={item.link}>
										<Link to={item.link}>{item.title}</Link>
									</Breadcrumb.Item>
								))}
							</>
						</Breadcrumb>
					)} */}
				</Header>
				<Content className="content">
					{location.pathname === '/layout' ? (
						<Zhuye></Zhuye>
					) : (
						<Outlet></Outlet>
					)}
				</Content>
			</Layout>
		</Layout>
	)
}
export default App
