import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import TopicListPage from '../components/pages/TopicList';
import {navigatePush} from '../actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushTopicPage: (topicID) => {
      Actions.topic({ topicID });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage);
