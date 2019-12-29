import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import If from '../operator/if'

class TabContent extends Component {
    render() {
        const isSelected = this.props.tab.selected === this.props.id
        const isVisible = this.props.tab.visible[this.props.id]

        return (
            <If test={isVisible}>
                <div id={this.props.id} className={`tab-pane ${isSelected ? 'active' : ''}`}>
                    {this.props.children}
                </div>
            </If>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
export default connect(mapStateToProps)(TabContent)