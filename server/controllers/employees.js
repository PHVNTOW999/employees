const {prisma} = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const employee = await prisma.employees.findMany()

        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const add = async (req, res) => {
    try {
        const data = req.body;

        if(!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({
                message: 'All inputs is required!'
            })
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });

        return res.status(201).json(employee)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    all,
    add
}