import { connect } from 'react-redux'
import React from 'react'
import '../../../styles/view.scss'

const mapDispatchToProps = {}

const mapStateToProps = state => state

const PeopleView = (props) => <div className='view people'>
  <div>People View</div>
</div>

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView)
