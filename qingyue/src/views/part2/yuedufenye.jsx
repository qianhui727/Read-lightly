import React, { useState } from 'react'
import page from './yuedufenye.module.scss'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { Tabs, Button, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'
// import Biji from './biji'
import Daodu from './daodu'
import Duihua from './duihua'
// import Fanyi from './fanyi'

export default function Yuedufenye() {
	const navigateTo = useNavigate()
	const handleClick = () => {
		navigateTo('/layout/yuedulijie')
	}

	// 拿到上传的文件
	const [fileList, setFileList] = useState([])
	const [summary, setSummary] = useState('')
	const [res, setRes] = useState([])
	const [writing, setWriting] = useState([])
	const [filename, setFilename] = useState('')

	const handleChange = (info) => {
		let newFileList = [...info.fileList]
		newFileList = newFileList.slice(-1)
		if (info.file.status === 'done') {
			const formData = new FormData()
			formData.append('file', info.file.originFileObj)
			console.log(info.file.response)
			const paragraphs = info.file.response.text.split('\n')
			// 删除空格符但保留换行符
			// const processedResponse = info.file.response.text.replace(/ /g, ''); // 删除空格符
			// const paragraphs = processedResponse.split('\n');
			// const processedResponse = paragraphs.replace(/ /g, ''); // 删除空格符

			setSummary(info.file.response.summary)
			setRes(info.file.response.fq)
			setWriting(paragraphs)
			setFilename(info.file.response.filename)
		}
		setFileList(newFileList)
	}

	const props = {
		name: 'file',
		action: 'http://127.0.0.1:8070/reaDocument',
		onChange: handleChange,
		multiple: false,
		headers: {
			'X-Requested-With': null,
		},
	}

	const items = [
		{
			key: '1',
			label: '导读',
			children: <Daodu summary={summary} res={res}></Daodu>,
		},
		{
			key: '2',
			label: '对话',
			// children: <a href="http://127.0.0.1:8501">对话</a>,
			children: <Duihua>对话</Duihua>,
		},
		// {
		// 	key: '3',
		// 	label: '笔记',
		// 	children: <Biji></Biji>,
		// },
		// {
		// 	key: '3',
		// 	label: '翻译',
		// 	children: <Fanyi></Fanyi>,
		// },
	]

	return (
		<>
			<div className={page.header}>
				<div className={page.back} onClick={() => handleClick()}>
					<ArrowLeftOutlined />
				</div>
				<div className={page.title}>请上传阅读文件(只支持pdf、docx格式)</div>
				<Upload className={page.upload} {...props} fileList={fileList}>
					<Button icon={<UploadOutlined />}>Upload</Button>
				</Upload>
			</div>
			<div className={page.show}>
				<div className={page.container1}>
					<div className={page.nav1}>【示例】{filename}</div>
					<div className={page.wenzhang}>
						{writing.map((paragraph, index) => (
							<p key={index} style={{ margin: '20px' }}>
								{paragraph}
							</p>
						))}
					</div>
				</div>
				<div className={page.container2}>
					<Tabs className={page.nav2} defaultActiveKey="1" items={items} />
				</div>
			</div>
		</>
	)
}
