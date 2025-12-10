# Hướng Dẫn Đăng Nhập và Đăng Ký - Frontend

## Tổng Quan

API hỗ trợ 3 phương thức xác thực:
1. **Đăng nhập Local** (Email/Password)
2. **Đăng nhập Google OAuth**
3. **Đăng ký** (Tạo tài khoản mới)

**Base URL:** `http://localhost:8080/api/v1`

---

## 1. Đăng Nhập Local (Email/Password)

### Endpoint
```
POST /api/v1/auth/local/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Thành Công (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Response Lỗi (400 Bad Request)
```json
{
  "error": "Key: 'Email' Error:Field validation for 'Email' failed on the 'email' tag"
}
```

### Response Lỗi (401 Unauthorized)
```json
{
  "error": "Invalid credentials"
}
```

### Ví Dụ Code (JavaScript/TypeScript)

#### Sử dụng Fetch API
```javascript
async function localLogin(email, password) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/local/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      // Lưu token vào localStorage hoặc state management
      localStorage.setItem('token', data.token);
      return { success: true, token: data.token };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sử dụng
localLogin('test@example.com', 'pass')
  .then(result => {
    if (result.success) {
      console.log('Đăng nhập thành công!');
      // Redirect hoặc cập nhật UI
    } else {
      console.error('Lỗi:', result.error);
    }
  });
```

#### Sử dụng Axios
```javascript
import axios from 'axios';

async function localLogin(email, password) {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/auth/local/login',
      {
        email: email,
        password: password
      }
    );
    
    // Lưu token
    localStorage.setItem('token', response.data.token);
    
    // Cấu hình axios để tự động gửi token trong các request sau
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    return { success: true, token: response.data.token };
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data.error };
    }
    return { success: false, error: error.message };
  }
}
```

---

## 2. Đăng Nhập Google OAuth

### Quy Trình OAuth Flow

Google OAuth sử dụng flow redirect:
1. **Bước 1:** User click "Đăng nhập với Google" → Redirect đến backend endpoint
2. **Bước 2:** Backend redirect đến Google để xác thực
3. **Bước 3:** Google redirect về backend callback với code
4. **Bước 4:** Backend xử lý code và **redirect về frontend URL với token**
5. **Bước 5:** Frontend nhận token từ URL và lưu vào storage

### Endpoint: Bắt đầu Google Login
```
GET /api/v1/auth/google/login
```

**Lưu ý:** Endpoint này sẽ redirect trực tiếp đến Google. Sau khi xác thực thành công, backend sẽ redirect về frontend URL.

### Cấu Hình Frontend URL

Backend cần biết URL của frontend để redirect về sau khi đăng nhập thành công. Cấu hình trong file `.env`:

```env
FRONTEND_URL=http://localhost:3000
```

### Luồng Hoạt Động

```
User → Click "Login with Google"
  ↓
Frontend: window.location.href = '/api/v1/auth/google/login'
  ↓
Backend: Redirect đến Google OAuth
  ↓
Google: User xác thực
  ↓
Google: Redirect về /api/v1/auth/google/callback?code=xxx
  ↓
Backend: Xử lý code, tạo/đăng nhập user, tạo JWT token
  ↓
Backend: Redirect về FRONTEND_URL/auth/callback?token=xxx
  ↓
Frontend: Nhận token từ URL, lưu vào localStorage, redirect đến trang chính
```

### Cách Triển Khai ở Frontend

#### Bước 1: Tạo trang Callback để xử lý token

Tạo route `/auth/callback` trong frontend để nhận token từ URL:

**React Router Example:**
```jsx
// App.js hoặc router config
<Route path="/auth/callback" element={<AuthCallback />} />
```

**Vue Router Example:**
```javascript
{
  path: '/auth/callback',
  component: AuthCallback
}
```

#### Bước 2: Component xử lý callback

**React Example:**
```jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Xử lý lỗi
      console.error('Lỗi đăng nhập:', error);
      localStorage.removeItem('token');
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token) {
      // Lưu token
      localStorage.setItem('token', token);
      
      // Cấu hình axios/interceptor để tự động gửi token
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Lấy thông tin user (optional)
      // fetchUserProfile(token);
      
      // Redirect đến trang chính
      navigate('/dashboard');
    } else {
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <p>Đang xử lý đăng nhập...</p>
    </div>
  );
}

