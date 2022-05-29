import { Button, makeStyles } from "@mui/material";

import React, { useState, useEffect } from 'react';

const useStyles = makeStyles({
    button: {
        padding: [10, 5],
        fontWeight: 'bold'
    },
    halfWidth: {
        width: '50%',
        padding: [10, 5],
        fontWeight: 'bold',
        justifySelf: 'center'
    }
});

const CustomButton = (props) => {
    const { onClick, children, type, variant, size, color, fullWidth, halfWidth, disabledd } = props;
    const classes = useStyles();

    return (
        <Button
            fullWidth={fullWidth ? true : false}
            onClick={onClick}
            variant={variant == null ? null : (variant ? variant : "contained")}
            color={color ? color : "primary"}
            size={size || "medium"}
            disabled={disabledd && true}

        >
            {children}
        </Button>
    );
}

export default CustomButton;