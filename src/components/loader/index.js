import React, { Component } from 'react'

import s from './styles.scss'

class Loader extends Component {
  render() {
    return (
      <div className={s.loaderBg}>
        <div className={s.loaderCenter}>
          Loading..
        </div>
      </div>
    )
  }
}

export default Loader
