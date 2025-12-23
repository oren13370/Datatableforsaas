import { Settings, Bell, Lock, Users, Database, Building2, Tag, Plus, Pencil, Trash2, Check, X, FileSignature } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "./ui/utils";

interface Department {
  id: string;
  name: string;
  protocolCount: number;
}

interface Status {
  id: string;
  name: string;
  color: string;
}

type SettingsSection = "general" | "departments" | "statuses" | "notifications" | "access" | "approvers" | "digital-signature";

export function SettingsTab() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");
  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "Chemistry", protocolCount: 2 },
    { id: "2", name: "Manufacturing", protocolCount: 1 },
    { id: "3", name: "Human Resources", protocolCount: 2 },
    { id: "4", name: "Information Technology", protocolCount: 1 },
    { id: "5", name: "Legal", protocolCount: 1 },
    { id: "6", name: "Quality Assurance", protocolCount: 2 },
    { id: "7", name: "Electrical Engineering", protocolCount: 1 },
    { id: "8", name: "Logistics", protocolCount: 1 },
  ]);
  const [statuses, setStatuses] = useState<Status[]>([
    { id: "1", name: "Active", color: "bg-green-100 text-green-700 border-green-200" },
    { id: "2", name: "Draft", color: "bg-slate-100 text-slate-700 border-slate-200" },
    { id: "3", name: "Under Review", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    { id: "4", name: "Archived", color: "bg-red-100 text-red-700 border-red-200" },
  ]);
  
  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [newDeptName, setNewDeptName] = useState("");
  const [newStatusName, setNewStatusName] = useState("");
  const [isAddingDept, setIsAddingDept] = useState(false);
  const [isAddingStatus, setIsAddingStatus] = useState(false);

  const handleAddDepartment = () => {
    if (newDeptName.trim()) {
      setDepartments([
        ...departments,
        { id: Date.now().toString(), name: newDeptName, protocolCount: 0 }
      ]);
      setNewDeptName("");
      setIsAddingDept(false);
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleAddStatus = () => {
    if (newStatusName.trim()) {
      setStatuses([
        ...statuses,
        { 
          id: Date.now().toString(), 
          name: newStatusName, 
          color: "bg-blue-100 text-blue-700 border-blue-200" 
        }
      ]);
      setNewStatusName("");
      setIsAddingStatus(false);
    }
  };

  const handleDeleteStatus = (id: string) => {
    setStatuses(statuses.filter(s => s.id !== id));
  };

  const sections = [
    { id: "general" as const, label: "General", icon: Database },
    { id: "departments" as const, label: "Departments", icon: Building2 },
    { id: "statuses" as const, label: "Statuses", icon: Tag },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "access" as const, label: "Access Control", icon: Lock },
    { id: "approvers" as const, label: "Approvers", icon: Users },
    { id: "digital-signature" as const, label: "Digital Signature", icon: FileSignature },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <Settings className="size-5 text-slate-700" />
            <h2 className="text-slate-900">Settings</h2>
          </div>
        </div>
        <nav className="p-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all mb-1",
                  activeSection === section.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="size-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* General Settings */}
        {activeSection === "general" && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-2">General Settings</h3>
              <p className="text-sm text-slate-500">Configure default protocol management settings</p>
            </div>

            <div className="space-y-6 max-w-2xl">
              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Default Protocol Version Format</label>
                <Input defaultValue="X.Y" placeholder="e.g., X.Y or X.Y.Z" />
                <p className="text-xs text-slate-500">Format for new protocol versions (e.g., 1.0, 2.1)</p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Auto-archive protocols after (days)</label>
                <Input type="number" defaultValue="365" placeholder="365" />
                <p className="text-xs text-slate-500">Automatically archive inactive protocols after specified days</p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Protocol ID Prefix</label>
                <Input defaultValue="PROT" placeholder="e.g., PROT, DOC" />
                <p className="text-xs text-slate-500">Prefix for auto-generated protocol IDs</p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Date Format</label>
                <select className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
                <p className="text-xs text-slate-500">Display format for dates throughout the application</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Reset to Defaults</Button>
              </div>
            </div>
          </div>
        )}

        {/* Departments Management */}
        {activeSection === "departments" && (
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-slate-900 mb-2">Manage Departments</h3>
                <p className="text-sm text-slate-500">Add, edit, or remove departments for protocol organization</p>
              </div>
              <Button
                onClick={() => setIsAddingDept(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="size-4" />
                Add Department
              </Button>
            </div>

            <div className="max-w-3xl">
              <div className="bg-slate-50 rounded-lg border border-slate-200">
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 border-b border-slate-200 text-xs text-slate-600 font-medium">
                  <div>Department Name</div>
                  <div className="text-center w-32">Protocols</div>
                  <div className="w-24 text-right">Actions</div>
                </div>

                <div className="divide-y divide-slate-200">
                  {isAddingDept && (
                    <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 bg-blue-50">
                      <Input
                        value={newDeptName}
                        onChange={(e) => setNewDeptName(e.target.value)}
                        placeholder="Enter department name"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddDepartment();
                          if (e.key === "Escape") {
                            setIsAddingDept(false);
                            setNewDeptName("");
                          }
                        }}
                      />
                      <div className="w-32" />
                      <div className="w-24 flex gap-1 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={handleAddDepartment}
                        >
                          <Check className="size-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => {
                            setIsAddingDept(false);
                            setNewDeptName("");
                          }}
                        >
                          <X className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {departments.map((dept) => (
                    <div key={dept.id} className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 hover:bg-slate-50 transition-colors">
                      {editingDept === dept.id ? (
                        <Input
                          defaultValue={dept.name}
                          autoFocus
                          onBlur={() => setEditingDept(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Escape") {
                              setEditingDept(null);
                            }
                          }}
                        />
                      ) : (
                        <div className="flex items-center">
                          <span className="text-slate-900">{dept.name}</span>
                        </div>
                      )}
                      <div className="w-32 flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                          {dept.protocolCount}
                        </span>
                      </div>
                      <div className="w-24 flex gap-1 justify-end items-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => setEditingDept(dept.id)}
                        >
                          <Pencil className="size-3.5 text-slate-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => handleDeleteDepartment(dept.id)}
                        >
                          <Trash2 className="size-3.5 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Deleting a department will not delete associated protocols. 
                  They will need to be reassigned to another department.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statuses Management */}
        {activeSection === "statuses" && (
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-slate-900 mb-2">Manage Statuses</h3>
                <p className="text-sm text-slate-500">Add, edit, or remove protocol status types</p>
              </div>
              <Button
                onClick={() => setIsAddingStatus(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="size-4" />
                Add Status
              </Button>
            </div>

            <div className="max-w-3xl">
              <div className="bg-slate-50 rounded-lg border border-slate-200">
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 border-b border-slate-200 text-xs text-slate-600 font-medium">
                  <div>Status Name</div>
                  <div className="text-center w-40">Preview</div>
                  <div className="w-24 text-right">Actions</div>
                </div>

                <div className="divide-y divide-slate-200">
                  {isAddingStatus && (
                    <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 bg-blue-50">
                      <Input
                        value={newStatusName}
                        onChange={(e) => setNewStatusName(e.target.value)}
                        placeholder="Enter status name"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddStatus();
                          if (e.key === "Escape") {
                            setIsAddingStatus(false);
                            setNewStatusName("");
                          }
                        }}
                      />
                      <div className="w-40" />
                      <div className="w-24 flex gap-1 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={handleAddStatus}
                        >
                          <Check className="size-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => {
                            setIsAddingStatus(false);
                            setNewStatusName("");
                          }}
                        >
                          <X className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {statuses.map((status) => (
                    <div key={status.id} className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 hover:bg-slate-50 transition-colors">
                      {editingStatus === status.id ? (
                        <Input
                          defaultValue={status.name}
                          autoFocus
                          onBlur={() => setEditingStatus(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Escape") {
                              setEditingStatus(null);
                            }
                          }}
                        />
                      ) : (
                        <div className="flex items-center">
                          <span className="text-slate-900">{status.name}</span>
                        </div>
                      )}
                      <div className="w-40 flex items-center justify-center">
                        <span className={cn("px-3 py-1 rounded-full text-sm border", status.color)}>
                          {status.name}
                        </span>
                      </div>
                      <div className="w-24 flex gap-1 justify-end items-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => setEditingStatus(status.id)}
                        >
                          <Pencil className="size-3.5 text-slate-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => handleDeleteStatus(status.id)}
                        >
                          <Trash2 className="size-3.5 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeSection === "notifications" && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-2">Notification Preferences</h3>
              <p className="text-sm text-slate-500">Configure how and when you receive notifications</p>
            </div>

            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Email Notifications</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Protocol updates</span>
                      <p className="text-xs text-slate-500 mt-0.5">Receive notifications when protocols are updated</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">New approvals</span>
                      <p className="text-xs text-slate-500 mt-0.5">Get notified when protocols receive new approvals</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Weekly summary emails</span>
                      <p className="text-xs text-slate-500 mt-0.5">Receive a weekly digest of protocol changes</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Department assignments</span>
                      <p className="text-xs text-slate-500 mt-0.5">Notify when new protocols are assigned to your department</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">In-App Notifications</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Real-time updates</span>
                      <p className="text-xs text-slate-500 mt-0.5">Show notifications for real-time protocol changes</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Comments and mentions</span>
                      <p className="text-xs text-slate-500 mt-0.5">Notify when someone mentions you in protocol comments</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <Button>Save Preferences</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Access Control Settings */}
        {activeSection === "access" && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-2">Access Control</h3>
              <p className="text-sm text-slate-500">Manage permissions and access controls for protocols</p>
            </div>

            <div className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Protocol Permissions</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Require approval for protocol changes</span>
                      <p className="text-xs text-slate-500 mt-0.5">All protocol updates must be approved before publishing</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Enable version control</span>
                      <p className="text-xs text-slate-500 mt-0.5">Track all versions of protocols with full history</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Department-level permissions</span>
                      <p className="text-xs text-slate-500 mt-0.5">Restrict protocol access and editing by department</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Allow public viewing</span>
                      <p className="text-xs text-slate-500 mt-0.5">Enable read-only access for non-authenticated users</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Audit & Compliance</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Log all protocol access</span>
                      <p className="text-xs text-slate-500 mt-0.5">Track who views and downloads protocols</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Require change justification</span>
                      <p className="text-xs text-slate-500 mt-0.5">Users must provide a reason for protocol changes</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Approvers Settings */}
        {activeSection === "approvers" && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-2">Approval Settings</h3>
              <p className="text-sm text-slate-500">Configure approval requirements and default approvers</p>
            </div>

            <div className="space-y-6 max-w-2xl">
              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Minimum number of approvals required</label>
                <Input type="number" defaultValue="2" placeholder="2" className="max-w-xs" />
                <p className="text-xs text-slate-500">Protocols need this many approvals before activation</p>
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-slate-700">Maximum approval time (days)</label>
                <Input type="number" defaultValue="14" placeholder="14" className="max-w-xs" />
                <p className="text-xs text-slate-500">Protocols pending approval for longer will be flagged</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Approval Rules</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Require department head approval</span>
                      <p className="text-xs text-slate-500 mt-0.5">Department head must approve all protocols in their department</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Sequential approval workflow</span>
                      <p className="text-xs text-slate-500 mt-0.5">Approvals must happen in a specific order</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Allow self-approval</span>
                      <p className="text-xs text-slate-500 mt-0.5">Protocol authors can approve their own protocols</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Digital Signature Settings */}
        {activeSection === "digital-signature" && (
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-2">Digital Signature Settings</h3>
              <p className="text-sm text-slate-500">Configure digital signature policies and email notifications for protocol acknowledgment</p>
            </div>

            <div className="space-y-8 max-w-2xl">
              {/* Enable/Disable Digital Signatures */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Digital Signature Activation</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Enable digital signatures</span>
                      <p className="text-xs text-slate-500 mt-0.5">Require team members to digitally sign newly created protocols</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Send signature request emails automatically</span>
                      <p className="text-xs text-slate-500 mt-0.5">Automatically email signature requests when a new protocol is created</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Signature Policies */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Signature Policies</h4>
                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Who must sign new protocols?</label>
                    <select className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950">
                      <option>All department members</option>
                      <option>Department heads only</option>
                      <option>Specific approvers only</option>
                      <option>Everyone in the organization</option>
                    </select>
                    <p className="text-xs text-slate-500">Select who is required to sign newly created protocols</p>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Signature deadline (days after protocol creation)</label>
                    <Input type="number" defaultValue="7" placeholder="7" />
                    <p className="text-xs text-slate-500">Number of days members have to sign after receiving the request</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Block protocol activation until all signatures collected</span>
                      <p className="text-xs text-slate-500 mt-0.5">Protocols cannot be activated until all required signatures are obtained</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Allow signature delegation</span>
                      <p className="text-xs text-slate-500 mt-0.5">Users can delegate their signature authority to others</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Email Template Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Signature Request Email Template</h4>
                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Email subject line</label>
                    <Input 
                      defaultValue="[Action Required] Sign New Protocol: {{protocol_name}}" 
                      placeholder="Enter email subject"
                    />
                    <p className="text-xs text-slate-500">Use <code className="px-1 py-0.5 bg-slate-100 rounded text-xs">{"{{protocol_name}}"}</code>, <code className="px-1 py-0.5 bg-slate-100 rounded text-xs">{"{{department}}"}</code>, <code className="px-1 py-0.5 bg-slate-100 rounded text-xs">{"{{version}}"}</code> as variables</p>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Email body</label>
                    <textarea 
                      className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 resize-none"
                      defaultValue={`Dear {{recipient_name}},

A new protocol has been created that requires your digital signature:

Protocol: {{protocol_name}}
Department: {{department}}
Version: {{version}}
Created by: {{creator_name}}
Deadline: {{signature_deadline}}

Please review and sign the protocol by clicking the link below:
{{signature_link}}

If you have any questions, please contact the protocol administrator.

Best regards,
Protocol Management Team`}
                    />
                    <p className="text-xs text-slate-500">Customize the email body with available variables</p>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Email footer</label>
                    <Input 
                      defaultValue="This is an automated message from the Company Protocol Management System" 
                      placeholder="Enter email footer"
                    />
                  </div>
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Reminder Notifications</h4>
                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Send reminder emails</span>
                      <p className="text-xs text-slate-500 mt-0.5">Automatically send reminders to members who haven't signed</p>
                    </div>
                  </label>

                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">First reminder (days before deadline)</label>
                    <Input type="number" defaultValue="3" placeholder="3" />
                    <p className="text-xs text-slate-500">Send first reminder this many days before the signature deadline</p>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Second reminder (days before deadline)</label>
                    <Input type="number" defaultValue="1" placeholder="1" />
                    <p className="text-xs text-slate-500">Send final reminder this many days before the deadline</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Send overdue notifications</span>
                      <p className="text-xs text-slate-500 mt-0.5">Notify department heads when signatures are overdue</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Signature Completion Notifications */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Completion Notifications</h4>
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Notify protocol creator when all signatures collected</span>
                      <p className="text-xs text-slate-500 mt-0.5">Send confirmation email when all required signatures are obtained</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Send completion confirmation to signers</span>
                      <p className="text-xs text-slate-500 mt-0.5">Notify each signer after they successfully sign the protocol</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Notify department heads of signature progress</span>
                      <p className="text-xs text-slate-500 mt-0.5">Send daily/weekly summary of signature completion status</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Security & Compliance</h4>
                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-700">Signature authentication method</label>
                    <select className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950">
                      <option>Email verification link</option>
                      <option>Two-factor authentication (2FA)</option>
                      <option>Single sign-on (SSO)</option>
                      <option>Password confirmation</option>
                    </select>
                    <p className="text-xs text-slate-500">Choose how users authenticate before signing protocols</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Record IP address and timestamp</span>
                      <p className="text-xs text-slate-500 mt-0.5">Log IP address and exact timestamp for each signature for audit purposes</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Generate signature certificate</span>
                      <p className="text-xs text-slate-500 mt-0.5">Create a PDF certificate as proof of signature for compliance</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 size-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <span className="text-sm text-slate-700 block">Require handwritten signature upload</span>
                      <p className="text-xs text-slate-500 mt-0.5">In addition to digital signature, require users to upload an image of their handwritten signature</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <Button>Save Signature Settings</Button>
                <Button variant="outline">Preview Email Template</Button>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900">
                  <strong>Important:</strong> Digital signatures are legally binding. Ensure your organization's 
                  legal team has reviewed these settings before enabling digital signature requirements.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}