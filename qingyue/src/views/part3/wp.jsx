import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './wp.module.scss'
import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { baseURL } from '../../configs'
const { Dragger } = Upload


export default function wp() {

	// state 路由传参
	const { state } = useLocation()
	const [result, setResult] = useState('')
	const [data, setData] = useState('')

	console.log(state.level);
	const level = state.level;



	const props = {
		name: 'file',
		multiple: false,
		headers: {
			'X-Requested-With': null,
			// 'Content-Type': 'multipart/form-data'
		},

		action: 'http://127.0.0.1:8070/document/?level=' + level,
		onChange(info) {
			const { status } = info.file;
			const fileList = info.fileList;

			let formData = new FormData();

			formData.append('file', fileList[0].originFileObj);


			if (status !== 'uploading') {
				console.log(fileList); // 可以保留或删除此行，根据您的调试需求
				console.log(level);
			}

			if (status === 'done') {
				message.success(`${fileList[0].name} file uploaded successfully.`);
				console.log(info.file.response);
				setData(info.file.response.originalText)
				setResult(info.file.response.text)
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};


	let onSave = () => {
		var fetchData = async () => {
			try {
				// 发送 GET 请求获取后端数据
				const response = await axios.get('http://localhost:8070/document/download/', { responseType: 'blob' });

				// 创建一个 Blob 对象
				const blob = new Blob([response.data], { type: 'application/txt' });

				// 创建一个临时的 URL
				const url = window.URL.createObjectURL(blob);

				// 创建一个 a 标签
				const a = document.createElement('a');
				a.href = url;
				a.download = 'change.txt'; // 设置要下载的文件名
				document.body.appendChild(a);
				a.click();

				// 释放 URL 对象
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error('获取数据时出错:', error);
			}
		};

		fetchData();
	};


	return (
		<>
			<div className={styles.header}>
				<h1 className={styles.title}>文档阅读，让AI赋能高效阅读</h1>
				<h2 className={styles.jieshao}>
					上传你想要简译的文档，将根据您选择的难度为您简译!
				</h2>
				<h3 className={styles.zhidao}>请将要简译的文档上传</h3>
			</div>
			<Dragger className={styles.upload} {...props} level={state.level}>
				<div className="ant-upload-drag-icon">
					<InboxOutlined />
				</div>
				<div>
					将文件拖到此处，或
					<div style={{ color: 'rgb(22,119,255)' }}>点击上传</div>
				</div>
			</Dragger>
			<div className={styles.gongneng}>
				<button className={styles.button1}>文档简译</button>
				<button className={styles.button2} onClick={() => onSave()}>保存结果</button>
			</div>
			<div className={styles.result}>
				<h3>文档简译结果：</h3>
				<div className={styles.jianyi}>{result}</div>
			</div>
		</>
	)
}
