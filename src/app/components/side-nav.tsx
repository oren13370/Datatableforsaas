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
    <aside className="w-full lg:w-72 bg-white border border-slate-200 rounded-lg shadow-sm h-fit lg:sticky lg:top-8">
      <div className="p-4 md:p-6 border-b border-slate-200">
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
            "w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm transition-all mb-1",
            selectedDepartment === null
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <FileText className="size-4 flex-shrink-0" />
            <span>All Protocols</span>
          </div>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs flex-shrink-0",
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
                  "w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-sm transition-all group",
                  selectedDepartment === dept.name
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform flex-shrink-0",
                      selectedDepartment === dept.name && "rotate-90"
                    )}
                  />
                  <span className="text-left truncate">{dept.name}</span>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2",
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