import React, { useState, useEffect, useRef, Fragment } from 'react'
import style from './duihua.module.scss'
import { Input } from 'antd'
import { AliwangwangOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { Navigate } from 'react-router-dom'
// function AiCard({ AiContent }) {
// 	// console.log(AiContent);

// 	return (
// 		<>
// 			<div className={style.aiCard}>
// 				<p className={style.title}>
// 					<AliwangwangOutlined style={{ fontSize: '45px' }} />
// 					<span className={style.aiName}>轻阅AI</span>
// 				</p>
// 				<p className={style.aiContent}>{AiContent}</p>
// 			</div>
// 		</>
// 	)
// }
// function UserCard({ userContent }) {
// 	return (
// 		<>
// 			<div className={style.userCard}>
// 				<p className={style.userHeadPhoto}>提问：</p>
// 				<p className={style.userContent}>{userContent}</p>
// 			</div>
// 		</>
// 	)
// }

// function UserInput({ items, AiReturn, setItems, setAiReturn }) {
// 	const [content, setContent] = useState('123')

// 	// 输入框
// 	const { Search } = Input
// 	const handleChange = (e) => {
// 		setContent(e.target.value)
// 	}
// 	//数据处理
// 	const onSearch = (value) => {
// 		const lastItem = items.slice(-1)[0]
// 		if (value.trim() !== '' && value !== lastItem) {
// 			setItems([...items, value]) // 将输入值添加到数组中
// 			setAiReturn([...AiReturn, value]) // 将AI返回值添加到数组中
// 		}
// 		setContent('')
// 	}

// 	return (
// 		<>
// 			<div className={style.inputCard}>
// 				<Search
// 					placeholder="请输入您的问题"
// 					enterButton="搜索"
// 					size="large"
// 					value={content}
// 					onSearch={onSearch}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 		</>
// 	)
// }

export default function Duihua({ AiContent }) {
	// // 用户输入内容数组
	// const [items, setItems] = useState([])

	// // AI返回内容数组
	// const [AiReturn, setAiReturn] = useState([])

	// const messagesEndRef = useRef(null)
	// useEffect(() => {
	// 	// 滚动到底部
	// 	messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
	// }, [items])

	// // console.log(AiContent);

	return (
		<>
			{/* <div className={style.total}>
				<AiCard AiContent={'欢迎'}></AiCard>
				<ul>
					{items.map((item, index) => (
						<Fragment key={index}>
							<li>
								<UserCard userContent={item} />
							</li>
							{index < AiReturn.length && (
								<li>
									<AiCard AiContent={AiContent} />
								</li>
							)}
						</Fragment>
					))}
				</ul>
				<div className={style.box} ref={messagesEndRef}></div>
				<div className={style.foot}>
					<UserInput
						items={items}
						AiReturn={AiReturn}
						setItems={setItems} //设置输入内容数组
						setAiReturn={setAiReturn} //设置AI返回内容数组
					></UserInput>
				</div>
			</div> */}

			{/* <a href="http://127.0.0.1:8501">chat-gpt</a> */}

			<div className={style.total}>
				<a href="http://127.0.0.1:8501">
					<Button type="primary" className={style.button}>
						请点击尝试chatGPT对话
					</Button>
				</a>
				<div className={style.bgc}></div>
			</div>
		</>
	)
}