export default AuthCallback;
```

**Vue Example:**
```vue
<template>
  <div>
    <p>Đang xử lý đăng nhập...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.handleCallback();
  },
  methods: {
    handleCallback() {
      const token = this.$route.query.token;
      const error = this.$route.query.error;

      if (error) {
        console.error('Lỗi đăng nhập:', error);
        localStorage.removeItem('token');
        this.$router.push({ path: '/login', query: { error } });
        return;
      }

      if (token) {
        localStorage.setItem('token', token);
        // Cấu hình axios
        // this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$router.push('/dashboard');
      } else {
        this.$router.push({ path: '/login', query: { error: 'no_token' } });
      }
    }
  }
};
</script>
```

#### Bước 3: Button đăng nhập Google

**React Example:**
```jsx
function LoginPage() {
  const handleGoogleLogin = () => {
    // Redirect đến backend endpoint
    window.location.href = 'http://localhost:8080/api/v1/auth/google/login';
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="google-btn">
        Đăng nhập với Google
      </button>
    </div>
  );
}
```

**Vue Example:**
```vue
<template>
  <button @click="handleGoogleLogin" class="google-btn">
    Đăng nhập với Google
  </button>
</template>

<script>
export default {
  methods: {
    handleGoogleLogin() {
      window.location.href = 'http://localhost:8080/api/v1/auth/google/login';
    }
  }
};
</script>
```

### Response từ Backend

**Thành công:** Backend redirect về:
```
http://localhost:3000/auth/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Lỗi:** Backend redirect về:
```
http://localhost:3000/auth/callback?error=no_code_provided
```
hoặc
```
http://localhost:3000/auth/callback?error=invalid_credentials
```

### Lưu Ý Quan Trọng

1. **CORS:** Đảm bảo backend cho phép CORS từ frontend URL
2. **Redirect URL:** Cấu hình `FRONTEND_URL` trong `.env` của backend
3. **Google Console:** Cấu hình redirect URI trong Google Cloud Console:
   - Backend callback: `http://localhost:8080/api/v1/auth/google/callback`
   - Frontend callback: `http://localhost:3000/auth/callback` (không cần thiết, chỉ cần backend)

---

## 3. Đăng Ký (Register)

### Endpoint
```
POST /api/v1/auth/local/register
```

### Request Body
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Nguyễn Văn A",
  "phone": "0123456789",
  "address": "123 Đường ABC"
}
```

**Validation:**
- `email`: Required, phải là email hợp lệ
- `password`: Required, tối thiểu 6 ký tự
- `name`: Required
- `phone`: Optional
- `address`: Optional

### Response Thành Công (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "newuser@example.com",
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "avatar": null
  }
}
```

### Response Lỗi (400 Bad Request)
```json
{
  "error": "Key: 'Email' Error:Field validation for 'Email' failed on the 'email' tag"
}
```

### Response Lỗi (409 Conflict) - Email đã tồn tại
```json
{
  "error": "email already exists"
}
```

### Ví Dụ Code Đăng Ký

#### Sử dụng Fetch API
```javascript
async function register(email, password, name, phone = '', address = '') {
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phone: phone,
        address: address
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      // Lưu token và tự động đăng nhập
      localStorage.setItem('token', data.token);
      return { success: true, token: data.token, user: data.user };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sử dụng
register('newuser@example.com', 'password123', 'Nguyễn Văn A', '0123456789', '123 Đường ABC')
  .then(result => {
    if (result.success) {
      console.log('Đăng ký thành công!', result.user);
      // Redirect đến trang chính
      window.location.href = '/dashboard';
    } else {
      console.error('Lỗi:', result.error);
    }
  });
```

#### Sử dụng Axios
```javascript
import axios from 'axios';

async function register(email, password, name, phone = '', address = '') {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/auth/local/register',
      {
        email,
        password,
        name,
        phone,
        address
      }
    );
    
    // Lưu token
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    return { success: true, token: response.data.token, user: response.data.user };
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data.error };
    }
    return { success: false, error: error.message };
  }
}
```

