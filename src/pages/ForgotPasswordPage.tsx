import React, { useState } from 'react';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import './AuthPages.scss';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Quên mật khẩu?</h1>
          <p>Đừng lo lắng! Hãy nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.</p>
          <button 
            className="auth-left-btn"
            onClick={() => window.location.href = '/login'}
          >
            Quay lại Đăng nhập
          </button>
        </div>
        
        <div className="auth-right">
          <h2>Khôi phục mật khẩu</h2>
          <p className="auth-desc">Nhập email của bạn để nhận link đặt lại mật khẩu.</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              type="email"
              placeholder="📧 Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {isLoading ? '⏳ Đang gửi...' : '📧 Gửi yêu cầu'}
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

export default ForgotPasswordPage;