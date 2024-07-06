import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../model/Post";
import DepartmentList from "./DepartmentList";
import { Container, Typography, Paper, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const urlAPI = process.env.VITE_REACT_APP_API_URL!;
      try{
        const response = await axios.get<Post[]>(urlAPI);
      setPosts(response.data);
      console.log(response.data)
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      } 
    }

    fetchPosts();
  }, []);

  const columns: GridColDef<Post>[] = [
    { field: "userId", headerName: "User ID", width: 90 },
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 250, editable: true },
    { field: "body", headerName: "Body", width: 350, editable: true },
  ];

  return (
    <Container maxWidth="lg" sx={{}}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: "#EEE" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          POSTS
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={posts}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
      <Box sx={{ mt: 4 }}>
        <DepartmentList />
      </Box>
    </Container>
  );
};

export default SecondPage;
