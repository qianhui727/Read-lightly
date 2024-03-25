import React, { useState } from 'react'
import { Layout, Dropdown, Space } from 'antd'
import {
	DownOutlined,
	FileTextOutlined,
	FileAddOutlined,
	FileImageOutlined,
} from '@ant-design/icons'
import './fenjiyuedu.scss'
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom'

const { Content } = Layout

export default function fenjiyuedu() {
	const location = useLocation()
	const [level, setLevel] = useState(0)

	const items = [
		{
			label: (
				<div data-key="0" onClick={() => setLevel(0)}>
					初级难度：适合小学和初一年龄段
				</div>
			),
			key: '0',
		},
		{
			label: (
				<div data-key="1" onClick={() => setLevel(1)}>
					中极难度：适合小学和高一年龄段
				</div>
			),
			key: '1',
		},
		{
			label: (
				<div data-key="2" onClick={() => setLevel(2)}>
					高极难度：适合高中和大一年龄段
				</div>
			),
			key: '2',
		},
	]

	return (
		<>
			{location.pathname === '/layout/fenjiyuedu' ? (
				<Layout className="layout-in">
					<Content className="content-in">
						<div className="modern1">
							<div className="selection">
								<div className="text">请选择您的阅读分段</div>
								<button className="menu">
									<Dropdown
										menu={{
											items,
										}}
										trigger={['click']}
									>
										<a onClick={(e) => e.preventDefault()}>
											<Space style={{ color: '#fff' }}>
												分级类别
												<DownOutlined />
											</Space>
										</a>
									</Dropdown>
								</button>
							</div>
							<div className="jieshao">
								<h1 className="title">分级阅读</h1>
								<h2 className="text">更懂你的AI阅读助手</h2>
								<p className="p1">段落/文档/图片</p>
								<p className="p2">AI帮你降低英文阅读门槛，高级实现分级阅读</p>
							</div>
						</div>
						<div className="modern2">
							<Link
								className="txt"
								to="/layout/fenjiyuedu/txt"
								state={{ level: level }}
							>
								<div className="word">
									<h3>段落阅读</h3>
									<p>上传英文段落，</p>
									<p>实现分级化阅读</p>
								</div>
								<div className="icon">
									<FileTextOutlined style={{ fontSize: '30px' }} />
								</div>
							</Link>

							<Link
								className="wp"
								to="/layout/fenjiyuedu/wp"
								state={{ level: level }}
							>
								<div className="word">
									<h3>文档阅读</h3>
									<p>上传英文文档，</p>
									<p>自动解析便于阅读</p>
								</div>
								<div className="icon">
									<FileAddOutlined style={{ fontSize: '30px' }} />
								</div>
							</Link>

							<Link
								className="pic"
								to="/layout/fenjiyuedu/pic"
								state={{ level: level }}
							>
								<div className="word">
									<h3>图片阅读</h3>
									<p>上传文字图片，</p>
									<p>解析并阅读轻便化</p>
								</div>
								<div className="icon">
									<FileImageOutlined style={{ fontSize: '30px' }} />
								</div>
							</Link>
						</div>
					</Content>
				</Layout>
			) : (
				<Outlet />
			)}
		</>
	)
}
