import React, { useState } from 'react'
import style from './biji.module.scss'
import { Input, Flex } from 'antd'
const { TextArea } = Input

export default function Biji() {
	const [value, setValue] = useState('')
	console.log(value)
	return (
		<>
			<div className={style.rootBox}>
				<div className={style.title}>
					<Input
						className={style.input}
						placeholder="请输入标题"
						variant="borderless"
					/>
				</div>

				<div className={style.contentBox}>
					<TextArea
						showCount
						maxLength={100}
						onChange={(e) => setValue(e.target.value)}
						placeholder="请输入笔记"
						style={{
							height: 600,
						}}
					/>
				</div>
			</div>
		</>
	)
}
