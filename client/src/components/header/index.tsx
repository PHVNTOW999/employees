import styles from './index.module.css';
import {Button, Layout, Space, Typography} from "antd";
import {LoginOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import CustomBtn from "../UI/BTN";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../features/auth/authSlice";

export const Header = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogoutClick = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Layout.Header className={styles.header}>
            <Space>
                <TeamOutlined className={styles.teamIcon}/>
                <Link to={Paths.home}>
                    <Typography.Title level={2}>Employees</Typography.Title>
                </Link>
            </Space>
            {
                user ? (
                    <CustomBtn icon={<LoginOutlined/>} onClick={onLogoutClick}>Exit</CustomBtn>
                ) : (
                    <Space>
                        <Link to={Paths.register}>
                            <CustomBtn type='default' icon={<UserOutlined/>}>Registration</CustomBtn>
                        </Link>
                        <Link to={Paths.login}>
                            <CustomBtn type='default' icon={<LoginOutlined/>}>Login</CustomBtn>
                        </Link>
                    </Space>
                )
            }
        </Layout.Header>
    );
};
