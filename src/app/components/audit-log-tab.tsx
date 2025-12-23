import { History, User, FileText, Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: "created" | "updated" | "deleted" | "approved" | "archived";
  protocol: string;
  department: string;
  details: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-12-23T10:30:00",
    user: "John Doe",
    action: "approved",
    protocol: "Safety Protocol for Chemical Handling",
    department: "Chemistry",
    details: "Approved version 1.0",
  },
  {
    id: "2",
    timestamp: "2024-12-23T09:15:00",
    user: "Jane Smith",
    action: "updated",
    protocol: "IT Security Policy",
    department: "Information Technology",
    details: "Updated security requirements in section 3.2",
  },
  {
    id: "3",
    timestamp: "2024-12-22T16:45:00",
    user: "Alice Johnson",
    action: "created",
    protocol: "Quality Control Procedures",
    department: "Quality Assurance",
    details: "Created new protocol version 0.5",
  },
  {
    id: "4",
    timestamp: "2024-12-22T14:20:00",
    user: "Bob Brown",
    action: "archived",
    protocol: "Safety Protocol for Electrical Equipment",
    department: "Electrical Engineering",
    details: "Archived outdated version 1.5",
  },
  {
    id: "5",
    timestamp: "2024-12-22T11:00:00",
    user: "Charlie Davis",
    action: "approved",
    protocol: "HR Policy on Employee Benefits",
    department: "Human Resources",
    details: "Approved version 1.5",
  },
  {
    id: "6",
    timestamp: "2024-12-21T15:30:00",
    user: "Diana White",
    action: "updated",
    protocol: "Compliance Guide for GDPR",
    department: "Legal",
    details: "Updated data retention policies",
  },
  {
    id: "7",
    timestamp: "2024-12-21T10:15:00",
    user: "Ethan Green",
    action: "created",
    protocol: "Operations Manual for Warehouse",
    department: "Logistics",
    details: "Created initial draft version 0.1",
  },
  {
    id: "8",
    timestamp: "2024-12-20T13:45:00",
    user: "Fiona Black",
    action: "deleted",
    protocol: "Outdated Training Protocol",
    department: "Human Resources",
    details: "Removed obsolete protocol",
  },
];

export function AuditLogTab() {
  const getActionIcon = (action: AuditLogEntry["action"]) => {
    switch (action) {
      case "created":
        return <FileText className="size-4 text-green-600" />;
      case "updated":
        return <Edit className="size-4 text-blue-600" />;
      case "deleted":
        return <Trash2 className="size-4 text-red-600" />;
      case "approved":
        return <CheckCircle className="size-4 text-emerald-600" />;
      case "archived":
        return <Clock className="size-4 text-slate-600" />;
    }
  };

  const getActionBadgeColor = (action: AuditLogEntry["action"]) => {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-700 border-green-200";
      case "updated":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "deleted":
        return "bg-red-100 text-red-700 border-red-200";
      case "approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "archived":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <History className="size-5 text-slate-700" />
          <h2 className="text-slate-900">Audit Log</h2>
        </div>
        <p className="text-sm text-slate-500">Track all protocol changes and activities</p>
      </div>

      <div className="divide-y divide-slate-200">
        {mockAuditLogs.map((entry) => (
          <div key={entry.id} className="p-6 hover:bg-slate-50 transition-colors">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                {getActionIcon(entry.action)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-slate-900">{entry.user}</span>
                      <Badge variant="outline" className={getActionBadgeColor(entry.action)}>
                        {entry.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">
                      <span className="font-medium">{entry.protocol}</span>
                      <span className="text-slate-400 mx-1">•</span>
                      <span className="text-slate-500">{entry.department}</span>
                    </p>
                    <p className="text-sm text-slate-500">{entry.details}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-shrink-0">
                    <Clock className="size-3" />
                    <span>{formatTimestamp(entry.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 text-center">
        <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
          Load more activity
        </button>
      </div>
    </div>
  );
}
