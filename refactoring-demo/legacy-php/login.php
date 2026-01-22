<?php
/**
 * Login Page
 * Legacy PHP 5 - User authentication
 */

require_once 'includes/session.php';
require_once 'includes/functions.php';
require_once 'classes/User.php';

// Redirect if already logged in
if (is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
$email = '';

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $remember = isset($_POST['remember']) ? true : false;

    // Basic validation
    if (empty($email) || empty($password)) {
        $error = 'Please enter both email and password';
    } else {
        // Attempt authentication
        $user = new User();
        $result = $user->authenticate($email, $password);

        if ($result) {
            // Set session variables
            $_SESSION['user_id'] = $user->id;
            $_SESSION['user_email'] = $user->email;
            $_SESSION['user_name'] = $user->name;
            $_SESSION['user_role'] = $user->role;

            // Handle "remember me" - INSECURE IMPLEMENTATION
            if ($remember) {
                // Setting cookie with user ID - VERY BAD!
                $token = base64_encode($user->id . ':' . $user->email);
                setcookie('remember_token', $token, time() + (86400 * 30), '/'); // 30 days
            }

            // Redirect to intended page or dashboard
            $redirect = isset($_SESSION['redirect_after_login']) ? $_SESSION['redirect_after_login'] : 'dashboard.php';
            unset($_SESSION['redirect_after_login']);

            header('Location: ' . $redirect);
            exit;
        } else {
            $error = 'Invalid email or password';
            // Timing attack possible - same error for both cases
        }
    }
}

// Check for timeout message
if (isset($_GET['timeout'])) {
    $error = 'Your session has expired. Please login again.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - <?php echo APP_NAME; ?></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }

        .login-container h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
        }

        .login-container p {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }

        .form-group label {
            font-weight: 600;
            color: #555;
        }

        .form-control {
            height: 45px;
            border: 2px solid #ddd;
        }

        .form-control:focus {
            border-color: #667eea;
            box-shadow: none;
        }

        .btn-login {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            height: 45px;
            font-weight: 600;
        }

        .btn-login:hover {
            opacity: 0.9;
        }

        .demo-info {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 13px;
        }

        .demo-info strong {
            display: block;
            margin-bottom: 5px;
        }

        .demo-info code {
            background: #fff;
            padding: 2px 6px;
            border-radius: 3px;
        }

        .register-link {
            text-align: center;
            margin-top: 20px;
        }

        .register-link a {
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1><i class="glyphicon glyphicon-tasks"></i> <?php echo APP_NAME; ?></h1>
        <p>Sign in to manage your tasks</p>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" class="form-control"
                       value="<?php echo htmlspecialchars($email); ?>"
                       placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control"
                       placeholder="Enter your password" required>
            </div>

            <div class="checkbox">
                <label>
                    <input type="checkbox" name="remember"> Remember me
                </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-login">Sign In</button>
        </form>

        <div class="register-link">
            Don't have an account? <a href="register.php">Register here</a>
        </div>

        <div class="demo-info">
            <strong>Demo Credentials:</strong>
            Admin: <code>admin@taskmaster.com</code> / <code>admin123</code><br>
            User: <code>john@example.com</code> / <code>password</code>
        </div>
    </div>
</body>
</html>
