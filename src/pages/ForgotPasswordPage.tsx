import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

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
    <>
      <h2>Quên mật khẩu</h2>
      <p className="auth-desc">Nhập email của bạn để nhận link đặt lại mật khẩu.</p>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="📧 Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        
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
      <div className="form-footer">
        <Link to="/login" className="link">
          ← Quay lại Đăng nhập
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordPage;