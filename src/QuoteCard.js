import React from "react";
import {
  Button,
  CircularProgress,
  Card,
  Typography,
  Container,
} from "@mui/material";
//import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material";
import { useAsyncFn } from "react-use";

function QuoteAuthorCard() {
  const [state, doFetch] = useAsyncFn(async () => {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    return result;
  }, ["https://api.quotable.io/random"]);

  const fetchButton = (
    <Button
      size="large"
      onClick={() => doFetch()}
      variant="contained"
      border-radius="10px"
      margin="50px"
      position="fixed"
    >
      New Quote
    </Button>
  );

  const CustomCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "auto",
    minHeight: 300,
    minWidth: 600,
    margin: 500,
    marginRight: 300,
    padding: 60,
    boxShadow: "0px 0px 8px ",
  }));
  const ButtonContainer = styled(Container)(({ theme }) => ({
    marginBottom: 30,
    marginTop: 80,
    width: 300,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  }));
  const TextContainer = styled(Container)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: 150,
    padding: 10,
    marginBottom: 0,
  }));

  function GetContent() {
    if (state.value === undefined)
      return (
        <TextContainer>
          <Typography variant="h2" align="center" color="textPrimary">
            Press the button to start
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary">
            ...
          </Typography>
        </TextContainer>
      );
    if (state.loading)
      return (
        <TextContainer>
          <CircularProgress />
        </TextContainer>
      );
    if (state.error)
      return (
        <TextContainer>
          <Typography>Error: {state.error.message}</Typography>
        </TextContainer>
      );
    return (
      <TextContainer>
        <Typography variant="h4" align="center" color="textPrimary">
          {state.value.content}
        </Typography>
        <Typography
          marginTop={"40px"}
          variant="h6"
          align="center"
          color="textSecondary"
        >
          {state.value.author}
        </Typography>
      </TextContainer>
    );
  }

  return (
    <CustomCard>
      <GetContent />
      <ButtonContainer theme={"buttonContainer"}>{fetchButton}</ButtonContainer>
    </CustomCard>
  );
}
export default QuoteAuthorCard;
