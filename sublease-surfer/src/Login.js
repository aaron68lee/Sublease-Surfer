import React, {useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onFinish = async () => {
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            },{withCredentials:true})
            navigate('/profile')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
                console.log(error)

            }
        }
    };

    return (
        <div className='login-form-landing'>
            <div className="login-form-inner">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Button className='facebook-button'>Continue with Facebook</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button className='google-button'>Continue with Google</Button>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button form-submit">
                            Log in
                        </Button>
                        <div className="or-link">
                            <span>Or</span>
                            <Link to='/signup'>register now!</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm