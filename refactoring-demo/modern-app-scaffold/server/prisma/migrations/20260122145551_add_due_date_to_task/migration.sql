-- AlterTable
ALTER TABLE "tasks" ADD COLUMN "dueDate" DATETIME;

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "tasks"("dueDate");

-- CreateIndex
CREATE INDEX "tasks_status_dueDate_idx" ON "tasks"("status", "dueDate");
