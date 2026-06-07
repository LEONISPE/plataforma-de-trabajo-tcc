import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import OpenChatDialog from "@/components/workspace/messagues/open-chat-dialog";

import TaskTable from "@/components/workspace/task/task-table";

export default function Tasks() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Todas las Tareas
          </h2>

          <p className="text-muted-foreground">
            Aqui la lista de tareas para este Proyecto!
          </p>
        </div>

        <div className="flex gap-2">
          <OpenChatDialog />
          <CreateTaskDialog />
        </div>
      </div>

      <div>
        <TaskTable />
      </div>
    </div>
  );
}