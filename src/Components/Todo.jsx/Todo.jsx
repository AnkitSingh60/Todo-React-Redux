import React, { useEffect, useState } from 'react';
import { Button,Input, Space, Table } from 'antd';
import "./Todo.css"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosData } from '../../Redux/Todo/action';


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

    axios.post("http://localhost:8080/todos",paramsObj)
  
  }

  

  

    
    

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

   
    

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

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
        return record.status ? "Completed" : "Active"
      }
      // filters: [
      //   { text: 'London', value: 'London' },
      //   { text: 'New York', value: 'New York' },
      // ],
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) => record.address.includes(value),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: 'EDIT',
      dataIndex: 'todo',
      key: 'todo',
    },
    {
      title: 'DELETE',
      dataIndex: 'todo',
      key: 'todo',
    },
  ];
  

  return(

      <>

        <h1>TODO TABLE</h1>

        <div className="searchDiv">
          <Search
          placeholder="input search text"
          enterButton="ADD"
          size="large"
          onSearch={AddTodoTask}
          />
        </div>

        <div className="filterDiv">
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
        </div>

        <div className="tableDiv">
          <Table columns={columns} dataSource={todoData} onChange={handleChange} />
        </div>

      </>
  )
}







