import { LoaderCircle } from "lucide-react";


export function RouteSuspenseFallback() {
  return (
    <div className="flex h-full min-h-48 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-bgSofter dark:text-odp-muted">
      <LoaderCircle className="animate-spin" size={16} />
      <span className="ml-2">로딩 중…</span>
    </div>
  );
}
