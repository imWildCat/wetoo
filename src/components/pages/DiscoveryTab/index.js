import React, {Component, PropTypes} from 'react';
import { View, StyleSheet} from 'react-native';
import ViewPager from 'react-native-viewpager';

import PageContainer from '../../common/PageContainer';
import TopicList from '../TopicList';
import SegmentedControl from './SegmentedControl';

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

  constructor(props) {
    super(props);
    // Use this flag to avoid the bug about that `react-native-scrollable-tab-view` could call onChangeTab() twice
    this.currentIndex = 0;

    this.segmentedControlTitles = [];

    // Configure ViewPager
    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1.slug !== p2.slug,
    });

    this.state = {
      dataSource: dataSource.cloneWithPages(tabData)
    };
  }


  componentWillMount() {
    this._initViews();
  }


  onSegmentedControlButtonPress(index) {
    this.viewPager.goToPage(index);
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
          ref={(ref) => { this.segmentedControl = ref; }}
          onPress={this.onSegmentedControlButtonPress.bind(this)}
          style={styles.segmentedControl} />
        <ViewPager
          ref={(ref) => { this.viewPager = ref; }}
          style={{ flex: 1 }}
          dataSource={this.state.dataSource}
          renderPage={this._renderPage.bind(this)}
          onChangePage={this._onChangePage.bind(this)}
          isLoop={false}
          autoPlay={false}
          renderPageIndicator={false}
          />
      </PageContainer>
    );
  }

  _renderPage(data, pageID) {
    return (
      <TopicList
        key={`tab_slug_${data.slug}`}
        slug={data.slug} />
    );
  }

  _onChangePage(i) {
    if (this.currentIndex !== i) {
      this.currentIndex = i;
      this.segmentedControl.setIndex(i);
    }
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
