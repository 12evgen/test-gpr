import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import MainDecorator from './MainDecorator'
// import DevTools from 'mobx-react-devtools'

@observer
class AppRoot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <React.Fragment>
        {/* <DevTools /> */}
        <Switch>
          <Route component={MainDecorator} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default hot(AppRoot)
