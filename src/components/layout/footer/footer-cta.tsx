import { motion } from "framer-motion";
import { itemVariants } from "./site-footer";

export default function FooterCTA() {
  return (
    <>
      {/* Top CTA - Dynamic Banner */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 px-6 py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Ready to build the future, together?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Schedule a free consultation to see how AI and modern development
            can accelerate your business.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a
              href="mailto:shaibyasolutions@gmail.com?cc=shaibyadevs@gmail.com&subject=Enquiry"
              className="px-8 py-4 bg-cyan-500 text-slate-900 font-bold rounded-xl shadow-lg hover:bg-cyan-400 transition transform hover:scale-105 min-w-[200px] text-center"
            >
              Start Project
            </a>
            <a
              href="tel:+917498341146"
              className="px-8 py-4 border border-slate-600 text-white font-semibold rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition min-w-[200px] text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
