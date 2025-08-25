import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Zap } from "lucide-react";
import { ResumeGenerator } from "@/components/ResumeGenerator";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header / Navbar */}
      <header className="absolute top-0 left-0 w-full z-20 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-xl font-bold text-white tracking-wide">
              ResumeFlow
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/80">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#resume-generator" className="hover:text-white transition">
              Generate
            </a>
            <a
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("resume-generator")}
            className="hidden md:inline-block px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 pt-40 pb-32 px-6">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_50%)]" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            {/* Left Content */}
            <motion.div
              variants={fadeInUp}
              className="text-center lg:text-left space-y-10"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>AI-Powered Resume Builder</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
              >
                Create{" "}
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Professional Resumes
                </span>{" "}
                Effortlessly
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Upload your resume, add a job description, and get a tailored
                resume & cover letter in minutes.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8"
              >
                <button
                  onClick={() => scrollToSection("resume-generator")}
                  className="px-7 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 transition duration-300 text-lg"
                >
                  Generate My Resume
                </button>

                <button
                  onClick={() => scrollToSection("features")}
                  className="px-7 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition duration-300 text-lg"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="hidden lg:block relative group"
            >
              <div className="absolute -inset-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-500" />
              <img
                src={heroImage}
                alt="AI Resume Generator"
                className="relative w-full h-auto rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Follow 3 simple steps to generate a resume & cover letter tailored
              to your dream job.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                step: "01",
                title: "Upload Resume",
                description:
                  "Upload your existing resume in PDF format to get started instantly.",
                icon: FileText,
                color: "text-blue-500",
              },
              {
                step: "02",
                title: "Add Job Description",
                description:
                  "Paste the job description so our AI tailors your documents for maximum impact.",
                icon: Sparkles,
                color: "text-purple-500",
              },
              {
                step: "03",
                title: "Generate & Download",
                description:
                  "Download your AI-enhanced resume & cover letter instantly, ready to send.",
                icon: Zap,
                color: "text-green-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative p-8 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-smooth border border-border/50"
              >
                <div className="absolute -top-5 left-8">
                  <div className="w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {feature.step}
                  </div>
                </div>

                <feature.icon
                  className={`w-12 h-12 ${feature.color} mb-4`}
                />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Application */}
      <section id="resume-generator" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Start Creating Your Documents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and job description to get a personalized
              resume & cover letter in minutes.
            </p>
          </motion.div>

          <ResumeGenerator />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or suggestions? You can directly reach the developer below.
            </p>
          </motion.div>

          {/* Contact Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-gray-200 shadow-xl rounded-xl max-w-sm mx-auto flex flex-col items-center justify-center h-64 p-8 space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800">Contact Developer</h3>
            <p className="text-gray-500 text-sm text-center">
              Click below to send an email
            </p>
            <a
              href="mailto:mail@vxrachit.is-a.dev"
              className="w-full px-6 py-3 rounded-lg text-white font-medium text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition shadow-md"
            >
              mail@vxrachit.is-a.dev
            </a>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6 mt-16 border-t border-gray-700 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-7 h-7 text-primary drop-shadow-lg" />
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  ResumeFlow
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                AI-powered resume & cover letter generation to help you land
                your dream job effortlessly.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="flex flex-wrap gap-4 justify-center text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div className="flex justify-center md:justify-end items-center gap-4">
              <a
                href="https://github.com/vxrachit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {/* GitHub Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.5.5.5 5.6.5 12.2c0 5.2 3.4 9.6 8.2 11.2.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 .9 2 .9 1.1 2 3 1.4 3.8 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.3 11.3 0 013.1-.4c1 0 2 .1 3 .4 2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.4-2.9 5.4-5.6 5.7.4.3.7.9.7 1.9v2.8c0 .4.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2C23.5 5.6 18.5.5 12 .5z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/vxrachit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.4-1.1 2.5-2.5 2.5S0 4.9 0 3.5 1.1 1 2.5 1s2.5 1.1 2.5 2.5zM.5 8.5h4.9v15H.5v-15zM8.5 8.5h4.7v2h.1c.7-1.3 2.5-2.6 5.2-2.6 5.5 0 6.5 3.6 6.5 8.3v9.3h-4.9v-8.2c0-2 0-4.6-2.8-4.6-2.8 0-3.3 2.2-3.3 4.5v8.3H8.5v-17z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-primary font-medium">vxRachit</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
