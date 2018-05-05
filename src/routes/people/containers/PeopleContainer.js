import { connect } from 'react-redux'
import {
  createPerson,
  handleFormErrors,
  updateFormField,
  validateForm
} from '../../../modules/actions/people'
import People from '../components/People'
import React from 'react'

const mapDispatchToProps = {
  createPerson,
  handleFormErrors,
  updateFormField,
  validateForm
}

const mapStateToProps = state => ({
  fetching: state.people.fetching,
  formFields: state.people.formFields,
  formFieldErrors: state.people.formFieldErrors,
  isValidated: state.people.isValidated
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
