import React from "react";
import { Box,Typography,useTheme,useMediaQuery } from "@mui/material";
import Form from "./Form";



const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            SocialApp
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap="4rem" position="relative">
          
          <Box
          width="60%"
          p="2rem"
          m="2rem"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to SocialApp,the next evolution in the world of social media!!!
          </Typography>
          <Form />
        </Box>
          
          
        </Box>
        
        
        
      </Box>
    );
  };
  
  export default LoginPage;
