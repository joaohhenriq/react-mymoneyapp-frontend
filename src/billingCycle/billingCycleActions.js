import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'

import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3004/api'

const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values) {
    //redux thunk: allows an action calls another action(s)
    return dispatch => {
        axios.post(`${BASE_URL}/billingCycles`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                //redux multi: allows use dispatch like an array to pass the actions that will be
                //called atfer the current action
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(billingCycle) {
    //redux multi
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}