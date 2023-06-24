import React from "react";
import { Typography,useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
            width='100%'
            height="auto"
            alt="Ad"
            src="http://localhost:3001/assets/info4.jpeg"
            style={{borderRadius:"0.75rem",margin:"0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>Some Cosmetics</Typography>
                <Typography color={medium}>Somecosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your Pathway to beauty with stunning wide range of 
                elite jewelleries. Shop now.
            </Typography>
        </WidgetWrapper>
    );
};



export default AdvertWidget;