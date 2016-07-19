import React, {Component, PropTypes} from 'react';

import Style from '../../../utilities/style';
import TopicList from '../TopicList';
import PageContainer from '../../common/PageContainer';

class NodePage extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  };
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const {slug} = this.props;
    return (
      <PageContainer>
        <TopicList isNode={true} slug={slug} />
      </PageContainer>
    );
  }

}

export default NodePage;
