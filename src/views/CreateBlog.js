import React, { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import Editor from "@monaco-editor/react";
import Markdown from "../components/Markdown";

import "../styles/CreateBlog.css";
import Cookies from "universal-cookie";


const sampleBlog = `# Hello World

- this is a list item.

`

const CreateBlog = (props) => {
    const cookie = new Cookies();
    const [blogTitle, setBlogTitle] = useState("");
    const [blog, setBlog] = useState(sampleBlog);
    const [info, setInfo] = useState("");

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:3000/api/v1/blog/new", {
            method:"POST",
            headers: {
                "content-type": "application/json",
                "authorization": `bearer ${cookie.get("jwt")}`
            },
            body: JSON.stringify({ blogBody: blog, blogTitle })
        });
        
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }

    return (
        <Box className="create-blog-wrapper">
            <Box component={Paper}>
                <Box className="controls flex-row-gap align-center">
                    <TextField label="Blog title" size="small" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}/>
                    <Button onClick={handleSubmit} variant="contained"> Create new Blog </Button>
                </Box>
                <Box className="create-blog">
                    <Editor
                        options={{
                            minimap: {
                                enabled: false
                            }
                        }}
                        height="80vh"
                        width="90%"
                        language={"markdown"}
                        value={blog}
                        onChange={(e) => setBlog(e)}
                        className="editor"
                        />
                    <Markdown statement={blog} />
                </Box> 
            </Box>
        </Box>
    );
}
 
export default CreateBlog;