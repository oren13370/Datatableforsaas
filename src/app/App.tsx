import { useState, useMemo } from "react";
import { CustomerTable, mockProtocols } from "./components/customer-table";
import { SideNav } from "./components/side-nav";

export default function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = useMemo(() => {
    const deptMap = new Map<string, number>();
    
    mockProtocols.forEach((protocol) => {
      deptMap.set(protocol.department, (deptMap.get(protocol.department) || 0) + 1);
    });

    return Array.from(deptMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">Company Protocols</h1>
          <p className="text-slate-600">Manage and organize your company protocols by department</p>
        </div>
        
        <div className="flex gap-6 items-start">
          <SideNav
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
          
          <div className="flex-1 min-w-0">
            <CustomerTable departmentFilter={selectedDepartment} />
          </div>
        </div>
      </div>
    </div>
  );
}