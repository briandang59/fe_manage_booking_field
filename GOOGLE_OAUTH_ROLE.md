# Hướng Dẫn Xử Lý Role Khi Đăng Ký Bằng Google OAuth

## Vấn Đề

Khi user đăng ký bằng Google OAuth từ trang Register, cần truyền role (user/founder) để backend biết và set role cho user mới.

## Giải Pháp

### Frontend Flow

1. **User chọn role** trong RegisterForm (user hoặc founder)
2. **User click "Đăng ký với Google"**
3. **Frontend lưu role vào sessionStorage** và truyền role qua query parameter:
    ```
    GET /api/v1/auth/google/login?role=user
    ```
    hoặc
    ```
    GET /api/v1/auth/google/login?role=founder
    ```

### Backend Cần Xử Lý

Backend cần:

1. **Nhận role từ query parameter** khi user click "Đăng ký với Google":

    ```go
    // Backend handler
    role := c.Query("role") // "user" hoặc "founder"
    ```

2. **Lưu role vào state parameter** khi redirect đến Google OAuth:

    ```go
    // Encode role vào state parameter
    state := base64.URLEncoding.EncodeToString([]byte(role))
    // Hoặc sử dụng JSON để encode nhiều thông tin hơn
    stateData := map[string]string{"role": role}
    stateBytes, _ := json.Marshal(stateData)
    state := base64.URLEncoding.EncodeToString(stateBytes)
    ```

3. **Lấy role từ state** khi Google redirect về callback:

    ```go
    // Decode state parameter
    state := c.Query("state")
    stateBytes, _ := base64.URLEncoding.DecodeString(state)
    var stateData map[string]string
    json.Unmarshal(stateBytes, &stateData)
    role := stateData["role"]
    ```

4. **Set role cho user mới** khi tạo account:
    ```go
    // Khi tạo user mới từ Google OAuth
    if role != "" {
        newUser.Role = role
    } else {
        newUser.Role = "user" // Default
    }
    ```

### Alternative: Sử dụng sessionStorage

Nếu backend không thể xử lý role qua state parameter, có thể:

1. Frontend lưu role vào sessionStorage trước khi redirect
2. Sau khi đăng nhập thành công, frontend check sessionStorage
3. Nếu có role trong sessionStorage, gọi API để update role:
    ```typescript
    const role = sessionStorage.getItem("oauth_role");
    if (role) {
        await apiClient.patch("/users/profile", { role });
        sessionStorage.removeItem("oauth_role");
    }
    ```

## Implementation

### Frontend (Đã được implement)

```typescript
// RegisterForm.tsx
const handleGoogleLogin = () => {
    const selectedRole = watch("role");
    loginWithGoogle(selectedRole); // Truyền role
};

// utils/api/auth.ts
loginWithGoogle(role?: string): void {
    if (role) {
        sessionStorage.setItem("oauth_role", role);
    }
    const url = role
        ? `${apiUrl}/auth/google/login?role=${encodeURIComponent(role)}`
        : apiUrl;
    window.location.href = url;
}
```

### Backend (Cần implement)

```go
// Handler: GET /api/v1/auth/google/login
func GoogleLoginHandler(c *gin.Context) {
    role := c.Query("role") // "user" hoặc "founder"

    // Encode role vào state
    stateData := map[string]string{"role": role}
    stateBytes, _ := json.Marshal(stateData)
    state := base64.URLEncoding.EncodeToString(stateBytes)

    // Redirect đến Google OAuth với state
    googleAuthURL := fmt.Sprintf(
        "https://accounts.google.com/o/oauth2/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=email profile&state=%s",
        clientID,
        redirectURI,
        state,
    )
    c.Redirect(http.StatusTemporaryRedirect, googleAuthURL)
}

// Handler: GET /api/v1/auth/google/callback
func GoogleCallbackHandler(c *gin.Context) {
    code := c.Query("code")
    state := c.Query("state")

    // Decode state để lấy role
    stateBytes, _ := base64.URLEncoding.DecodeString(state)
    var stateData map[string]string
    json.Unmarshal(stateBytes, &stateData)
    role := stateData["role"]
    if role == "" {
        role = "user" // Default
    }

    // Exchange code for token
    // ... Google OAuth flow ...

    // Get user info from Google
    // ... Get user info ...

    // Create or login user
    user := findOrCreateUser(googleUserInfo)
    if user.IsNew {
        user.Role = role // Set role cho user mới
        saveUser(user)
    }

    // Generate JWT token
    token := generateToken(user)

    // Redirect về frontend với token
    frontendURL := os.Getenv("FRONTEND_URL")
    c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("%s/auth/callback?token=%s", frontendURL, token))
}
```

## Lưu Ý

1. **State parameter** trong OAuth được Google trả về nguyên vẹn, nên có thể dùng để truyền thông tin
2. **Role chỉ áp dụng cho user mới**: Nếu user đã tồn tại (đăng nhập), role sẽ không thay đổi
3. **Default role**: Nếu không có role, backend nên set mặc định là "user"
4. **Security**: Nên validate role trước khi set (chỉ cho phép "user" hoặc "founder")

## Testing

1. Chọn role "user" → Click "Đăng ký với Google" → Kiểm tra user được tạo với role "user"
2. Chọn role "founder" → Click "Đăng ký với Google" → Kiểm tra user được tạo với role "founder"
3. Đăng nhập với Google (user đã tồn tại) → Role không thay đổi
