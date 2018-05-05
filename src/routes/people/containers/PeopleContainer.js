import { connect } from 'react-redux'
import { handleFormErrors, updateFormField } from '../../../modules/actions/people'
import People from '../components/People'
import React from 'react'

const mapDispatchToProps = {
  handleFormErrors,
  updateFormField
}

const mapStateToProps = state => ({
  fetching: state.people.fetching,
  formFields: state.people.formFields,
  formFieldErrors: state.people.formFieldErrors
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
