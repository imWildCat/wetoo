import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import UserPage from '../components/pages/User';
import { navigatePush } from '../actions';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO: Extract common push/pop actions
        pushUserTopicPage: (username) => {
            Actions.user_topic({ username, title: username });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
