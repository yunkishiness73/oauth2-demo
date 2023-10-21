import axios from 'axios'
import queryString from 'query-string'

const getGithubLoginUrl = () => {
    const params = queryString.stringify({
        client_id: '70bf40f590aadb11904e',
        redirect_uri: 'http://localhost:3000/github/callback',
        scope: ['read:user', 'user:email'].join(' '), // space seperated string
        allow_signup: true,
    });

    return `https://github.com/login/oauth/authorize?${params}`;
}

const getAccessTokenFromCode = async (code) => {
    const { data } = await axios({
        url: 'https://github.com/login/oauth/access_token',
        method: 'get',
        params: {
          client_id: '70bf40f590aadb11904e',
          client_secret: '2e5596d09a8c7d9032d10c0afbe9b62ae479253d',
          redirect_uri: 'http://localhost:3000/github/callback',
          code,
        },
      });

      const parsedData = queryString.parse(data);
      console.log(parsedData); // { token_type, access_token, error, error_description }
      if (parsedData.error) throw new Error(parsedData.error_description)
      return parsedData.access_token;
} 


export {
    getGithubLoginUrl,
    getAccessTokenFromCode
}