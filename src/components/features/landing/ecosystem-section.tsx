"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaWhatsapp,
} from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamically import CircularGallery so it only runs client-side (WebGL)
const CircularGallery = dynamic(
  () => import("@/components/ui/CircularGallery"),
  { ssr: false }
);

// ── Gallery items — project screenshots ──────────────────────────────────────
const galleryItems = [
  { image: "/images/solutions/coal.png", text: "CoalTrack AI", href: "/solutions#coaltrack" },
  { image: "/images/solutions/gym.png", text: "FitManage 360", href: "/solutions#fitmanage" },
  { image: "/images/solutions/vims.png", text: "MediReach Pro", href: "/solutions#medireach" },
  { image: "/images/solutions/cellcurehub.png", text: "CellCure Hub", href: "/solutions#cellcurehub" },
  { image: "/images/solutions/fitlife.png", text: "FitLife App", href: "/solutions#fitlife" },
  { image: "/images/solutions/memorybox.png", text: "MemoryBox", href: "/solutions#memorybox" },
  { image: "/images/landing/ai-dashboard-visualization.png", text: "AI Dashboard", href: "/services/ai" },
  { image: "/images/landing/futuristic-ai-dashboard.png", text: "Analytics Suite", href: "/services/ai" },
];

// ── Social nodes ─────────────────────────────────────────────────────────────
const socialNodes = [
  {
    id: "instagram",
    label: "Instagram",
    desc: "Follow us for updates & case studies",
    icon: FaInstagram,
    href: "https://www.instagram.com/deepoffduty/",
    color: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    borderColor: "border-pink-200",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    desc: "Connect with our team & company news",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/shaibyasolutions/about/",
    color: "from-blue-600 to-blue-700",
    bgLight: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    external: true,
  },
  {
    id: "blog",
    label: "Blog",
    desc: "Insights, tutorials & tech deep-dives",
    icon: FaMedium,
    href: "https://medium.com/@shaibyasolutions",
    color: "from-slate-700 to-slate-900",
    bgLight: "bg-slate-100",
    textColor: "text-slate-700",
    borderColor: "border-slate-200",
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    desc: "Message us directly for quick queries",
    icon: FaWhatsapp,
    href: "https://wa.me/917498341146?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services.",
    color: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    external: true,
  },
];

// ── Social Card ───────────────────────────────────────────────────────────────
function SocialCard({
  node,
  index,
}: {
  node: (typeof socialNodes)[0];
  index: number;
}) {
  const Icon = node.icon;
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group flex flex-col gap-3 rounded-2xl border ${node.borderColor} ${node.bgLight} p-5 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${node.color} text-white shadow-sm`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className={`font-bold ${node.textColor} text-base`}>{node.label}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          {node.desc}
        </p>
      </div>
      <div
        className={`mt-auto inline-flex items-center gap-1 text-xs font-semibold ${node.textColor} opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`}
      >
        Visit {node.external ? "↗" : "→"}
      </div>
    </motion.div>
  );

  return (
    <a href={node.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function EcosystemSection() {
  const router = useRouter();

  const handleGalleryClick = (index: number) => {
    const item = galleryItems[index];
    if (item?.href) router.push(item.href);
  };
  return (
    <section className="bg-stone-50 py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-2">
            Our Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            All Products &amp; Channels
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Everything we build and every channel we&apos;re active on — all
            connected under one ecosystem.
          </p>
        </motion.div>

        {/* ── Circular Gallery ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Products &amp; Projects — drag to explore
          </p>
          <div className="rounded-3xl overflow-hidden" style={{ height: 480 }}>
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#d97706"
              borderRadius={0.05}
              font="bold 28px sans-serif"
              scrollSpeed={2}
              scrollEase={0.05}
              height={480}
              onItemClick={handleGalleryClick}
            />
          </div>
        </motion.div>

        {/* ── See all projects link ─────────────────────────────── */}
        <div className="text-center mb-16">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            View all projects →
          </Link>
        </div>

        {/* Divider */}
        <div className="section-divider w-full mb-12" />

        {/* Social row */}
        <div className="w-full">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
            Connect with Us
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialNodes.map((node, i) => (
              <SocialCard key={node.id} node={node} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
