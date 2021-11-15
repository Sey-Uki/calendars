import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Calendar } from 'antd';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function App() {
  return (
    <div className="App">
      <div className="site-calendar-demo-card">
        <Calendar fullscreen={false} />
      </div>

      <Space direction="vertical" size={12}>
        <RangePicker />
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="year" />
      </Space>
    </div>
  );
}

export default App;
