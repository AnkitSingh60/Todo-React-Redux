import React, { useEffect, useState } from 'react';
import { Button,Input, Space, Table } from 'antd';
import "./Todo.css"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoData, getTodosData } from '../../Redux/Todo/action';
import { DeleteOutlined , EditOutlined } from '@ant-design/icons'
import { EditTodo } from '../EditTodo/EditTodo';


export const Todo = () => {


  // -------------------------------- redux ------------------------------------------------>


  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getTodosData())},[])

  const todoData = useSelector((store)=> store.todoReducer.todos)
  //console.log(todoData)

  

  // ------------------------------ Input Box ---------------------------------------------->


  const { Search } = Input;

  const AddTodoTask = (value) => {

    let paramsObj = {
      todo : value ,
      status : false
    }

    axios.post("http://localhost:8080/todos",paramsObj).then(()=> dispatch(getTodosData()))
  
  }


  
  //---------------------------------------- Edit Modal -------------------------------------------->


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const showModal = (record) => {
    setEditTodo(record)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  
  // ----------------------------------------- Filter ------------------------------------------------>


  const [filterData , setFilterData] = useState([])

  const getActiveTodos = () => {
    let activeTodos = todoData.filter((el) => el.status == false)
    setFilterData(activeTodos)
  }
  
  const getCompletedTodos = () => {
    let completedTodos = todoData.filter((el) => el.status == true)
    setFilterData(completedTodos)
  }

  const getAllTodos = () => {
    setFilterData(todoData)
  }


  //--------------------------------------- Table Columns ------------------------------------------->

  
  const columns = [

    {
      title: 'S. NO.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TODO',
      dataIndex: 'todo',
      key: 'todo',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        return record ? "Completed" : "Active"
      },
  
    },
    {
      title: 'EDIT',
      dataIndex: '',
      key: '',
      render : (record) => {
        return <EditOutlined onClick={() => showModal(record)}/>
      }
    },
    {
      title: 'DELETE',
      dataIndex: '',
      key: '',
      render : (record) => {
        return <DeleteOutlined onClick={() => dispatch(deleteTodoData(record?.id))} />
      }
    },
  ];
  

  return(

    <>
        <h1>TODO TABLE</h1>

        <div className="searchDiv">
          <Search
          placeholder="enter your todo here"
          enterButton="ADD"
          size="large"
          onSearch={AddTodoTask}
          />
        </div>

        <div className="filterDiv">
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={getActiveTodos}>Active</Button>
            <Button onClick={getCompletedTodos}>Completed</Button>
            <Button onClick={getAllTodos}>Both Active And Completed</Button>
          </Space>
        </div>

        <div className="tableDiv">
          <Table columns={columns} dataSource={filterData.length ? filterData : todoData} />
        </div>

        <EditTodo isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} editTodo={editTodo} setEditTodo={setEditTodo} />

    </>
  )
}



