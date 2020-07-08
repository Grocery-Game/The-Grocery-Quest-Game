import React, { useEffect } from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = (props) => {
  const {getItems, deleteItem, item} = props;
  useEffect(() => {
    getItems();
  }, []);

  const {items} = item;

  const onDeleteClick = (id) => {
    deleteItem(id)
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items
            ? items.map(({ _id, name }, i) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => onDeleteClick(_id)}
                    >
                      &times;
                    </Button>
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

ShoppingList.protoTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(
  ShoppingList
);