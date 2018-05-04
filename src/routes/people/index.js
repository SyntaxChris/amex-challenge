import Loadable from 'react-loadable'
import React from 'react'

// Loadable component takes advantage of dynamic imports so we only render what is requested
const PeopleRoute = Loadable({
  loader () {
    return import('./containers/PeopleContainer')
  },
  loading () { return null },
  render (loaded, props) {
    const Component = loaded.default

    return <div className='people-container'>
      <Component {...props} />
    </div>
  }
})

export default PeopleRoute