<?php
/**
 * Task Detail Page
 * Legacy PHP 5 - View single task with comments and attachments
 */

require_once 'templates/header.php';
require_login();

require_once 'classes/Task.php';
require_once 'classes/User.php';
require_once 'classes/Project.php';
require_once 'classes/Attachment.php';

// Get task ID from URL - NO VALIDATION!
$task_id = isset($_GET['id']) ? $_GET['id'] : 0;

// Load task
$task = new Task($task_id);

if (!$task->id) {
    redirect_with_message('tasks.php', 'Task not found', 'danger');
}

// Check access (basic - anyone can view any task!)
// Should check if user has access to the project

$page_title = $task->title;

// Get related data
$project = $task->project_id ? new Project($task->project_id) : null;
$assigned_user = $task->assigned_to ? new User($task->assigned_to) : null;
$created_by_user = $task->created_by ? new User($task->created_by) : null;
$comments = $task->get_comments();
$attachments = $task->get_attachments();

// Handle comment submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action'])) {
    // CSRF check (basic)
    if (!verify_csrf_token($_POST['csrf_token'])) {
        redirect_with_message("task.php?id=$task_id", 'Invalid request', 'danger');
    }

    switch ($_POST['action']) {
        case 'add_comment':
            $content = isset($_POST['comment']) ? trim($_POST['comment']) : '';
            if (!empty($content)) {
                $task->add_comment($content);
                redirect_with_message("task.php?id=$task_id", 'Comment added', 'success');
            }
            break;

        case 'upload_file':
            if (isset($_FILES['attachment'])) {
                $attachment = new Attachment();
                $result = $attachment->upload($_FILES['attachment'], $task_id);
                if ($result['success']) {
                    redirect_with_message("task.php?id=$task_id", 'File uploaded successfully', 'success');
                } else {
                    redirect_with_message("task.php?id=$task_id", $result['error'], 'danger');
                }
            }
            break;

        case 'log_time':
            $hours = isset($_POST['hours']) ? floatval($_POST['hours']) : 0;
            $description = isset($_POST['time_description']) ? trim($_POST['time_description']) : '';
            if ($hours > 0) {
                $task->log_time($hours, $description);
                redirect_with_message("task.php?id=$task_id", 'Time logged successfully', 'success');
            }
            break;

        case 'update_status':
            $new_status = isset($_POST['status']) ? $_POST['status'] : '';
            if (!empty($new_status)) {
                $task->status = $new_status;
                $task->update();
                redirect_with_message("task.php?id=$task_id", 'Status updated', 'success');
            }
            break;
    }
}

// Get time logs
$sql = "SELECT tl.*, u.name as user_name
        FROM time_logs tl
        LEFT JOIN users u ON tl.user_id = u.id
        WHERE tl.task_id = $task_id
        ORDER BY tl.logged_at DESC";
$time_logs = db_fetch_all(db_query($sql));
$total_logged = array_sum(array_column($time_logs, 'hours'));
?>

<div class="row">
    <div class="col-md-12">
        <ol class="breadcrumb">
            <li><a href="dashboard.php">Dashboard</a></li>
            <?php if ($project): ?>
                <li><a href="project.php?id=<?php echo $project->id; ?>"><?php echo htmlspecialchars($project->name); ?></a></li>
            <?php endif; ?>
            <li><a href="tasks.php">Tasks</a></li>
            <li class="active"><?php echo htmlspecialchars(truncate_text($task->title, 30)); ?></li>
        </ol>
    </div>
</div>

