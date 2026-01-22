<?php
/**
 * Dashboard Page
 * Legacy PHP 5 - Main dashboard with statistics and recent activity
 */

$page_title = 'Dashboard';
require_once 'templates/header.php';
require_login();

require_once 'classes/Task.php';
require_once 'classes/Project.php';

$user_id = $_SESSION['user_id'];

// Get statistics
$task = new Task();
$stats = $task->get_stats($user_id);

// Get user's tasks (no pagination = memory issues!)
$my_tasks = $task->get_tasks(array(
    'assigned_to' => $user_id,
    'status' => isset($_GET['status']) ? $_GET['status'] : '',
    'order' => 'due_date ASC'
));

// Get overdue tasks
$overdue_tasks = $task->get_tasks(array(
    'assigned_to' => $user_id,
    'overdue' => true
));

// Get tasks due today
$today_tasks = $task->get_tasks(array(
    'assigned_to' => $user_id,
    'due_before' => date('Y-m-d'),
    'status' => 'pending'
));

// Get user's projects
$project = new Project();
$my_projects = $project->get_user_projects($user_id);

// Recent activity - no limit leads to memory issues
$sql = "SELECT a.*, u.name as user_name
        FROM activity_log a
        LEFT JOIN users u ON a.user_id = u.id
        WHERE a.user_id = $user_id
        ORDER BY a.created_at DESC
        LIMIT 10";
$recent_activity = db_fetch_all(db_query($sql));
?>

<div class="row">
    <div class="col-md-12">
        <h1 class="page-header">
            Dashboard
            <small>Welcome back, <?php echo htmlspecialchars($current_user['name']); ?>!</small>
        </h1>
    </div>
</div>

<!-- Statistics Cards -->
<div class="row">
    <div class="col-md-3">
        <div class="card stat-card">
            <h2 class="text-primary"><?php echo $stats['total']; ?></h2>
            <p>Total Tasks</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <h2 class="text-warning"><?php echo isset($stats['by_status']['pending']) ? $stats['by_status']['pending'] : 0; ?></h2>
            <p>Pending</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <h2 class="text-info"><?php echo isset($stats['by_status']['in_progress']) ? $stats['by_status']['in_progress'] : 0; ?></h2>
            <p>In Progress</p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card stat-card">
            <h2 class="text-danger"><?php echo $stats['overdue']; ?></h2>
            <p>Overdue</p>
        </div>
    </div>
</div>

