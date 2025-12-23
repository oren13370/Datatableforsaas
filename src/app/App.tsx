import { useState, useMemo } from "react";
import { CustomerTable, mockProtocols } from "./components/customer-table";
import { SideNav } from "./components/side-nav";
import { SettingsTab } from "./components/settings-tab";
import { AuditLogTab } from "./components/audit-log-tab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { FileText, Settings, History } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        
        <Tabs defaultValue="protocols" className="w-full">
          <TabsList className="mb-4 md:mb-6 w-full md:w-fit">
            <TabsTrigger value="protocols" className="gap-2 flex-1 md:flex-initial">
              <FileText className="size-4" />
              <span className="hidden sm:inline">Protocols</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 flex-1 md:flex-initial">
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="audit-log" className="gap-2 flex-1 md:flex-initial">
              <History className="size-4" />
              <span className="hidden sm:inline">Audit Log</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="protocols">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
              <SideNav
                departments={departments}
                selectedDepartment={selectedDepartment}
                onSelectDepartment={setSelectedDepartment}
              />
              
              <div className="flex-1 min-w-0 w-full">
                <CustomerTable departmentFilter={selectedDepartment} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>

          <TabsContent value="audit-log">
            <AuditLogTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}