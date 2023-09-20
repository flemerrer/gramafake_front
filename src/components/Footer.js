import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {


    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © Gramafake '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <>
            <Box sx={{ pb: 7 }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation>
                        <Typography display="flex" justifyContent="center" alignItems="center">
                            <Copyright />
                        </Typography>
                    </BottomNavigation>
                </Paper>
            </Box>
        </>
        )
}