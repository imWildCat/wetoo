import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import UserTopicPage from '../components/pages/UserTopic';
import {navigatePush} from '../actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO: Extract common push/pop actions
    pushTopicPage: (topicID) => {
      Actions.topic({ topicID });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTopicPage);
