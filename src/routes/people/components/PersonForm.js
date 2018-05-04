import Form from '../../../components/Form'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

// const formInputs = [
//   {
//     name: 'name',
//   }
// ]

class PersonForm extends Component {
  render () {
    return <Form title={'New Person'} />
  }
}

export default PersonForm