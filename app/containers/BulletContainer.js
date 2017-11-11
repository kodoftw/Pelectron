// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bullet from '../components/Bullet';

// Services
import { InputHandler } from '../services/InputHandler';

function mapStateToProps(state) {
  if (state.bullet.counter > 3) {
    return { bullets: state.bullet.bullets };
  }

  return {
    bullets: state.bullet.bullets,
    counter: state.bullet.counter
  };
}

class BulletContainer extends Component {
  render() {
    let { counter, bullets } = this.props;
    return(
      <div>
        { bullets.map((bullet) => <Bullet key={bullet.id} bullet={bullet} />) }
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(BulletContainer);