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

app.listen(4000, () => {
    console.log('Server running: http://localhost:4000')
})