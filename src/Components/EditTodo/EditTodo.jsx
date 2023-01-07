import React, { useState } from 'react';
import { Modal , Input , Radio } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { editTodoData } from '../../Redux/Todo/action';


export const EditTodo = ({isModalOpen, handleOk, handleCancel ,editTodo ,setEditTodo}) => {

    const dispatch = useDispatch()

    const HandleChange = (e) => {
        const {name , value} = e.target
        setEditTodo({...editTodo , [name] : value})
    }

    const HandleSubmit = () => {
        dispatch(editTodoData(editTodo?.id , editTodo))
        handleOk()
    }

    const options = [
        {
          label: 'Active',
          value: false,
        },
        {
          label: 'Completed',
          value: true,
        }
    ];

    //console.log(editTodo)


  return (

    <>

        <Modal open={isModalOpen} onOk={HandleSubmit} onCancel={handleCancel}>

            <h3>Edit Your Todo</h3>
            <Input placeholder="Basic usage" name='todo' value={editTodo?.todo} onChange={HandleChange} />

            <h3>Status</h3>
            <Radio.Group
                options={options}
                name='status'
                onChange={HandleChange}
                value={editTodo?.status}
                optionType="button"
                buttonStyle="solid"
            />

        </Modal>

    </>
  );
};


