import React from 'react'
import { Button } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, rgb(156, 5, 5) 30%, #294d5d 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: theme.spacing(5 , 0 , 2)
    }
}))

const SubmitButton = ({children , ...props}) => {
    const styles = useStyles();

    return <Button type="submit" fullWidth className={styles.root} variant="contained" {...props}>
        {children}
    </Button>
}

export default SubmitButton
