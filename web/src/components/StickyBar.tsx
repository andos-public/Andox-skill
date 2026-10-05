"use client";
import Copy from "./Copy";
import Bookmark from "./Bookmark";
export default function StickyBar({ prompt, install, slug }: { prompt: string; install: string; slug: string }) {
  return (<div className="md:hidden fixed inset-x-0 bottom-[58px] z-30 px-3 pb-2" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
    <div className="panel shadow-2xl p-2 flex gap-2 bg-bg2/95 backdrop-blur"><Copy text={prompt} label="Copy prompt" variant="btn-ember flex-1 !min-h-[44px]"/><Copy text={install} label="Install" variant="!min-h-[44px]"/><span className="grid place-items-center px-2"><Bookmark slug={slug} compact/></span></div>
  </div>);
}
