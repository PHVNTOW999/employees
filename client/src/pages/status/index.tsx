import {Link, useParams} from "react-router-dom";
import {Button, Result, Row} from "antd";

const Statuses: Record<string, string> = {
    created: 'User is created!',
    updated: 'User is updated',
    deleted: 'User is deleted'
}

export const Status = () => {
    const {status} = useParams();
    return (
        <Row align='middle' justify='center' style={{width: '100%'}}>
            <Result status={status ? 'success' : 404}
                    title={status ? Statuses[status] : 'Unknown'}
                    extra={
                        <Button key='dashboard'>
                            <Link to='/'>Main page</Link>
                        </Button>
                    }
            />
        </Row>
    );
};
