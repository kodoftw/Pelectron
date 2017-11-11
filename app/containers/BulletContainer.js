// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bullet from '../components/Bullet';

// Services
import { InputHandler } from '../services/InputHandler';

function mapStateToProps(state) {
  return {
    bullets: state.bullet.bullets,
    state: state.bullet.state
  };
}

class BulletContainer extends Component {
  render() {
    let { state, bullets } = this.props;
    return(
      <div>
        { bullets.map((bullet) => <Bullet key={bullet.state.id} bullet={bullet} />) }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(BulletContainer);