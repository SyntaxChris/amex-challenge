import { connect } from 'react-redux'
import React from 'react'
import '../../../styles/view.scss'

const mapDispatchToProps = {}

const mapStateToProps = state => state

const PeopleView = props => <section className='view people'>
  <div>People View</div>
</section>

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView)
