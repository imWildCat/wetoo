import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import TopicPage from '../components/pages/Topic';
import { navigatePush } from '../actions';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO: Extract common push/pop actions
        pushTopicPage: (topicID) => {
            Actions.topic({ topicID, });
        },
        pushUserPage: (username) => {
            Actions.user({ username, });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopicPage);
