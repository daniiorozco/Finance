import { Box, Button, IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { TableComponent } from "../../components/TableComponent";
import './index.css';

const Customers = () => {
 
  return (
    <>
      <Box>
        <Header />
        <Box component="main">
          <Box
            component="section"
            sx={{ padding: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              
                <Link to="/">
                  {" "}
                  <IconButton
                aria-label="delete"
                color="primary"
              >
                  <ArrowBackIcon />
                  </IconButton>
                </Link>
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineOutlinedIcon />}
                sx={{ marginLeft: "1em", marginTop: "1em" }}
              >
                <Link to="/nuevoCliente">Nuevo Cliente</Link>
              </Button>
            </Box>
            <TableComponent edit='/editarCliente'  />
          </Box>
        </Box>
        <Footer position={'absolute'}/>
      </Box>
    </>
  );
};
export default Customers;
