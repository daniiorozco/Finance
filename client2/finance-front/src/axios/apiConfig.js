import api from "./apiManager";

const apiUrls = {
  //clientes
  Customers: "/clientes",
  //prestamo
  loan: "/prestamos",
  //cuotas
  quota: "/cuotas",
  //saldo
  balance: "/saldo",
};

export const getCustomers = async () => {
  try {
    const response = await api.get(`${apiUrls.Customers}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
