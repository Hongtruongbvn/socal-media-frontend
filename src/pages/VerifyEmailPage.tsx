import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './StatusPages.scss';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Đang xác thực email của bạn...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Không tìm thấy token xác thực. Vui lòng kiểm tra lại email.');
      return;
    }

    // Gọi API backend để xác thực
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Xác thực thất bại');
        }

        // Nếu backend trả về HTML, chúng ta cần xử lý
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          // Nếu backend trả HTML, thay thế toàn bộ trang
          const html = await response.text();
          document.open();
          document.write(html);
          document.close();
          return;
        }

        // Nếu backend trả JSON
        const data = await response.json();
        setStatus('success');
        setMessage(data.message || 'Xác thực thành công!');
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (err: any) {  
        setStatus('error');
        setMessage(err.message || 'Token không hợp lệ hoặc đã hết hạn.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="status-page">
      <div className={`status-card ${status}`}>
        <div className="status-icon">
          {status === 'success' ? '✅' : status === 'error' ? '❌' : '⏳'}
        </div>

        <h2>
          {status === 'success'
            ? 'Thành công!'
            : status === 'error'
            ? 'Thất bại!'
            : 'Đang xử lý...'}
        </h2>

        <p>{message}</p>

        {status === 'error' && (
          <div className="action-buttons">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              🔐 Về trang Đăng nhập
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
              style={{ marginLeft: '10px' }}
            >
              🔄 Thử lại
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>Đang chuyển hướng...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;