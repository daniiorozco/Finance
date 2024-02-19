import { Box, Typography } from "@mui/material";

const Footer = ({ position='inherit' }) => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          height: "50px",
          bgcolor: "#333333",
          width: "100%",
          position: {position},
          bottom: 0,
        }}
        textAlign="center"
      >
        <Typography
          component="h6"
          color={"white"}
          fontFamily="Long Cang"
          marginTop={2}
        >
          By Daniela❤
        </Typography>
      </Box>
    </>
  );
};
export default Footer;
