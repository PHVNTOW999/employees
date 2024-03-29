const {prisma} = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            where: {
                userId: req.user.id
            }
        })

        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
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

const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await prisma.employee.delete({
            where: {
                id
            }
        });

        res.status(204).json('ok')
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const edit = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id

        await prisma.employee.update({
            where: {
                id
            },
            data,
        });

        res.status(204).json('ok')
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const employee = async (req, res) => {
    try {
        const {id} = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        });

        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

module.exports = {
    all,
    add,
    remove,
    edit,
    employee
}