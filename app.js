import express from 'express'
const app = express()
const port = 3000
import * as githubServices from './github.js'

app.use(express.json());

app.get('/github/login-url', async (req, res) => {    
    return res.status(200).json({
        url: githubServices.getGithubLoginUrl(),
    })
})

app.get('/github/callback', async (req, res) => {
    const { code } = req.query
    const accessToken = await githubServices.getAccessTokenFromCode(code)
    return res.status(200).json({
        accessToken,
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})