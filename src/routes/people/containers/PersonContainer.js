import { connect } from 'react-redux'
import {
  clearForm,
  createPerson,
  handleFormErrors,
  showLoader,
  updateFormField,
  validateForm
} from '../../../modules/actions/people'
import { handleAppError } from '../../../modules/actions/app'
import Person from '../components/Person'
import React from 'react'

const mapDispatchToProps = {
  clearForm,
  createPerson,
  handleAppError,
  handleFormErrors,
  showLoader,
  updateFormField,
  validateForm
}

const mapStateToProps = state => ({
  formFields: state.people.formFields,
  formFieldErrors: state.people.formFieldErrors,
  isValidated: state.people.isValidated,
  loading: state.people.loading,
  successRecord: state.people.successRecord
})

export default connect(mapStateToProps, mapDispatchToProps)(Person)
