import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.scss';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      toast.success('✅ Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || '❌ Đăng ký thất bại');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-icon">📝</div>
        <h2 className="register-title">Tạo tài khoản</h2>
        
        <form onSubmit={handleSubmit} className="register-form">
          <Input
            placeholder="👤 Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
          <Input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <Input
            type="password"
            placeholder="🔒 Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <Button type="submit" className="register-btn">
            Đăng ký
          </Button>
        </form>
        
        <div className="register-footer">
          <span>
            Đã có tài khoản?{' '}
            <Link to="/login" className="register-link">
              Đăng nhập
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;