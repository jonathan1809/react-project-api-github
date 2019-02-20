import React, { Component } from 'react'
import Input from '../../components/input';
import Button from '../../components/button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.scss'
class search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            criteria: ''
        }
    }
    onChange = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.value;
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.store(this.state.criteria);
        this.props.history.push('/list');
    }

    render() {
        const { criteria } = this.state;
        return (
            <div className='main'>
                <h2>Search repositories</h2>
                <form className='form'>
                    <Input placeholder={'Search'} name='criteria' value={criteria} change={this.onChange} />
                    <Button text={'Search'} btnColor={'primary'} click={this.onSubmit} />
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        store: (criteria) => { dispatch({ type: 'STORE_CRITERIA', criteria:criteria }) },
    }
}

export default withRouter(connect(null, mapDispatchToProps)(search))