<div class="row">
    <!-- Main Content -->
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <div class="pull-right">
                    <a href="task_edit.php?id=<?php echo $task->id; ?>" class="btn btn-default btn-sm">
                        <i class="fa fa-edit"></i> Edit
                    </a>
                    <a href="task_delete.php?id=<?php echo $task->id; ?>" class="btn btn-danger btn-sm"
                       data-confirm="Are you sure you want to delete this task?">
                        <i class="fa fa-trash"></i> Delete
                    </a>
                </div>
                <h2 style="margin: 0;">
                    <?php echo htmlspecialchars($task->title); ?>
                </h2>
            </div>

            <div style="padding: 20px;">
                <!-- Status badges -->
                <p>
                    <?php echo get_priority_badge($task->priority); ?>
                    <?php echo get_status_badge($task->status); ?>
                    <?php if ($task->is_overdue()): ?>
                        <span class="badge badge-danger"><i class="fa fa-exclamation-triangle"></i> Overdue</span>
                    <?php endif; ?>
                </p>

                <!-- Quick status update -->
                <div class="btn-group" style="margin-bottom: 20px;">
                    <form method="POST" style="display: inline;">
                        <?php csrf_field(); ?>
                        <input type="hidden" name="action" value="update_status">
                        <button type="submit" name="status" value="pending" class="btn btn-default btn-sm <?php echo $task->status == 'pending' ? 'active' : ''; ?>">
                            Pending
                        </button>
                        <button type="submit" name="status" value="in_progress" class="btn btn-default btn-sm <?php echo $task->status == 'in_progress' ? 'active' : ''; ?>">
                            In Progress
                        </button>
                        <button type="submit" name="status" value="review" class="btn btn-default btn-sm <?php echo $task->status == 'review' ? 'active' : ''; ?>">
                            Review
                        </button>
                        <button type="submit" name="status" value="completed" class="btn btn-default btn-sm <?php echo $task->status == 'completed' ? 'active' : ''; ?>">
                            Completed
                        </button>
                    </form>
                </div>

                <!-- Description -->
                <h4>Description</h4>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <?php if ($task->description): ?>
                        <?php echo nl2br(htmlspecialchars($task->description)); ?>
                    <?php else: ?>
                        <em class="text-muted">No description provided</em>
                    <?php endif; ?>
                </div>

                <!-- Tags -->
                <?php if ($task->tags): ?>
                    <h4>Tags</h4>
                    <p>
                        <?php foreach (explode(',', $task->tags) as $tag): ?>
                            <span class="label label-default"><?php echo htmlspecialchars(trim($tag)); ?></span>
                        <?php endforeach; ?>
                    </p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Comments Section -->
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;"><i class="fa fa-comments"></i> Comments (<?php echo count($comments); ?>)</h3>
            </div>

            <?php if (empty($comments)): ?>
                <div class="text-center" style="padding: 30px;">
                    <p class="text-muted">No comments yet. Be the first to comment!</p>
                </div>
            <?php else: ?>
                <?php foreach ($comments as $comment): ?>
                    <div class="comment <?php echo $comment['type'] == 'system' ? 'system' : ''; ?>">
                        <?php if ($comment['type'] != 'system'): ?>
                            <img src="<?php echo $comment['user_avatar'] ? APP_URL . '/uploads/' . $comment['user_avatar'] : 'https://www.gravatar.com/avatar/?d=mp'; ?>"
                                 class="avatar" style="float: left; margin-right: 15px;">
                        <?php endif; ?>
                        <div style="<?php echo $comment['type'] != 'system' ? 'margin-left: 50px;' : ''; ?>">
                            <strong><?php echo $comment['type'] == 'system' ? 'System' : htmlspecialchars($comment['user_name']); ?></strong>
                            <span class="text-muted"><?php echo time_ago($comment['created_at']); ?></span>
                            <p style="margin-top: 5px;"><?php echo nl2br(htmlspecialchars($comment['content'])); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

            <!-- Add comment form -->
            <div style="padding: 20px; background: #f9f9f9; border-top: 1px solid #eee;">
                <form method="POST">
                    <?php csrf_field(); ?>
                    <input type="hidden" name="action" value="add_comment">
                    <div class="form-group">
                        <textarea name="comment" class="form-control" rows="3" placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-paper-plane"></i> Post Comment
                    </button>
                </form>
            </div>
        </div>

        <!-- Attachments Section -->
        <?php if (FEATURE_ATTACHMENTS): ?>
        <div class="card">
            <div class="card-header">
                <h3 style="margin: 0;"><i class="fa fa-paperclip"></i> Attachments (<?php echo count($attachments); ?>)</h3>
            </div>

            <?php if (!empty($attachments)): ?>
                <?php foreach ($attachments as $att): ?>
                    <div class="attachment-item" style="margin: 15px;">
                        <div class="row">
                            <div class="col-md-8">
                                <i class="fa fa-file"></i>
                                <a href="download.php?id=<?php echo $att['id']; ?>">
                                    <?php echo htmlspecialchars($att['original_name']); ?>
                                </a>
                                <br>
                                <small class="text-muted">
                                    <?php echo format_file_size($att['file_size']); ?> &middot;
                                    Uploaded by <?php echo htmlspecialchars($att['uploaded_by_name']); ?> &middot;
                                    <?php echo time_ago($att['created_at']); ?>
                                </small>
                            </div>
                            <div class="col-md-4 text-right">
                                <a href="download.php?id=<?php echo $att['id']; ?>" class="btn btn-default btn-sm">
                                    <i class="fa fa-download"></i> Download
                                </a>
                                <a href="attachment_delete.php?id=<?php echo $att['id']; ?>&task_id=<?php echo $task->id; ?>"
                                   class="btn btn-danger btn-sm" data-confirm="Delete this attachment?">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

            <!-- Upload form -->
            <div style="padding: 20px; background: #f9f9f9; border-top: 1px solid #eee;">
                <form method="POST" enctype="multipart/form-data">
                    <?php csrf_field(); ?>
                    <input type="hidden" name="action" value="upload_file">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="file" name="attachment" class="form-control" required>
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-upload"></i> Upload
                                </button>
                            </span>
                        </div>
                        <small class="text-muted">
                            Max file size: <?php echo format_file_size(MAX_UPLOAD_SIZE); ?>.
                            Allowed: <?php echo ALLOWED_EXTENSIONS; ?>
                        </small>
                    </div>
                </form>
            </div>
        </div>
        <?php endif; ?>
    </div>

    <!-- Sidebar -->
    <div class="col-md-4">
        <!-- Task Details -->
        <div class="card">
            <div class="card-header">
                <h4 style="margin: 0;">Details</h4>
            </div>
            <ul class="list-group" style="margin: 0;">
                <li class="list-group-item">
                    <strong>Project</strong>
                    <span class="pull-right">
                        <?php if ($project): ?>
                            <span class="project-color" style="background: <?php echo $project->color; ?>"></span>
                            <a href="project.php?id=<?php echo $project->id; ?>">
                                <?php echo htmlspecialchars($project->name); ?>
                            </a>
                        <?php else: ?>
                            <span class="text-muted">None</span>
                        <?php endif; ?>
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>Assigned To</strong>
                    <span class="pull-right">
                        <?php if ($assigned_user): ?>
                            <img src="<?php echo $assigned_user->avatar ? APP_URL . '/uploads/' . $assigned_user->avatar : 'https://www.gravatar.com/avatar/?d=mp'; ?>"
                                 class="avatar avatar-sm">
                            <?php echo htmlspecialchars($assigned_user->name); ?>
                        <?php else: ?>
                            <span class="text-muted">Unassigned</span>
                        <?php endif; ?>
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>Created By</strong>
                    <span class="pull-right">
                        <?php if ($created_by_user): ?>
                            <?php echo htmlspecialchars($created_by_user->name); ?>
                        <?php else: ?>
                            <span class="text-muted">Unknown</span>
                        <?php endif; ?>
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>Due Date</strong>
                    <span class="pull-right <?php echo $task->is_overdue() ? 'text-danger' : ''; ?>">
                        <?php if ($task->due_date): ?>
                            <?php echo $task->is_overdue() ? '<i class="fa fa-exclamation-triangle"></i> ' : ''; ?>
                            <?php echo format_date($task->due_date); ?>
                        <?php else: ?>
                            <span class="text-muted">Not set</span>
                        <?php endif; ?>
                    </span>
                </li>
                <li class="list-group-item">
                    <strong>Created</strong>
                    <span class="pull-right"><?php echo format_datetime($task->created_at); ?></span>
                </li>
                <?php if ($task->completed_at): ?>
                <li class="list-group-item">
                    <strong>Completed</strong>
                    <span class="pull-right"><?php echo format_datetime($task->completed_at); ?></span>
                </li>
                <?php endif; ?>
            </ul>
        </div>

        <!-- Time Tracking -->
        <div class="card">
            <div class="card-header">
                <h4 style="margin: 0;">
                    <i class="fa fa-clock-o"></i> Time Tracking
                    <button class="btn btn-sm btn-success pull-right" onclick="$('#logTimeForm').toggle();">
                        <i class="fa fa-plus"></i> Log Time
                    </button>
                </h4>
            </div>

            <div id="logTimeForm" style="display: none; padding: 15px; background: #f9f9f9; border-bottom: 1px solid #eee;">
                <form method="POST">
                    <?php csrf_field(); ?>
                    <input type="hidden" name="action" value="log_time">
                    <div class="form-group">
                        <label>Hours</label>
                        <input type="number" name="hours" class="form-control" step="0.25" min="0.25" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" name="time_description" class="form-control" placeholder="What did you work on?">
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">Log Time</button>
                </form>
            </div>

            <ul class="list-group" style="margin: 0;">
                <li class="list-group-item">
                    <strong>Estimated</strong>
                    <span class="pull-right"><?php echo $task->estimated_hours ? $task->estimated_hours . 'h' : '—'; ?></span>
                </li>
                <li class="list-group-item">
                    <strong>Logged</strong>
                    <span class="pull-right"><?php echo $total_logged ? $total_logged . 'h' : '—'; ?></span>
                </li>
                <?php if ($task->estimated_hours && $total_logged): ?>
                    <li class="list-group-item">
                        <strong>Progress</strong>
                        <div class="progress progress-thin" style="margin: 5px 0 0;">
                            <?php $percent = min(100, ($total_logged / $task->estimated_hours) * 100); ?>
                            <div class="progress-bar <?php echo $percent > 100 ? 'progress-bar-danger' : 'progress-bar-success'; ?>"
                                 style="width: <?php echo $percent; ?>%"></div>
                        </div>
                    </li>
                <?php endif; ?>
            </ul>

            <?php if (!empty($time_logs)): ?>
                <div style="max-height: 200px; overflow-y: auto;">
                    <?php foreach ($time_logs as $log): ?>
                        <div class="time-log">
                            <strong><?php echo $log['hours']; ?>h</strong>
                            <span class="text-muted">by <?php echo htmlspecialchars($log['user_name']); ?></span>
                            <br>
                            <small class="text-muted">
                                <?php echo $log['description'] ? htmlspecialchars($log['description']) . ' &middot; ' : ''; ?>
                                <?php echo time_ago($log['logged_at']); ?>
                            </small>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php require_once 'templates/footer.php'; ?>
