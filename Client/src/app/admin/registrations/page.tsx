"use client";

import { useEffect, useState } from "react";
import { Download, Trash2, Users } from "lucide-react";

interface RegistrationItem {
    id: string;
    firstName: string;
    middleName: string;
    surname: string;
    phone: string;
    email: string;
    company: string;
    profession: string;
    professionOther: string;
    interest: string;
    interestOther: string;
    eventName: string;
    eventDate: string | null;
    createdAt: string | null;
}

export default function AdminRegistrationsPage() {
    const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(null);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch("/api/admin/registrations", {
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch registrations");
            }

            const data = await res.json();
            setRegistrations(data);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleDownload = () => {
        window.location.href = "/api/admin/registrations/export";
    };

    const handleDelete = async (item: RegistrationItem) => {
        const name = [item.firstName, item.middleName, item.surname].filter(Boolean).join(" ");
        if (!window.confirm(`Delete the registration for ${name} (${item.email})? This cannot be undone.`)) return;

        setDeletingId(item.id);
        setNotice(null);
        try {
            const res = await fetch(`/api/admin/registrations/${item.id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Failed to delete registration");
            }

            setRegistrations((current) => current.filter((registration) => registration.id !== item.id));
            setNotice({ text: `Deleted the registration for ${name}.`, error: false });
        } catch (error) {
            setNotice({
                text: error instanceof Error ? error.message : "Failed to delete registration",
                error: true,
            });
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading registrations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Event Registrations</h1>
                        <p className="text-gray-600 mt-1">All event registrations</p>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download CSV
                    </button>
                </div>

                {notice && (
                    <p
                        role={notice.error ? "alert" : "status"}
                        className={`mb-4 rounded-lg px-4 py-3 text-sm ${notice.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
                    >
                        {notice.text}
                    </p>
                )}

                {registrations.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No registrations yet</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1250px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company / Organisation</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interested In</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {registrations.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                {item.firstName} {item.middleName} {item.surname}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.email}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.phone}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.company || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.profession === "Other" ? item.professionOther || "Other" : item.profession || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.interest === "Other" ? item.interestOther || "Other" : item.interest || "-"}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.eventName}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {item.createdAt ? new Date(item.createdAt).toLocaleString("en-GB") : "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(item)}
                                                    disabled={deletingId !== null}
                                                    aria-label={`Delete registration for ${item.firstName} ${item.surname}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Trash2 size={15} aria-hidden="true" />
                                                    {deletingId === item.id ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
