import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import labelAndInput from '../common/form/labelAndInput'
import CreditList from './creditList'

import { init } from './billingCycleActions'

class BillingCycleForm extends Component {
    render() {
        const { handleSubmit, readOnly, credits } = this.props

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={labelAndInput} type='number' readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={labelAndInput} type='number' readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano' />
                    <CreditList cols='12 6' readOnly={readOnly} list={credits} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
//the data is now managed by redux form, and that's why it's required use something provided by redux form
//to achieve the data, in this case, the credits
const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({ credits: selector(state, 'credits') })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)