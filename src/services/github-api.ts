import axios from 'axios';

const fetchGithubAPI = async ({
  fullPath = '',
  path = '',
  params = {},
  method = 'GET',
}) => {
  const requestUrl =
    fullPath || `${process.env.NEXT_PUBLIC_GITHUB_API_URL}${path}`;

  const response = await axios.request({
    headers: { 'Content-Type': 'application/json' },
    params,
    url: requestUrl,
    method,
  });

  return response.data;
};

export default fetchGithubAPI;
