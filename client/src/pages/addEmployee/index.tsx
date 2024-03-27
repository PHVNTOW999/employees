// @ts-ignore
import {Employee} from "@prisma/client";
import Layout from "../../components/layout";
import {Row} from "antd";
import {CustomForm} from "../../components/UI/FORM";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useAddEmployeeMutation} from "../../app/services/employees";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/error";

export const AddEmployee = () => {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation()

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [navigate, user])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();

            navigate(`${Paths.status}/created`)
        } catch(error) {
            const maybeError = isErrorWithMessage(error)
            if(maybeError) {
                setError(error.data.message)
            } else {
                setError('Unknown error')
            }
        }
    }
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <CustomForm title='Add Employee'
                            btnText='Add'
                            onFinish={handleAddEmployee}
                            error={error} />
            </Row>
        </Layout>
    );
};
