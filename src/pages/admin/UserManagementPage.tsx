import React, { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import './AdminPages.scss';

interface AdminUserView {
  _id: string;
  username: string;
  email: string;
  globalRole: 'USER' | 'MODERATOR' | 'ADMIN';
  accountStatus: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  createdAt: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserView[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Lọc theo tìm kiếm
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleAction = async (userId: string, action: 'warn' | 'suspend' | 'ban' | 'restore') => {
    let payload: any = {};

    if (action === 'warn' || action === 'suspend' || action === 'ban') {
      const reason = prompt(`Nhập lý do cho hành động "${action}":`);
      if (!reason) return;
      payload.reason = reason;
    }

    if (action === 'suspend') {
      const daysStr = prompt("Nhập số ngày tạm khóa:");
      const durationInDays = parseInt(daysStr || "0", 10);
      if (isNaN(durationInDays) || durationInDays <= 0) {
        alert("Số ngày không hợp lệ");
        return;
      }
      payload.durationInDays = durationInDays;
    }

    try {
      await api.post(
        action === 'restore'
          ? `/admin/users/${userId}/restore`
          : `/admin/users/${userId}/${action}`,
        payload
      );
      fetchUsers();
    } catch (error) {
      console.error(`Lỗi khi thực hiện ${action}:`, error);
    }
  };

  if (loading) return (
    <div className="admin-page">
      <p>⏳ Đang tải danh sách người dùng...</p>
    </div>
  );

  return (
    <div className="admin-page">
      <h1>👥 Quản lý Người dùng</h1>

      {/* Thanh tìm kiếm */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '12px 16px',
            borderRadius: 40,
            border: '1px solid #475569',
            background: '#1e293b',
            color: '#e2e2e2',
            outline: 'none'
          }}
        />
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tham gia</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td><strong>{user.username}</strong></td>
                <td>{user.email}</td>
                <td><span className={`role-badge ${user.globalRole.toLowerCase()}`}>{user.globalRole}</span></td>
                <td><span className={`status-badge ${user.accountStatus.toLowerCase()}`}>{user.accountStatus}</span></td>
                <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td className="actions-cell">
                  <button onClick={() => handleAction(user._id, 'warn')}>⚠️ Cảnh cáo</button>
                  <button onClick={() => handleAction(user._id, 'suspend')}>⏸️ Tạm khóa</button>
                  <button onClick={() => handleAction(user._id, 'ban')}>🔒 Khóa</button>
                  <button onClick={() => handleAction(user._id, 'restore')}>🔄 Khôi phục</button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  📭 Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              ⏮️ Đầu
            </button>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              ◀ Trước
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? 'active' : ''}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Sau ▶
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
              Cuối ⏭️
            </button>
            <span className="page-info">
              Trang {currentPage} / {totalPages} | Tổng: {filteredUsers.length} người
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;