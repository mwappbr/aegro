<?php
/**
 * Registration Page
 * Legacy PHP 5 - New user registration
 */

require_once 'includes/session.php';
require_once 'includes/functions.php';
require_once 'classes/User.php';

// Redirect if already logged in
if (is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$errors = array();
$name = $email = $department = $phone = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';
    $department = isset($_POST['department']) ? trim($_POST['department']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

    // Validation (minimal!)
    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters';
    }

    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!is_valid_email($email)) {
        $errors[] = 'Invalid email format';
    }

    if (empty($password)) {
        $errors[] = 'Password is required';
    } elseif (strlen($password) < 6) {
        $errors[] = 'Password must be at least 6 characters';
        // No complexity requirements!
    }

    if ($password !== $confirm_password) {
        $errors[] = 'Passwords do not match';
    }

    // Check if email exists
    $existing = get_user_by_email($email);
    if ($existing) {
        $errors[] = 'Email is already registered';
    }

    // If no errors, create user
    if (empty($errors)) {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = $password; // Will be hashed (with weak MD5!)
        $user->department = $department;
        $user->phone = $phone;
        $user->role = 'user'; // Default role

        if ($user->insert()) {
            // Auto-login after registration (no email verification!)
            $_SESSION['user_id'] = $user->id;
            $_SESSION['user_email'] = $user->email;
            $_SESSION['user_name'] = $user->name;
            $_SESSION['user_role'] = $user->role;

            redirect_with_message('dashboard.php', 'Welcome to ' . APP_NAME . '! Your account has been created.', 'success');
        } else {
            $errors[] = 'Failed to create account. Please try again.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - <?php echo APP_NAME; ?></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .register-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 500px;
        }

        .register-container h1 {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
        }

        .register-container p {
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

        .btn-register {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            height: 45px;
            font-weight: 600;
        }

        .btn-register:hover {
            opacity: 0.9;
        }

        .login-link {
            text-align: center;
            margin-top: 20px;
        }

        .login-link a {
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <h1><i class="glyphicon glyphicon-tasks"></i> <?php echo APP_NAME; ?></h1>
        <p>Create your account</p>

        <?php if (!empty($errors)): ?>
            <div class="alert alert-danger">
                <ul style="margin: 0; padding-left: 20px;">
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" class="form-control"
                       value="<?php echo htmlspecialchars($name); ?>"
                       placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" class="form-control"
                       value="<?php echo htmlspecialchars($email); ?>"
                       placeholder="Enter your email" required>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Password *</label>
                        <input type="password" name="password" class="form-control"
                               placeholder="Create a password" required minlength="6">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Confirm Password *</label>
                        <input type="password" name="confirm_password" class="form-control"
                               placeholder="Confirm password" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" name="department" class="form-control"
                               value="<?php echo htmlspecialchars($department); ?>"
                               placeholder="e.g., Engineering">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" class="form-control"
                               value="<?php echo htmlspecialchars($phone); ?>"
                               placeholder="e.g., +1 555-1234">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-register">Create Account</button>
        </form>

        <div class="login-link">
            Already have an account? <a href="login.php">Sign in</a>
        </div>
    </div>
</body>
</html>
