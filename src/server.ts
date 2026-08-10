import { app } from "./app";

const port = Number(process.env.PORT) || 3000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log("Server running");
});