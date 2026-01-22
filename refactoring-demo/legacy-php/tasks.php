<?php
/**
 * Tasks List Page
 * Legacy PHP 5 - View and manage all tasks
 */

$page_title = 'My Tasks';
require_once 'templates/header.php';
require_login();

require_once 'classes/Task.php';
require_once 'classes/Project.php';
require_once 'classes/User.php';

$user_id = $_SESSION['user_id'];

// Get filter parameters (NO SANITIZATION!)
$filter_status = isset($_GET['status']) ? $_GET['status'] : '';
$filter_priority = isset($_GET['priority']) ? $_GET['priority'] : '';
$filter_project = isset($_GET['project']) ? $_GET['project'] : '';
$filter_search = isset($_GET['search']) ? $_GET['search'] : '';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'due_date';
$order = isset($_GET['order']) ? $_GET['order'] : 'ASC';

// Special filters
$filter_overdue = isset($_GET['filter']) && $_GET['filter'] == 'overdue';
$filter_today = isset($_GET['filter']) && $_GET['filter'] == 'today';

// Build filters array
$filters = array(
    'assigned_to' => $user_id,
    'status' => $filter_status,
    'priority' => $filter_priority,
    'project_id' => $filter_project,
    'search' => $filter_search,
    'order' => "$sort $order"
);

if ($filter_overdue) {
    $filters['overdue'] = true;
}
if ($filter_today) {
    $filters['due_before'] = date('Y-m-d');
}

// Get tasks (NO PAGINATION!)
$task = new Task();
$tasks = $task->get_tasks($filters);

// Get projects for filter dropdown
$project = new Project();
$projects = $project->get_user_projects($user_id);

// Get users for assignment
$user = new User();
$users = $user->get_all();
?>

<div class="row">
    <div class="col-md-12">
        <h1 class="page-header">
            <i class="fa fa-tasks"></i> My Tasks
            <a href="task_create.php" class="btn btn-success pull-right">
                <i class="fa fa-plus"></i> New Task
            </a>
        </h1>
    </div>
</div>

<!-- Filters -->
<div class="filter-bar">
    <form method="GET" action="" class="form-inline">
        <div class="form-group">
            <select name="status" class="form-control" onchange="this.form.submit()">
                <option value="">All Status</option>
                <option value="pending" <?php echo $filter_status == 'pending' ? 'selected' : ''; ?>>Pending</option>
                <option value="in_progress" <?php echo $filter_status == 'in_progress' ? 'selected' : ''; ?>>In Progress</option>
                <option value="review" <?php echo $filter_status == 'review' ? 'selected' : ''; ?>>In Review</option>
                <option value="completed" <?php echo $filter_status == 'completed' ? 'selected' : ''; ?>>Completed</option>
            </select>
        </div>

        <div class="form-group">
            <select name="priority" class="form-control" onchange="this.form.submit()">
                <option value="">All Priority</option>
                <option value="critical" <?php echo $filter_priority == 'critical' ? 'selected' : ''; ?>>Critical</option>
                <option value="high" <?php echo $filter_priority == 'high' ? 'selected' : ''; ?>>High</option>
                <option value="medium" <?php echo $filter_priority == 'medium' ? 'selected' : ''; ?>>Medium</option>
                <option value="low" <?php echo $filter_priority == 'low' ? 'selected' : ''; ?>>Low</option>
            </select>
        </div>

        <div class="form-group">
            <select name="project" class="form-control" onchange="this.form.submit()">
                <option value="">All Projects</option>
                <?php foreach ($projects as $p): ?>
                    <option value="<?php echo $p['id']; ?>" <?php echo $filter_project == $p['id'] ? 'selected' : ''; ?>>
                        <?php echo htmlspecialchars($p['name']); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="form-group">
            <div class="input-group">
                <input type="text" name="search" class="form-control" placeholder="Search tasks..."
                       value="<?php echo htmlspecialchars($filter_search); ?>">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </div>

        <div class="form-group pull-right">
            <select name="sort" class="form-control" onchange="this.form.submit()">
                <option value="due_date" <?php echo $sort == 'due_date' ? 'selected' : ''; ?>>Sort by Due Date</option>
                <option value="created_at" <?php echo $sort == 'created_at' ? 'selected' : ''; ?>>Sort by Created</option>
                <option value="priority" <?php echo $sort == 'priority' ? 'selected' : ''; ?>>Sort by Priority</option>
                <option value="title" <?php echo $sort == 'title' ? 'selected' : ''; ?>>Sort by Title</option>
            </select>
            <input type="hidden" name="order" value="<?php echo $order; ?>">
        </div>
    </form>
