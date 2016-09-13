import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';

import TopicList from '../../common/TopicList';
import PageContainer from '../../common/PageContainer';

import NewTopicButtonImage from '../../assets/new_topic_icon.png';

class NodePage extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  };
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const { slug } = this.props;
    return (
      <PageContainer>
        <TopicList isNode={true} slug={slug} />
      </PageContainer>
    );
  }

  componentDidMount() {
    Actions.refresh({
      rightButtonImage: NewTopicButtonImage,
      onRight: this.onNewTopicButtonPress
    });
  }

  onNewTopicButtonPress = () => {
    Actions.newTopic({ nodeSlug: this.props.slug });
  }

}

export default NodePage;
