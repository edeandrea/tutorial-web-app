import React from 'react';
import { Card, CardBody, CardFooter, CardTitle, Icon, noop } from 'patternfly-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** User enums for the users prop */
const users = {
  DEVELOPER: 'Developer',
  OPERATOR: 'Operator'
};

const TutorialCard = props => {
  let userList;
  // eslint-disable-next-line array-callback-return
  props.users.map(user => {
    if (userList) {
      userList = `${userList}, ${user}`;
    } else {
      userList = user;
    }
  });

  return (
    <Card
      matchHeight
      className="app-tutorial-card"
      onClick={e => {
        e.preventDefault();
        props.history.push(props.getStartedLink);
      }}
    >
      <CardTitle>
        <div> {props.title} </div>
      </CardTitle>
      <CardBody>
        {props.children}
        <Icon type="pf" name="user" /> {userList}
      </CardBody>
      <CardFooter className="app-tutorial-card-pf-footer">
        <a className="app-tutorial-card-pf-footer-get-started" href={props.getStartedLink}>
          <Icon type="fa" name="arrow-circle-o-right" />
          <span>Get Started</span>
        </a>
        <div className="app-tutorial-card-pf-footer-time-to-complete">
          <Icon type="fa" name="clock-o" /> {props.mins} <span>Minutes</span>
        </div>
      </CardFooter>
    </Card>
  );
};

TutorialCard.users = users;

TutorialCard.propTypes = {
  /** Content rendered inside the tutorial card  */
  children: PropTypes.node.isRequired,
  /** Title of the tutorial */
  title: PropTypes.string.isRequired,
  /** Link to page that explains the the tutorial in more detail */
  getStartedLink: PropTypes.string.isRequired,
  /** Users that apply to this tutorial */
  users: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(users))).isRequired,
  /** Mins to complete the tutorial */
  mins: PropTypes.number.isRequired,
  /** router history */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

TutorialCard.defaultProps = {
  history: {
    push: noop
  }
};

export default withRouter(TutorialCard);
