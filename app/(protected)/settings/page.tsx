"use client";

import { useState } from "react";
import {
    User,
    Bell,
    Lock,
    LogOut,
    ShieldCheck,
    Moon,
    ChevronRight
} from "lucide-react";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // هتربط الدالة دي بـ Better Auth أو نظام الـ Auth اللي عندك
    const handleLogout = async () => {
        try {
            // مثال لـ Better Auth:
            // await authClient.signOut();
            console.log("Logged out successfully");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    الإعدادات
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    إدارة إعدادات حسابك وتفضيلات النظام.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">

                {/* Profile Section */}
                <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                الملف الشخصي
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                تعديل الاسم والبريد الإلكتروني والصورة الشخصية
                            </p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 rtl:rotate-180" />
                </div>

                {/* Security / Password Section */}
                <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-lg">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                الأمان وكلمة السر
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                تغيير كلمة المرور وإعدادات التوثيق
                            </p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 rtl:rotate-180" />
                </div>

                {/* Notifications Toggle */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-lg">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                الإشعارات
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                تفعيل أو تعطيل التنبيهات عبر البريد
                            </p>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                </div>

                {/* Dark Mode Toggle */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
                            <Moon className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                المظهر الداكن
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                التبديل بين وضع النهار والوضع الداكن
                            </p>
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                </div>

                {/* Logout Section (Danger Zone) */}
                <div className="p-4 sm:p-6 bg-red-50/30 dark:bg-red-950/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
                                    تسجيل الخروج
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    إنهاء الجلسة الحالية على هذا الجهاز
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <span>خروج</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}