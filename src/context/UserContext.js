import React, { createContext, useState, useEffect } from "react";
import { authenticateUser } from "../helpers/authHelpers/apiCallsAuth";
import {
  getJobs,
  getOwnProjects,
  getUsers,
  getProjects,
} from "../helpers/apiCalls";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authIsDone, setAuthIsDone] = useState(false);
  const [ownProjects, setOwnProjects] = useState([]);
  const [viewProject, setViewProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // here we will store our fetched jobs from API
  const [jobs, setJobs] = useState([]);

  // array of users in data base
  const [usersdb, setUsersdb] = useState([]);

  const auth = async () => {
    try {
      const res = await authenticateUser();

      if (!res.error) {
        setUser(res);
        setAuthIsDone(true);
        return;
      }
      setUser();
      setAuthIsDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobsApi = async () => {
    const res = await getJobs();
    setJobs(res);
  };

  const fetchOwnProjects = async () => {
    const res = await getOwnProjects();
    if (!res.error) {
      setOwnProjects(res);
    } else {
      console.log(res.error);
    }
  };
  const allProjects = async () => {
    try {
      const res = await getProjects();

      if (!res.error) {
        setProjects(res);
        setViewProject(res);
        if (viewProject) {
          setLoading(false);
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const users = await getUsers();
      if (users.error) {
        console.log(users.error);
        return;
      }

      setUsersdb(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth();
    allProjects();
    getJobsApi();
  }, []);

  useEffect(() => {
    getAllUsers();
    allProjects();
    fetchOwnProjects();
    getJobsApi();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authIsDone,
        setAuthIsDone,
        jobs,
        setJobs,
        ownProjects,
        setOwnProjects,
        projects,
        setProjects,
        viewProject,
        setViewProject,
        usersdb,
        setUsersdb,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
