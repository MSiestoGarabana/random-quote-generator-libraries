import React from "react";
import { Box, Button, CircularProgress, Card, Typography } from "@mui/material";
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
    <Button onClick={() => doFetch()} variant="contained" align="center">
      New Quote
    </Button>
  );
  const CustomBox = styled(Box)(({ theme }) => ({
    raised: true,
    width: 600,
    margin: 500,
    padding: 50,
  }));
  const CustomCard = styled(Card)(({ theme }) => ({
    margin: 20,
    backgroundColor: "white",
  }));

  if (state.value === undefined)
    return (
      <CustomBox>
        <CustomCard raised="true">
          <div>
            <Typography variant="h2" align="center" color="textPrimary">
              Press the button to start
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              ...
            </Typography>
          </div>
          {fetchButton}
        </CustomCard>
      </CustomBox>
    );
  if (state.loading)
    return (
      <CustomBox>
        <CustomCard raised="true">
          <CircularProgress />
          {fetchButton}
        </CustomCard>
      </CustomBox>
    );
  if (state.error)
    return (
      <CustomBox>
        <CustomCard raised="true">
          <div>Error: {state.error.message}</div>
        </CustomCard>
      </CustomBox>
    );
  return (
    <CustomBox>
      <CustomCard raised="true">
        <div>
          <Typography variant="h4" align="center" color="textPrimary">
            {state.value.content}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
            {state.value.author}
          </Typography>
        </div>
        {fetchButton}
      </CustomCard>
    </CustomBox>
  );
}
export default QuoteAuthorCard;
