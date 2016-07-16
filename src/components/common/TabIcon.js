import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const defaultIconSize = 27;
const iconColor = '#B0B0B3';
const selectedIconColor = '#1992F5';

class TabIcon extends Component {

  render() {
    const {sceneKey, selected} = this.props;
    const flag = sceneKey + (selected ? '-s' : '');
    switch (flag) {
      case 'discovery':
        return <Icon name="globe" size={defaultIconSize - 0} color={iconColor} />;
      case 'discovery-s':
        return <Icon name="globe" size={defaultIconSize - 0} color={selectedIconColor} />;
      case 'nodeList':
        return <MaterialIcon name="dashboard" size={defaultIconSize + 2} color={iconColor} />;
      case 'nodeList-s':
        return <MaterialIcon name="dashboard" size={defaultIconSize + 2} color={selectedIconColor} />;
      case 'notification':
        return <Icon name="bell" size={defaultIconSize - 2} color={iconColor} style={styles.searchIcon} />;
      case 'notification-s':
        return <Icon name="bell" size={defaultIconSize - 2} color={selectedIconColor} style={styles.searchIcon} />;
      case 'me':
        return <Icon name="user" size={defaultIconSize - 0} color={iconColor} />;
      case 'me-s':
      default:
        return <Icon name="user" size={defaultIconSize - 0} color={selectedIconColor} />;
    }
  }
}

const styles = StyleSheet.create({
  searchIcon: {
    marginTop: -1,
  }
});

export default TabIcon;
