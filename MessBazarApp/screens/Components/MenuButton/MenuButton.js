import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

export default class MenuButton extends React.Component {
  render() {
	 let icon = this.props.icon
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="#fee"
      >
        <View style={styles.btnContainer}>
          <Icon name={icon} style={{height:25,width:25}}/>
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
