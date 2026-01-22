<?php
/**
 * Header Template
 * Legacy PHP 5 - Common header included in all pages
 */

require_once dirname(__FILE__) . '/../includes/session.php';
require_once dirname(__FILE__) . '/../includes/functions.php';

$current_user = get_current_user_data();
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - ' : ''; ?><?php echo APP_NAME; ?></title>

    <!-- Bootstrap 3 - Old version! -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Inline styles (should be external!) -->
    <style>
        body {
            padding-top: 70px;
            background-color: #f5f5f5;
        }

        .navbar-brand {
            font-weight: bold;
        }

        .sidebar {
            position: fixed;
            top: 51px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #222;
            width: 220px;
        }

        .sidebar .nav > li > a {
            color: #999;
            padding: 10px 15px;
        }

        .sidebar .nav > li > a:hover,
        .sidebar .nav > li.active > a {
            color: #fff;
            background-color: #333;
        }

        .sidebar .nav > li > a > .fa {
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }

        .main-content {
            margin-left: 220px;
            padding: 20px;
        }

        .card {
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

        .card-header {
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }

        .stat-card {
            text-align: center;
            padding: 30px 15px;
        }

        .stat-card h2 {
            font-size: 48px;
            margin: 0;
        }

        .stat-card p {
            color: #666;
            margin: 10px 0 0;
        }

        .task-item {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }

        .task-item:last-child {
            border-bottom: none;
        }

        .task-item:hover {
            background-color: #f9f9f9;
        }

        .task-item.overdue {
            border-left: 4px solid #d9534f;
        }

        .badge {
            font-weight: normal;
            padding: 5px 10px;
        }

        .badge-success { background-color: #5cb85c; }
        .badge-warning { background-color: #f0ad4e; }
        .badge-danger { background-color: #d9534f; }
        .badge-info { background-color: #5bc0de; }
        .badge-primary { background-color: #337ab7; }
        .badge-dark { background-color: #333; }
        .badge-secondary { background-color: #777; }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }

        .avatar-sm {
            width: 24px;
            height: 24px;
        }

        .avatar-lg {
            width: 64px;
            height: 64px;
        }

        .project-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            display: inline-block;
            margin-right: 5px;
        }

        .progress-thin {
            height: 6px;
        }

        .filter-bar {
            background: #fff;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .filter-bar .form-group {
            margin-bottom: 0;
        }

        .comment {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }

        .comment.system {
            background-color: #f9f9f9;
            font-style: italic;
        }

        .time-log {
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
        }

        .attachment-item {
            padding: 10px;
            background: #f9f9f9;
            border-radius: 4px;
            margin-bottom: 10px;
        }

        .alert {
            margin-bottom: 20px;
        }

        /* Debug panel */
        .debug-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #333;
            color: #fff;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 9999;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo APP_URL; ?>/dashboard.php">
                    <i class="fa fa-tasks"></i> <?php echo APP_NAME; ?>
                </a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <?php if ($current_user): ?>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="<?php echo $current_user['avatar'] ? APP_URL . '/uploads/' . $current_user['avatar'] : 'https://www.gravatar.com/avatar/?d=mp'; ?>" class="avatar avatar-sm">
                                <?php echo htmlspecialchars($current_user['name']); ?>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="<?php echo APP_URL; ?>/profile.php"><i class="fa fa-user"></i> My Profile</a></li>
                                <li><a href="<?php echo APP_URL; ?>/settings.php"><i class="fa fa-cog"></i> Settings</a></li>
                                <li class="divider"></li>
                                <li><a href="<?php echo APP_URL; ?>/logout.php"><i class="fa fa-sign-out"></i> Logout</a></li>
                            </ul>
                        </li>
                    <?php else: ?>
                        <li><a href="<?php echo APP_URL; ?>/login.php">Login</a></li>
                    <?php endif; ?>
                </ul>

                <?php if ($current_user): ?>
                <form class="navbar-form navbar-right" action="<?php echo APP_URL; ?>/search.php" method="GET">
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="Search tasks...">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
                <?php endif; ?>
            </div>
        </div>
    </nav>

    <?php if ($current_user): ?>
    <!-- Sidebar -->
    <div class="sidebar">
        <ul class="nav nav-pills nav-stacked">
            <li class="<?php echo $current_page == 'dashboard' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/dashboard.php"><i class="fa fa-dashboard"></i> Dashboard</a>
            </li>
            <li class="<?php echo $current_page == 'tasks' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/tasks.php"><i class="fa fa-tasks"></i> My Tasks</a>
            </li>
            <li class="<?php echo $current_page == 'projects' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/projects.php"><i class="fa fa-folder"></i> Projects</a>
            </li>
            <?php if (FEATURE_TEAMS): ?>
            <li class="<?php echo $current_page == 'team' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/team.php"><i class="fa fa-users"></i> Team</a>
            </li>
            <?php endif; ?>
            <li class="<?php echo $current_page == 'calendar' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/calendar.php"><i class="fa fa-calendar"></i> Calendar</a>
            </li>
            <li class="<?php echo $current_page == 'reports' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/reports.php"><i class="fa fa-bar-chart"></i> Reports</a>
            </li>

            <?php if ($current_user['role'] == 'admin'): ?>
            <li class="nav-header" style="color: #666; padding: 10px 15px; margin-top: 20px;">
                <small>ADMINISTRATION</small>
            </li>
            <li class="<?php echo $current_page == 'users' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/admin/users.php"><i class="fa fa-user-plus"></i> Manage Users</a>
            </li>
            <li class="<?php echo $current_page == 'settings' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/admin/settings.php"><i class="fa fa-cogs"></i> System Settings</a>
            </li>
            <li class="<?php echo $current_page == 'logs' ? 'active' : ''; ?>">
                <a href="<?php echo APP_URL; ?>/admin/logs.php"><i class="fa fa-list-alt"></i> Activity Logs</a>
            </li>
            <?php endif; ?>
        </ul>
    </div>
    <?php endif; ?>

    <!-- Main Content -->
    <div class="<?php echo $current_user ? 'main-content' : 'container'; ?>">
        <?php display_flash_message(); ?>
