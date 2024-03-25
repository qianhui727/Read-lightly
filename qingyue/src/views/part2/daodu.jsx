import React, { useState } from 'react'
import style from './daodu.module.scss'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

export default function Daodu({ summary, res }) {
	const [expandedItems, setExpandedItems] = useState({});

	const handleToggle = (index) => {
		setExpandedItems({
			...expandedItems,
			[index]: !expandedItems[index]
		});
	};


	return (
		<div className={style.daoDu}>
			<h1 className={style.title}>图书概述:</h1>
			<p className={style.summaryContent}>
				{summary}
			</p>


			<h1 className={style.title}>文档问题：</h1>
			<div className={style.questionContent}>
				{res.map((item, index) => (
					<ul className={style.ull} key={index} >
						<li className={style.que} >{item.question}</li>
						<li style={{ overflow: 'hidden', backgroundColor: 'white', marginTop: '10px' }} onClick={() => handleToggle(index)}>
							<div className={style.zhankai}>{expandedItems[index] ? '收起答案' : '展开答案'}</div>
							<div className={style.icon}>
								{expandedItems[index] ? <UpOutlined /> : <DownOutlined />}
							</div>
						</li>
						{expandedItems[index] && <li className={style.ans} key={`answer-${index}`}>{item.answer}</li>}
					</ul>
				))}
			</div>
		</div >
	)
}
