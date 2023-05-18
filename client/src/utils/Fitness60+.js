import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fitness60Plus = () => {
  const [repositoryData, setRepositoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/404ismagic/FITNESS-FOR-60-PLUS'
        );
        setRepositoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching repository data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Fitness 60+ Repository</h1>
      <h2>Name: {repositoryData.name}</h2>
      <h3>Description: {repositoryData.description}</h3>
      <h4>Stars: {repositoryData.stargazers_count}</h4>
      <h4>Open Issues: {repositoryData.open_issues_count}</h4>
      <h4>Created At: {repositoryData.created_at}</h4>
      {/* Add more components or logic to display other relevant data from the repository */}
    </div>
  );
};

export default Fitness60Plus;
