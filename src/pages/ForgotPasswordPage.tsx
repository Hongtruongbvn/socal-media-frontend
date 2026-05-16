import React, { useState } from 'react';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.scss';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-icon">🔑</div>
        <h2 className="forgot-title">Quên mật khẩu</h2>
        
        {message ? (
          <div className="forgot-success-box">
            <p className="forgot-message">{message}</p>
            <Link to="/login">
              <button className="forgot-back-btn">🔐 Quay lại Đăng nhập</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-form">
            <p className="forgot-desc">
              Nhập email của bạn để nhận link đặt lại mật khẩu.
            </p>
            <Input
              type="email"
              placeholder="📧 Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="forgot-input"
            />
            <Button type="submit" className="forgot-btn" disabled={isLoading}>
              {isLoading ? '⏳ Đang gửi...' : '📧 Gửi yêu cầu'}
            </Button>
          </form>
        )}
        
        <div className="forgot-footer">
          <Link to="/login" className="forgot-link">
            ← Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;