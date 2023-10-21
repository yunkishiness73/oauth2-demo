import express from 'express'
const app = express()
const port = 3000
import * as githubServices from './github.js'
import cors from 'cors'

app.use(express.json());
app.use(cors())

app.get('/github/login-url', async (req, res) => {    
    return res.status(200).json({
        url: githubServices.getGithubLoginUrl(),
    })
})

app.get('/github/callback', async (req, res) => {
    const { code } = req.query
    console.log(code)
});

app.post('/github/token', async (req, res) => {
    const { code } = req.body
    console.log(code)
    const accessToken = await githubServices.getAccessTokenFromCode(code)
    return res.status(200).json({
        accessToken,
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})