import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import BillingCycleList from './billingCycleList'
import BillingCycleForm from './billingCycleForm'

import { selectTab, showTabs } from '../common/tab/tabActions'
import { create, update, remove } from './billingCycleActions'

class BillingCycle extends Component {

    componentWillMount() {
        this.props.selectTab('tabList')
        this.props.showTabs('tabList', 'tabCreate')
    }

    render() {
        return (
            <div>
                <ContentHeader title='Ciclos de Pagamento' small='Cadastro' />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList'></TabHeader>
                            <TabHeader label='Incluir' icon='plus' target='tabCreate'></TabHeader>
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate'></TabHeader>
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete'></TabHeader>
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <BillingCycleList></BillingCycleList>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <BillingCycleForm onSubmit={this.props.create} />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <BillingCycleForm onSubmit={this.props.update} />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <BillingCycleForm onSubmit={this.props.remove} readOnly={true} />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ selectTab, showTabs, create, update, remove }, dispatch)
export default connect(null, mapDispatchToProps)(BillingCycle)