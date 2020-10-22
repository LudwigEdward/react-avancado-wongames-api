import React, { useState,useEffect ,memo } from 'react';
import {Header} from '@buffetjs/custom';
import {Table} from '@buffetjs/core';
import pluginId from '../../pluginId';
import styled from 'styled-components';
import axios from 'axios'



const Wrapper = styled.div`
  padding:18px 30px;

  p{
    margin-top:1rem;
  }
`;
const headers = [
  {
    name:"Name",
    value:"name"
  },
  {
    name:"Description",
    value:"description"
  },
  {
    name:"Url",
    value:"html_url"
  },
]
const rows = [
  {
    name:"landing-page",
    description:"Code to the sales landing page.",
    html_url:""
  },
]

const HomePage = () => {
  const [rows,setRows] = useState([]);

  useEffect(() => {
    async function loadData(){
      const response = await axios.get("https://api.github.com/users/React-avancado/repos")
      setRows(response.data);
    }
    loadData();
  },[])

  return (
    <Wrapper>
      <Header title={{label:"Repositories"}} content="A list of repositories of React Avançado Project."/>
      <Table headers={headers} rows={rows}/>
    </Wrapper>
  );
};

export default memo(HomePage);
