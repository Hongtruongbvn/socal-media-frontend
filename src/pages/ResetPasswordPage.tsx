import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

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
    <>
      <h2>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="🔒 Mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {isLoading ? '⏳ Đang xử lý...' : 'Xác nhận'}
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

export default ResetPasswordPage;