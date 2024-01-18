import { useState } from 'react'
import './App.css';
import { Radio, Form, Input, Select, Space, Button, List, Typography } from 'antd'

import axios from "axios"

function App() {
  const BASE_URL = "http://localhost:3000" 

  const [items, setItems] = useState([])

  const [action, setAction] = useState('getAll');
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  // Make HTTP request to /getAll endpoint
  const getAll = async () => {
    console.log("getting all items...")
    try {
      // GET Request
      const response = await axios.get(BASE_URL + "/getAll")
        .then((response) => {
          console.log(response)
          // Update the state with the fetched data
          setItems(response.data)
          
        }).catch(() => {

        })
        	
			} catch (error) {
      // Handle any errors
      console.error('Failed to fetch data: ', error);
    }




    // make sure to use the response to update the 'items' state!
    
  }

  // Make HTTP request to /add endpoint
  const add = async (params) => {
    console.log("adding item...", params)

  }

  // Make HTTP request to /delete endpoint
  const remove = async (params) => {
    console.log("deleting item...", params)

  }

  // Make HTTP request to /update endpoint
  const update = async (params) => {
    console.log("updating item...", params)

  }

  // Make HTTP request to /getByCat endpoint
  const getByCat = async (params) => {
    console.log("getting item by cat...", params)

  }

  return (
    <div className="App">
      <h1>Shopping List</h1>

      <div className="Body">
        <div className="Form">

          <Radio.Group value={action} onChange={handleActionChange}>
            <Radio.Button value="getAll">Get All</Radio.Button>
            <Radio.Button value="add">Add</Radio.Button>
            <Radio.Button value="delete">Delete</Radio.Button>
            <Radio.Button value="update">Update</Radio.Button>
            <Radio.Button value="getByCat">Get By Category</Radio.Button>
          </Radio.Group>

          {action == "getAll" ? 
          <div className="FormBody"> 
            <Form onFinish={getAll} labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
                <Button type="primary" htmlType="submit">
                  Get All Items
                </Button>
            </Form>
          </div> : action == "add" ? 
          <div className="FormBody">
            <Form onFinish={add} labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
              <Form.Item label="Name" name="name">
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select
                  // defaultValue="Food"
                  style={{ width: 120 }}
                  // onChange={handleCatChange}
                  options={[
                    { value: 'Food', label: 'Food' },
                    { value: 'Bathroom', label: 'Bathroom' },
                    { value: 'Kitchen', label: 'Kitchen' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Add Item
              </Button>
            </Form>
          </div> : action == "delete" ?
          <div className="FormBody">
            <Form onFinish={remove} labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
              <Form.Item label="Existing Name" name="existingName">
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Delete Item
              </Button>
            </Form>
          </div> : action == "update" ?
          <div className="FormBody">
            <Form onFinish={update} labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
              <Form.Item label="Existing Name" name="existingName">
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Form.Item label="New Name" name="newName">
                <Input style={{ width: 300 }} />
              </Form.Item>
              <Form.Item label="New Category" name="newCategory">
                <Select
                  // defaultValue="Food"
                  style={{ width: 120 }}
                  // onChange={handleCatChange}
                  options={[
                    { value: 'Food', label: 'Food' },
                    { value: 'Bathroom', label: 'Bathroom' },
                    { value: 'Kitchen', label: 'Kitchen' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Update Item
              </Button>
            </Form>
          </div> : action == "getByCat" ? 
          <div className="FormBody">
            <Form onFinish={getByCat} labelCol={{ span: 8 }} wrapperCol={{ span: 5 }}>
              <Form.Item label="Category" name="category">
                <Select
                  // defaultValue="Food"
                  style={{ width: 120 }}
                  // onChange={handleCatChange}
                  options={[
                    { value: 'Food', label: 'Food' },
                    { value: 'Bathroom', label: 'Bathroom' },
                    { value: 'Kitchen', label: 'Kitchen' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Get Item by Category
              </Button>
            </Form>
          </div> : <div>none</div>}
        </div>

        <div className="Collection">
          <List
            header={<div>My List</div>}
            bordered
            dataSource={items}
            size="large"
            renderItem={(item) => (
              <List.Item>
                <div style={{"marginRight": "100px"}}>{item.name}</div>
                <div>{item.category}</div>
              </List.Item>
            )}
          />
        </div>

      </div>

      

    </div>
  );
}

export default App;
