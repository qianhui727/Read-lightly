import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import styles from './txt.module.scss'
import { Input, Button } from 'antd'

const { TextArea } = Input

export default function txt() {
	// 输入内容
	const [text, setText] = useState('')
	// 简译结果
	const [result, setResult] = useState('')

	// state 路由传参
	const { state } = useLocation()
	const level = state.level

	const onChange = (e) => {
		setText(e.target.value)
	}

	const submit = () => {
		// console.log(level)
		// console.log(text);

		axios
			.post(
				'http://127.0.0.1:8070/paragraph/?level=' + level,
				{
					'text': text,
				},
				{
					headers:
					{
						'Content-Type': 'application/json',
					}
				}
			)
			.then(function (response) {
				// console.log(JSON.stringify(response.data))
				console.log(response);
				console.log(response.data.text);
				setResult(response.data.text)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
	const tryClick1 = () => {
		setText(
			'lt is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.'
		)
		switch (level) {
			case 0: {
				setResult('A man with lots of money needs a wife.')
				return
			}

			case 1: {
				setResult('A wealthy single man is likely seeking a partner.')
				return
			}

			case 2: {
				setResult(
					'It is universally accepted that a man with agood fortune is in need of a wife.'
				)
				return
			}
		}
	}
	const tryClick2 = () => {
		setText(
			'In the middle of the journey of our life, I found myself in a dark wood, for the straight way was lost.'
		)
		switch (level) {
			case 0: {
				setResult(
					'In the middle of our life,I found myself in a dark wood because I lost thestraight way.'
				)
				return
			}

			case 1: {
				setResult(
					'During the journey of life. I found myself in a dark wood, as I had lost the straight path.'
				)
				return
			}

			case 2: {
				setResult(
					"In the midst of our life's journey, I found myself in a dark wood due to the loss of the straight way."
				)
				return
			}
		}
	}

	return (
		<>
			<div className={styles.tou}>
				<h1 className={styles.title}>段落阅读，AI帮你降低阅读门槛</h1>
				<p className={styles.text}>
					输入你想要简译的段落，将根据您选择的难度为您简译
				</p>
			</div>
			<div className={styles.shen}>
				<TextArea
					className={styles.input}
					id="myTextarea"
					showCount
					value={text}
					onChange={onChange}
					placeholder="输入文本。。。"
				/>
				<Button className={styles.button} onClick={() => submit(level)}>
					确认提交
				</Button>
			</div>
			<div className={styles.exam}>
				<div className={styles.exam1}>
					<h1>原始段落：</h1>
					<p>
						lt is a truth universally acknowledged, thata single man in
						possession of a goodfortune, must be in want of a wife.
					</p>
					<h1>初级难度：</h1>
					<p>A man with lots of money needs a wife.</p>
					<h1>中级难度：</h1>
					<p>A wealthy single man is likely seeking apartner.</p>
					<h1>高级难度：</h1>
					<p>
						It is universally accepted that a man with a good fortune is in need
						of a wife.
					</p>
					<button onClick={() => tryClick1()} className={styles.btn1}>去试试</button>
				</div>
				<div className={styles.exam2}>
					<h1>原始段落：</h1>
					<p>
						In the middle of the journey of our life, I found myself in a dark
						wood, for the straight way waslost.
					</p>
					<h1>初级难度：</h1>
					<p>
						In the middle of our life,I found myself in a darkwood because I
						lost thestraight way."
					</p>
					<h1>中级难度：</h1>
					<p>
						During the journey of life. I found myself in a dark wood, as I had
						lost thestraight path.
					</p>
					<h1>高级难度：</h1>
					<p>
						In the midst of our life's journey, I found myself in a dark wood
						due to the loss of the straight way.
					</p>
					<button onClick={() => tryClick2()} className={styles.btn2}>去试试</button>
				</div>
			</div>
			<div className={styles.jiao}>将根据您选择的难度，进行简译</div>
			<div className={styles.result}>{result}</div>
		</>
	)
}
