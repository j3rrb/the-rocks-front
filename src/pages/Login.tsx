import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setAuth } from "../redux/slices/auth";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    user: "",
    pass: "",
  });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { pass, user } = loginData;

    if (user.toLowerCase() === "usipav" && pass === "123") {
      dispatch(
        setAuth({
          authenticated: true,
          company: "USIPAV",
        })
      );
      window.location.replace("/");
    }

    return;
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "50vw",
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            padding: 2,
            width: "100%",
          }}
          elevation={4}
        >
          <Typography
            variant="h4"
            marginBottom={5}
            fontFamily="sans-serif"
            textAlign="start"
          >
            Login
          </Typography>
          <Stack gap={2} marginBottom={4}>
            <TextField
              color="warning"
              variant="outlined"
              fullWidth
              placeholder="Usuário"
              onChange={(e) => {
                setLoginData((prev) => ({ ...prev, user: e.target.value }));
              }}
            />
            <TextField
              color="warning"
              variant="outlined"
              fullWidth
              placeholder="Senha"
              type="password"
              onChange={(e) => {
                setLoginData((prev) => ({ ...prev, pass: e.target.value }));
              }}
            />
          </Stack>
          <Button type="submit" color="warning" fullWidth variant="contained">
            <Typography color="black">Entrar</Typography>
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};
