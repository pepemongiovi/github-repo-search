import axios from 'axios';

export async function fetchGithubAPI(
  path = '',
  urlParamsObject = {},
  method = 'GET',
) {
  const requestUrl = `${process.env.NEXT_PUBLIC_GITHUB_API_URL}${path}`;
  const response = await axios.request({
    headers: { 'Content-Type': 'application/json' },
    params: urlParamsObject,
    url: requestUrl,
    method,
  });
  return response.data;
}
