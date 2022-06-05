import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const router = express.Router();

const prisma = new PrismaClient();

router.use("/add", async (req, res) => {
    const name = req.query.name as string;

    res.setHeader("Content-Type", "application/json");

    if (!name) {
        res.send({error: "Name must not be empty"});
        return;
    }

    const user = await prisma.user.create({
        data: {
            name: name,
        }
    });

    res.send(JSON.stringify(user));
});

router.use("/", async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                gt: 0,
            }
        }
    });

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(users));
});

app.use("/api/user", router);

app.listen(3000, () => console.log('user microservice started on port 3000'));
