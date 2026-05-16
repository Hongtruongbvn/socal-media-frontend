import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './ResetPasswordPage.scss';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setMessage('Đặt lại mật khẩu thành công!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('Token không hợp lệ hoặc đã hết hạn.');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <div className="reset-icon">🔐</div>
        <h2 className="reset-title">Đặt lại mật khẩu</h2>
        
        {message ? (
          <div>
            <p className={`reset-message ${message.includes('thành công') ? 'success' : 'error'}`}>
              {message}
            </p>
            <Link to="/login">
              <button className="reset-back-btn">🔐 Quay lại Đăng nhập</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reset-form">
            <Input
              type="password"
              placeholder="🔒 Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reset-input"
            />
            <Button type="submit" className="reset-btn">
              Xác nhận
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;