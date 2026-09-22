"use client";

import { useEffect, useState } from "react";
import { Download, Search, Trash2, Users } from "lucide-react";

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
    const [loadError, setLoadError] = useState(false);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(null);

    const fetchRegistrations = async () => {
        try {
            setLoadError(false);
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
            setLoadError(true);
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

    const summary = [
        { label: "Total registered", count: registrations.length },
        { label: "Business owners", count: registrations.filter((item) => item.profession === "Business Owner").length },
        { label: "Membership interest", count: registrations.filter((item) => item.interest === "Membership").length },
        { label: "Sponsorship interest", count: registrations.filter((item) => item.interest === "Sponsorship").length },
        { label: "Advertising interest", count: registrations.filter((item) => item.interest === "Advertising").length },
        { label: "Other interests", count: registrations.filter((item) => item.interest === "Other").length },
    ];
    const query = search.trim().toLowerCase();
    const filteredRegistrations = query
        ? registrations.filter((item) => [
            item.firstName, item.middleName, item.surname, item.email, item.phone,
            item.company, item.profession, item.professionOther,
            item.interest, item.interestOther, item.eventName,
        ].join(" ").toLowerCase().includes(query))
        : registrations;

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

    if (loadError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
                <p role="alert" className="text-red-700">Could not load registrations.</p>
                <button
                    type="button"
                    onClick={() => { setLoading(true); fetchRegistrations(); }}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
                >
                    Try again
                </button>
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

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6 mb-6">
                    {summary.map((item) => (
                        <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <p className="text-xs font-medium text-gray-600">{item.label}</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{item.count}</p>
                        </div>
                    ))}
                </div>

                {registrations.length > 0 && (
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <label className="relative block w-full sm:max-w-sm">
                            <span className="sr-only">Search registrations</span>
                            <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search name, email, profession..."
                                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </label>
                        <p className="text-sm text-gray-600">
                            Showing {filteredRegistrations.length} of {registrations.length} registrations
                        </p>
                    </div>
                )}

                {registrations.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No registrations yet</p>
                    </div>
                ) : filteredRegistrations.length === 0 ? (
                    <div className="rounded-lg bg-white py-12 text-center text-gray-600">
                        No registrations match your search.
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
                                    {filteredRegistrations.map((item) => (
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
