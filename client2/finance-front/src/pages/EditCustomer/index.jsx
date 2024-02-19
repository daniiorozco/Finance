import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const EditCustomer = () => {
  return (
    <>
    <Box component='main'>
        <Header />
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{width:'100%', paddingLeft:'20px',paddingTop:'10px'}}>
            <Link to="/clientes">
                  {" "}
                  <IconButton
                aria-label="delete"
                color="primary"
              >
                  <ArrowBackIcon />
                  </IconButton>
                </Link>
                </Box>
          <Typography
            variant="h6"
            sx={{ m: "20px" }}
          >
            Editar Cliente
          </Typography>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { md: "50%" },
              }}
            >
              <TextField
                sx={{ my: "20px" }}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
              />
              <TextField
                sx={{ my: "20px" }}
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
              />
              <TextField
                sx={{ my: "20px" }}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
              />
              <TextField
                sx={{ marginTop: "20px" }}
                id="outlined-basic"
                label="Dirección"
                variant="outlined"
              />
              <Box sx={{display:'flex',justifyContent:'center', width:'100%'}}>
              <Button
                sx={{ my: 2, width: "120px" }}
                variant="contained"
              >
                Guardar
              </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer position="absolute"/>
       
    </Box>
    </>
  )
}