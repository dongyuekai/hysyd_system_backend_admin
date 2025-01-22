import React from 'react';
import { Outlet } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './menu.css';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: "信息修改"
  },
  {
    key: '2',
    label: "密码修改"
  }
];

export function ModifyMenu() {
  return <div id="menu-container">
    <div className="menu-area">
      <AntdMenu
        defaultSelectedKeys={['1']}
        items={items}
      />
    </div>
    <div className="content-area">
      <Outlet></Outlet>
    </div>
  </div>
}
