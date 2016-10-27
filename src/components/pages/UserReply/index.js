import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';

import Networking from '../../../utilities/v2_networking';
import GiftedListView from '../../commom/GiftedListView';
import HTMLHelper from '../../../utilities/html_helper';
import PageContainer from '../../common/PageContainer';
import Separator from '../../common/Separator';

class UserReply extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired
  };

  render() {
    return (
      <PageContainer>
        <GiftedListView onFetch={this.onFetch} renderRow={this.renderRow} renderSeparator={this.renderSeparator} />
      </PageContainer>
    );
  }

  onFetch = async (page = 1, callback, options) => {
    const {username} = this.props;
    try {
      const $ = await Networking.get(`/member/${username}/replies?p=${page}`);
      const { allLoaded } = HTMLHelper.parsePagination($);
      const replies = [];
      $('#Main > div.box > div.dock_area').each((_i, _e) => {
        const _dockRow = $(_e);
        
      });
    } catch (e) {

    }
  };

}

export default UserReply;
