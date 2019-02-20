import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as creators from '../../redux/listRepositories/actionsCreators'
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '../../components/dialog';
import Button from '@material-ui/core/Button';
function createData(id, name, score, watchers, created_at, owner, id_owner) {
    return { id: id, name, score, watchers, owner, id_owner, created_at: formatDate(created_at) };
}
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = new Date(date);
    return formatDate.toLocaleDateString("en-US", options);
}
const rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'owner', numeric: false, disablePadding: true, label: 'Owner' },
    { id: 'score', numeric: true, disablePadding: false, label: 'Score (stars)' },
    { id: 'watchers', numeric: true, disablePadding: false, label: 'watchers' },
    { id: 'created_at', numeric: true, disablePadding: false, label: 'Date' },
];


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends Component {
    state = {
        selected: [],
        data: [],
        total_count: 0,
        page: 0,
        rowsPerPage: 5,
        comments: [],
        open: false,
        loading: false,
        name: ''
    };

    componentWillReceiveProps(nextProps) {

        const data = nextProps.items.map(r => {
            return createData(r.id, r.name, r.score, r.watchers, r.created_at, r.owner.login, r.owner.id)
        })
        this.setState({ data, total_count: nextProps.total_count });
        
    }
    componentDidMount() {
       
        this.props.searchRepositories(this.props.criteria);
    }

    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.criteria !== this.props.criteria || 
        prevProps.total_count !== this.props.total_count || 
        prevState.rowsPerPage !== this.state.rowsPerPage || 
        this.state.open !== prevState.open || 
        this.state.page !== prevState.page || 
        prevState.loading !== this.state.loading
    }

    handleClick = (event, name, owner) => {
        this.setState({ loading: true })
        fetch(`https://api.github.com/repos/${owner}/${name}/comments`, { method: 'GET' })
            .then(res => res.json())
            .then(json => {
                const commentsSorted = json.sort(function (a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                this.setState({ comments: commentsSorted, loading: false, open: true, name })
            })
            .catch(err => {
                alert('Something went wrong, try again');
            })

    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    toogleModal = () => {
        this.setState(state => {
            return { open: !state.open }
        });
    };

    returnSearch = () => {
        this.props.history.push('/');
    }
    render() {
        const { classes, loading } = this.props;
        const { data, order, orderBy, rowsPerPage, page, total_count, open, name, comments } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Grid container spacing={24}>
                <Paper className={classes.root}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">

                        <Grid item xs={1} >
                            <Button variant="contained" color="primary" onClick={this.returnSearch}>
                                {'< Return'}
                            </Button>
                        </Grid>
                        <Grid item xs={11}>
                            <h1 style={{ color: 'black' }}>Count repositories: {total_count}</h1>
                        </Grid>

                        {loading || this.state.loading ? <LinearProgress /> : null}

                    </Grid>
                </Paper>
                <Paper className={classes.root}>

                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                    </TableCell>
                                    {rows.map(
                                        row => (
                                            <TableCell
                                                key={row.id}
                                                align={row.numeric ? 'right' : 'left'}
                                                padding={row.disablePadding ? 'none' : 'default'}
                                                sortDirection={orderBy === row.id ? order : false}
                                            >
                                                {row.label}
                                            </TableCell>
                                        ),
                                        this,
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.name, n.owner)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">

                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">{n.owner}</TableCell>
                                                <TableCell align="right">{n.score}</TableCell>
                                                <TableCell align="right">{n.watchers}</TableCell>
                                                <TableCell align="right">{n.created_at}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <Dialog handleClose={this.toogleModal} open={open} name={name} comments={comments} />
            </Grid >

        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        criteria: state.search.criteria,
        items: state.list.items,
        total_count: state.list.total_count,
        error: state.list.error,
        loading: state.list.loading,
        isError: state.list.isError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchRepositories: (criteria) => { dispatch(creators.fetchList(criteria)) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable));