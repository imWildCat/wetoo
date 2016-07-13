import * as NavigationStateUtils from 'NavigationStateUtils';

import {NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET} from './../constants/navigation';

const initialNavState = {
  key: 'MainNavigation',
  index: 0,
  children: [
    { key: 'topic_list', title: 'Wetoo' }
  ]
};

function navigationState(state = initialNavState, action) {
  switch (action.type) {
    case NAV_PUSH:
      if (state.children[state.index].key === (action.state && action.state.key)) {
        return state;
      } else {
        return NavigationStateUtils.push(state, action.state);
      }
    case NAV_POP:
      if (state.index === 0 || state.children.length === 1) {
        return state;
      } else {
        return NavigationStateUtils.pop(state);
      }
    case NAV_JUMP_TO_KEY:
      return NavigationStateUtils.jumpTo(state, action.key);

    case NAV_JUMP_TO_INDEX:
      return NavigationStateUtils.jumpToIndex(state, action.index);

    case NAV_RESET:
      return Object.assign(state, {
        index: action.index,
        children: action.children
      });
    default:
      return state;
  }
}

export default navigationState;
