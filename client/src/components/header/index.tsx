import styles from './index.module.css';
import {Button, Layout, Space, Typography} from "antd";
import {LoginOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import CustomBtn from "../UI/BTN";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

export const Header = () => {
    return (
        <Layout.Header className={styles.header}>
            <Space>
                <TeamOutlined className={styles.teamIcon}/>
                <Link to={Paths.home}>
                    {/*<CustomBtn type='default'>*/}
                        <Typography.Title level={2}>Employees</Typography.Title>
                    {/*</CustomBtn>*/}
                </Link>
            </Space>
            <Space>
                <Link to={Paths.register}>
                    <CustomBtn type='default' icon={<UserOutlined/>}>Registration</CustomBtn>
                </Link>
                <Link to={Paths.login}>
                    <CustomBtn type='default' icon={<LoginOutlined/>}>Login</CustomBtn>
                </Link>
            </Space>
        </Layout.Header>
    );
};
