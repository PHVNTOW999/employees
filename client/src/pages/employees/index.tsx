// @ts-ignore
import {Employee} from "@prisma/client";
import Layout from "../../components/layout";
import CustomBtn from "../../components/UI/BTN";
import {PlusCircleOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {useGetAllEmployeesQuery} from "../../app/services/employees";
import type {ColumnsType} from "antd/es/table";
import {useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";

const columns: ColumnsType<Employee> = [
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
]

export const Employees = () => {
    const {data, isLoading} = useGetAllEmployeesQuery();
    const navigate = useNavigate();

    const user = useSelector(selectUser)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [navigate, user])

    const goToAddUser = () => navigate(Paths.employeeAdd)

    return (
        <Layout>
            <CustomBtn type="primary" onClick={goToAddUser} icon={<PlusCircleOutlined />}>Add</CustomBtn>
            <Table loading={isLoading}
                   dataSource={data}
                   columns={columns}
                   rowKey={(el) => el.id}
                   onRow={(el) => {
                       return { onClick: () => navigate(`${Paths.employee}/${el.id}`) }
                   }}
                   pagination={false} />
        </Layout>
    );
};
