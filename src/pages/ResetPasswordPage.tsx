import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import './AuthPages.scss';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setMessage('Đặt lại mật khẩu thành công!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('Token không hợp lệ hoặc đã hết hạn.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Đặt lại mật khẩu</h1>
          <p>Nhập mật khẩu mới của bạn để tiếp tục sử dụng tài khoản.</p>
          <button 
            className="auth-left-btn"
            onClick={() => navigate('/login')}
          >
            Quay lại Đăng nhập
          </button>
        </div>
        
        <div className="auth-right">
          <h2>Tạo mật khẩu mới</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              type="password"
              placeholder="🔒 Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            
            {/* Vùng cố định cho thông báo */}
            <div className="auth-message-area">
              {message && (
                <p className={`auth-message ${isError ? 'error' : 'success'}`}>
                  {message}
                </p>
              )}
            </div>
            
            <Button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? '⏳ Đang xử lý...' : 'Xác nhận'}
            </Button>
          </form>
          
          <div className="auth-footer">
            <Link to="/login" className="auth-link">
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;