import React from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import { useAsyncFn } from "react-use";

function QuoteAuthorCard() {
  const [state, doFetch] = useAsyncFn(async () => {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    return result;
  }, ["https://api.quotable.io/random"]);

  if (state.value === undefined)
    return (
      <Container fixed>
        <div>
          <h1>Press the button to start</h1>
          <h2>...</h2>
        </div>
        <Button onClick={() => doFetch()} variant="outlined">
          Button
        </Button>
      </Container>
    );
  if (state.loading === true)
    return (
      <Container>
        <CircularProgress />
        <Button onClick={() => doFetch()} variant="outlined">
          Button
        </Button>
      </Container>
    );
  if (state.error === true)
    return (
      <Container>
        <div>Error: {state.error.message}</div>
      </Container>
    );
  return (
    <Container maxWidth="xs">
      <div>
        <h1>{state.value.content}</h1>
        <h2>{state.value.author}</h2>
      </div>
      <Button onClick={() => doFetch()} variant="outlined">
        Button
      </Button>
    </Container>
  );
}
export default QuoteAuthorCard;
