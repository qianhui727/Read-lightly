import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import pic from './pic.module.scss'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;



export default function wp() {

  // state 路由传参
  const { state } = useLocation()
  const [result, setResult] = useState([])
  const [data, setData] = useState([])

  console.log(state.level);
  const level = state.level;



  const props = {
    name: 'file',
    multiple: false,
    headers: {
      'X-Requested-With': null,
      // 'Content-Type': 'multipart/form-data'
    },
    action: `http://127.0.0.1:8070/image/?level=${level}`,
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
        const paragraphs = info.file.response.originalText.split('\n');
        setData(paragraphs)
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
        const response = await axios.get('http://localhost:8070/image/download/', { responseType: 'blob' });

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


  return <>
    < div className={pic.header} >
      <h1 className={pic.title}>图片阅读，降低英语学习门槛</h1>
      <h2 className={pic.jieshao}>上传你想要简译的图片，将根据您选择的难度为您简译!</h2>
      <h3 className={pic.zhidao}>请将要简译的图片上传</h3>
    </div >
    <Dragger className={pic.upload} {...props} level={level}>
      <div className="ant-upload-drag-icon">
        <InboxOutlined />
      </div>
      <div>将文件拖到此处，或<div style={{ color: 'rgb(22,119,255)' }}>点击上传</div></div>
    </Dragger>


    <div className={pic.gongneng}>
      <button className={pic.button1}>文档简译</button>
      <button className={pic.button2} onClick={() => onSave()}>保存结果</button>
    </div>
    <div className={pic.result}>
      <div className='title' style={{ 'height': '40px' }}>
        <h3 className={pic.jiexi}>图片原文解析：</h3 >
        <h3 className={pic.jieguo}>：解析结果</h3>
      </div>
      <div className={pic.jianyi}>
        <div className={pic.yuanwen}>
          {data.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

        </div>
        <div className={pic.jianyihou}>{result}</div>
      </div>
    </div>
  </>
}
