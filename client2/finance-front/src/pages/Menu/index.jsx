import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";

let data = [
  { route: "/clientes", button: "Clientes" },
  { route: "/prestamos", button: "Prestamos" },
  { route: "/cuotas", button: "Cuotas" },
  { route: "/cobro", button: "Cobro" },
];

export const Menu = () => {
  return (
    <>
      <Box>
        <Header />
        <Box
          component="main"
          sx={{
            height: "400px",
            my: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            my={4}
          >
            Bienvenido. Seleccione la función que desea relizar
          </Typography>
          <Box
            component="section"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {data.map((seccion) => (
              <Button
                key={seccion.route}
                sx={{ my: 2, width: "120px" }}
                variant="contained"
              >
                <Link to={seccion.route}>{seccion.button}</Link>
              </Button>
            ))}
          </Box>
        </Box>
        <Footer position={'absolute'} />
      </Box>
    </>
  );
};