<div class="row">
    <!-- Overdue Tasks Alert -->
    <?php if (count($overdue_tasks) > 0): ?>
    <div class="col-md-12">
        <div class="alert alert-danger">
            <strong><i class="fa fa-exclamation-triangle"></i> Attention!</strong>
            You have <?php echo count($overdue_tasks); ?> overdue task(s) that require immediate attention.
            <a href="tasks.php?filter=overdue" class="alert-link">View overdue tasks</a>
        </div>
    </div>
    <?php endif; ?>

    <!-- Recent Tasks -->
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;">
                    <i class="fa fa-tasks"></i> My Tasks
                    <a href="tasks.php" class="btn btn-sm btn-default pull-right">View All</a>
                </h3>
            </div>

            <?php if (empty($my_tasks)): ?>
                <div class="text-center" style="padding: 40px;">
                    <i class="fa fa-check-circle fa-3x text-success"></i>
                    <h4>All caught up!</h4>
                    <p class="text-muted">You don't have any tasks assigned.</p>
                    <a href="task_create.php" class="btn btn-primary">Create New Task</a>
                </div>
            <?php else: ?>
                <?php foreach (array_slice($my_tasks, 0, 5) as $t): ?>
                    <?php
                    $is_overdue = !empty($t['due_date']) && $t['status'] != 'completed' && strtotime($t['due_date']) < strtotime('today');
                    ?>
                    <div class="task-item <?php echo $is_overdue ? 'overdue' : ''; ?>">
                        <div class="row">
                            <div class="col-md-8">
                                <h4 style="margin: 0 0 5px;">
                                    <a href="task.php?id=<?php echo $t['id']; ?>">
                                        <?php echo htmlspecialchars($t['title']); ?>
                                    </a>
                                </h4>
                                <p class="text-muted" style="margin: 0;">
                                    <?php if ($t['project_name']): ?>
                                        <span class="project-color" style="background: <?php echo isset($t['color']) ? $t['color'] : '#3498db'; ?>"></span>
                                        <?php echo htmlspecialchars($t['project_name']); ?> &middot;
                                    <?php endif; ?>
                                    <?php echo get_priority_badge($t['priority']); ?>
                                    <?php echo get_status_badge($t['status']); ?>
                                </p>
                            </div>
                            <div class="col-md-4 text-right">
                                <?php if ($t['due_date']): ?>
                                    <span class="due-date <?php echo $is_overdue ? 'text-danger' : ''; ?>" data-date="<?php echo $t['due_date']; ?>">
                                        <?php echo $is_overdue ? '<i class="fa fa-exclamation-triangle"></i> ' : ''; ?>
                                        Due: <?php echo format_date($t['due_date']); ?>
                                    </span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <!-- Recent Activity -->
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;">
                    <i class="fa fa-history"></i> Recent Activity
                </h3>
            </div>

            <?php if (empty($recent_activity)): ?>
                <div class="text-center" style="padding: 20px;">
                    <p class="text-muted">No recent activity</p>
                </div>
            <?php else: ?>
                <ul class="list-group" style="margin: 0;">
                    <?php foreach ($recent_activity as $activity): ?>
                        <li class="list-group-item">
                            <i class="fa fa-circle text-primary" style="font-size: 8px;"></i>
                            <?php echo htmlspecialchars($activity['action']); ?>
                            <span class="text-muted pull-right">
                                <?php echo time_ago($activity['created_at']); ?>
                            </span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>

    <!-- Sidebar -->
    <div class="col-md-4">
        <!-- Projects -->
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;">
                    <i class="fa fa-folder-open"></i> My Projects
                    <a href="project_create.php" class="btn btn-sm btn-success pull-right">
                        <i class="fa fa-plus"></i>
                    </a>
                </h3>
            </div>

            <?php if (empty($my_projects)): ?>
                <div class="text-center" style="padding: 20px;">
                    <p class="text-muted">No projects yet</p>
                    <a href="project_create.php" class="btn btn-primary btn-sm">Create Project</a>
                </div>
            <?php else: ?>
                <ul class="list-group" style="margin: 0;">
                    <?php foreach (array_slice($my_projects, 0, 5) as $p): ?>
                        <li class="list-group-item">
                            <span class="project-color" style="background: <?php echo isset($p['color']) ? $p['color'] : '#3498db'; ?>"></span>
                            <a href="project.php?id=<?php echo $p['id']; ?>">
                                <?php echo htmlspecialchars($p['name']); ?>
                            </a>
                            <span class="badge pull-right"><?php echo isset($p['task_count']) ? $p['task_count'] : 0; ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
                <?php if (count($my_projects) > 5): ?>
                    <div style="padding: 10px; text-align: center;">
                        <a href="projects.php">View all <?php echo count($my_projects); ?> projects</a>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </div>

        <!-- Quick Stats -->
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;"><i class="fa fa-bar-chart"></i> This Week</h3>
            </div>
            <ul class="list-group" style="margin: 0;">
                <li class="list-group-item">
                    Tasks Completed
                    <span class="badge badge-success"><?php echo $stats['completed_this_week']; ?></span>
                </li>
                <li class="list-group-item">
                    Due Today
                    <span class="badge badge-warning"><?php echo $stats['due_today']; ?></span>
                </li>
                <li class="list-group-item">
                    Overdue
                    <span class="badge badge-danger"><?php echo $stats['overdue']; ?></span>
                </li>
            </ul>
        </div>

        <!-- Team Members (if feature enabled) -->
        <?php if (FEATURE_TEAMS): ?>
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;"><i class="fa fa-users"></i> Team</h3>
            </div>
            <?php
            $user_obj = new User();
            $team = $user_obj->get_all();
            ?>
            <ul class="list-group" style="margin: 0;">
                <?php foreach (array_slice($team, 0, 5) as $member): ?>
                    <li class="list-group-item">
                        <img src="<?php echo $member['avatar'] ? APP_URL . '/uploads/' . $member['avatar'] : 'https://www.gravatar.com/avatar/?d=mp'; ?>"
                             class="avatar avatar-sm" style="margin-right: 10px;">
                        <?php echo htmlspecialchars($member['name']); ?>
                        <small class="text-muted"><?php echo htmlspecialchars($member['department']); ?></small>
                    </li>
                <?php endforeach; ?>
            </ul>
            <div style="padding: 10px; text-align: center;">
                <a href="team.php">View all team members</a>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<?php require_once 'templates/footer.php'; ?>
