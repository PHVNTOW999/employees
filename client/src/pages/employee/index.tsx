import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from "../../app/services/employees";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import Layout from "../../components/layout";
import {Descriptions, Divider, Modal, Space} from "antd";
import CustomBtn from "../../components/UI/BTN";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Error} from "../../components/error";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/error";

export const Employee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const params = useParams<{id: string}>();
    const navigate = useNavigate();
    const {data, isLoading} = useGetEmployeeQuery(params.id || "")
    const [removeEmployee] = useRemoveEmployeeMutation();
    const user = useSelector(selectUser)

    if(isLoading) {
        return <span>Loading</span>
    }
    if(!data) {
        return <Navigate to='/' />
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const hideModal = () => {
        setIsModalOpen(false);
    }

    const handleDeleteUser = async () => {
        hideModal();

        try {
            await removeEmployee(data.id).unwrap();
            navigate(`${Paths.status}/deleted`)
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
            <Descriptions title={`Information about ${data.firstName}`} bordered>
                <Descriptions.Item label='Name' span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label='Age' span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label='Address' span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data.userId && (
                    <>
                        <Divider orientation='left'>Actions</Divider>
                        <Space>
                            <Link to={`/employee/edit/${data.id}`}>
                                <CustomBtn shape='round'
                                           type='default'
                                           icon={<EditOutlined />}>
                                    Edit
                                </CustomBtn>
                            </Link>
                            <CustomBtn shape='round'
                                       danger
                                       onClick={showModal}
                                       icon={<DeleteOutlined />}>
                                Delete
                            </CustomBtn>
                        </Space>
                    </>
                )
            }
            <Error message={error}/>
            <Modal
                title='Confirm deletion'
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText='Confirm'
                cancelText='Cancel'>
                Are you're really wanna delete the employee?
            </Modal>
        </Layout>
    );
};