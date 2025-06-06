import React from "react";
import { Main } from "../../components/SideBarPages";
import { UserCardInfo } from "../../components/UserInfo";
import { AbonoForm } from "../../components/Abono/AbonoForm";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUser } from "../../hooks/useUser";
import { Greeting } from "../../components/saudacao";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export const SolicitarAbonoPage = () => {
  const navigate = useNavigate();
  const { userData, loadingUser, errorUser } = useUser();
  const currentDate = "14/05/2025";
  const [showForm, setShowForm] = React.useState(false);

  const handleSolicitarAbonoClick = () => {
    console.log("Botão Solicitar Abono clicado!");
    setShowForm(true);
  };
  if (loadingUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Carregando dados do usuário...</Typography>
      </Box>
    );
  }
  if (errorUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{errorUser}</Typography>
      </Box>
    );
  }
  if (!userData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>
          Nenhum dado de usuário disponível. Por favor, faça login novamente.
        </Typography>
        <Button onClick={() => navigate("/")}>Ir para Login</Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
        }}
      >
        <Box sx={{ marginBottom: "2.5rem", marginLeft: 3 }}>
          <Greeting name={userData.name || "usuário"} />
        </Box>
      </Box>
      <Box
        sx={{ marginLeft: "1.7rem", marginTop: "-4.5rem", pr: 3.5, pl: 1.5 }}
      >
        <UserCardInfo {...userData} cardWidth="100%" />
      </Box>
      <Main>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 3,
            mb: -3,
            paddingLeft: "1.8rem",
          }}
        >
          <Divider
            orientation="vertical"
            sx={{ height: "20px", width: "3px", bgcolor: "#5D3998", mr: 0.5 }}
          />
          <Typography variant="h6" color="textSecondary">
            Solicitar Abono
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          {" "}
          <Typography variant="body2">{currentDate}</Typography>
        </Box>

        {!showForm ? (
          <Button
            variant="contained"
            onClick={handleSolicitarAbonoClick}
            sx={{ mt: 3, backgroundColor: "rgba(105, 69, 164)" }}
          >
            Solicitar Abono
          </Button>
        ) : (
          <AbonoForm />
        )}
      </Main>
    </>
  );
};
