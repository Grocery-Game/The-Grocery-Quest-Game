import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {addItem} from '../actions/itemActions';

const ItemModal = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [state, setState] = useState({
    modal: false,
    name: '',
  });

  const toggle = () => {
    setState({...state, modal:!state.modal})
  }

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: state.name
    };

    // add via add item action    
    dispatch(addItem(newItem));


    // close modal
    toggle();
  }

  return (
    <div>
      {
        isAuthenticated ? 
        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
          Add Item
        </Button> :
        <h4 className="mb-3 ml-4">Please Login</h4>
      }
   

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="add shopping item"
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                type="submit"
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