</div>

<!-- Quick Filters -->
<div style="margin-bottom: 20px;">
    <a href="tasks.php" class="btn btn-default btn-sm <?php echo empty($_GET) ? 'active' : ''; ?>">All</a>
    <a href="tasks.php?status=pending" class="btn btn-default btn-sm <?php echo $filter_status == 'pending' ? 'active' : ''; ?>">Pending</a>
    <a href="tasks.php?status=in_progress" class="btn btn-default btn-sm <?php echo $filter_status == 'in_progress' ? 'active' : ''; ?>">In Progress</a>
    <a href="tasks.php?filter=overdue" class="btn btn-danger btn-sm <?php echo $filter_overdue ? 'active' : ''; ?>">
        <i class="fa fa-exclamation-triangle"></i> Overdue
    </a>
    <a href="tasks.php?filter=today" class="btn btn-warning btn-sm <?php echo $filter_today ? 'active' : ''; ?>">
        <i class="fa fa-clock-o"></i> Due Today
    </a>
</div>

<!-- Tasks List -->
<div class="card">
    <div class="card-header">
        <strong><?php echo count($tasks); ?> tasks found</strong>
    </div>

    <?php if (empty($tasks)): ?>
        <div class="text-center" style="padding: 60px;">
            <i class="fa fa-inbox fa-4x text-muted"></i>
            <h3>No tasks found</h3>
            <p class="text-muted">
                <?php if (!empty($filter_search)): ?>
                    No tasks match your search criteria.
                <?php else: ?>
                    Create your first task to get started!
                <?php endif; ?>
            </p>
            <a href="task_create.php" class="btn btn-primary">
                <i class="fa fa-plus"></i> Create Task
            </a>
        </div>
    <?php else: ?>
        <table class="table table-hover" style="margin: 0;">
            <thead>
                <tr>
                    <th width="40%">Task</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th width="100">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($tasks as $t): ?>
                    <?php
                    $is_overdue = !empty($t['due_date']) && $t['status'] != 'completed' && strtotime($t['due_date']) < strtotime('today');
                    ?>
                    <tr class="<?php echo $is_overdue ? 'danger' : ''; ?>">
                        <td>
                            <a href="task.php?id=<?php echo $t['id']; ?>" style="font-weight: 500;">
                                <?php echo htmlspecialchars($t['title']); ?>
                            </a>
                            <?php if ($t['description']): ?>
                                <br><small class="text-muted"><?php echo htmlspecialchars(truncate_text($t['description'], 80)); ?></small>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($t['project_name']): ?>
                                <span class="project-color" style="background: <?php echo isset($t['color']) ? $t['color'] : '#3498db'; ?>"></span>
                                <a href="project.php?id=<?php echo $t['project_id']; ?>">
                                    <?php echo htmlspecialchars($t['project_name']); ?>
                                </a>
                            <?php else: ?>
                                <span class="text-muted">—</span>
                            <?php endif; ?>
                        </td>
                        <td><?php echo get_priority_badge($t['priority']); ?></td>
                        <td><?php echo get_status_badge($t['status']); ?></td>
                        <td>
                            <?php if ($t['due_date']): ?>
                                <span class="<?php echo $is_overdue ? 'text-danger' : ''; ?>">
                                    <?php echo $is_overdue ? '<i class="fa fa-exclamation-triangle"></i> ' : ''; ?>
                                    <?php echo format_date($t['due_date']); ?>
                                </span>
                            <?php else: ?>
                                <span class="text-muted">—</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm">
                                <a href="task.php?id=<?php echo $t['id']; ?>" class="btn btn-default" title="View">
                                    <i class="fa fa-eye"></i>
                                </a>
                                <a href="task_edit.php?id=<?php echo $t['id']; ?>" class="btn btn-default" title="Edit">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a href="task_delete.php?id=<?php echo $t['id']; ?>" class="btn btn-danger"
                                   data-confirm="Are you sure you want to delete this task?" title="Delete">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>

<!-- No pagination! All tasks loaded at once -->

<?php require_once 'templates/footer.php'; ?>
