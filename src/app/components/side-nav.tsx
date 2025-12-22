import { FileText, FolderOpen, ChevronRight } from "lucide-react";
import { cn } from "./ui/utils";

interface Department {
  name: string;
  count: number;
}

interface SideNavProps {
  departments: Department[];
  selectedDepartment: string | null;
  onSelectDepartment: (department: string | null) => void;
}

export function SideNav({
  departments,
  selectedDepartment,
  onSelectDepartment,
}: SideNavProps) {
  return (
    <aside className="w-72 bg-white border border-slate-200 rounded-lg shadow-sm h-fit sticky top-8">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen className="size-5 text-slate-700" />
          <h2 className="text-slate-900">Departments</h2>
        </div>
        <p className="text-sm text-slate-500">Browse protocols by department</p>
      </div>

      <nav className="p-3">
        <button
          onClick={() => onSelectDepartment(null)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all mb-1",
            selectedDepartment === null
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-3">
            <FileText className="size-4" />
            <span>All Protocols</span>
          </div>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs",
              selectedDepartment === null
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-600"
            )}
          >
            {departments.reduce((sum, dept) => sum + dept.count, 0)}
          </span>
        </button>

        <div className="h-px bg-slate-200 my-3" />

        <div className="space-y-1">
          {departments
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((dept) => (
              <button
                key={dept.name}
                onClick={() => onSelectDepartment(dept.name)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all group",
                  selectedDepartment === dept.name
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform",
                      selectedDepartment === dept.name && "rotate-90"
                    )}
                  />
                  <span className="text-left">{dept.name}</span>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    selectedDepartment === dept.name
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  )}
                >
                  {dept.count}
                </span>
              </button>
            ))}
        </div>
      </nav>
    </aside>
  );
}
