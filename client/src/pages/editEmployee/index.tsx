// @ts-ignore
import {Employee} from "@prisma/client";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useEditEmployeeMutation, useGetEmployeeQuery} from "../../app/services/employees";
import Layout from "../../components/layout";
import {Row} from "antd";
import {CustomForm} from "../../components/UI/FORM";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/error";

export const EditEmployee = () => {
    const navigate = useNavigate();
    const params = useParams<{id: string}>();
    const [error, setError] = useState('');
    const {data, isLoading} = useGetEmployeeQuery(params.id || "")
    const [editEmployee] = useEditEmployeeMutation();

    if(isLoading) {
        return <span>Loading</span>
    }

    const handleEditUser = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...data,
                ...employee
            }

            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/updated`);
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            if(maybeError) {
                setError(error.data.message)
            } else {
                setError('Unknown Error')
            }
        }
    }
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <CustomForm onFinish={handleEditUser}
                            btnText='Edit' title='Edit
                            employee' error={error}
                            employee={data}/>
            </Row>
        </Layout>
    );
};
