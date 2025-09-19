import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DSS: React.FC = () => {
  // state for showing alert messages
  const [message, setMessage] = useState<string | null>(null);

  const handleNotification = (name: string) => {
    setMessage(`✅ Notification sent to ${name}`);
    setTimeout(() => setMessage(null), 3000); // auto-hide after 3s
  };

  return (
    <div className="space-y-4">
      {message && (
        <div className="p-3 rounded bg-green-100 text-green-800 font-medium">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dssData.map((entry) => (
          <Card
            key={entry.id}
            className={`${
              entry.status === "Approved"
                ? "border-green-500"
                : entry.status === "Pending"
                ? "border-yellow-500"
                : "border-red-500"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{entry.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    entry.status === "Approved"
                      ? "bg-green-200 text-green-800"
                      : entry.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {entry.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Holding: {entry.holding}</p>
              <p className="text-sm text-gray-600">
                Schemes: {entry.schemes.join(", ")}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => handleNotification(entry.name)}
              >
                Send Notification
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export const dssData = [
  {
    id: 1,
    name: "Ramesh Kumar Gond",
    holding: "2.5 hectares - IFR",
    schemes: ["PM Kisan", "Forest Livelihood Scheme"],
    status: "Approved",
  },
  {
    id: 2,
    name: "Sita Devi Bhil",
    holding: "15 hectares - CFR",
    schemes: ["MGNREGA", "Forest Rights Grant"],
    status: "Pending",
  },
  {
    id: 3,
    name: "Arjun Singh Oraon",
    holding: "8.5 hectares - CR",
    schemes: ["PM Awas Yojana"],
    status: "Rejected",
  },
  {
    id: 4,
    name: "Meena Kumari Sahariya",
    holding: "1.8 hectares - IFR",
    schemes: ["PM Kisan", "Livelihood Support Scheme"],
    status: "Approved",
  },
  {
    id: 5,
    name: "Ravi Prasad Nayak",
    holding: "12 hectares - CFR",
    schemes: ["MGNREGA", "PM Awas Yojana"],
    status: "Pending",
  },
  {
    id: 6,
    name: "Kavita Bai Gond",
    holding: "3.2 hectares - IFR",
    schemes: ["PM Kisan"],
    status: "Approved",
  },
  {
    id: 7,
    name: "Shankar Lal Bhil",
    holding: "6.7 hectares - CR",
    schemes: ["Forest Rights Grant"],
    status: "Rejected",
  },
  {
    id: 8,
    name: "Pooja Devi Munda",
    holding: "4 hectares - IFR",
    schemes: ["PM Kisan", "PM Awas Yojana"],
    status: "Pending",
  },
  {
    id: 9,
    name: "Vikram Singh Kharia",
    holding: "9 hectares - CFR",
    schemes: ["MGNREGA", "Forest Livelihood Scheme"],
    status: "Approved",
  },
  {
    id: 10,
    name: "Geeta Kumari Oraon",
    holding: "2 hectares - IFR",
    schemes: ["PM Kisan", "Livelihood Support Scheme"],
    status: "Rejected",
  },
  {
    id: 11,
    name: "Mohan Lal Pahadiya",
    holding: "11 hectares - CFR",
    schemes: ["MGNREGA", "PM Awas Yojana"],
    status: "Approved",
  },
  {
    id: 12,
    name: "Radha Devi Baiga",
    holding: "5 hectares - CR",
    schemes: ["PM Kisan"],
    status: "Pending",
  },
  {
    id: 13,
    name: "Anil Kumar Gond",
    holding: "7 hectares - CFR",
    schemes: ["Forest Livelihood Scheme", "MGNREGA"],
    status: "Rejected",
  },
];


export default DSS;
