"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  countPendingInquiries,
  initialInquiries,
  parseInquiryMessage,
  type AdminInquiry,
  type InquiryStatus,
} from "@/lib/admin-inquiries";
import {
  deleteInquiry,
  deleteInquiries,
  markInquiryDone,
  markInquiriesDone,
  markInquiriesSeen,
} from "@/lib/db/admin-client";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type AdminInquiriesContextValue = {
  inquiries: AdminInquiry[];
  pendingCount: number;
  newCount: number;
  markDone: (id: string) => void;
  markSeen: (ids: string[]) => void;
  markAllDone: (ids: string[]) => void;
  removeInquiry: (id: string) => void;
  removeAll: (ids: string[]) => void;
};

const AdminInquiriesContext =
  createContext<AdminInquiriesContextValue | null>(null);

export function useAdminInquiries() {
  const ctx = useContext(AdminInquiriesContext);
  if (!ctx) {
    throw new Error("useAdminInquiries must be used within AdminInquiriesProvider");
  }
  return ctx;
}

function mapInquiry(row: {
  id: string;
  name: string;
  company: string | null;
  email: string;
  message: string;
  product_name?: string | null;
  status: string;
  is_new: boolean;
  created_at: string;
}): AdminInquiry {
  const parsed = row.product_name
    ? { productName: row.product_name, message: row.message }
    : parseInquiryMessage(row.message);

  return {
    id: row.id,
    name: row.name,
    company: row.company ?? undefined,
    email: row.email,
    message: parsed.message,
    productName: parsed.productName,
    status: (row.status === "done" ? "done" : "pending") as InquiryStatus,
    isNew: row.is_new,
    createdAt: row.created_at,
  };
}

export function AdminInquiriesProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(
    hasSupabaseEnv() ? [] : initialInquiries,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!hasSupabaseEnv() || loaded) return;

    let cancelled = false;

    (async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (cancelled) return;
        if (!error && data) {
          setInquiries(data.map(mapInquiry));
        }
      } catch {
        // keep mock fallback
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loaded]);

  const markDone = useCallback(async (id: string) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "done", isNew: false }
          : item,
      ),
    );
    try {
      await markInquiryDone(id);
    } catch {
      // optimistic UI already updated; refresh will reconcile
    }
  }, []);

  const markSeen = useCallback(async (ids: string[]) => {
    if (!ids.length) return;

    setInquiries((prev) =>
      prev.map((item) =>
        ids.includes(item.id) ? { ...item, isNew: false } : item,
      ),
    );

    try {
      await markInquiriesSeen(ids);
    } catch {
      // optimistic UI already updated
    }
  }, []);

  const removeInquiry = useCallback(async (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteInquiry(id);
    } catch {
      // optimistic UI already updated
    }
  }, []);

  const markAllDone = useCallback(async (ids: string[]) => {
    if (!ids.length) return;
    setInquiries((prev) =>
      prev.map((item) =>
        ids.includes(item.id)
          ? { ...item, status: "done", isNew: false }
          : item,
      ),
    );
    try {
      await markInquiriesDone(ids);
    } catch {
      // optimistic UI already updated
    }
  }, []);

  const removeAll = useCallback(async (ids: string[]) => {
    if (!ids.length) return;
    setInquiries((prev) => prev.filter((item) => !ids.includes(item.id)));
    try {
      await deleteInquiries(ids);
    } catch {
      // optimistic UI already updated
    }
  }, []);

  const value = useMemo(
    () => ({
      inquiries,
      pendingCount: countPendingInquiries(inquiries),
      newCount: inquiries.filter((item) => item.isNew).length,
      markDone,
      markSeen,
      markAllDone,
      removeInquiry,
      removeAll,
    }),
    [inquiries, markDone, markSeen, markAllDone, removeInquiry, removeAll],
  );

  return (
    <AdminInquiriesContext.Provider value={value}>
      {children}
    </AdminInquiriesContext.Provider>
  );
}
