import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import { $login } from '../../api/adminApi'
import { Button, Form, Input } from 'antd'
import MyNotification from '../../components/MyNotification/MyNotification'

export default function Login() {
	// 记录一组账号密码
	localStorage.setItem('1111111', '123456789')
	let user = ''
	let password = ''
	const userChange = (e) => {
		user = e.target.value
	}
	const passwordChange = (e) => {
		password = e.target.value
	}
	const handleClick = () => {
		console.log(user)
		console.log(password)
		//判断用户名是否已经注册
		if (user in localStorage) {
			//如果已经注册，获取用户密码
			let pass = localStorage[user]
			//判断用户输入的密码和 注册的密码是否一致
			if (password === pass) {
				user = ''
				password = ''
				navigate('/layout')
			} else {
				alert('密码错误')
			}
		} else {
			alert('用户名或密码错误')
		}
	}
	// 导航
	let navigate = useNavigate()
	// 通知框状态
	let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })

	// 表单
	let [form] = Form.useForm()
	const onFinish = async (values) => {
		// console.log(values);
		let { message, success } = await $login(values) // 接口
		if (success) {
			setNotiMsg({ type: 'success', description: message })
			// 登录成功后，跳转到首页
			// navigate('/layout')
		} else {
			setNotiMsg({ type: 'error', description: message })
		}
	}

	return (
		<div className="login">
			<div className="content">
				<h1 style={{ margin: '12px' }}>欢迎来到，轻阅AI！</h1>
				<Form
					name="basic"
					form={form}
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 15,
					}}
					initialValues={{
						username: '',
						password: '',
					}}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{
								required: true,
								message: '请输入用户名!',
							},
						]}
					>
						<Input onChange={userChange} />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[
							{
								required: true,
								message: '请输入密码!',
							},
						]}
					>
						<Input.Password onChange={passwordChange} />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 9,
							span: 16,
						}}
					>
						<Button
							type="primary"
							htmlType="submit"
							// onClick={() => navigate('/layout')}
							onClick={() => handleClick()}
						>
							登录
						</Button>
						<Button
							onClick={() => {
								form.resetFields() // 重置表单
							}}
							style={{ marginLeft: '10px' }}
						>
							取消
						</Button>
					</Form.Item>
				</Form>
			</div>

			<MyNotification notiMsg={notiMsg}></MyNotification>
		</div>
	)
}
