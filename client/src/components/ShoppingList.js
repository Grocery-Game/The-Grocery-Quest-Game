import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector( state => state.item);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
      dispatch(getItems())
  }, []);

  const onDeleteClick = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items
            ? items.map(({ _id, name }, i) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {isAuthenticated &&
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => onDeleteClick(_id)}
                    >
                      &times;
                    </Button>
                  }
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))
            : null}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;