import React from "react";
import InboxLeftSide from "../widgets/InboxLeftandRightSide";
import InboxRightSide from "../widgets/InboxRightSide";
import { useMediaQuery,useTheme,Typography,InputBase,IconButton, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const InboxPage = () => {
    const Navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const {palette} = useTheme();
    const neutralLight = palette.neutral.light;
    const primaryLight = palette.primary.light;
    const alt=palette.background.alt;
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return(
        <Box>
            <FlexBetween  padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => Navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            SocialApp
          </Typography>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        </FlexBetween>
        <Box  justifyContent="center" gap="2rem">
        <InboxLeftSide userId={_id}/>
      
        </Box>

        
        </Box>
        
        
       
    );
}

export default InboxPage;