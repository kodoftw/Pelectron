// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bullet from '../components/Bullet';

// Libs
import { InputHandler } from '../libs/InputHandler';

function mapStateToProps(state) {
  return {
    bullets: state.bullet.bullets
  };
}

class BulletContainer extends Component {
  render() {
    const { bullets } = this.props;
    return(
      <div>
        {
          bullets != null
            ? bullets.map((bullet) => <Bullet bullet={bullet} />)
            : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(BulletContainer);