### Lưu Ý

- Khi đăng ký thành công, user sẽ tự động được đăng nhập (nhận token)
- Email phải là duy nhất, không được trùng với user khác
- Password sẽ được hash ở backend (hiện tại đang lưu plain text, sẽ cập nhật sau)
- Có thể đăng ký bằng Google OAuth - backend sẽ tự động tạo tài khoản khi đăng nhập Google lần đầu

---

## 4. Lấy Thông Tin User (Profile)

### Endpoint
```
GET /api/v1/profile
```

### Headers
```
Authorization: Bearer <token>
```

**Lưu ý:** Endpoint này sử dụng `OptionalAuthMiddleware`, nghĩa là:
- Nếu có token hợp lệ: Trả về thông tin user đầy đủ
- Nếu không có token hoặc token không hợp lệ: Trả về thông tin public

### Response Khi Có Token (200 OK)
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Nguyễn Văn A",
  "avatar": "https://lh3.googleusercontent.com/a/...",
  "phone": "0123456789",
  "address": "123 Đường ABC",
  "date_of_birth": null,
  "role": "user",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Response Khi Không Có Token (200 OK)
```json
{
  "message": "Public profile",
  "public_data": "Available to everyone"
}
```

### Ví Dụ Code

```javascript
async function getUserProfile() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { success: false, error: 'No token found' };
  }

  try {
    const response = await fetch('http://localhost:8080/api/v1/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, user: data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sử dụng
getUserProfile()
  .then(result => {
    if (result.success) {
      console.log('Thông tin user:', result.user);
      // Cập nhật UI với thông tin user
    } else {
      console.error('Lỗi:', result.error);
    }
  });
```

---

## 5. Sử Dụng Token Sau Khi Đăng Nhập

Sau khi nhận được token từ API, bạn cần lưu trữ và gửi kèm trong các request tiếp theo.

### Lưu Token
```javascript
// Lưu vào localStorage
localStorage.setItem('token', token);

// Hoặc sessionStorage (sẽ mất khi đóng tab)
sessionStorage.setItem('token', token);

// Hoặc cookie (nếu cần)
document.cookie = `token=${token}; path=/; max-age=86400`; // 24 giờ
```

### Gửi Token trong Request

#### Với Fetch API
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:8080/api/v1/protected/admin', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Với Axios
```javascript
import axios from 'axios';

// Cấu hình global
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Hoặc trong interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Sử dụng
axios.get('http://localhost:8080/api/v1/protected/admin')
  .then(response => console.log(response.data));
```

### Kiểm Tra Token Hợp Lệ

```javascript
function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  // Có thể decode JWT để kiểm tra expiration
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < exp;
  } catch (e) {
    return false;
  }
}
```

### Xử Lý Token Hết Hạn

```javascript
// Interceptor cho Axios
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      // Redirect đến trang đăng nhập
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 6. Ví Dụ Component React

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/local/login',
        { email, password }
      );

      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Redirect hoặc cập nhật state
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect đến backend, backend sẽ redirect đến Google
    // Sau đó Google redirect về backend callback
    // Backend xử lý và redirect về frontend /auth/callback với token
    window.location.href = 'http://localhost:8080/api/v1/auth/google/login';
  };

  return (
    <div className="login-form">
      <h2>Đăng Nhập</h2>
      
      <form onSubmit={handleLocalLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <div className="error">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>
      </form>
      
      <div className="divider">Hoặc</div>
      
      <button onClick={handleGoogleLogin} className="google-btn">
        Đăng nhập với Google
      </button>
    </div>
  );
};

export default LoginForm;
```

---

## 7. Ví Dụ Component Vue

