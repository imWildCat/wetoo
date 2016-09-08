import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../../../utilities/style';
import NodeListManager from '../../../utilities/node_list_manager';
import PageContainer from '../../common/PageContainer';

class NewTopicPage extends Component {
  static propTypes = {
    nodeSlug: PropTypes.string,
  };
  state = {
    nodeName: '问与答（默认）',
    nodeSlug: 'qna',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setUpNavigationBar();
    this.setUpNode();
  }

  setUpNode = () => {
    const { nodeSlug } = this.props;
    if (nodeSlug) {
      NodeListManager.getNodes().then(nodes => {
        const filteredNodes = nodes.filter((node) => {
          const { slug, name } = node;
          if (slug && name && (slug.toLowerCase().indexOf(nodeSlug) > -1 || name.toLowerCase().indexOf(nodeSlug) > -1)) {
            return true;
          } else {
            return false;
          }
        });
        if (filteredNodes.length > 0) {
          const currentNode = filteredNodes[0];
          const { slug, name } = currentNode;
          this.setState({ nodeName: name, nodeSlug: slug });
        } else {
          this.setState({ nodeName: '(未知)', nodeSlug: null });
        }
      }, error => {
        alert('Error getting nodes:' + error);
      });
    }
  };

  setUpNavigationBar = () => {
    Actions.refresh({
      rightTitle: '发布',
      onRight: this.onRightButtonPress,
      rightButtonTextStyle: { color: 'white' },
    });
  };

  onRightButtonPress = () => {
    this.refs['titleTextInput'].blur();
    this.refs['contentTextInput'].blur();
  };

  async requestOnceCode() {
    // TODO: Implement get once code: $('input[name="once"]')
  }

  render() {
    const { nodeName } = this.state;
    return (
      <PageContainer>
        <View style={styles.nodeSelectorWrapper}>
          <Text style={styles.nodeSelectorTitle}>节点：</Text>
          <TouchableOpacity style={styles.nodeSelectorTouchable}>
            <View style={styles.nodeSelectorTouchableInnerWrapper}>
              <Text style={styles.nodeSelectorText}>{nodeName}</Text>
              <Icon style={styles.nodeSelectorIcon} size={13} name="chevron-right" color="#329EED" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.titleTextInputWrapper}>
          <TextInput
            ref="titleTextInput"
            returnKeyType="next"
            style={styles.titleTextInput}
            onSubmitEditing={this.onTitleTextInputSubmit}
            placeholder="标题" />
        </View>
        <View style={styles.contentTextInputWrapper}>
          <TextInput
            ref="contentTextInput"
            style={styles.contentTextInput}
            multiline={true}
            placeholder="内容" />
        </View>
      </PageContainer>
    );
  }

  onTitleTextInputSubmit = () => {
    this.refs['contentTextInput'].focus();
  };

}

const styles = Style.create({
  nodeSelectorWrapper: {
    backgroundColor: '#F7F8F9',
    height: 40,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  nodeSelectorText: {
    color: '#329EED',
    fontSize: 14,
    flex: 1,
  },
  nodeSelectorTitle: {
    color: '#A4A4A4',
    fontSize: 14,

  },
  nodeSelectorTouchable: {
    flex: 1,
  },
  nodeSelectorTouchableInnerWrapper: {
    flexDirection: 'row',
  },
  nodeSelectorIcon: {
    marginTop: 2,
  },

  titleTextInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8E0E4',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
  },
  titleTextInput: {
    flex: 1,
    height: 25,
    fontSize: 16,
  },

  contentTextInputWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  contentTextInput: {
    flex: 1,
    fontSize: 14,
  },
});

export default NewTopicPage;
