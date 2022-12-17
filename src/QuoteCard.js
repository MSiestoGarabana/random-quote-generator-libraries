import React from "react";
import { Card, Button, CircularProgress } from "@mui/material";
import { useAsyncFn } from "react-use";

function QuoteAuthorCard() {
  const [state, doFetch] = useAsyncFn(async () => {
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();
    return result;
  }, ["https://api.quotable.io/random"]);

  return (
    <Card>
      <div>
        {state.value === undefined ? (
          <div>
            <h1>Press the button to start</h1>
            <h2>...</h2>
          </div>
        ) : state.loading ? (
          <div>
            <CircularProgress />
          </div>
        ) : state.error ? (
          <div>Error: {state.error.message}</div>
        ) : (
          <div>
            <h1>{state.value.content}</h1>
            <h2>{state.value.author}</h2>
          </div>
        )}
        <Button onClick={() => doFetch()} variant="outlined">
          Button
        </Button>
      </div>
    </Card>
  );
}
export default QuoteAuthorCard;
