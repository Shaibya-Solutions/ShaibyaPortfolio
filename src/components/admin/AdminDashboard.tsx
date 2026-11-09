"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Users,
  Briefcase,
  MessageSquareQuote,
  HelpCircle,
  Image as ImageIcon,
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Eye,
  Key,
} from "lucide-react";
import {
  getProjects,
  getTestimonials,
  getTeamMembers,
  getCareersRoles,
  getFaqs,
  upsertProject,
  deleteProject,
  upsertTestimonial,
  deleteTestimonial,
  upsertCareerRole,
  deleteCareerRole,
  upsertFaq,
  deleteFaq,
} from "@/lib/supabase/portfolio";
import { getImageUrl } from "@/lib/imagekit";
import assetRegistry from "@/config/imagekit-assets.json";
import type { Project, ProjectType } from "@/data/projects";

type AdminTab = "projects" | "testimonials" | "careers" | "team" | "faqs" | "media" | "database";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authKey, setAuthKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Data states
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [careersList, setCareersList] = useState<any[]>([]);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [faqsList, setFaqsList] = useState<any[]>([]);

  // Editing state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [editingCareer, setEditingCareer] = useState<any | null>(null);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Check session or auto-authenticate if in development
    const saved = localStorage.getItem("shaibya_admin_auth");
    if (saved === "authenticated" || process.env.NODE_ENV === "development") {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authKey.trim() === "shaibya2026") {
      setIsAuthenticated(true);
      localStorage.setItem("shaibya_admin_auth", "authenticated");
      loadAllData();
    } else {
      setStatusMsg({ type: "error", text: "Invalid Admin Passkey or Secret Key." });
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projs, tests, jobs, crew, questions] = await Promise.all([
        getProjects(),
        getTestimonials(),
        getCareersRoles(),
        getTeamMembers(),
        getFaqs(),
      ]);
      setProjectsList(projs);
      setTestimonialsList(tests);
      setCareersList([...jobs]);
      setTeamList(crew);
      setFaqsList([...questions]);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Error fetching data from Supabase." });
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ─── PROJECT HANDLERS ───
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.slug || !editingProject?.name) {
      showStatus("error", "Slug and Name are required.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await upsertProject(editingProject as any);
      if (error) throw error;
      showStatus("success", `Project "${editingProject.name}" saved to shaibya_portfolio.`);
      setEditingProject(null);
      await loadAllData();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm(`Delete project "${slug}" permanently?`)) return;
    setLoading(true);
    try {
      const { error } = await deleteProject(slug);
      if (error) throw error;
      showStatus("success", `Project deleted.`);
      await loadAllData();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  // ─── TESTIMONIAL HANDLERS ───
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await upsertTestimonial(editingTestimonial);
      if (error) throw error;
      showStatus("success", "Testimonial saved.");
      setEditingTestimonial(null);
      await loadAllData();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save testimonial.");
    } finally {
      setLoading(false);
    }
  };

  // ─── CAREER HANDLERS ───
  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await upsertCareerRole(editingCareer);
      if (error) throw error;
      showStatus("success", "Career opening saved.");
      setEditingCareer(null);
      await loadAllData();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save career role.");
    } finally {
      setLoading(false);
    }
  };

  // ─── FAQ HANDLERS ───
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await upsertFaq(editingFaq);
      if (error) throw error;
      showStatus("success", "FAQ saved.");
      setEditingFaq(null);
      await loadAllData();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save FAQ.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 text-sky-400">
            <Key className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Shaibya CMS Admin</h1>
          <p className="text-sm text-slate-400 mb-6">
            Enter passkey or Supabase secret key to manage database records in <code className="text-sky-400 font-mono">shaibya_portfolio</code>.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Passkey
              </label>
              <input
                type="password"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                placeholder="Enter passkey (default: shaibya2026)"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {statusMsg && (
              <p className={`text-xs ${statusMsg.type === "error" ? "text-rose-400" : "text-emerald-400"}`}>
                {statusMsg.text}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-medium transition-colors shadow-lg shadow-sky-500/20"
            >
              Sign In to CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h1 className="font-bold text-lg text-white">Shaibya CMS</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
            schema: shaibya_portfolio
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Live Site
          </a>
        </div>
      </header>

      {/* Status banner */}
      {statusMsg && (
        <div
          className={`px-6 py-2.5 flex items-center gap-2 text-xs font-medium ${
            statusMsg.type === "success" ? "bg-emerald-950/80 text-emerald-300 border-b border-emerald-800" : "bg-rose-950/80 text-rose-300 border-b border-rose-800"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {statusMsg.text}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/30 p-4 space-y-1">
          <button
            onClick={() => { setActiveTab("projects"); setEditingProject(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "projects" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{projectsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab("testimonials"); setEditingTestimonial(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "testimonials" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Testimonials</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{testimonialsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab("careers"); setEditingCareer(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "careers" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4" />
              <span>Careers / Roles</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{careersList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "team" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Team Members</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{teamList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab("faqs"); setEditingFaq(null); }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "faqs" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>FAQs</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{faqsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "media" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4" />
              <span>ImageKit Assets</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">
              {Object.keys(assetRegistry.assets).length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "database" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4" />
              <span>SQL Migration</span>
            </div>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl overflow-y-auto">
          {/* TAB 1: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Projects Management</h2>
                  <p className="text-xs text-slate-400">
                    Add or update portfolio websites, custom solutions, and R&D MVPs.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingProject({
                      slug: "new-project-" + Date.now().toString().slice(-4),
                      name: "",
                      tagline: "",
                      type: "solution",
                      industry: "Technology",
                      client: "",
                      year: "2026",
                      problem: "",
                      solution: "",
                      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
                      stats: [{ value: "85%", label: "Efficiency Increase" }],
                      thumbnail: "/images/solutions/coal.png",
                      featured: false,
                      status: "Production",
                    })
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Project
                </button>
              </div>

              {/* Editing Form Modal/Drawer */}
              {editingProject && (
                <form
                  onSubmit={handleSaveProject}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-sm text-sky-400">
                      {projectsList.some((p) => p.slug === editingProject.slug) ? "Edit Project" : "Create New Project"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Slug (Unique ID)</label>
                      <input
                        type="text"
                        value={editingProject.slug || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={editingProject.name || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Category Type</label>
                      <select
                        value={editingProject.type || "solution"}
                        onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value as ProjectType })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      >
                        <option value="website">Website</option>
                        <option value="solution">Solution</option>
                        <option value="rnd">R&D / MVP</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Client</label>
                      <input
                        type="text"
                        value={editingProject.client || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Industry</label>
                      <input
                        type="text"
                        value={editingProject.industry || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Year</label>
                      <input
                        type="text"
                        value={editingProject.year || "2026"}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={editingProject.tagline || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Problem Statement</label>
                    <textarea
                      rows={2}
                      value={editingProject.problem || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Solution Statement</label>
                    <textarea
                      rows={2}
                      value={editingProject.solution || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Thumbnail Path / ImageKit Key</label>
                      <input
                        type="text"
                        value={editingProject.thumbnail || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Live URL (optional)</label>
                      <input
                        type="text"
                        value={editingProject.liveUrl || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={Boolean(editingProject.featured)}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-sky-500"
                      />
                      Feature on Homepage Showcase
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save to Supabase
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Thumbnail</th>
                      <th className="p-3">Name / Slug</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Featured</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {projectsList.map((p) => (
                      <tr key={p.slug} className="hover:bg-slate-800/30">
                        <td className="p-3">
                          <img
                            src={getImageUrl(p.thumbnail, { width: 80, height: 50 })}
                            alt={p.name}
                            className="w-16 h-10 object-cover rounded border border-slate-800 bg-slate-950"
                          />
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{p.slug}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-slate-800 text-slate-300">
                            {p.type}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">{p.client}</td>
                        <td className="p-3">
                          {p.featured ? (
                            <span className="text-emerald-400 font-medium">★ Yes</span>
                          ) : (
                            <span className="text-slate-500">No</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(p)}
                            className="p-1.5 rounded hover:bg-slate-800 text-sky-400"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.slug)}
                            className="p-1.5 rounded hover:bg-slate-800 text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Client Testimonials</h2>
                  <p className="text-xs text-slate-400">Client quotes and reviews rendered on homepage.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      title: "Great results",
                      rating: 5,
                      text: "Working with Shaibya was incredible.",
                      author: "Client Name",
                      role: "CEO, Company",
                    })
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Testimonial
                </button>
              </div>

              {editingTestimonial && (
                <form
                  onSubmit={handleSaveTestimonial}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Author</label>
                      <input
                        type="text"
                        value={editingTestimonial.author || ""}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Role / Company</label>
                      <input
                        type="text"
                        value={editingTestimonial.role || ""}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Headline / Title</label>
                    <input
                      type="text"
                      value={editingTestimonial.title || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Review Text</label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.text || ""}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="px-3 py-1.5 text-xs text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                    >
                      Save Testimonial
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonialsList.map((t, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-sky-400">{t.title}</span>
                        <span className="text-amber-400 text-xs">{"★".repeat(t.rating || 5)}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic mb-4">"{t.text}"</p>
                    </div>
                    <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-xs text-white">{t.author}</div>
                        <div className="text-[11px] text-slate-400">{t.role}</div>
                      </div>
                      <button
                        onClick={() => setEditingTestimonial(t)}
                        className="p-1.5 rounded hover:bg-slate-800 text-sky-400"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CAREERS */}
          {activeTab === "careers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Careers & Open Roles</h2>
                  <p className="text-xs text-slate-400">Manage job postings on /careers page.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingCareer({
                      role_id: "role-" + Date.now().toString().slice(-4),
                      title: "",
                      team: "Engineering",
                      experience: "1-2 years",
                      description: "",
                      responsibilities: ["Develop robust features", "Maintain code quality"],
                      application_note: "Share your CV and portfolio link.",
                      is_active: true,
                    })
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Post New Role
                </button>
              </div>

              {editingCareer && (
                <form
                  onSubmit={handleSaveCareer}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Role Identifier (Slug)</label>
                      <input
                        type="text"
                        value={editingCareer.role_id || ""}
                        onChange={(e) => setEditingCareer({ ...editingCareer, role_id: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Role Title</label>
                      <input
                        type="text"
                        value={editingCareer.title || ""}
                        onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Team / Department</label>
                      <input
                        type="text"
                        value={editingCareer.team || ""}
                        onChange={(e) => setEditingCareer({ ...editingCareer, team: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingCareer.description || ""}
                      onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingCareer(null)}
                      className="px-3 py-1.5 text-xs text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                    >
                      Save Role
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {careersList.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-white">{job.title}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                          {job.team}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{job.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setEditingCareer({
                            role_id: job.id,
                            title: job.title,
                            team: job.team,
                            experience: job.experience,
                            description: job.description,
                            responsibilities: job.responsibilities,
                            application_note: job.applicationNote,
                            is_active: true,
                          })
                        }
                        className="p-2 rounded hover:bg-slate-800 text-sky-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Remove role ${job.title}?`)) {
                            await deleteCareerRole(job.id);
                            await loadAllData();
                          }
                        }}
                        className="p-2 rounded hover:bg-slate-800 text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Team Members</h2>
                <p className="text-xs text-slate-400">Team disciplines displayed on /about.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamList.map((member, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: `${member.color || "#0ea5e9"}22`, color: member.color || "#0ea5e9" }}
                      >
                        {member.dayJob?.[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white">{member.dayJob}</div>
                        <div className="text-[11px] text-slate-400">{member.location}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{member.nightSkill}</p>
                    <p className="text-[11px] text-slate-500 italic">"{member.hoverQuote}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">FAQs</h2>
                  <p className="text-xs text-slate-400">Frequently Asked Questions on homepage & Schema.org.</p>
                </div>
                <button
                  onClick={() => setEditingFaq({ question: "", answer: "" })}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>

              {editingFaq && (
                <form onSubmit={handleSaveFaq} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Question</label>
                    <input
                      type="text"
                      value={editingFaq.question || ""}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Answer</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answer || ""}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-3 py-1.5 text-xs text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
                    >
                      Save FAQ
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {faqsList.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm text-sky-400">{faq.question || faq.q}</h3>
                      <button
                        onClick={() => setEditingFaq({ id: faq.id, question: faq.question || faq.q, answer: faq.answer || faq.a })}
                        className="p-1 rounded hover:bg-slate-800 text-sky-400"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{faq.answer || faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA / IMAGEKIT */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">ImageKit CDN Assets</h2>
                <p className="text-xs text-slate-400">
                  All 105 project assets mapped from <code className="text-sky-400 font-mono">src/config/imagekit-assets.json</code>.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Object.entries(assetRegistry.assets).slice(0, 32).map(([key, asset]: [string, any]) => (
                  <div
                    key={key}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors flex flex-col justify-between"
                  >
                    <div className="h-28 rounded bg-slate-950 flex items-center justify-center overflow-hidden mb-2 border border-slate-800">
                      <img
                        src={getImageUrl(key, { width: 160, height: 110 })}
                        alt={key}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          // local fallback preview
                          (e.target as any).src = `/images/${key}`;
                        }}
                      />
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 truncate mb-1" title={key}>
                      {key}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getImageUrl(key));
                        showStatus("success", `Copied CDN URL for ${key}`);
                      }}
                      className="w-full flex items-center justify-center gap-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-medium"
                    >
                      <Copy className="w-3 h-3" />
                      Copy URL
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SQL MIGRATION */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">SQL Migration for Supabase</h2>
                <p className="text-xs text-slate-400">
                  Ready-to-run SQL script that creates schema <code className="text-sky-400 font-mono">shaibya_portfolio</code> and seeds all initial data.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    File: supabase/migrations/20261109_shaibya_portfolio.sql
                  </span>
                  <a
                    href="https://supabase.com/dashboard/project/hbhumkwhlwmbwoxnyvms/sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Supabase SQL Editor
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto leading-relaxed border border-slate-800">
                  <pre>{`-- 1. Create Dedicated Schema
CREATE SCHEMA IF NOT EXISTS shaibya_portfolio;

-- 2. Grants for Schema Usage
GRANT USAGE ON SCHEMA shaibya_portfolio TO anon, authenticated, service_role;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.projects (...);

-- (Click "Open Supabase SQL Editor" to paste and run the full migration script)`}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
