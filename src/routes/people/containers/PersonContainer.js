import { connect } from 'react-redux'
import {
  clearForm,
  createPerson,
  handleFormErrors,
  showLoader,
  updateFormField
} from '../../../modules/actions/people'
import { handleAppError } from '../../../modules/actions/app'
import PersonForm from '../components/PersonForm'
import React from 'react'
import '../../../styles/view.scss'

const mapDispatchToProps = {
  clearForm,
  createPerson,
  handleAppError,
  showLoader,
  updateFormField
}

const mapStateToProps = state => ({
  formFields: state.people.formFields,
  formFieldErrors: state.people.formFieldErrors,
  loading: state.people.loading,
  successRecord: state.people.successRecord
})

const PersonView = (props) => <section className='view person'>
  <PersonForm {...props} />
</section>

export default connect(mapStateToProps, mapDispatchToProps)(PersonView)
