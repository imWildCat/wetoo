import React, {Component, PropTypes} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomKeyboardSpacer from '../../common/CustomKeyboardSpacer';

import Style from '../../../utilities/style';
import Networking from '../../../utilities/v2_networking';
import SessionManager from '../../../utilities/session_manager';
import StringUtilities from '../../../utilities/string';
import NodeListManager from '../../../utilities/node_list_manager';
import PageContainer from '../../common/PageContainer';
import NodeSelector from './NodeSelector';

class NewTopicPage extends Component {
  static propTypes = {
    nodeSlug: PropTypes.string,
  };
  state = {
    nodeName: '问与答（默认）',
    nodeSlug: 'qna',
    nodeSelectorVisible: false,
    title: null,
    content: null,
    isPosting: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setUpNavigationBar();
    this.setUpNode();

    if(SessionManager.checkLoginWithUI() === false) {
      Actions.pop();
    }
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
    const {isPosting} = this.state;
    if(!isPosting) {
      this.postNewTopic();
    }
  };

  render() {
    const { nodeName, nodeSlug, nodeSelectorVisible } = this.state;
    return (
      <PageContainer>
        <View style={styles.nodeSelectorWrapper}>
          <Text style={styles.nodeSelectorTitle}>节点：</Text>
          <TouchableOpacity style={styles.nodeSelectorTouchable} onPress={this.showNodeSelector}>
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
            onChangeText={title => this.setState({ title })}
            placeholder="标题" />
        </View>
        <View style={styles.contentTextInputWrapper}>
          <TextInput
            ref="contentTextInput"
            style={styles.contentTextInput}
            multiline={true}
            onChangeText={content =>this.setState({ content })}
            placeholder="内容" />
        </View>
        <CustomKeyboardSpacer />
        <NodeSelector visible={nodeSelectorVisible} nodeSlug={nodeSlug} onCancel={this.onNodeSelectorCancel}
                      onSelect={this.onNodeSelectorSelect} />
      </PageContainer>
    );
  }

  onTitleTextInputSubmit = () => {
    this.refs['contentTextInput'].focus();
  };

  onNodeSelectorCancel = () => {
    this.hideNodeSelector();
  };

  onNodeSelectorSelect = (nodeName, nodeSlug) => {
    this.hideNodeSelector();
    this.setState({ nodeName, nodeSlug });
  };

  hideNodeSelector = () => {
    this.setState({ nodeSelectorVisible: false });
  };

  showNodeSelector = () => {
    this.setState({ nodeSelectorVisible: true });
  };

  postNewTopic = () => {
    const { nodeSlug, title, content } = this.state;
    const once = Networking.getOnce();
    this.onPosting();
    Networking.post(`/new/${nodeSlug}`, { title, content, syntax: 0, once }).then($ => {
      this.onPostingEnd();
      const docTitle = $('title').text();
      if (docTitle.indexOf(title) > -1) {
        const canonicalElement = $('link[rel="canonical"]');
        const newTopicID = Number(StringUtilities.matchFirst(canonicalElement.attr('href'), /t\/(\d+)/));
        if (newTopicID && newTopicID > 0) {
          Actions.pop();
          Actions.topic({ topicID: newTopicID });
          return;
        }
      }
      // Error:
      let problemString = $('.problem ul li').text();
      console.log('problemString:', problemString);
      if(!problemString || problemString === '') {
        problemString = '未知错误';
      }
      Alert.alert('发帖失败', problemString);
      // console.log($.html());
    }, error => {
      this.onPosting();
      Alert.alert('发帖失败', '网络错误');
    });
    console.log({ nodeSlug, title, content });
  };

  onPosting = () => {
    this.setState({ isPosting: true });
    Actions.refresh({
      rightTitle: '发布中...',
      rightButtonTextStyle: { color: 'gray' },
    });
  };

  onPostingEnd = () => {
    this.setState({ isPosting: false });
    this.setUpNavigationBar();
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
