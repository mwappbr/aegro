    </div><!-- /.main-content -->

    <!-- Footer -->
    <footer style="text-align: center; padding: 20px; color: #666; margin-left: <?php echo isset($current_user) && $current_user ? '220px' : '0'; ?>;">
        <p>&copy; <?php echo date('Y'); ?> <?php echo APP_NAME; ?> v<?php echo APP_VERSION; ?></p>
    </footer>

    <!-- Debug Panel (shown when DEBUG_MODE is on) -->
    <?php if (DEBUG_MODE && isset($GLOBALS['query_log']) && is_array($GLOBALS['query_log'])): ?>
    <div class="debug-panel">
        <strong>Debug: <?php echo count($GLOBALS['query_log']); ?> queries executed</strong>
        <ul style="margin: 5px 0; padding-left: 20px;">
            <?php foreach ($GLOBALS['query_log'] as $query): ?>
            <li><?php echo htmlspecialchars(truncate_text($query['sql'], 150)); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php endif; ?>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- Inline JavaScript (should be external!) -->
    <script>
        $(document).ready(function() {
            // Initialize tooltips
            $('[data-toggle="tooltip"]').tooltip();

            // Initialize popovers
            $('[data-toggle="popover"]').popover();

            // Confirm delete actions
            $('[data-confirm]').click(function(e) {
                if (!confirm($(this).data('confirm'))) {
                    e.preventDefault();
                    return false;
                }
            });

            // Auto-hide alerts after 5 seconds
            setTimeout(function() {
                $('.alert').fadeOut('slow');
            }, 5000);

            // Task status quick update
            $('.task-status-toggle').click(function() {
                var taskId = $(this).data('task-id');
                var newStatus = $(this).data('status');
                var $btn = $(this);

                $.ajax({
                    url: '<?php echo APP_URL; ?>/api/update_task_status.php',
                    type: 'POST',
                    data: {
                        task_id: taskId,
                        status: newStatus,
                        csrf_token: '<?php echo generate_csrf_token(); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            location.reload();
                        } else {
                            alert('Failed to update task: ' + response.error);
                        }
                    },
                    error: function() {
                        alert('An error occurred');
                    }
                });
            });

            // File upload preview
            $('input[type="file"]').change(function() {
                var filename = $(this).val().split('\\').pop();
                $(this).closest('.file-upload').find('.file-name').text(filename || 'Choose file...');
            });

            // Character counter for textareas
            $('textarea[maxlength]').each(function() {
                var maxLength = $(this).attr('maxlength');
                var $counter = $('<small class="text-muted pull-right">0/' + maxLength + '</small>');
                $(this).after($counter);

                $(this).on('input', function() {
                    var current = $(this).val().length;
                    $counter.text(current + '/' + maxLength);
                });
            });

            // Due date color coding
            $('.due-date').each(function() {
                var dueDate = new Date($(this).data('date'));
                var today = new Date();
                today.setHours(0, 0, 0, 0);

                if (dueDate < today) {
                    $(this).addClass('text-danger').prepend('<i class="fa fa-exclamation-triangle"></i> ');
                } else if (dueDate.getTime() === today.getTime()) {
                    $(this).addClass('text-warning').prepend('<i class="fa fa-clock-o"></i> ');
                }
            });
        });

        // Global AJAX setup
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': '<?php echo generate_csrf_token(); ?>'
            }
        });

        // Log time modal handler
        function openLogTimeModal(taskId) {
            $('#logTimeTaskId').val(taskId);
            $('#logTimeModal').modal('show');
        }

        // Quick add task handler
        function quickAddTask(projectId) {
            $('#quickTaskProjectId').val(projectId);
            $('#quickAddTaskModal').modal('show');
        }

        // Delete confirmation
        function confirmDelete(message, url) {
            if (confirm(message || 'Are you sure you want to delete this item?')) {
                window.location.href = url;
            }
        }
    </script>

    <!-- Modals -->
    <!-- Log Time Modal -->
    <div class="modal fade" id="logTimeModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="<?php echo APP_URL; ?>/api/log_time.php" method="POST">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Log Time</h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="task_id" id="logTimeTaskId">
                        <?php csrf_field(); ?>
                        <div class="form-group">
                            <label>Hours</label>
                            <input type="number" name="hours" class="form-control" step="0.25" min="0.25" required>
                        </div>
                        <div class="form-group">
                            <label>Description (optional)</label>
                            <textarea name="description" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Log Time</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Quick Add Task Modal -->
    <div class="modal fade" id="quickAddTaskModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="<?php echo APP_URL; ?>/api/quick_add_task.php" method="POST">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Quick Add Task</h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="project_id" id="quickTaskProjectId">
                        <?php csrf_field(); ?>
                        <div class="form-group">
                            <label>Task Title *</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Priority</label>
                                    <select name="priority" class="form-control">
                                        <option value="low">Low</option>
                                        <option value="medium" selected>Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Due Date</label>
                                    <input type="date" name="due_date" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
</html>
