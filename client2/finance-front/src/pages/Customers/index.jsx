import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { TableComponent } from "../../components/TableComponent";
import './index.css';
import { fetchCustomers } from '../../store/slices/customersSlice';


const Customers = () => {
  // Obtener datos de clientes del store de Redux
  const dispatch = useDispatch();
  const { list: customers, loading, error } = useSelector((state) => state.customers);
 
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) return <div>Cargando clientes...</div>;
  if (error) return <div>Error: {error}</div>;
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
            <TableComponent data={customers} edit='/editarCliente'  />
          </Box>
        </Box>
        <Footer position={'absolute'}/>
      </Box>
    </>
  );
};
export default Customers;
