import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// 定义懒加载组件 先获取组件
const Layout = lazy(() => import('../views/Layout/Layout.jsx'))
const Login = lazy(() => import('../views/Login/Login.jsx'))
const Keshihua = lazy(() => import('../views/part1/keshihua.jsx'))
const Yuedulijie = lazy(() => import('../views/part2/yuedulijie.jsx'))
const Yuedufenye = lazy(() => import('../views/part2/yuedufenye.jsx'))
const Readrecord = lazy(() => import('../views/part4/readRecord'))
const Filespace = lazy(() => import('../views/part5/fileSpace'))
const Notfound = lazy(() => import('../views/404/notFound'))
const Fenjiyuedu = lazy(() => import('../views/part3/fenjiyuedu.jsx'))
const Txt = lazy(() => import('../views/part3/txt.jsx'))
const Wp = lazy(() => import('../views/part3/wp.jsx'))
const Pic = lazy(() => import('../views/part3/pic.jsx'))

export default [
	//嵌套路由 开始 -------
	{
		path: '/', //初始跳转到登录页面
		element: <Navigate to="/login" />,
	},
	{
		path: '/login',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Login />
			</Suspense>
		),
	},
	{
		path: '/layout/yuedulijie/yuedufenye',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Yuedufenye />
			</Suspense>
		),
	},
	{
		path: '/layout',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Layout />
			</Suspense>
		),
		children: [
			{
				path: 'keshihua',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Keshihua />
					</Suspense>
				),
			},
			{
				path: 'yuedulijie',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Yuedulijie />
					</Suspense>
				),
			},
			{
				path: 'fenjiyuedu',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Fenjiyuedu />
					</Suspense>
				),
				children: [
					{
						path: 'txt',
						element: (
							<Suspense fallback={<div>Loading...</div>}>
								<Txt />
							</Suspense>
						),
					},
					{
						path: 'wp',
						element: (
							<Suspense fallback={<div>Loading...</div>}>
								<Wp />
							</Suspense>
						),
					},
					{
						path: 'pic',
						element: (
							<Suspense fallback={<div>Loading...</div>}>
								<Pic />
							</Suspense>
						),
					},
				],
			},
			{
				path: 'readRecord',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Readrecord />
					</Suspense>
				),
				meta: [{ title: '主页' }, { title: '阅读记录' }],
			},
			{
				path: 'fileSpace',
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Filespace />
					</Suspense>
				),
				meta: [{ title: '主页' }, { title: '文档空间' }],
			},
			//嵌套路由 结束 -------
		],
	},
	{
		path: '/404',
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Notfound />
			</Suspense>
		),
	},
	{
		path: '/*', //路径不存在时跳转至//404
		element: <Navigate to="/404" />,
	},
]
