import React, {Component, PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

import PageContainer from '../../common/PageContainer';
import TopicList from '../../common/TopicList';
import SegmentedControl from './SegmentedControl';

import NewTopicButtonImage from '../../assets/new_topic_icon.png';

const tabData = [
  { slug: 'all', name: '全部' },
  { slug: 'hot', name: '最热' },
  { slug: 'r2', name: 'R2' },
  { slug: 'tech', name: '技术' },
  { slug: 'jobs', name: '酷工作' },
  { slug: 'creative', name: '创意' },
  { slug: 'play', name: '好玩' },
  { slug: 'deals', name: '交易' },
  { slug: 'qna', name: '问与答' },
  { slug: 'apple', name: 'Apple' },
  { slug: 'city', name: '城市' },
];

class DiscoveryTabPage extends Component {

  segmentedControlTitles = [];
  state = {
    index: 0,
  };

  componentWillMount() {
    this._initViews();
  }

  componentDidMount() {
    Actions.refresh({
      rightButtonImage: NewTopicButtonImage,
      onRight: this.onNewTopicButtonPress
    });
  }

  onSegmentedControlButtonPress(index) {
    this.setState({ index });
  }

  _initViews() {
    if (this.segmentedControlTitles.length === 0) {
      for (var i = 0; i < tabData.length; i++) {
        const data = tabData[i];
        this.segmentedControlTitles.push(data.name);
      }
    }
  }

  render() {
    const titles = this.segmentedControlTitles;

    return (
      <PageContainer isTab={true}>
        <SegmentedControl buttonTitles={titles}
                          ref={(ref) => {
                            this.segmentedControl = ref;
                          }}
                          onPress={this.onSegmentedControlButtonPress.bind(this)}
                          style={styles.segmentedControl} />
        {this.renderContent()}
      </PageContainer>
    );
  }

  renderContent = () => {
    return this.renderPage(tabData[this.state.index]);
  };

  renderPage(data) {
    return (
      <TopicList
        key={`tab_slug_${data.slug}`}
        slug={data.slug} />
    );
  }


  onNewTopicButtonPress = () => {
    Actions.newTopic({ nodeSlug: this.props.slug });
  }
}

const styles = StyleSheet.create({
  segmentedControl: {
    backgroundColor: '#F7F7F7',
    borderBottomColor: '#D3D2D3',
    borderBottomWidth: 0.5
  },
});

export default DiscoveryTabPage;