```vue
<template>
  <div class="login-form">
    <h2>Đăng Nhập</h2>
    
    <form @submit.prevent="handleLocalLogin">
      <div>
        <label>Email:</label>
        <input
          type="email"
          v-model="email"
          required
        />
      </div>
      
      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          v-model="password"
          required
        />
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Đang đăng nhập...' : 'Đăng Nhập' }}
      </button>
    </form>
    
    <div class="divider">Hoặc</div>
    
    <button @click="handleGoogleLogin" class="google-btn">
      Đăng nhập với Google
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  },
  methods: {
    async handleLocalLogin() {
      this.loading = true;
      this.error = '';

      try {
        const response = await axios.post(
          'http://localhost:8080/api/v1/auth/local/login',
          {
            email: this.email,
            password: this.password
          }
        );

        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.error || 'Đăng nhập thất bại';
      } finally {
        this.loading = false;
      }
    },
    handleGoogleLogin() {
      // Redirect đến backend, backend sẽ redirect đến Google
      // Sau đó Google redirect về backend callback
      // Backend xử lý và redirect về frontend /auth/callback với token
      window.location.href = 'http://localhost:8080/api/v1/auth/google/login';
    }
  }
};
</script>
```

---

## 8. Cấu Hình Google OAuth

Để sử dụng Google OAuth, bạn cần:

1. **Tạo OAuth 2.0 Client ID trong Google Cloud Console:**
   - Truy cập: https://console.cloud.google.com/
   - Tạo project mới hoặc chọn project hiện có
   - Vào "APIs & Services" > "Credentials"
   - Tạo "OAuth 2.0 Client ID"
   - Thêm Authorized redirect URIs:
     - `http://localhost:8080/api/v1/auth/google/callback` (cho development)
     - `https://yourdomain.com/api/v1/auth/google/callback` (cho production)

2. **Cấu hình Environment Variables:**
   Backend cần các biến môi trường sau trong file `.env`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URL=http://localhost:8080/api/v1/auth/google/callback
   FRONTEND_URL=http://localhost:3000
   ```
   
   **Lưu ý:** `FRONTEND_URL` là URL của frontend để backend redirect về sau khi đăng nhập Google thành công.

---

## 9. Xử Lý Lỗi Thường Gặp

### Lỗi CORS
Nếu gặp lỗi CORS, backend cần cấu hình CORS middleware:
```go
// Backend cần thêm
r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"}, // Frontend URL
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    ExposeHeaders:    []string{"Content-Length"},
    AllowCredentials: true,
}))
```

### Token Hết Hạn
Token JWT có thời hạn 24 giờ. Khi hết hạn, user cần đăng nhập lại.

### Email Đã Tồn Tại
Khi đăng ký, nếu email đã tồn tại, backend sẽ trả về lỗi 400.

---

## 10. Best Practices

1. **Bảo Mật:**
   - Không lưu password dạng plain text (backend nên hash với bcrypt)
   - Sử dụng HTTPS trong production
   - Validate input ở cả frontend và backend

2. **UX:**
   - Hiển thị loading state khi đang xử lý
   - Hiển thị thông báo lỗi rõ ràng
   - Tự động redirect sau khi đăng nhập thành công
   - Lưu token và tự động đăng nhập lại khi refresh page

3. **Error Handling:**
   - Xử lý tất cả các trường hợp lỗi
   - Hiển thị message thân thiện với user
   - Log lỗi để debug

---

## 11. Tài Khoản Test

Backend có tạo sẵn tài khoản test:
- **Email:** `test@example.com`
- **Password:** `pass`

Bạn có thể sử dụng tài khoản này để test đăng nhập local.

---

## 12. Tóm Tắt Luồng Đăng Nhập

### Đăng Nhập Local
1. User nhập email/password
2. Frontend gửi POST `/api/v1/auth/local/login`
3. Backend trả về token
4. Frontend lưu token và redirect

### Đăng Nhập Google
1. User click "Đăng nhập với Google"
2. Frontend redirect đến `/api/v1/auth/google/login`
3. Backend redirect đến Google OAuth
4. User xác thực trên Google
5. Google redirect về `/api/v1/auth/google/callback?code=xxx`
6. Backend xử lý code, tạo/đăng nhập user
7. Backend redirect về `FRONTEND_URL/auth/callback?token=xxx`
8. Frontend nhận token từ URL, lưu và redirect

### Đăng Ký
1. User nhập thông tin (email, password, name, phone, address)
2. Frontend gửi POST `/api/v1/auth/local/register`
3. Backend tạo user và trả về token + thông tin user
4. Frontend lưu token và redirect

---

## Liên Hệ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ team backend.

