import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import "dotenv/config"

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

function createToken(id: number) {
    //@ts-ignore
    return jwt.sign({ id: id }, process.env.MY_SECRET)

}

async function getUserFromToken(token: string) {
    //@ts-ignore
    const decodedData = jwt.verify(token, process.env.MY_SECRET)
    const user = await prisma.user.findUnique({
        //@ts-ignore
        where: { id: decodedData.id },
        include: { post: { include: { comments: true } }, followedBy: true, following: { include: { post: { include: { comments: true } } } } }
    })
    return user
}

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, photo } = req.body

    try {
        const hash = bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            data: { firstName: firstName, lastName: lastName, email: email, password: hash, photo: photo }
        })
        res.send({ user, token: createToken(user.id) })
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { post: { include: { comments: true } }, followedBy: true, following: { include: { post: { include: { comments: true } } } } }
        })
        // @ts-ignore
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (user && passwordMatch) {
            res.send({ user, token: createToken(user.id) })
        }
        else {
            throw Error('Something went wrong!')
        }
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: 'User or password invalid' })
    }
})


app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ''
    try {
        const user = await getUserFromToken(token)
        res.send(user)
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: 'Invalid Token' })
    }
})


app.post('/post', async (req, res) => {
    const { text, dateCreated, likes } = req.body
    const token = req.headers.authorization || ''
    try {
        const user = await getUserFromToken(token)
        const post = await prisma.post.create({
            // @ts-ignore
            data: { text: text, dateCreated: dateCreated, userId: user.id, likes: likes }
        })
        res.send(post)
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.get('/companies', async (req, res) => {
    const companies = await prisma.company.findMany({ include: { jobs: true } })
    res.send(companies)
})


app.post('/comments', async (req, res) => {
    const token = req.headers.authorization || ''
    const { commentText, dateCreated, postId, likes } = req.body
    try {
        const user = await getUserFromToken(token)
        const comment = await prisma.comments.create({
            // @ts-ignore
            data: { commentText: commentText, dateCreated: dateCreated, userId: user.id, postId: postId, likes: likes }
        })
        res.send(comment)
    }
    catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/jobs', async (req, res) => {
    const jobs = await prisma.jobs.findMany({ include: { company: true, user: true } })
    res.send(jobs)
})


app.patch('/connect', async (req, res) => {
    const token = req.headers.authorization || ''
    const { connectionId } = req.body
    try {
        const user = await getUserFromToken(token)
        const updatedUser = await prisma.user.update({
            // @ts-ignore
            where: { id: user.id }
            , data: {
                following: {
                    connect: {
                        id: connectionId
                    }
                }
            },
            include: { post: true, comments: true, followedBy: true, following: true }
        })
        res.send(updatedUser)
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }

})

app.patch('/removeconnection', async (req, res) => {
    const token = req.headers.authorization || ''
    const { connectionId } = req.body
    try {
        const user = await getUserFromToken(token)
        const updatedUser = await prisma.user.update({
            // @ts-ignore
            where: { id: user.id }
            , data: {
                following: {
                    disconnect: {
                        id: connectionId
                    }
                }
            },
            include: { post: true, comments: true, followedBy: true, following: true }
        })
        res.send(updatedUser)

    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }

})

app.patch('/likes/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''

    try {

        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'You need to login before.' })
        }
        else {
            const updatedPost = await prisma.post.update({
                where: { id },
                data: {
                    likes:
                        { increment: 1 }
                }
            })
            res.send(updatedPost)
        }


    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }

})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { post: true, comments: true, followedBy: true, following: true, jobs: true } })
    res.send(users)
})
app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const user = await prisma.user.findFirst({
            where: { id }, include: {
                post: true, comments: true, followedBy: true, following: true
            }
        })
        if (user) {
            res.send(user)
        }
        else {
            res.status(404).send({ error: 'User not found' })
        }
    } catch (error) {
        //@ts-ignore
        res.status(400).send({ error: error.message })
    }
})


app.get('/companies/:id', async (req, res) => {

    const id = Number(req.params.id)
    try {
        const company = await prisma.company.findFirst({
            where: { id },
            include: { jobs: true }
        })
        if (company) {
            res.send(company)
        }
        else {
            res.status(404).send({ error: 'Company not found' })
        }
    } catch (error) {
        //@ts-ignore
        res.status(400).send({ error: error.message })
    }
})

app.listen(4000, () => {
    console.log('Server running: http://localhost:4000')
})