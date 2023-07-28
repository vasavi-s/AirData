// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const BrandName = styled.span`
  font-size: 1.5rem;
`;

const Button = styled.button`
  background-color: #fff;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ddf;
  padding: 15px;
  border-radius: 10px;
`;

const Loader = styled.div`
  display: inline-block;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;

`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users data:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Navbar>
        <BrandName>AirData</BrandName>
        <Button onClick={getUsersData} disabled={loading}>
          {loading ? <Loader /> : 'Get users'}
        </Button>
      </Navbar>
      <GridContainer>
        {users.map(user => (
          <UserCard key={user.id}>
            <img src={user.avatar} alt={`User ${user.first_name}`} />
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p>Email: {user.email}</p>
          </UserCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default App;
