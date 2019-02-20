import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

const CommentsDialog = (props) => {

    const { classes, open, handleClose, name, comments } = props;
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle id="responsive-dialog-title">Repository: {name}</DialogTitle>
                <DialogContent>
                    <List dense className={classes.root}>
                        {comments.map(comment => {
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            let formatDate = new Date(comment.created_at);
                            formatDate = formatDate.toLocaleDateString("en-US", options);
                            return (
                                <ListItem key={comment.id} >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar n°${comment.user.login}`}
                                            src={comment.user.avatar_url}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography component="span" className={classes.inline} color="textPrimary">
                                                    {comment.user.login + '-'}
                                                </Typography>
                                                {comment.body}
                                            </React.Fragment>
                                        }
                                        secondary={formatDate}
                                    />
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}



export default withStyles(styles)(CommentsDialog);