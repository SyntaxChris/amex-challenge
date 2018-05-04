import { connect } from 'react-redux'
import { handleFormErrors } from '../../../modules/actions/people'
import People from '../components/people'
import React from 'react'

const mapDispatchToProps = {
  handleFormErrors
}

const mapStateToProps = state => ({
  fetching: state.people.fetching,
  formFieldErrors: state.people.formFieldErrors
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
