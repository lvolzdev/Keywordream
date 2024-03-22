import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading({ loading }) {
  return loading ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 10,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  ) : (
    <></>
  );
}
