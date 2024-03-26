import { Box, CircularProgress } from "@mui/material";

export default function Loading() {

  return (
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
  )
}
