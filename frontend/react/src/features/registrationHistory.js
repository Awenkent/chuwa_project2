import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

export default function registrationHistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [profiles, setProfiles] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistoryData();
    fetchProfiles();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/HR/registrationHistory",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          mode: "cors",
          cache: "default",
        }
      );
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setHistoryData(data);
      } else {
        throw new Error("Failed to fetch history data");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://localhost:4000/HR/allProfiles", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
        mode: "cors",
        cache: "default",
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        throw new Error("Failed to fetch profiles");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Convert to human-readable format
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registration History</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Registration Link</TableCell>
              <TableCell>signup</TableCell>
              <TableCell>Profile Submission</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((item) => {
              // Find the corresponding profile
              const profile = profiles.find(
                (profile) => profile.email === item.email
              );
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <a
                      href={item.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.registrationLink}
                    >
                      Registration Link
                    </a>
                  </TableCell>
                  <TableCell>{item.submitted ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {profile
                      ? profile.applicationStatus === "Never Submitted"
                        ? "Not submitted"
                        : "Profile submitted"
                      : "Not sign up Yet"}
                  </TableCell>
                  <TableCell>{formatDate(item.time)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
