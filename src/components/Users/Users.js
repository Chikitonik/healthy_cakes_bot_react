import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import urls from "../../data/urls";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Users = () => {
  const [users, setUsers] = React.useState();
  const [errMsg, setErrMsg] = React.useState();
  const fetchUsers = async () => {
    try {
      const response = await axios.get(urls.USERS_URL, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      console.log("response?.data[0].users >>", response?.data[0].users);
      setUsers(response?.data[0].users);
    } catch (err) {
      console.log("err :>> ", err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", width: 70 },
    { field: "username", width: 130 },
    { field: "password", width: 130 },
    { field: "email", width: 90 },
    { field: "role", width: 50 },
    { field: "first_name", width: 130 },
    { field: "last_name", width: 130 },
    { field: "created_at", width: 130 },
    { field: "updated_at", width: 130 },
    { field: "last_login", width: 130 },
    { field: "is_active", width: 130 },
  ];

  if (users) {
    return (
      <Paper
        elevation={3}
        sx={{
          height: 800,
          width: "80vw",
        }}
      >
        <DataGrid
          rows={users.map((user) => {
            return {
              id: user.id,
              username: user.username,
              password: user.password,
              email: user.email,
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name,
              created_at: user.created_at,
              updated_at: user.updated_at,
              last_login: user.last_login,
              is_active: user.is_active,
            };
          })}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[12]}
          checkboxSelection
        />
      </Paper>
    );
    //   }

    // return (
    //   <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    //       <TableHead>
    //         <TableRow>
    //           {columns.map((column) => (
    //             <TableCell>{column.field}</TableCell>
    //           ))}
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {users.map((user) => (
    //           <TableRow
    //             key={user.id}
    //             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //           >
    //             <TableCell component="th" scope="row">
    //               {user.id}
    //             </TableCell>
    //             <TableCell align="right">{user.username}</TableCell>
    //             <TableCell align="right">{user.email}</TableCell>
    //             <TableCell align="right">{user.role}</TableCell>
    //             <TableCell align="right">{user.first_name}</TableCell>
    //             <TableCell align="right">{user.last_name}</TableCell>
    //             <TableCell align="right">{user.created_at}</TableCell>
    //             <TableCell align="right">{user.updated_at}</TableCell>
    //             <TableCell align="right">{user.last_login}</TableCell>
    //             <TableCell align="right">{user.is_active}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // );
  } else {
    return errMsg;
  }
};
export default Users;
