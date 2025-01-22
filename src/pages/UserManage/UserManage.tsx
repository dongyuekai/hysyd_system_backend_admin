import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { Button, Form, Input, message, Table, Image, Badge } from "antd";
import './UserManage.css';
import { ColumnsType } from 'antd/es/table';
import { freeze, userSearch } from '../../interfaces/interfaces.ts';
import { useForm } from 'antd/es/form/Form';

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

interface UserSearchResult {
  id: number,
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  createTime: Date;
  isFrozen: boolean;

}

export function UserManage() {

  const [pageNo, setPageNo] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [userResult, setUserResult] = useState<UserSearchResult[]>()
  const [num, setNum] = useState(0)
  const [form] = useForm()

  const columns: ColumnsType<UserSearchResult> = useMemo(() => [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '头像',
    dataIndex: 'headPic',
    render: value => {
      console.log('dyk--value---', value)
      return value ? <Image
        width={50}
        alt=''
        src={`http://localhost:3005/${value}`}
      /> : '';
    }
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    },
  {
    title: '状态',
    dataIndex: 'isFrozen',
    render: (_, record) => {
      return record.isFrozen ? <Badge status='success'>已冻结</Badge> : ''
    }
  },
  {
    title: '操作',
    render: (_, record) => {
      return <a href='#' onClick={() => { freezeUser(record.id) }}>冻结</a>
    }
    }
  ], [])

  const freezeUser = useCallback(async (id: number) => {
    const res = await freeze(id)
    const { data } = res.data
    if (res.status === 201 || res.status === 200) {
      message.success('冻结成功')
      setNum(Math.random())
    } else {
      message.error(data || '系统繁忙，请稍后再试')
    }
  }, [])

  const searchUser = useCallback(async (values: SearchUser) => {
    const res = await userSearch(values.username, values.nickName, values.email, pageNo, pageSize)
    console.log('res---', res)
    const { data } = res.data
    if (res.status === 201 || res.status === 200) {
      setUserResult(data.users.map(item => {
        return {
          key: item.username,
          ...item
        }
      }))
    } else {
      message.error(data || '系统繁忙，请稍后再试')
    }
  }, [])

  useEffect(() => {
    searchUser({
      username: form.getFieldValue('username'),
      nickName: form.getFieldValue('email'),
      email: form.getFieldValue('nickName')
    })
  }, [pageNo, pageSize, num, searchUser, form])

  const changePage = useCallback((pageNo, pageSize) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }, [])

  return (
    <div id='userManage-container'>
      <div className='userManage-form'>
        <Form
          name="search"
          layout='inline'
          onFinish={searchUser}
          colon={false}
          form={form}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email" rules={[
            { type: "email", message: '请输入合法邮箱地址!' }
          ]}>
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="userManage-table">
        <Table columns={columns} dataSource={userResult} pagination={{
          current: pageNo,
          pageSize: pageSize,
          onChange: changePage
        }} />
      </div>
    </div>
  )
}